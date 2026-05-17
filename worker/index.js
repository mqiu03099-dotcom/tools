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

function extractCount(result) {
  if (!result || typeof result !== "object") {
    return -1;
  }

  if (typeof result.count === "number") {
    return result.count;
  }

  if (typeof result.response === "string") {
    try {
      const parsed = JSON.parse(result.response);
      if (typeof parsed?.count === "number") {
        return parsed.count;
      }
    } catch {}
  }

  return -1;
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
        },
        required: ["count"],
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
      "请统计图片里可见的竹签总数。只返回 JSON，格式必须是 {\"count\": 数字}。如果无法判断，返回 {\"count\": -1}。";
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

    return createJsonResponse({
      code: 0,
      data: {
        count: extractCount(result),
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
