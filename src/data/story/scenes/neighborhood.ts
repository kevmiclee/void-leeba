import { Scene } from "@/types/story";
import bgNeighborhood from "@/assets/images/backgrounds/neighborhood.png";
import neighborhoodTheme from "@/assets/audio/story/background-themes/neighborhood.mp3";
import { defineScene } from "../story";

//TODO: MUSIC - dog barking sounds

export const neighborhoodScenes = {
  neighborhood: defineScene("neighborhood", function (payload): Scene {
    return {
      id: this.id,
      text: "Neighborhood",
      background: bgNeighborhood,
      audio: neighborhoodTheme,
      //TODO: neighborhood
      metadata: {
        sectionId: "neighborhood",
      },
    };
  }),
};
