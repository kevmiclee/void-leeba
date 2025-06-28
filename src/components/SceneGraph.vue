<template>
  <div>
    <button @click="game.toggleShowSceneGraph"><</button>
    <div class="wrapper" id="scene-graph"></div>
  </div>
</template>

<script setup lang="ts">
import { data, Network } from "vis-network";
import { getSceneGraph } from "@/utils/sceneGraph";
import { onMounted } from "vue";
import { useGameStore } from "@/stores/game";

const game = useGameStore();

onMounted(() => {
  const container = document.getElementById("scene-graph")!;
  const graph = getSceneGraph();

  const nodes = Array.from(new Set(graph.flatMap((g) => [g.from, g.to]))).map(
    (id) => ({ id, label: id })
  );

  const edges = graph.map((g) => ({
    from: g.from,
    to: g.to,
    label: g.label,
    arrows: "to",
  }));

  new Network(
    container,
    { nodes, edges },
    {
      edges: {
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1.5, // makes the arrow head larger
          },
        },
        length: 400, // increases visual edge length
      },
      physics: {
        // solver: "hierarchicalRepulsion",
        // hierarchicalRepulsion: {
        //   avoidOverlap: 1,
        //   damping: 1,
        //   springLength: 90,
        //   springConstant: 0.1,
        //   nodeDistance: 200,
        //   centralGravity: 0.1,
        // },
        // forceAtlas2Based: {
        //   springLength: 300, // this controls the length of edges
        // },
        // stabilization: true,
        enabled: true,
      },
    }
  );
});
</script>

<style scoped>
.wrapper {
  background-color: white;
  height: 1000px;
}
</style>
