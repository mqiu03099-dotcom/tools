const SHAPE_OPTIONS = [
  {
    id: "roundedRect",
    title: "小圆角",
  },
  {
    id: "circle",
    title: "圆形",
  },
  {
    id: "heart",
    title: "爱心",
  },
  {
    id: "rect",
    title: "长方形",
  },
  {
    id: "capsule",
    title: "胶囊",
  },
  {
    id: "hexagon",
    title: "六边形",
  },
  {
    id: "star",
    title: "星形",
  },
  {
    id: "flower",
    title: "花瓣",
  },
];

function drawRoundedRectPath(context, size, radius) {
  const safeRadius = Math.max(0, Math.min(radius, size / 2));
  context.beginPath();
  context.moveTo(safeRadius, 0);
  context.lineTo(size - safeRadius, 0);
  context.arcTo(size, 0, size, safeRadius, safeRadius);
  context.lineTo(size, size - safeRadius);
  context.arcTo(size, size, size - safeRadius, size, safeRadius);
  context.lineTo(safeRadius, size);
  context.arcTo(0, size, 0, size - safeRadius, safeRadius);
  context.lineTo(0, safeRadius);
  context.arcTo(0, 0, safeRadius, 0, safeRadius);
  context.closePath();
}

function drawRoundedRectWithSizePath(context, width, height, radius) {
  const safeWidth = Number(width) || 0;
  const safeHeight = Number(height) || 0;
  const safeRadius = Math.max(0, Math.min(radius, safeWidth / 2, safeHeight / 2));
  context.beginPath();
  context.moveTo(safeRadius, 0);
  context.lineTo(safeWidth - safeRadius, 0);
  context.arcTo(safeWidth, 0, safeWidth, safeRadius, safeRadius);
  context.lineTo(safeWidth, safeHeight - safeRadius);
  context.arcTo(safeWidth, safeHeight, safeWidth - safeRadius, safeHeight, safeRadius);
  context.lineTo(safeRadius, safeHeight);
  context.arcTo(0, safeHeight, 0, safeHeight - safeRadius, safeRadius);
  context.lineTo(0, safeRadius);
  context.arcTo(0, 0, safeRadius, 0, safeRadius);
  context.closePath();
}

function drawHeartPath(context, width, height) {
  const safeWidth = Number(width) || 0;
  const safeHeight = Number(height) || 0;
  const centerX = safeWidth / 2;
  const topY = safeHeight * 0.2;
  context.beginPath();
  context.moveTo(centerX, safeHeight * 0.9);
  context.bezierCurveTo(
    safeWidth * 0.08,
    safeHeight * 0.64,
    safeWidth * 0.06,
    safeHeight * 0.3,
    safeWidth * 0.24,
    topY,
  );
  context.bezierCurveTo(
    safeWidth * 0.38,
    safeHeight * 0.1,
    safeWidth * 0.48,
    safeHeight * 0.2,
    centerX,
    safeHeight * 0.34,
  );
  context.bezierCurveTo(
    safeWidth * 0.52,
    safeHeight * 0.2,
    safeWidth * 0.62,
    safeHeight * 0.1,
    safeWidth * 0.76,
    topY,
  );
  context.bezierCurveTo(
    safeWidth * 0.94,
    safeHeight * 0.3,
    safeWidth * 0.92,
    safeHeight * 0.64,
    centerX,
    safeHeight * 0.9,
  );
  context.closePath();
}

function drawHexagonPath(context, width, height) {
  const safeWidth = Number(width) || 0;
  const safeHeight = Number(height) || 0;
  context.beginPath();
  context.moveTo(safeWidth * 0.25, 0);
  context.lineTo(safeWidth * 0.75, 0);
  context.lineTo(safeWidth, safeHeight * 0.5);
  context.lineTo(safeWidth * 0.75, safeHeight);
  context.lineTo(safeWidth * 0.25, safeHeight);
  context.lineTo(0, safeHeight * 0.5);
  context.closePath();
}

function drawStarPath(context, width, height) {
  const safeWidth = Number(width) || 0;
  const safeHeight = Number(height) || 0;
  const centerX = safeWidth / 2;
  const centerY = safeHeight / 2;
  const outerRadius = Math.min(safeWidth, safeHeight) / 2;
  const innerRadius = outerRadius * 0.46;

  context.beginPath();

  for (let index = 0; index < 10; index += 1) {
    const radius = index % 2 === 0 ? outerRadius : innerRadius;
    const angle = -Math.PI / 2 + (Math.PI / 5) * index;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }

  context.closePath();
}

function drawFlowerPath(context, width, height) {
  const safeWidth = Number(width) || 0;
  const safeHeight = Number(height) || 0;
  const centerX = safeWidth / 2;
  const centerY = safeHeight / 2;
  const petalRadius = Math.min(safeWidth, safeHeight) * 0.22;
  const offset = petalRadius * 0.92;

  context.beginPath();
  context.arc(centerX, centerY - offset, petalRadius, Math.PI, 0, false);
  context.arc(centerX + offset, centerY, petalRadius, -Math.PI / 2, Math.PI / 2, false);
  context.arc(centerX, centerY + offset, petalRadius, 0, Math.PI, false);
  context.arc(centerX - offset, centerY, petalRadius, Math.PI / 2, -Math.PI / 2, false);
  context.closePath();
}

function drawShapePath(context, shapeId, width, height) {
  const safeWidth = Number(width) || 0;
  const safeHeight = Number(height) || 0;
  const baseSize = Math.min(safeWidth, safeHeight);

  if (shapeId === "circle") {
    context.beginPath();
    context.arc(safeWidth / 2, safeHeight / 2, baseSize / 2, 0, Math.PI * 2);
    context.closePath();
    return;
  }

  if (shapeId === "heart") {
    drawHeartPath(context, safeWidth, safeHeight);
    return;
  }

  if (shapeId === "rect") {
    drawRoundedRectWithSizePath(
      context,
      safeWidth,
      safeHeight,
      Math.min(safeWidth, safeHeight) * 0.06,
    );
    return;
  }

  if (shapeId === "capsule") {
    drawRoundedRectWithSizePath(context, safeWidth, safeHeight, safeHeight / 2);
    return;
  }

  if (shapeId === "hexagon") {
    drawHexagonPath(context, safeWidth, safeHeight);
    return;
  }

  if (shapeId === "star") {
    drawStarPath(context, safeWidth, safeHeight);
    return;
  }

  if (shapeId === "flower") {
    drawFlowerPath(context, safeWidth, safeHeight);
    return;
  }

  drawRoundedRectPath(context, baseSize, baseSize * 0.16);
}

module.exports = {
  SHAPE_OPTIONS,
  drawShapePath,
};
