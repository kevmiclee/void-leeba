import { Scene, ScenePayload } from "@/types/story";
import bgStart from "@/assets/images/backgrounds/Landing-Page.png";
import introAudio from "@/assets/audio/story/background-themes/intro.mp3";
import windTunnel from "@/assets/audio/story/background-themes/wind-tunnel.mp3";

import { useGameStore } from "@/stores/game";

export const introScenes = {
  start: (payload?: ScenePayload): Scene => ({
    id: "start",
    text: "An intro to the Leakyverse",
    animationRate: 250,
    background: bgStart,
    audio: introAudio,
    choices: () => [
      {
        text: "New game",
        next: "intro",
      },
      {
        text: "Credits",
        next: "credits",
      },
    ],
    metadata: {
      sectionId: "intro",
      routes: [
        {
          label: `New game`,
          redirect: "intro",
        },
        {
          label: `Credits`,
          redirect: "credits",
        },
      ],
    },
  }),

  intro: (payload?: ScenePayload): Scene => ({
    id: "intro",
    text: "I left the home I'd come to know",
    audio: windTunnel,
    animationRate: 250,
    metadata: {
      sectionId: "intro",
      routes: [
        {
          label: `trigger`,
          redirect: "intro1",
        },
      ],
    },
  }),

  intro1: (payload?: ScenePayload): Scene => ({
    id: "intro1",
    text: "I stayed alive to find a way to grow",
    audio: windTunnel,
    animationRate: 250,
    metadata: {
      sectionId: "intro",
      routes: [
        {
          label: `trigger`,
          redirect: "home",
        },
      ],
    },
  }),
  credits: (payload?: ScenePayload): Scene => ({
    id: "credits",
    text: "credits",
  }),
  preamble: (): Scene => ({
    id: "preamble",
    text: "",
  }),
};
