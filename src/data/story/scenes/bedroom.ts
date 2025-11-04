import bgBedroom from "@/assets/images/backgrounds/bedroom.png";
import bgTimeFly from "@/assets/images/backgrounds/time-fly.png";
import bgLivingRoom from "@/assets/images/backgrounds/living-room.png";
import bgWindowsill from "@/assets/images/backgrounds/windowsill.png";

import { Choice, Scene } from "@/types/story";

import homeSong from "@/assets/audio/story/background-themes/home.mp3";

import { useCharacterStore } from "@/stores/character";
import { useGameStore } from "@/stores/game";
import { defineScene, SceneId } from "../story";

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
            not to imagine that little ticker whizzing around my room.`,
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
        text: "You leave your room. Shib is waiting anxiously in the living room.",
        audio: homeSong,
        background: bgLivingRoom,
        dialogSequence: () => [
          {
            characterId: "shib",
            text: `YES! You picked a good book. Hurry, hurry, HURRY!`,
            onClick: () => {
              const game = useGameStore();
              game.goToScene("bedroom-time-fly1");
            },
          },
        ],
        metadata: {
          sectionId: this.id,
          routes: [
            {
              text: "dialog click",
              next: "bedroom-time-fly1",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly1": defineScene(
    "bedroom-time-fly1",
    function (payload): Scene {
      return {
        id: this.id,
        text: `You walk into Shib's room with the book. There's the Time Fly on the windowsill. Seems like more of 
        these things appear everyday. No wonder Shib is on edge recently.^^{You set the book down next to the insect 
        and crack open the window}.`,
        audio: homeSong,
        background: bgTimeFly,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("bedroom-time-fly2");
            },
          },
        ],
        metadata: {
          sectionId: this.id,
          routes: [
            {
              text: "You set the book down next to the insect and crack open the window",
              next: "bedroom-time-fly2",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly2": defineScene(
    "bedroom-time-fly2",
    function (payload): Scene {
      return {
        id: this.id,
        text: `Presently, it crawls onto the book. Its legs rub the bookcover with mechanical scrutiny. 
        Its wings twitch their approval, then it hoists the book and flies away {through the opened window}.`,
        audio: homeSong,
        background: bgTimeFly,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("bedroom-time-fly3");
            },
          },
        ],
        metadata: {
          sectionId: this.id,
          routes: [
            {
              text: "through the opened window",
              next: "bedroom-time-fly3",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly3": defineScene(
    "bedroom-time-fly3",
    function (payload): Scene {
      return {
        id: this.id,
        text: `Better tell Shib to {put their mind at ease}.`,
        audio: homeSong,
        background: bgWindowsill,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("bedroom-time-fly4");
            },
          },
        ],
        metadata: {
          sectionId: this.id,
          routes: [
            {
              text: "put their mind at ease",
              next: "bedroom-time-fly4",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly4": defineScene(
    "bedroom-time-fly4",
    function (payload): Scene {
      //TODO: you get some choices to lie to Shib or brag
      return {
        id: this.id,
        text: `TO DO: Shib asks you how it went, you get some choices where you can lie, brag, be honest or humble. 
        Then Shib asks if you've heard what's been going on in the news and says you should be up to date on 
        everything because of your fancy new SmartBag. Shib hints at strange things they've noticed happening in the city`,
        audio: homeSong,
        background: bgLivingRoom,
        metadata: {
          sectionId: this.id,
          routes: [],
        },
      };
    }
  ),
};

function getBookChoices(filter: string, nextScene: SceneId): Choice[] {
  const choices = [
    {
      text: `Don't Make Me Think by Paul Krugman`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(true);
        game.goToScene(nextScene, {
          filter: `${filter},0`,
          text: `You've had this book for years and haven't read it, but you will. Someday. You can't get rid of it.`,
        });
      },
    },
    {
      text: `Shift by Aaron Thom`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(true);
        game.goToScene(nextScene, {
          filter: `${filter},1`,
          text: `You don't even like this book, but it reminds you of the person you were when you thought you’d like books like this. You can't get rid of it.`,
        });
      },
    },
    {
      text: `Harsh Mellow by Sherwan Milliams`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(false);
        game.goToScene("bedroom-time-fly", {
          filter: `${filter},2`,
          text: `That should work.`,
        });
      },
    },
    {
      text: `The Inkwell by Jody Rowsky`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(true);
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
    .filter((num) => num !== 2 && !isNaN(num));

  const filteredChoices = choices.filter(
    (_, index) => !indicesToRemove.includes(index)
  );

  return filteredChoices;
}
