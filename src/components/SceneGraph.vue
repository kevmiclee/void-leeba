<template>
  <div class="wrapper">
    <div class="sidebar">
      <ul>
        <li
          v-for="section in sectionIds"
          :key="section"
          @click="activeSection = section"
          :class="{ active: activeSection === section }"
        >
          {{ section }}
        </li>
        <li
          :class="{ active: activeSection === 'All' }"
          @click="activeSection = 'All'"
        >
          All
        </li>
        <li @click="game.toggleShowSceneGraph">Exit</li>
      </ul>
    </div>
    <div class="key">
      <ul>
        Key
        <li>
          <div class="oval" style="background-color: brown"></div>
          <p>Scene</p>
        </li>
        <li>
          <div class="oval" style="background-color: gold"></div>
          <p>Section</p>
        </li>
        <li>
          <div class="oval" style="background-color: red"></div>
          <p>Dead end</p>
        </li>
        <li>
          <div class="star"></div>
          <p>Stat</p>
        </li>
        <li>
          <div class="diamond"></div>
          <p>Aspect</p>
        </li>
      </ul>
    </div>
    <div class="graph-area" id="scene-graph"></div>
  </div>
</template>

<script setup lang="ts">
import { Edge, Network } from "vis-network";
import { getSceneGraph } from "@/utils/sceneGraph";
import { onMounted, ref, watch } from "vue";
import { useGameStore } from "@/stores/game";
import { SceneId, sceneKeys } from "@/data/story/story";
import { miniGameIds } from "@/types/minigame";

const game = useGameStore();
const activeSection = ref("All");
const graphData = getSceneGraph();
const sectionIds = Object.keys(graphData.sectionMap);

console.log(graphData.sectionMap);

