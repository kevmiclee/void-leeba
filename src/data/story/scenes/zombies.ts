import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";

const sectionId = "zombies";

export const zombieScenes = {
  zombies: defineScene("zombies", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text: `zombies`,
      metadata: { sectionId },
    };
  }),
};
