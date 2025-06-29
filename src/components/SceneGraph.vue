<template>
  <div>
    <button @click="game.toggleShowSceneGraph"><</button>
    <div class="wrapper" id="scene-graph"></div>
  </div>
</template>

<script setup lang="ts">
import { Network } from "vis-network";
import { getSceneGraph } from "@/utils/sceneGraph";
import { onMounted } from "vue";
import { useGameStore } from "@/stores/game";
import { SceneId, sceneKeys } from "@/data/story/story";
import { miniGameIds } from "@/types/minigame";

const game = useGameStore();

onMounted(() => {
  const container = document.getElementById("scene-graph")!;
  const graph = getSceneGraph();

  const fromIds = new Set(graph.map((edge) => edge.from));
  const toIds = new Set(graph.map((edge) => edge.to));

  const nodes = Array.from(new Set(graph.flatMap((g) => [g.from, g.to]))).map(
    (id) => {
      const isMiniGame = miniGameIds.includes(id);
      return {
        id,
        label: id,
        color: !fromIds.has(id) ? "red" : isMiniGame ? "#4CAF50" : "#2196F3",
        shape: isMiniGame ? "box" : "ellipse",
      };
    }
  );

  const edgeStackMap: Record<string, number> = {};

  const edges = graph.map((g, i) => {
    const key = `${g.from}->${g.to}`;
    const stackIndex = edgeStackMap[key] || 0;
    edgeStackMap[key] = stackIndex + 1;

    return {
      from: g.from,
      to: g.to,
      label: wrapText(g.label ?? "", 20),
      font: {
        size: 12,
        multi: true,
        vadjust: (stackIndex - 1) * 20 * (i % 2 === 0 ? -1 : 1),
      },
      length: 1200,
      arrows: "to",
      smooth: {
        enabled: true,
        type: i % 2 === 0 ? "curvedCW" : "curvedCCW",
        roundness: 0.2 + (i % 3) * 0.1,
      },
    };
  });

  const network = new Network(
    container,
    { nodes, edges },
    {
      edges: {
        length: 1200,
        smooth: {
          enabled: true,
          type: "dynamic",
          roundness: 0.4,
        },
      },
      layout: {
        hierarchical: {
          enabled: false,
        },
      },
      physics: {
        enabled: false,
      },
      interaction: {
        hover: true,
      },
    }
  );

  network.on("click", function (params) {
    const nodeId = params.nodes[0];
    if (nodeId) {
      const game = useGameStore();
      game.toggleShowSceneGraph();
      game.goToScene(nodeId as SceneId);
    }
  });
});

function wrapText(text: string, maxLength: number): string {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    if ((current + word).length > maxLength) {
      lines.push(current.trim());
      current = "";
    }
    current += word + " ";
  }
  if (current) lines.push(current.trim());
  return lines.join("\n");
}
</script>

<style scoped>
.wrapper {
  background-color: white;
  height: 1000px;
}
</style>