function renderGraph() {
  const container = document.getElementById("scene-graph")!;
  const links = graphData.links;
  const sections = graphData.sectionMap;

  const visibleLinks =
    activeSection.value === "All"
      ? links
      : links.filter(
          (link) =>
            sections[activeSection.value]?.includes(link.from as SceneId) ||
            sections[activeSection.value]?.includes(link.to as SceneId)
        );

  const outgoingMap: Record<string, Set<string>> = {};
  const incomingMap: Record<string, Set<string>> = {};
  const statEdgeCountMap: Record<string, number> = {};

  for (const edge of visibleLinks) {
    if (!outgoingMap[edge.from]) outgoingMap[edge.from] = new Set();
    if (!incomingMap[edge.to]) incomingMap[edge.to] = new Set();
    outgoingMap[edge.from].add(edge.to);
    incomingMap[edge.to].add(edge.from);
  }

  const aspectNodes = new Set<string>();
  const statNodes = new Set<string>();
  const syntheticNodes = new Set<string>();
  const edges: Edge[] = [];
  const edgeStackMap: Record<string, number> = {};

  for (const [i, g] of visibleLinks.entries()) {
    const edgeId = `${g.from}->${g.to}`;
    const stackIndex = edgeStackMap[edgeId] || 0;
    edgeStackMap[edgeId] = stackIndex + 1;
    let midNodeId: string | null = null;

    if (g.aspect) {
      midNodeId = `mid:${edgeId}:${stackIndex}`;
      syntheticNodes.add(midNodeId);
      aspectNodes.add(g.aspect);

      edges.push({
        from: g.from,
        to: midNodeId,
        arrows: "to",
        label: wrapText(g.label ?? "", 20),
        font: { size: 12, multi: true },
        smooth: {
          enabled: true,
          type: i % 2 === 0 ? "curvedCW" : "curvedCCW",
          roundness: 0.2 + (i % 3) * 0.1,
        },
      });

      edges.push({ from: midNodeId, to: g.to, arrows: "to", smooth: true });

      edges.push({
        from: midNodeId,
        to: `aspect:${g.aspect}`,
        label: "aspect",
        dashes: true,
        arrows: "to",
        color: { color: "orange" },
        smooth: { type: "discrete", enabled: true, roundness: 0.2 },
        length: 10,
      });
    }

    if (g.stat) {
      const statMidNodeId = midNodeId ?? `mid:${edgeId}:${stackIndex}`;
      if (!midNodeId) syntheticNodes.add(statMidNodeId);

      const index = statEdgeCountMap[g.stat.id] ?? 0;
      statEdgeCountMap[g.stat.id] = index + 1;
      const statNodeId = `${g.stat.id}_${index + 1}`;
      statNodes.add(statNodeId);

      if ((midNodeId ?? g.from) != statMidNodeId) {
        edges.push({
          from: midNodeId ?? g.from,
          to: statMidNodeId,
          arrows: "to",
          label: wrapText(g.label ?? "", 20),
          font: { size: 12, multi: true },
          smooth: {
            enabled: true,
            type: i % 2 === 0 ? "curvedCW" : "curvedCCW",
            roundness: 0.2 + (i % 3) * 0.1,
          },
        });
      }

      edges.push({ from: statMidNodeId, to: g.to, arrows: "to", smooth: true });

      edges.push({
        from: statMidNodeId,
        to: `stat:${statNodeId}`,
        label: `${g.stat.amount > 0 ? "+" : ""}${g.stat.amount}`,
        dashes: true,
        arrows: "to",
        color: { color: "purple" },
        smooth: { type: "discrete", enabled: true, roundness: 0.2 },
        length: 10,
      });
    }

    if (!g.aspect && !g.stat) {
      edges.push({
        from: g.from,
        to: g.to,
        arrows: "to",
        label: wrapText(g.label ?? "", 20),
        font: { size: 12, multi: true },
        smooth: {
          enabled: true,
          type: i % 2 === 0 ? "curvedCW" : "curvedCCW",
          roundness: 0.2 + (i % 3) * 0.1,
        },
      });
    }
  }

  const allNodeIds = new Set(visibleLinks.flatMap((g) => [g.from, g.to]));
  const sceneNodes = Array.from(allNodeIds).map((id) => {
    const outgoing = outgoingMap[id] ?? new Set();
    const incoming = incomingMap[id] ?? new Set();
    const isTerminal = outgoing.size === 0;
    const onlySelfLoop =
      outgoing.size === 1 && [...outgoing].every((x) => incoming.has(x));
    const shouldBeGold =
      incoming.size == 0 || (isTerminal && sectionIds.includes(id));
    const shouldBeRed = isTerminal || onlySelfLoop;
    return {
      id,
      label: id,
      shape: miniGameIds.includes(id) ? "box" : "ellipse",
      color: miniGameIds.includes(id)
        ? "olivedrab"
        : shouldBeGold
          ? "gold"
          : shouldBeRed
            ? "red"
            : "#9f3a27",
      font: {
        color:
          miniGameIds.includes(id) || shouldBeRed || shouldBeGold
            ? "black"
            : "white",
      },
    };
  });

  const aspectNodeObjs = Array.from(aspectNodes).map((aspect) => ({
    id: `aspect:${aspect}`,
    label: aspect,
    shape: "diamond",
    color: "orange",
  }));

  const statNodeObjs = Array.from(statNodes).map((stat) => ({
    id: `stat:${stat}`,
    label: stat,
    shape: "star",
    color: "purple",
  }));

  const syntheticNodeObjs = Array.from(syntheticNodes).map((id) => ({
    id,
    label: "",
    shape: "dot",
    size: 2,
    color: "#888",
  }));

  const nodes = [
    ...sceneNodes,
    ...aspectNodeObjs,
    ...statNodeObjs,
    ...syntheticNodeObjs,
  ];

  const network = new Network(
    container,
    { nodes, edges },
    {
      edges: {
        length: 1200,
        smooth: { enabled: true, type: "dynamic", roundness: 0.4 },
      },
      layout: { hierarchical: { enabled: false } },
      physics: { enabled: false },
      interaction: { hover: true },
    }
  );

  network.on("click", function (params) {
    const nodeId = params.nodes[0];
    const hasOneEdge = params.edges.length == 1;
    const matchingKeys = Object.entries(sections)
      .filter(([_, sceneIds]) => sceneIds.includes(nodeId))
      .map(([key]) => key);

    if (sectionIds.includes(nodeId) && activeSection.value != nodeId) {
      activeSection.value = nodeId;
    } else if (hasOneEdge && matchingKeys.length > 0) {
      activeSection.value = matchingKeys[0];
    } else if (nodeId && sceneKeys.includes(nodeId)) {
      game.toggleShowSceneGraph();
      game.goToScene(nodeId as SceneId);
    }
  });
}

onMounted(renderGraph);
watch(activeSection, renderGraph);

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
  position: relative;
  height: 100vh;
  width: 100vw;
}

.graph-area {
  height: 100%;
  width: 100%;
}

.sidebar {
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9); /* optional for contrast */
  padding: 10px;
  z-index: 10;
  border-bottom-right-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  cursor: pointer;
  margin-bottom: 6px;
  padding: 4px;
}

.sidebar li:hover {
  background-color: #eee;
}

.sidebar li.active {
  background-color: var(--secondary-color);
  color: white;
  font-weight: bold;
}

.key {
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9); /* optional for contrast */
  padding: 10px;
  z-index: 10;
  border-top-right-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.key ul {
  list-style: none;
  padding: 0;
  margin: 0;
  font-weight: bold;
}

.key li {
  cursor: pointer;
  font-weight: normal;
  display: flex;
  align-items: center;
}

.oval {
  width: 40px;
  height: 20px;
  border-radius: 50%;
  margin-right: 4px;
}

.star {
  width: 30px;
  height: 30px;
  margin-right: 4px;
  background-color: purple;
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
}

.diamond {
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-color: orange;
  transform: rotate(45deg);
}
</style>
