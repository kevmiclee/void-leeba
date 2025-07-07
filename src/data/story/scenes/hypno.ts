import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useAspectStore } from "@/stores/aspects";
import { lifeOfTheParty, wellVersed } from "@/data/aspects";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { defineScene } from "../story";

//TODO: MUSIC - hypno music

//TODO: player has to recite their lines and earns stats/items/aspects/something for getting it right/wrong

export const hypnoScenes = {
  hypno: defineScene("hypno", function (payload): Scene {
    return {
      id: this.id,
      text:
        `You had fallen asleep on some dream moss, but you open your eyes to find yourself in a dressing room ` +
        `with a script in your hands, practicing lines for a play:` +
        `^^"What a good boy am I, so far from being an ant."^"What a good boy... am I! So... <i>far</i> from being an ant!"` +
        `^"What a good boy am I, so far... from <i>being</i> an ant."^...` +
        `^"Builder of the gods, put an orange-soda fountain in my bedroom!"` +
        `^"Builder... <i>of the gods</i>, put an orange-soda fountain in... <i>my bedroom</i>!"` +
        `^"BUILDER OF THE GODS... PUT AN ORANGE-SODA FOUNTAIN IN MY BEDROOM!"^...` +
        `^"Where's my wife? I miss her."^"Where's my... <i>wife?</i> I miss her!"` +
        `^"Where's <i>my</i> wife? <i>I miiiiiss herrrrrrr</i>!!!"`,
      background: bgDefault,
      choices: () => [
        { text: "Keep practicing.", next: "hypno-practice" },
        { text: "Finish.", next: "hypno1" },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [
          { label: "Keep practicing.", redirect: "hypno-practice" },
          { label: "Finish.", redirect: "hypno1" },
        ],
      },
    };
  }),

  "hypno-practice": defineScene("hypno-practice", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `"Indras before me? What are you talking about?"^"Indras...<i>before</i>...<i>me</i>? ` +
        `What... are you talking about!"` +
        `^"Indras before... <i>me</i>? What are you <i>talking</i> about?"`,
      choices: () => [
        { text: "Keep practicing.", next: "hypno-practice1" },
        { text: "Finish.", next: "hypno1" },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [
          { label: "Keep practicing.", redirect: "hypno-practice1" },
          { label: "Finish.", redirect: "hypno1" },
        ],
      },
    };
  }),

  "hypno-practice1": defineScene("hypno-practice1", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text: `"I ask. Teach."^"I...<i>ask</i>. <i>Teach</i>."^"I ASK. TEEEEEAAAACH!!!"`,

      choices: () => [
        {
          text: "Finish.",
          next: "hypno1",
          onChoose: () => {
            const aspects = useAspectStore();
            aspects.addAspect(wellVersed);
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [{ label: "Finish.", redirect: "hypno1", aspect: wellVersed }],
      },
    };
  }),

  hypno1: defineScene("hypno1", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
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
          next: "hypno2",
        },
        {
          text: `"I need more time to go over my lines!"`,
          next: "hypno-practice",
        },
        {
          text: `"I got this!"`,
          next: "hypno2",
          payload: { filter: "confident" },
          onChoose: () => {
            const character = useCharacterStore();
            character.gainStat("will", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [
          {
            label: `"I don't think I'm cut out for this."`,
            redirect: "hypno2",
          },
          {
            label: `"I need more time to go over my lines!"`,
            redirect: "hypno-practice",
          },
          {
            label: `"I got this!"`,
            redirect: "hypno2",
            stat: {
              id: "will",
              amount: 1,
            },
          },
        ],
      },
    };
  }),

  hypno2: defineScene("hypno2", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text: ``,

      dialogSequence: () => [
        {
          characterId: "buzz",
          text: `${
            payload?.filter == "confident"
              ? `Great, great. They're waiting for you out there.`
              : `Don't be ridiculous. Your part doesn't even have any lines.`
          } Quickly, put this on.`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("hypno3");
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [{ label: "buzz dialog click.", redirect: "hypno3" }],
      },
    };
  }),

  hypno3: defineScene("hypno3", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `He shoves a costume at you and turns away with a huff. You feel obliged to put it on quickly. ` +
        `No sooner than your head slips through the top of the costume is the large man ushering you out ` +
        `the door. You barely catch a glimpse of yourself in the dressing room mirror.^^You're a... {keg}?`,
      buttonActions: [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("hypno4");
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [{ label: "keg", redirect: "hypno4" }],
      },
    };
  }),

  hypno4: defineScene("hypno4", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `You walk out onto a steel catwalk. You see an infinite maze of these catwalks in every direction, ` +
        `and figures in an endless array of wild and impossbile costumes of all shapes and sizes.`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text: `Busy, busy! Memespace is bumpin tonight! That's why we had to bring in you eh... erm.. <i>amateurs</i>.`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("hypno5");
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [{ label: "buzz dialog click.", redirect: "hypno5" }],
      },
    };
  }),

  hypno5: defineScene("hypno5", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `He says <i>amateur</i> like he is trying to pronounce it in the language from which ` +
        `the word is originally derived, without actually knowing which language.`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text:
            `Here we are! Stage 2B, Leak Party. I'll let you take it from here. Break a leg! ` +
            `Figuratively, of course. If you were to actually break your leg... I knew we were forgetting something! ` +
            `The waiver, I have it here somewhere.`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("hypno6");
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [{ label: "buzz dialog click.", redirect: "hypno6" }],
      },
    };
  }),

  hypno6: defineScene("hypno6", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `He pats his pockets and looks around beseechingly, presumably for someone to blame. ` +
        `A mechanical voice drawls from inside Stage 2B, "They're ready for you, boss."`,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text:
            `No matter! It will have to do. \`The show must go on!\` But absolutely NO leg breaking, ` +
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
      metadata: {
        sectionId: "hypno",
        routes: [
          {
            label: "I'm not doing this! Will yourself awake",
            redirect: "hypno-ready-check",
          },
          { label: "I'm ready", redirect: "hypno-ready" },
        ],
      },
    };
  }),

  "hypno-ready-check": defineScene(
    "hypno-ready-check",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
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
          },
          {
            text: `"You're right. <i>The show must go on</i>!"`,
            next: "hypno-ready",
          },
        ],
        metadata: {
          sectionId: "hypno",
          routes: [
            { label: "I said no", redirect: "dream1" },
            {
              label: "You're right. <i>The show must go on</i>!",
              redirect: "hypno-ready",
            },
          ],
        },
      };
    }
  ),

  "hypno-ready": defineScene("hypno-ready", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text: ``,
      dialogSequence: () => [
        {
          characterId: "buzz",
          text: "Great! I knew you were right for the job. Now remember everything I taught you.",
          onClick: () => {
            const game = useGameStore();
            game.goToScene("hypno-ready1");
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [{ label: "buzz dialog click", redirect: "hypno-ready1" }],
      },
    };
  }),

  "hypno-ready1": defineScene("hypno-ready1", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `With that, the stage door shuts.^^It's dark, and doesn't really seem like a stage at all. ` +
        `As your eyes adjust and the scene takes shape, it seems eerily similar to the forest from your original dream.` +
        `^^You hear voices approaching. Quick! {Act like a keg!}`,
      buttonActions: [
        {
          action: () => {
            const game = useGameStore();
            const aspects = useAspectStore();
            aspects.addAspect(lifeOfTheParty);
            game.goToScene("party-keg");
          },
        },
      ],
      metadata: {
        sectionId: "hypno",
        routes: [
          {
            label: "Act like a keg",
            redirect: "party-keg",
            aspect: lifeOfTheParty,
          },
        ],
      },
    };
  }),
};
