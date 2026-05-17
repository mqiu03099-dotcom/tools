import test from "node:test";
import assert from "node:assert/strict";

import { extractSkewerPayload, SKEWER_MODEL } from "../worker/index.js";

test("worker uses kimi vision model", () => {
  assert.equal(SKEWER_MODEL, "@cf/moonshotai/kimi-k2.5");
});

test("extractSkewerPayload reads structured response object with coordinates", () => {
  const payload = extractSkewerPayload({
    response: {
      count: 3,
      items: [
        { id: 9, x: 120.4, y: 88.2 },
        { id: 4, x: 146, y: 92 },
        { id: 2, x: 172, y: 95 },
      ],
    },
  });

  assert.deepEqual(payload, {
    count: 3,
    coordinateUnit: "normalized-1000",
    items: [
      { id: 1, x: 120, y: 88 },
      { id: 2, x: 146, y: 92 },
      { id: 3, x: 172, y: 95 },
    ],
  });
});

test("extractSkewerPayload falls back to items length when count is missing", () => {
  const payload = extractSkewerPayload({
    response: JSON.stringify({
      items: [
        { id: 1, x: 20, y: 30 },
        { id: 2, x: 40, y: 50 },
      ],
    }),
  });

  assert.deepEqual(payload, {
    count: 2,
    coordinateUnit: "normalized-1000",
    items: [
      { id: 1, x: 20, y: 30 },
      { id: 2, x: 40, y: 50 },
    ],
  });
});

test("extractSkewerPayload returns empty items for invalid coordinates", () => {
  const payload = extractSkewerPayload({
    response: {
      count: -1,
      items: [{ id: 1, x: "bad", y: 30 }],
    },
  });

  assert.deepEqual(payload, {
    count: -1,
    coordinateUnit: "normalized-1000",
    items: [],
  });
});
