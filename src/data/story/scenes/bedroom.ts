import bgBedroom from "@/assets/images/backgrounds/bedroom.png";
import bgTimeFly from "@/assets/images/backgrounds/time-fly.png";
import bgLivingRoom from "@/assets/images/backgrounds/living-room.png";
import bgWindowsill from "@/assets/images/backgrounds/windowsill.png";

import { Choice, Dialog, Scene } from "@/types/story";

import homeSong from "@/assets/audio/story/background-themes/home.mp3";

import { useCharacterStore } from "@/stores/character";
import { useGameStore } from "@/stores/game";
import { defineScene, SceneId } from "../story";
import { getShibHonestAnswer } from "../helper-functions/text-helper-functions";
import { useAspectStore } from "@/stores/aspects";

const sectionId = "bedroom";

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
            would take care of them for me in exchange for bagels, right?`,
          },
          {
            characterId: "shib",
            text: `Now's your time to shine! I'm trying 
            not to imagine that little ticker whizzing around my room.`,
            onClick: () => {
              const game = useGameStore();
              game.goToScene("bedroom1");
            },
          },
        ];
      },
      metadata: {
        sectionId: sectionId,
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
      text: `It's your flatmate, Shib. You promised you would help him with his temporomuscaphobia by dispelling 
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
        sectionId: sectionId,
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
        sectionId: sectionId,
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
        sectionId: sectionId,
        routes: [
          {
            text: "choose wrong book",
            next: "bedroom4",
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
        sectionId: sectionId,
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
          sectionId: sectionId,
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
        these things appear everyday. No wonder Shib is on edge recently.^^{You set the book down next to the insect}.`,
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
          sectionId: sectionId,
          routes: [
            {
              text: "You set the book down next to the insect",
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
        Its wings twitch their approval. It issues a slimy probiscis and begins its meal. You use this 
        opportunity to {catch the Time Fly}.`,
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
          sectionId: sectionId,
          routes: [
            {
              text: "catch the Time Fly",
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
        text: `You swoop a Bell jar over the Time Fly and carefully scoot a piece of paper underneath. Now what?`,
        audio: homeSong,
        background: bgWindowsill,
        choices: () => {
          const character = useCharacterStore();
          return [
            {
              text: `Bring it to your your room to add to your collection.`,
              next: "bedroom-time-fly4",
              onChoose: () => {
                character.addToInventory("time-fly", this.id);
                character.gainManners("weird", 1, this.id);
                character.setFlag("time-fly-choice", "keep", this.id);
              },
            },
            {
              text: `Let it out the window.`,
              next: "bedroom-time-fly4",
              onChoose: () => {
                character.gainManners("polite", 1, this.id);
                character.setFlag("time-fly-choice", "free", this.id);
              },
            },
            {
              text: `Kill it.`,
              next: "bedroom-time-fly4",
              onChoose: () => {
                character.gainManners("rude", 1, this.id);
                character.setFlag("time-fly-choice", "kill", this.id);
              },
            },
          ];
        },
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `Bring it to your your room to add to your collection.`,
              next: "bedroom-time-fly4",
              manners: "weird",
            },
            {
              text: `Let it out the window.`,
              next: "bedroom-time-fly4",
              manners: "polite",
            },
            {
              text: `Kill it.`,
              next: "bedroom-time-fly4",
              manners: "rude",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly4": defineScene(
    "bedroom-time-fly4",
    function (payload): Scene {
      return {
        id: this.id,
        text: `It's done. Better tell Shib so he can {put his mind at ease}.`,
        audio: homeSong,
        background: bgWindowsill,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("bedroom-time-fly5");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: "put his mind at ease",
              next: "bedroom-time-fly5",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly5": defineScene(
    "bedroom-time-fly5",
    function (payload): Scene {
      return {
        id: this.id,
        text: "You return to Shib to calm him down.",
        audio: homeSong,
        background: bgLivingRoom,
        dialogSequence: () => {
          const character = useCharacterStore();
          const shibSequenceCount = character.flags["shib-sequence-count"] ?? 0;

          const dialog: Dialog[] = [
            {
              characterId: "shib",
              text: `${shibSequenceCount > 0 ? `You're not listening! ` : ""}So, you gotta just kill them, you do that for me right? You said once that you would prefer to
            capture them and let them go. But you remember you can't living with me, right? Cause they are going to
            come right back in.`,
              onClick: () => {
                const game = useGameStore();
                // game.setPersistAvatar(true);
              },
            },
            {
              characterId: "shib",
              text: `I don't know if you remember but they are attracted to my fear! They'll just home right back in
            on me...and you know I have a phobia of them, they make me even more afraid, which attracts even more
            time flies to me.`,
            },
          ];

          if (shibSequenceCount == 2) {
            dialog.unshift({
              characterId: "shib",
              text: `${character.name}, don't tell me to relax, that makes me even more agitated! I hate when people tell me to relax! I am serious about this.`,
            });
          }

          return dialog;
        },
        choices: () => {
          const character = useCharacterStore();
          const timeFlyChoice = character.flags["time-fly-choice"]!;
          const killedTimeFly = timeFlyChoice == "kill";
          const shibSequenceCount = character.flags["shib-sequence-count"] ?? 0;
          return shibSequenceCount == 0
            ? [
                {
                  text: killedTimeFly
                    ? `"I let it go, of course."`
                    : `"I killed it, of course."`,
                  onChoose: () => {
                    character.gainStat("shitheadedness", 1, this.id);
                    character.setFlag("shib-sequence-count", 1, this.id);
                  },
                  next: "bedroom-time-fly5",
                },
                {
                  text: `<i>Flex your muscles.</i> "Those scum are no match for me!"`,
                  onChoose: () => {
                    character.gainStat("blueMagic", 1, this.id);
                    character.setFlag("shib-sequence-count", 1, this.id);
                  },
                  next: "bedroom-time-fly5",
                },
                {
                  text: getShibHonestAnswer(timeFlyChoice),
                  onChoose: () => {
                    character.gainStat("will", 1, this.id);
                    character.setFlag("shib-sequence-count", 1, this.id);
                  },
                  next: "bedroom-time-fly5",
                },
                {
                  text: `"Glad to be of service."`,
                  onChoose: () => {
                    character.gainStat("athletics", 1, this.id);
                    character.setFlag("shib-sequence-count", 1, this.id);
                  },
                  next: "bedroom-time-fly5",
                },
              ]
            : [
                {
                  text: `Try to reason with him. "Relax, don't worry."`,
                  onChoose: () => {
                    character.setFlag(
                      "shib-sequence-count",
                      shibSequenceCount + 1,
                      this.id
                    );
                  },
                  next: "bedroom-time-fly5",
                },
                {
                  text: `Look at your Drip.`,
                  drawerView: "main",
                  next: "bedroom-time-fly6",
                },
              ];
        },
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: "Lie",
              next: "bedroom-time-fly5",
              stat: { id: "shitheadedness", amount: 1 },
            },
            {
              text: `Brag`,
              next: "bedroom-time-fly5",
              stat: { id: "blueMagic", amount: 1 },
            },
            {
              text: "Honest",
              next: "bedroom-time-fly5",
              stat: { id: "will", amount: 1 },
            },
            {
              text: `Humble`,
              next: "bedroom-time-fly5",
              stat: { id: "athletics", amount: 1 },
            },
            {
              text: `Try to reason`,
              next: "bedroom-time-fly5",
            },
            {
              text: `Look at your Drip`,
              next: "bedroom-time-fly6",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly6": defineScene(
    "bedroom-time-fly6",
    function (payload): Scene {
      return {
        id: this.id,
        text: ``,
        audio: homeSong,
        background: bgLivingRoom,
        dialogSequence: () => {
          const character = useCharacterStore();
          return [
            {
              characterId: "shib",
              text: `${character.name}, I am serious about this. You're just gonna ignore me and look at your Drip? 
              You don't even care how I feel. Maybe you are not such a good room mate.`,
            },
            {
              characterId: "shib",
              text: `I need to live with someone who validates my emotions. That means even during a cyclical 
              trauma-dump, ${character.name}.`,
            },
          ];
        },
        choices: () => [
          {
            text: `"Um..."`,
            next: "bedroom-time-fly7",
          },
          {
            text: `"I'm sorry - I will!"`,
            next: "bedroom-time-fly7",
          },
          {
            text: `<i>Ugh.</i>`,
            next: "bedroom-time-fly7",
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `"Um..."`,
              next: "bedroom-time-fly7",
            },
            {
              text: `"I'm sorry - I will!"`,
              next: "bedroom-time-fly7",
            },
            {
              text: `<i>Ugh.</i>`,
              next: "bedroom-time-fly7",
            },
          ],
        },
      };
    }
  ),

  "bedroom-time-fly7": defineScene(
    "bedroom-time-fly7",
    function (payload): Scene {
      return {
        id: this.id,
        text: ``,
        audio: homeSong,
        background: bgLivingRoom,
        dialogSequence: () => {
          return [
            {
              characterId: "shib",
              text: `SHIT! OH SHIT, look at the time, I gotta fly.`,
              onClick: () => {
                const game = useGameStore();
                game.goToScene("bedroom5");
              },
            },
          ];
        },
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: "dialog click",
              next: "bedroom5",
            },
          ],
        },
      };
    }
  ),

  bedroom5: defineScene("bedroom5", function (payload): Scene {
    return {
      id: this.id,
      text: `Shib leaves. What will you do? You could go out and explore. Also, no one is home. 
      You might enjoy some quiet time in your room.`,
      audio: homeSong,
      background: bgLivingRoom,
      choices: () => [
        {
          text: "Go out and explore.",
          next: "home2",
        },
        {
          text: "Enjoy some quiet time in your room.",
          next: "room",
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "Go out and explore.",
            next: "home2",
          },
          {
            text: "Enjoy some quiet time in your room.",
            next: "room",
          },
        ],
      },
    };
  }),

  home2: defineScene("home2", function (payload): Scene {
    return {
      id: this.id,
      background: bgLivingRoom,
      audio: homeSong,
      text: `Will you take anything with you?`,
      choices: () => [
        {
          text: "Dog food can",
          next: "home3",
          payload: {
            text: "Maybe you'll meet a hungry dog. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("dog-food", this.id);
            character.gainStat("athletics", 1, this.id);
          },
        },
        {
          text: "Playing cards",
          next: "home3",
          payload: {
            text: "Maybe someone will want to play. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("cards", this.id);
            character.gainStat("blueMagic", 1, this.id);
          },
        },
        {
          text: "Orange spray paint",
          next: "home3",
          payload: {
            text: "Maybe you'll spray paint something. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("spray-paint", this.id);
            character.gainStat("shitheadedness", 1, this.id);
          },
        },
        {
          text: "Translator",
          next: "home3",
          payload: {
            text: "Maybe you'll encounter a language you can't comprehend. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("translator", this.id);
            character.gainStat("blueMagic", 1, this.id);
          },
        },
        {
          text: "Nothing",
          next: "home3",
          payload: {
            text: "Maybe you won't need anything. {Continue.}",
          },
          onChoose: () => {
            const aspects = useAspectStore();
            const character = useCharacterStore();

            aspects.addAspect("ascetic");
            character.gainStat("will", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `Dog food can`,
            next: "home3",
            stat: {
              id: "athletics",
              amount: 1,
            },
          },
          {
            text: `Playing cards`,
            next: "home3",
            stat: {
              id: "blueMagic",
              amount: 1,
            },
          },
          {
            text: `Orange spray paint`,
            next: "home3",
            stat: {
              id: "shitheadedness",
              amount: 1,
            },
          },
          {
            text: `Translator`,
            next: "home3",
            stat: {
              id: "blueMagic",
              amount: 1,
            },
          },
          {
            text: `Nothing`,
            next: "home3",
            aspect: "ascetic",
            stat: {
              id: "will",
              amount: 1,
            },
          },
        ],
      },
    };
  }),

  home3: defineScene("home3", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      background: bgLivingRoom,
      text: payload?.text ?? "",
      buttonActions: () => [
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("park");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `Continue`,
            next: "park",
          },
        ],
      },
    };
  }),

  room: defineScene("room", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      background: bgBedroom,
      text:
        `You go back to your room. The puffy yellow comforter on your bed looks inviting. {A nap sounds nice}.` +
        `^^A notebook sits on the little desk, a stiff chair next to it. Drawing utensils rest here. ` +
        `{Settle into the chair to make something}.` +
        `^^The empty bed and the blank page remind you of fresh snow, a bright day, the smell of morning mud, ` +
        `and afternoon heat. {Wait, I'm going to the park}.`,
      buttonActions: () => [
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("nap");
          },
        },
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("make-something");
          },
        },
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("park");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `A nap sounds nice`,
            next: "nap",
          },
          {
            text: `Settle into the chair and make something`,
            next: "make-something",
          },
          {
            text: `I'm going to the park`,
            next: "park",
          },
        ],
      },
    };
  }),

  nap: defineScene("nap", function (payload): Scene {
    return {
      id: this.id,
      background: bgBedroom,
      audio: homeSong,
      text: `You get over to your bed, pull up the sheets, slip in and nestle into the blankets.`,
      choices: () => [
        { text: "Close your eyes.", next: "dream" },
        {
          text: `Noooo!!! I'm not sleepy! I'd rather sit at my desk.`,
          next: "make-something",
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `Close your eyes`,
            next: "dream",
          },
          {
            text: `rather sit at my desk`,
            next: "make-something",
          },
        ],
      },
    };
  }),

  "make-something": defineScene("make-something", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      text:
        `You sit down at the desk and open to a fresh page of the pad.` +
        `^You look down onto the off-white paper. A void to fill. Dimensionless.` +
        `^The desire to form and create something in that void. It pulls you, amuses you, scares you. ` +
        `You feel like proving your stoicism, resisting the urge to make marks. {Go into the Void}.` +
        `^^You can feel the spirit rising in you, and the thrill of channeling that spirit! ` +
        `Feelings with no where to go are like idle hands...they animate. Or, no, do they become animate hands!? ` +
        `Nonononono! You pick up the paintbrush, smoosh some acrylic paint into the palette and {paint with your heart}.` +
        `^^{Nah, nevermind, I'm going to sleep}.`,
      background: bgBedroom,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("void");
          },
        },
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("paint");
          },
        },
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("nap");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `into the void`,
            next: "void",
          },
          {
            text: `paint with your heart`,
            next: "paint",
          },
          {
            text: `going to sleep`,
            next: "nap",
          },
        ],
      },
    };
  }),
};

// TODO: STORY - Shib hints at strange things they've noticed happening in the city,
// TODO: UI/UX - flag management when going forward and back

function getBookChoices(filter: string, nextScene: SceneId): Choice[] {
  const choices = [
    {
      text: `Harsh Mellow by Sherwan Milliams`,
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
          text: `You don't even like this book, but it reminds you of the person you were when you thought you'd like books like this. You can't get rid of it.`,
        });
      },
    },
    {
      text: `Don't Make Me Think by Paul Krugman`,
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
