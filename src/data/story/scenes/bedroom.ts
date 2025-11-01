import { Choice, Scene } from "@/types/story";
import bgBedroom from "@/assets/images/backgrounds/bedroom.png";

import homeSong from "@/assets/audio/story/background-themes/home.mp3";

import { defineScene, SceneId } from "../story";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";

export const bedroomScenes = {
  bedroom: defineScene("bedroom", function (payload): Scene {
    return {
      id: this.id,
      text: `You awake to a tiny apartment bedroom with a window that overlooks the city. The pounding from your
      dream, you realize, is coming from the other side of your bedroom door. A frantic, yet familiar voice accompanies it.`,
      audio: homeSong,
      background: bgBedroom,
      dialogSequence: () => {
        const character = useCharacterStore();
        const playerName = character.name;
        return [
          {
            characterId: "shib",
            text: `${playerName}! Please get up and help me. There is a Time Fly on my windowsill. You said you 
            would take care of them for me in exchange for bagels, right? Now's your time to shine! I'm trying 
            not to imagine that little ticker getting into my room.`,
            onClick: () => {
              const game = useGameStore();
              game.goToScene("bedroom1");
            },
          },
        ];
      },
      metadata: {
        sectionId: this.id,
        routes: [
          {
            text: "dialog click",
            next: "bedroom1",
          },
        ],
      },
    };
  }),

  bedroom1: defineScene("bedroom1", function (payload): Scene {
    return {
      id: this.id,
      text: `It's your flatmate, Shib. You promised you would help them with their temporomuscaphobia by dispelling 
      any Time Flies from the apartment. The best remedy for Time Flies is to feed them a book.^^Pick a book to 
      feed the Time Fly.`,
      audio: homeSong,
      background: bgBedroom,
      dialogSequence: () => [
        {
          characterId: "shib",
          text: `HURRY IT UP! I AM BARELY HOLDING IT TOGETHER!`,
        },
      ],
      choices: () => {
        return getBookChoices("", "bedroom2");
      },
      metadata: {
        sectionId: this.id,
        routes: [
          {
            text: "choose wrong book",
            next: "bedroom2",
          },
          {
            text: "choose right book",
            next: "bedroom-time-fly",
          },
        ],
      },
    };
  }),

  bedroom2: defineScene("bedroom2", function (payload): Scene {
    console.log(`PAYLOAD: ${payload}`);
    return {
      id: this.id,
      text: payload?.text ?? "",
      choices: () => getBookChoices(payload?.filter!, "bedroom3"),
      audio: homeSong,
      background: bgBedroom,
      metadata: {
        sectionId: this.id,
        routes: [
          {
            text: "choose wrong book",
            next: "bedroom3",
          },
          {
            text: "choose right book",
            next: "bedroom-time-fly",
          },
        ],
      },
    };
  }),

  bedroom3: defineScene("bedroom3", function (payload): Scene {
    return {
      id: this.id,
      text: payload?.text ?? "",
      choices: () => getBookChoices(payload?.filter!, "bedroom3"),
      audio: homeSong,
      background: bgBedroom,
      metadata: {
        sectionId: this.id,
        routes: [
          {
            text: "choose wrong book",
            next: "bedroom3",
          },
          {
            text: "choose right book",
            next: "bedroom-time-fly",
          },
        ],
      },
    };
  }),

  bedroom4: defineScene("bedroom4", function (payload): Scene {
    return {
      id: this.id,
      text: payload?.text ?? "",
      choices: () => getBookChoices(payload?.filter!, "bedroom-time-fly"),
      audio: homeSong,
      background: bgBedroom,
      metadata: {
        sectionId: this.id,
        routes: [
          {
            text: "choose right book",
            next: "bedroom-time-fly",
          },
        ],
      },
    };
  }),

  "bedroom-time-fly": defineScene(
    "bedroom-time-fly",
    function (payload): Scene {
      return {
        id: this.id,
        text: payload?.text ?? "",
        audio: homeSong,
        background: bgBedroom,
        metadata: {
          sectionId: this.id,
          routes: [],
        },
      };
    }
  ),

  dungeon: defineScene("dungeon", function (payload): Scene {
    return {
      id: this.id,
      text: "",
      audio: homeSong,
      dungeonId: "forest",
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

function getBookChoices(filter: string, nextScene: SceneId): Choice[] {
  console.log(nextScene);
  const choices = [
    {
      text: `Don't Make Me Think by Paul Krugman`,
      onChoose: () => {
        console.log("CHOSE 0");
        const game = useGameStore();
        game.goToScene(nextScene, {
          filter: `${filter},0`,
          text: `You've had this book for years and haven't read it, but you will. Someday. You can't get rid of it.`,
        });
      },
    },
    {
      text: `Shift by Aaron Thom`,
      onChoose: () => {
        console.log("CHOSE 1");

        const game = useGameStore();
        game.goToScene(nextScene, {
          filter: `${filter},1`,
          text: `You don't even like this book, but it reminds you of the person you were when you thought you’d like books like this. You can't get rid of it.`,
        });
      },
    },
    {
      text: `Harsh Mellow by Sherwan Milliams`,
      onChoose: () => {
        console.log("CHOSE 2");

        const game = useGameStore();
        game.goToScene("bedroom-time-fly", {
          filter: `${filter},2`,
          text: `That should work.`,
        });
      },
    },
    {
      text: `The Inkwell by Jody Rowsky`,
      onChoose: () => {
        console.log("CHOSE 3");
        const game = useGameStore();
        game.goToScene(nextScene, {
          filter: `${filter},3`,
          text: `Your ex gave you this one. You can't get rid of it because that feels like losing the breakup.`,
        });
      },
    },
  ];

  const indicesToRemove = filter
    .split(",")
    .map((str) => parseInt(str.trim()))
    .filter((num) => !isNaN(num));

  const filteredChoices = choices.filter(
    (_, index) => !indicesToRemove.includes(index)
  );

  return filteredChoices;
}
