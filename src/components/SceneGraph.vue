<template>
  <div id="scene-graph" style="height: 600px"></div>
</template>

<script setup lang="ts">
import { Network } from "vis-network";
import { getSceneGraph } from "@/utils/sceneGraph";
import { onMounted } from "vue";

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

  new Network(container, { nodes, edges }, {});
});
</script>
