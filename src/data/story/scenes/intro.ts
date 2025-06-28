import { Scene, ScenePayload } from "@/types/story";
import bgStart from "@/assets/images/backgrounds/Landing-Page.png";
import introAudio from "@/assets/audio/story/intro.mp3";
import windTunnel from "@/assets/audio/story/wind-tunnel.mp3";

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
  }),

  intro: (payload?: ScenePayload): Scene => ({
    id: "intro",
    text: "I left the home I'd come to know",
    audio: windTunnel,
    animationRate: 250,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("home");
        },
      },
    ],
  }),

  intro1: (payload?: ScenePayload): Scene => ({
    id: "intro1",
    text: "I stayed alive to find a way to grow",
    audio: windTunnel,
    animationRate: 250,
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
