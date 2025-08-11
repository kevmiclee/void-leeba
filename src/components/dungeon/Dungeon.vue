<template>
  <canvas ref="canvas" class="dungeon-canvas"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const canvas = ref(null);
let ctx;
let animationId;

const map = [
  //   [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  //   [1, 1, 1, 1, 1, 1, 1, 1],
];

const tileSize = 64;
const fov = Math.PI / 3;
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
const numRays = canvasWidth;
const viewDist = canvasWidth / 2 / Math.tan(fov / 2);
const maxRenderDist = 6 * tileSize;

let player = {
  x: 2 * tileSize,
  y: 3 * tileSize,
  angle: 0,
  speed: 2,
};

const keys = {};

function castRays() {
  const rays = [];

  for (let i = 0; i < numRays; i++) {
    const rayAngle = player.angle - fov / 2 + (i / numRays) * fov;
    let rayX = player.x;
    let rayY = player.y;

    const dx = Math.cos(rayAngle);
    const dy = Math.sin(rayAngle);

    let distance = 0;
    let hit = false;

    while (!hit && distance < 1000) {
      rayX += dx;
      rayY += dy;
      distance += 1;

      const mapX = Math.floor(rayX / tileSize);
      const mapY = Math.floor(rayY / tileSize);

      if (map[mapY] && map[mapY][mapX] === 1) {
        hit = true;
      }
    }

    const correctedDist = distance * Math.cos(rayAngle - player.angle);
    const wallHeight = (tileSize / correctedDist) * viewDist;

    rays.push({ distance: correctedDist, height: wallHeight });
  }

  return rays;
}

function renderScene(rays) {
  // Sky
  const skyColor = "#6baed6"; // pale blue
  ctx.fillStyle = skyColor;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight / 2);

  // Ground
  const groundColor = "#3e4a2b"; // earthy green-brown
  ctx.fillStyle = groundColor;
  ctx.fillRect(0, canvasHeight / 2, canvasWidth, canvasHeight / 2);

  rays.forEach((ray, i) => {
    // Simulate fog: fade distant tree trunks
    const fog = Math.min(1, ray.distance / 500);
    const trunkColor = `rgba(60, 30, 10, ${1 - fog})`;

    const x = i;
    const y = canvasHeight / 2 - ray.height / 2;

    ctx.fillStyle = trunkColor;
    ctx.fillRect(x, y, 1, ray.height);
  });
}

function isBlocked(x, y) {
  const mapX = Math.floor(x / tileSize);
  const mapY = Math.floor(y / tileSize);
  return map[mapY]?.[mapX] === 1;
}

function update() {
  const moveStep = player.speed;
  const nextX = player.x + Math.cos(player.angle) * moveStep;
  const nextY = player.y + Math.sin(player.angle) * moveStep;
  const backX = player.x - Math.cos(player.angle) * moveStep;
  const backY = player.y - Math.sin(player.angle) * moveStep;

  if (keys["ArrowUp"] && !isBlocked(nextX, nextY)) {
    player.x = nextX;
    player.y = nextY;
  }

  if (keys["ArrowDown"] && !isBlocked(backX, backY)) {
    player.x = backX;
    player.y = backY;
  }

  if (keys["ArrowLeft"]) {
    player.angle -= 0.04;
  }

  if (keys["ArrowRight"]) {
    player.angle += 0.04;
  }
}

function gameLoop() {
  update();
  const rays = castRays();
  renderScene(rays);
  animationId = requestAnimationFrame(gameLoop);
}

function handleResize() {
  canvasWidth = canvas.value.width = window.innerWidth;
  canvasHeight = canvas.value.height = window.innerHeight;
  ctx = canvas.value.getContext("2d");
}

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
  window.addEventListener("keydown", (e) => (keys[e.key] = true));
  window.addEventListener("keyup", (e) => (keys[e.key] = false));
  gameLoop();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("keydown", (e) => (keys[e.key] = true));
  window.removeEventListener("keyup", (e) => (keys[e.key] = false));
});
</script>

<style scoped>
.dungeon-canvas {
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 1;
}
</style>
