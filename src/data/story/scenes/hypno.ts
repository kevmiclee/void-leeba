import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import bgMemespace from "@/assets/images/backgrounds/memespace.png";
import bgDressingRoom from "@/assets/images/backgrounds/dressing-room.png";
import { defineScene } from "../story";
import hypnoSong from "@/assets/audio/story/background-themes/ophelia.mp3";

//TODO: STORY - player has to recite their lines and earns stats/items/aspects/something for getting it right/wrong

const sectionId = "hypno";

export const hypnoScenes = {
  hypno: defineScene("hypno", function (payload): Scene {
    return {
      id: this.id,
      audio: hypnoSong,
      background: bgDressingRoom,
      text:
        `You had fallen asleep on some dream moss, but you open your eyes to find yourself in a dressing room ` +
        `with a script in your hands, {practicing lines for a play}.`,
      buttonActions: () => [
        {
          next: "hypno1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno1: defineScene("hypno1", function (payload): Scene {
    return {
      id: this.id,
      audio: hypnoSong,
      background: bgDressingRoom,
      text: `"What a good boy am I, so far from being an ant."^"What a good boy... am I! 
      So... <i>far</i> from being an ant!"^"What a good boy am I, so far... from <i>being</i> an ant."
      ^{...}`,
      buttonActions: () => [
        {
          next: "hypno2",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno2: defineScene("hypno2", function (payload): Scene {
    return {
      id: this.id,
      audio: hypnoSong,
      background: bgDressingRoom,
      text: `"Builder of the gods, put an orange-soda fountain in my bedroom!"^"Builder... 
      <i>of the gods</i>, put an orange-soda fountain in... <i>my bedroom</i>!"^"BUILDER OF THE GODS... 
      PUT AN ORANGE-SODA FOUNTAIN IN MY BEDROOM!"^{...}`,
      buttonActions: () => [
        {
          next: "hypno3",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno3: defineScene("hypno3", function (payload): Scene {
    return {
      id: this.id,
      audio: hypnoSong,
      background: bgDressingRoom,
      text: `"Where's my wife? I miss her."^"Where's my... <i>wife?</i> I miss her!"^"Where's 
      <i>my</i> wife? <i>I miiiiiss herrrrrrr</i>!!!"`,
      choices: () => [
        { text: "Keep practicing.", next: "hypno-practice" },
        { text: "Finish.", next: "hypno4" },
      ],
      metadata: { sectionId },
    };
  }),

  "hypno-practice": defineScene("hypno-practice", function (payload): Scene {
    return {
      id: this.id,
      audio: hypnoSong,
      background: bgDressingRoom,
      text:
        `"Indras before me? What are you talking about?"^"Indras...<i>before</i>...<i>me</i>? ` +
        `What... are you talking about!"` +
        `^"Indras before... <i>me</i>? What are you <i>talking</i> about?"`,
      choices: () => [
        { text: "Keep practicing.", next: "hypno-practice1" },
        { text: "Finish.", next: "hypno4" },
      ],
      metadata: { sectionId },
    };
  }),

  "hypno-practice1": defineScene("hypno-practice1", function (payload): Scene {
    return {
      id: this.id,
      audio: hypnoSong,
      background: bgDressingRoom,
      text: `"I ask. Teach."^"I...<i>ask</i>. <i>Teach</i>."^"I ASK. TEEEEEAAAACH!!!"`,

      choices: () => [
        {
          text: "Finish.",
          next: "hypno4",
          aspect: "well-versed",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno4: defineScene("hypno4", function (payload): Scene {
    return {
      id: this.id,
      background: bgDressingRoom,
      audio: hypnoSong,
      text:
        `You hear one knock at the door before it swings open. A large fellow bustles in importantly, ` +
        `his smile entreating you.^^With a gusto that feels suspiciously contrived, he addresses you.`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text: `You're not ready? Don't worry, you'll be fine. <i>The show must go on</i>!`,
        },
      ],
      choices: () => [
        {
          text: `"I don't think I'm cut out for this."`,
          next: "hypno5",
        },
        {
          text: `"I need more time to go over my lines!"`,
          next: "hypno-practice",
        },
        {
          text: `"I got this!"`,
          next: "hypno5",
          payload: { filter: "confident" },
          stats: [{ id: "will", amount: 1 }],
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno5: defineScene("hypno5", function (payload): Scene {
    return {
      id: this.id,
      background: bgDressingRoom,
      audio: hypnoSong,
      text: ``,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text: `${
            payload?.filter == "confident"
              ? `Great, great. They're waiting for you out there.`
              : `Don't be ridiculous. Your part doesn't even have any lines.`
          } Quickly, put this on.`,
          next: "hypno6",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno6: defineScene("hypno6", function (payload): Scene {
    return {
      id: this.id,
      background: bgDressingRoom,
      audio: hypnoSong,
      text:
        `He shoves a costume at you and turns away with a huff. You feel obliged to put it on quickly. ` +
        `No sooner than your head slips through the top of the costume is the large man ushering you out ` +
        `the door. You barely catch a glimpse of yourself in the dressing room mirror.^^You're a... {keg}?`,
      buttonActions: () => [
        {
          next: "hypno7",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno7: defineScene("hypno7", function (payload): Scene {
    return {
      id: this.id,
      background: bgMemespace,
      audio: hypnoSong,
      text:
        `You walk out onto a steel catwalk. You see an infinite maze of these catwalks in every direction, ` +
        `and figures in an endless array of wild and impossbile costumes of all shapes and sizes.`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text: `Busy, busy! Memespace is bumpin tonight! That's why we had to bring in you eh... erm.. <i>amateurs</i>.`,
          next: "hypno8",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno8: defineScene("hypno8", function (payload): Scene {
    return {
      id: this.id,
      background: bgMemespace,
      audio: hypnoSong,
      text:
        `He says <i>amateur</i> like he is trying to pronounce it in the language from which ` +
        `the word is originally derived, without actually knowing which language.`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text:
            `Here we are! Stage 2B, Leak Party. I'll let you take it from here. Break a leg! ` +
            `Figuratively, of course. If you were to actually break your leg... I knew we were forgetting something! ` +
            `The liability waiver, I have it here somewhere.`,
          next: "hypno9",
        },
      ],
      metadata: { sectionId },
    };
  }),

  hypno9: defineScene("hypno9", function (payload): Scene {
    return {
      id: this.id,
      background: bgMemespace,
      audio: hypnoSong,
      text:
        `He pats his pockets and looks around beseechingly, presumably for someone to blame. ` +
        `A mechanical voice drawls from inside Stage 2B, "They're ready for you, boss."`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text:
            `No matter! It will have to do. <i>The show must go on!</i> But absolutely NO leg breaking, ` +
            `or any bones while we're on the subject.`,
        },
      ],
      choices: () => [
        {
          text: `"I'm not doing this!" Will yourself awake.`,
          next: "hypno-ready-check",
        },
        {
          text: `"I'm ready."`,
          next: "hypno-ready",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "hypno-ready-check": defineScene(
    "hypno-ready-check",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgMemespace,
        audio: hypnoSong,
        text: ``,
        dialogSequence: () => [
          {
            characterId: "buzz",
            text: `But <i>the show must go on</i>!`,
          },
        ],
        choices: () => [
          {
            text: `"I said no."`,
            next: "dream1",
            payload: { filter: "nap" },
            flags: [{ id: "did-nap", value: true }],
          },
          {
            text: `"You're right. <i>The show must go on</i>!"`,
            next: "hypno-ready",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "hypno-ready": defineScene("hypno-ready", function (payload): Scene {
    return {
      id: this.id,
      background: bgMemespace,
      audio: hypnoSong,
      text: ``,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text: "Great! I knew you were right for the job. Now remember everything I taught you.",
          next: "hypno-ready1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "hypno-ready1": defineScene("hypno-ready1", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      audio: hypnoSong,
      text:
        `With that, the stage door shuts.^^It's dark, and doesn't really seem like a stage at all. ` +
        `As your eyes adjust and the scene takes shape, it seems eerily similar to the forest from your original dream.` +
        `^^You hear voices approaching. Quick! {Act like a keg!}`,
      buttonActions: () => [
        {
          next: "party-keg",
        },
      ],
      metadata: { sectionId },
    };
  }),
};
