import { Scene } from "@/types/story";
import bgStart from "@/assets/images/backgrounds/Landing-Page.png";
import introAudio from "@/assets/audio/story/background-themes/intro.mp3";
import windTunnel from "@/assets/audio/story/background-themes/wind-tunnel.mp3";

import { defineScene } from "../story";

export const introScenes = {
  start: defineScene("start", function (payload): Scene {
    return {
      id: this.id,
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
            text: `New game`,
            next: "intro",
          },
          {
            text: `Credits`,
            next: "credits",
          },
        ],
      },
    };
  }),

  intro: defineScene("intro", function (payload): Scene {
    return {
      id: this.id,
      text: "I left the home I'd come to know",
      audio: windTunnel,
      animationRate: 250,
      metadata: {
        sectionId: "intro",
        routes: [
          {
            text: `trigger`,
            next: "intro1",
          },
        ],
      },
    };
  }),

  intro1: defineScene("intro1", function (payload): Scene {
    return {
      id: this.id,
      text: "I stayed alive to find a way to grow",
      audio: windTunnel,
      animationRate: 250,
      metadata: {
        sectionId: "intro",
        routes: [
          {
            text: `trigger`,
            next: "home",
          },
        ],
      },
    };
  }),

  dungeon: defineScene("dungeon", function (payload): Scene {
    return {
      id: this.id,
      text: "I stayed alive to find a way to grow",
      audio: windTunnel,
      // dungeonId: "forest",
      metadata: {
        sectionId: "intro",
        routes: [
          {
            text: `trigger`,
            next: "home",
          },
        ],
      },
    };
  }),

  credits: defineScene("credits", function (payload): Scene {
    //TODO: MUSIC - credits music
    return {
      id: this.id,
      text: "credits",
      //TODO: credits
    };
  }),

  preamble: defineScene("preamble", function (payload): Scene {
    return {
      id: this.id,
      text: "",
    };
  }),
};
