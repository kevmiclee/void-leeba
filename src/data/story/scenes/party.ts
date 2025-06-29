import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import partySong from "@/assets/audio/story/party.mp3";
import { useGameStore } from "@/stores/game";

export const partyScenes = {
  "party-eggcorn": (payload?: ScenePayload): Scene => ({
    id: "party-eggcorn",
    background: bgDefault,
    text:
      `Yuck! It tastes like...^^You don't get a chance to finish the thought. ` +
      `It feels like the whole world is being stretched inside-out. You hear a voice, like an echo ` +
      `in your mind, "See you soon, raccoon!" Then {everything goes dark}.`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("party");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `everything goes dark`,
          redirect: "party",
        },
      ],
    },
  }),

  "party-eggcorn-check": (payload?: ScenePayload): Scene => ({
    id: "party-eggcorn-check",
    background: bgDefault,
    text: `But it's <i>so tantalizing!</i>`,
    choices: () => [
      { text: "YOLO! Eat the eggcorn.", next: "party-eggcorn" },
      {
        text: `No. Seriously. I'm not eating it.`,
        next: "dream1",
        payload: { filter: "noFaeries" },
      },
    ],
    metadata: {
      routes: [
        {
          label: `No. Seariously. I'm not eating it`,
          redirect: "dream1",
        },
        {
          label: `YOLO! Eat the eggcorn`,
          redirect: "party-eggcorn",
        },
      ],
    },
  }),

  party: (payload?: ScenePayload): Scene => ({
    id: "party",
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
  }),
};
