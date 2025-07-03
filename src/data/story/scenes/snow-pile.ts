import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";

export const snowPileScenes = {
  "snow-pile": defineScene("snow-pile", function (payload): Scene {
    return {
      id: this.id,
      text: "snow pile",
      background: bgDefault,
      //TODO: snowpile
    };
  }),
};
