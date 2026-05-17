const API_PATHNAME = "/api/skewer-count";
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function createJsonResponse(data, init = {}) {
  const headers = new Headers(init.headers || {});
  headers.set("Content-Type", "application/json; charset=utf-8");

  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    headers.set(key, value);
  });

  return new Response(JSON.stringify(data), {
    ...init,
    headers,
  });
}

function buildImageDataUri(imageBase64, mimeType) {
  const normalizedBase64 = typeof imageBase64 === "string" ? imageBase64.trim() : "";
  const normalizedMimeType = typeof mimeType === "string" ? mimeType.trim() : "";

  if (!normalizedBase64 || !normalizedMimeType) {
    return "";
  }

  return `data:${normalizedMimeType};base64,${normalizedBase64}`;
}

function normalizeCoordinate(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  return Math.max(0, Math.min(1000, Math.round(value)));
}

function normalizeSkewerItems(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      const x = normalizeCoordinate(item?.x);
      const y = normalizeCoordinate(item?.y);

      if (x === null || y === null) {
        return null;
      }

      return {
        id: index + 1,
        x,
        y,
      };
    })
    .filter(Boolean);
}

function extractModelResponse(result) {
  if (!result || typeof result !== "object") {
    return null;
  }

  if (result.response && typeof result.response === "object") {
    return result.response;
  }

  if (typeof result.response === "string") {
    try {
      return JSON.parse(result.response);
    } catch {
      return null;
    }
  }

  if (typeof result.count === "number" || Array.isArray(result.items)) {
    return result;
  }

  return null;
}

export function extractSkewerPayload(result) {
  const parsed = extractModelResponse(result);
  const items = normalizeSkewerItems(parsed?.items);
  const count =
    typeof parsed?.count === "number" && parsed.count >= 0 ? Math.round(parsed.count) : items.length || -1;

  return {
    count,
    items,
    coordinateUnit: "normalized-1000",
  };
}

async function ensureMetaLicenseAccepted(env) {
  await env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
    prompt: "agree",
  });
}

async function runSkewerModel(env, image, prompt) {
  return env.AI.run("@cf/meta/llama-3.2-11b-vision-instruct", {
    messages: [
      {
        role: "system",
        content: "你是图片计数助手，只返回 JSON，不要返回额外解释。",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    image,
    response_format: {
      type: "json_schema",
      json_schema: {
        type: "object",
        properties: {
          count: {
            type: "integer",
          },
          items: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: {
                  type: "integer",
                },
                x: {
                  type: "integer",
                },
                y: {
                  type: "integer",
                },
              },
              required: ["id", "x", "y"],
            },
          },
        },
        required: ["count", "items"],
      },
    },
  });
}

async function handleSkewerCount(request, env) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: CORS_HEADERS,
    });
  }

  if (request.method !== "POST") {
    return createJsonResponse(
      {
        code: 405,
        message: "Method Not Allowed",
      },
      { status: 405 }
    );
  }

  try {
    const body = await request.json();
    const imageBase64 = body?.imageBase64;
    const mimeType = body?.mimeType;
    const prompt =
      body?.prompt ||
      "请统计图片里可见的竹签总数，并给每个签子头返回编号和圆心坐标。要求：1. 只统计可见的签子头；2. 按从上到下、同一行从左到右编号；3. x 和 y 使用 0 到 1000 的整数归一化坐标；4. 只返回符合 schema 的 JSON；5. 无法判断时 count 返回 -1，items 返回空数组。";
    const image = buildImageDataUri(imageBase64, mimeType);

    if (!image) {
      return createJsonResponse(
        {
          code: 400,
          message: "Missing imageBase64 or mimeType",
        },
        { status: 400 }
      );
    }

    let result;

    try {
      result = await runSkewerModel(env, image, prompt);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error || "");

      if (errorMessage.includes("5016") || errorMessage.includes("submit the prompt 'agree'")) {
        await ensureMetaLicenseAccepted(env);
        result = await runSkewerModel(env, image, prompt);
      } else {
        throw error;
      }
    }

    const payload = extractSkewerPayload(result);

    return createJsonResponse({
      code: 0,
      data: {
        count: payload.count,
        items: payload.items,
        coordinateUnit: payload.coordinateUnit,
        raw: result,
      },
    });
  } catch (error) {
    return createJsonResponse(
      {
        code: 500,
        message: error instanceof Error ? error.message : "Worker error",
      },
      { status: 500 }
    );
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === API_PATHNAME) {
      return handleSkewerCount(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
