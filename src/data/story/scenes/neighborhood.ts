import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import neighborhoodTheme from "@/assets/audio/story/background-themes/neighborhood.mp3";
import { defineScene } from "../story";

export const neighborhoodScenes = {
  neighborhood: defineScene("neighborhood", function (payload): Scene {
    return {
      id: this.id,
      text: "Neighborhood",
      background: bgDefault,
      audio: neighborhoodTheme,
      //TODO: neighborhood
      metadata: {
        sectionId: "neighborhood",
      },
    };
  }),
};
