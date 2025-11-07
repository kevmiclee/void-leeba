import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";

//TODO: MUSIC - paint

const sectionId = "paint";

export const paintScenes = {
  paint: defineScene("paint", function (payload): Scene {
    return {
      id: this.id,
      text: "Paint",
      background: bgDefault,
      //TODO: STORY - paint
      metadata: {
        sectionId: sectionId,
      },
    };
  }),
};
