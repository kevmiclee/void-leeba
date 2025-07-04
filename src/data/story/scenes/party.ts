import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import partySong from "@/assets/audio/story/background-themes/party.mp3";
import { defineScene } from "../story";

export const partyScenes = {
  party: defineScene("party", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        payload?.filter == "isKeg"
          ? `You're the life of the party. You're the Keg.`
          : `When you come to, you're still in the clearing, but it all seems <i>different</i>. ` +
            `The squirrel and hongatar are all here, but perfectly conscious. There is upbeat music, ` +
            `merry-making and of course, a keg!`,
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "faerie1", text: "WOOOOOOOTTT!" },
        { characterId: "squirrel", text: "JOOOOOOOO!" },
      ],
      metadata: {
        sectionId: "party",
      },
    };
  }),
};
//TODO: party
