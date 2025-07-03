import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";

//TODO: neighborhood music

export const neighborhoodScenes = {
  neighborhood: defineScene("neighborhood", function (payload): Scene {
    return {
      id: this.id,
      text: "Neighborhood",
      background: bgDefault,
      //TODO: neighborhood
    };
  }),
};
