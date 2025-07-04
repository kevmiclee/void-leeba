import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";

//TODO: MUSIC - void

export const voidScenes = {
  void: defineScene("void", function (payload): Scene {
    return {
      id: this.id,
      text: "Void",
      background: bgDefault,
      //TODO: void
      metadata: {
        sectionId: "void",
      },
    };
  }),
};
