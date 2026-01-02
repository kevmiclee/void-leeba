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
import { useAudioStore } from "@/stores/audio";

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
            text: `Hey, ${playerName}! Would you come help me? There is a Time Fly on my windowsill. You said you 
            would take care of them for me, right?`,
            onClick: () => {
              const audioStore = useAudioStore();
              audioStore.fadeOutTrack();
            },
          },
          {
            characterId: "shib",
            text: `Now's your time to shine!`,
            next: "bedroom1",
          },
        ];
      },
      metadata: { sectionId },
    };
  }),

  bedroom1: defineScene("bedroom1", function (payload): Scene {
    return {
      id: this.id,
      text: `It's your flatmate, Shib. You promised you would help Shib with his temporomuscaphobia by destroying 
      any timeflies from the apartment. The best remedy for timeflies is to feed them books.^^Pick a throw-away to 
      feed to Shib's timefly intruder.`,
      audio: homeSong,
      background: bgBedroom,
      dialogSequence: () => [
        {
          characterId: "shib",
          text: `Buddy ole boy, I am barely holding it together. If you could make haste, we can go back to living our lives.`,
        },
      ],
      choices: () => {
        return getBookChoices("", "bedroom2");
      },
      metadata: {
        sectionId,
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
        sectionId,
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
        sectionId,
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
        sectionId,
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
        text: "You leave your room. Shib is waiting outside.",
        audio: homeSong,
        background: bgLivingRoom,
        dialogSequence: () => [
          {
            characterId: "shib",
            text: `Okay, thank you so much. I am totally out of books.`,
            next: "bedroom-time-fly1",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "bedroom-time-fly1": defineScene(
    "bedroom-time-fly1",
    function (payload): Scene {
      return {
        id: this.id,
        text: `You slide into Shib's room and close the door. The timefly sits on the windowsill, preening.^^{You set the book down next to the insect}.`,
        audio: homeSong,
        background: bgTimeFly,
        buttonActions: () => [
          {
            next: "bedroom-time-fly2",
          },
        ],
        metadata: { sectionId },
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
        //TODO: catch the timefly mini game
        buttonActions: () => [
          {
            next: "bedroom-time-fly3",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "bedroom-time-fly3": defineScene(
    "bedroom-time-fly3",
    function (payload): Scene {
      return {
        id: this.id,
        text: `You swoop a Bell jar over the timefly and scoot a piece of paper under the whole thing. Now you...`,
        audio: homeSong,
        background: bgWindowsill,
        choices: () => [
          {
            text: `Bring it to your your room to add to your collection.`,
            next: "bedroom-time-fly4",
            manners: [{ id: "weird", amount: 1 }],
            flags: [{ id: "time-fly-choice", value: "keep" }],
            items: [{ id: "time-fly", amount: 1 }],
          },
          {
            text: `Let it out the window.`,
            next: "bedroom-time-fly4",
            manners: [{ id: "polite", amount: 1 }],
            flags: [{ id: "time-fly-choice", value: "free" }],
          },
          {
            text: `Kill it.`,
            next: "bedroom-time-fly4",
            manners: [{ id: "rude", amount: 1 }],
            flags: [{ id: "time-fly-choice", value: "kill" }],
          },
        ],
        metadata: { sectionId },
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
            next: "bedroom-time-fly5",
          },
        ],
        metadata: { sectionId },
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
              text: `${shibSequenceCount > 0 ? `You're not listening! ` : ""}So, you gotta just kill them, you do that for me right? You said once that you like to
            capture them and let them go. But while you're living with me, you won't, right? Cause they are going to
            come right back in, dude. I am a timefly magnet.`,
              onClick: () => {
                const game = useGameStore();
                // game.setPersistAvatar(true);
              },
            },
            {
              characterId: "shib",
              text: `They'll just home right back in
            on me...they smell my fear, it attracts more
            timeflies to me.`,
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
                  next: "bedroom-time-fly5",
                  stats: [{ id: "shitheadedness", amount: 1 }],
                  flags: [{ id: "shib-sequence-count", value: 1 }],
                },
                {
                  text: `<i>Flex your muscles.</i> "Those scum are no match for me!"`,
                  next: "bedroom-time-fly5",
                  stats: [{ id: "blueMagic", amount: 1 }],
                  flags: [{ id: "shib-sequence-count", value: 1 }],
                },
                {
                  text: getShibHonestAnswer(timeFlyChoice),
                  next: "bedroom-time-fly5",
                  stats: [{ id: "will", amount: 1 }],
                  flags: [{ id: "shib-sequence-count", value: 1 }],
                },
                {
                  text: `"Glad to be of service."`,
                  next: "bedroom-time-fly5",
                  stats: [{ id: "athletics", amount: 1 }],
                  flags: [{ id: "shib-sequence-count", value: 1 }],
                },
              ]
            : [
                {
                  text: `Try to reason with him. "Relax, don't worry."`,
                  next: "bedroom-time-fly5",
                  flags: [
                    { id: "shib-sequence-count", value: shibSequenceCount + 1 },
                  ],
                },
                {
                  text: `Look at your Drip.`,
                  drawerView: "main",
                  next: "bedroom-time-fly6",
                },
              ];
        },
        metadata: {
          sectionId,
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
              text: `${character.name}, if you're just gonna ignore me and look at your Drip, I'm gonna get really mad.`,
            },
            {
              characterId: "shib",
              text: `Even if you think something is insignificant, ${character.name}, you could still be empathetic when others are upset.`,
            },
          ];
        },
        choices: () => [
          {
            text: `"Um..."`,
            next: "bedroom-time-fly7",
          },
          {
            text: `"I'm sorry. I'll try harder."`,
            next: "bedroom-time-fly7",
          },
          {
            text: `"<i>Stop. We're roommates, not friends. Don't tell me what to do.</i>"`,
            next: "bedroom-time-fly7",
          },
        ],
        metadata: { sectionId },
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
        dialogSequence: () => [
          {
            characterId: "shib",
            text: `I have enough to worry about with everything going on in the news. Have you seen what's happening 
            with the CDC? It's an absolute BOUILLABAISSE!`,
          },
          {
            characterId: "shib",
            text: `SHIT! OH SHIT, look at the time!! I gotta fly. Cya.`,
            next: "bedroom5",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  bedroom5: defineScene("bedroom5", function (payload): Scene {
    return {
      id: this.id,
      text: `Shib leaves. What will you do? You could go out and explore. Also, no one is home. 
      You might enjoy some quiet time here.`,
      audio: homeSong,
      background: bgLivingRoom,
      choices: () => [
        {
          text: "Go out and explore.",
          next: "home2",
        },
        {
          text: "Enjoy some quiet time here.",
          next: "room",
        },
      ],
      metadata: { sectionId },
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
          stats: [{ id: "athletics", amount: 1 }],
          items: [{ id: "dog-food", amount: 1 }],
        },
        {
          text: "Playing cards",
          next: "home3",
          payload: {
            text: "Maybe someone will want to play. {Continue.}",
          },
          stats: [{ id: "blueMagic", amount: 1 }],
          items: [{ id: "cards", amount: 1 }],
        },
        {
          text: "Orange spray paint",
          next: "home3",
          payload: {
            text: "Maybe you'll spray paint something. {Continue.}",
          },
          stats: [{ id: "shitheadedness", amount: 1 }],
          items: [{ id: "spray-paint", amount: 1 }],
        },
        {
          text: "Translator",
          next: "home3",
          payload: {
            text: "Maybe you'll encounter a language you can't comprehend. {Continue.}",
          },
          stats: [{ id: "blueMagic", amount: 1 }],
          items: [{ id: "translator", amount: 1 }],
        },
        {
          text: "Nothing",
          next: "home3",
          payload: {
            text: "Maybe you won't need anything. {Continue.}",
          },
          stats: [{ id: "will", amount: 1 }],
          aspect: "ascetic",
        },
      ],
      metadata: { sectionId },
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
          next: "park",
        },
      ],
      metadata: { sectionId },
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
          next: "nap",
        },
        {
          next: "make-something",
        },
        {
          next: "park",
        },
      ],
      metadata: { sectionId },
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
      metadata: { sectionId },
    };
  }),

  "make-something": defineScene("make-something", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,

      text: `You sit down at the desk and open to a fresh page of the pad. You look down onto the off-white paper. 
        A void to fill. Dimensionless. The desire to form and create something in that void. {It pulls you, amuses you, scares you}.`,
      background: bgBedroom,
      buttonActions: () => [
        {
          next: "make-something1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "make-something1": defineScene("make-something1", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      text:
        `You feel like proving your stoicism, resisting the urge to make marks. But you can also feel the spirit 
        rising in you, and the thrill of channeling that spirit! Feelings with no where to go are like idle hands...
        they animate. Or, no, do they become animate hands!? ` +
        `.` +
        `^^{Nah, nevermind, I'm going to sleep}.`,
      background: bgBedroom,
      choices: () => [
        { text: "Go into the Void.", next: "void" },
        {
          text: `Nonononono! Pick up the paintbrush, smoosh some acrylic paint into the palette and paint with your heart.`,
          next: "paint",
        },
        { text: `Nah, nevermind. I'm going to sleep.`, next: "nap" },
      ],
      metadata: { sectionId },
    };
  }),
};

// TODO: STORY - Shib hints at strange things they've noticed happening in the city,
// TODO: UI/UX - flag management when going forward and back

function getBookChoices(filter: string, nextScene: SceneId): Choice[] {
  const choices: Choice[] = [
    {
      text: `Harsh Mellow by Sherwan Milliams`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(true);
      },
      next: nextScene,
      payload: {
        filter: `${filter},0`,
        text: `You've had this book for years and haven't read it, but you will. Someday. You can't get rid of it.`,
      },
    },
    {
      text: `Shift by Aaron Thom`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(true);
      },
      next: nextScene,
      payload: {
        filter: `${filter},1`,
        text: `You don't even like this book, but it reminds you of the person you were when you thought you'd like books like this. You can't get rid of it.`,
      },
    },
    {
      text: `Don't Make Me Think by Paul Krugman`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(false);
      },
      next: "bedroom-time-fly",
      payload: {
        filter: `${filter},2`,
        text: `That should work.`,
      },
    },
    {
      text: `The Inkwell by Jody Rowsky`,
      onChoose: () => {
        const game = useGameStore();
        game.setPersistAvatar(true);
      },
      next: nextScene,
      payload: {
        filter: `${filter},3`,
        text: `Your ex gave you this one. You can't get rid of it because that feels like losing the breakup.`,
      },
    },
  ];

  const indicesToRemove = filter
    ?.split(",")
    .map((str) => parseInt(str.trim()))
    .filter((num) => num !== 2 && !isNaN(num));

  const filteredChoices = choices.filter(
    (_, index) => !indicesToRemove.includes(index)
  );

  return filteredChoices;
}
