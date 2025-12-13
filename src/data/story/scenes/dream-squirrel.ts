import { Scene } from "@/types/story";
import bgForest from "@/assets/images/backgrounds/pine-forest.png";
import bgTrees from "@/assets/images/backgrounds/in-the-trees.png";
import fallingOutOfTreeSound from "@/assets/audio/story/sounds/falling-out-of-tree.mp3";
import { useCharacterStore } from "@/stores/character";
import { getFollowSquirrelText } from "../helper-functions/text-helper-functions";
import { defineScene } from "../story";
import { useAudioStore } from "@/stores/audio";

//TODO: MUSIC - squirrel

const sectionId = "dream-squirrel";

export const dreamSquirrelScenes = {
  "dream-squirrel": defineScene("dream-squirrel", function (payload): Scene {
    return {
      id: this.id,
      background: bgTrees,
      text: `You lock in on a squirrel. Its brown body is a corkscrew streak around the trunk. {It's time to give chase}.`,
      buttonActions: () => [
        {
          next: "dream-squirrel0",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel0": defineScene("dream-squirrel0", function (payload): Scene {
    return {
      id: this.id,
      background: bgTrees,
      text: `You straddle the trunk, feeling the roughness of the bark tugging at your turtleneck as you shimmy up. 
        {Just a little closer...} `,
      buttonActions: () => [
        {
          next: "dream-squirrel1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel1": defineScene("dream-squirrel1", function (payload): Scene {
    return {
      id: this.id,
      background: bgTrees,
      text: `The squirrel is right there! Its little face, filled with alarm (or is it amusement?), fills you with determination.`,
      choices: () => [
        { text: "Reach for the closest branch.", next: "dream-squirrel1a" },
        {
          text: "Keep shimmying up.",
          next: "dream-squirrel1b",
          stats: [{ id: "athletics", amount: 1 }],
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel1a": defineScene(
    "dream-squirrel1a",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgTrees,
        text:
          `You reach for a nearby branch. It breaks, but your thighs remain firmly clenched on the trunk. ` +
          `{Keep shimmying up}.`,
        buttonActions: () => [
          {
            next: "dream-squirrel1b",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "dream-squirrel1b": defineScene(
    "dream-squirrel1b",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgTrees,
        text: `You keep shimmying up the trunk, past the first branch. Your arms and legs are giving out. 
          The squirrel hasn't moved. The way it watches you, vacillating between tepid curiosity and 
          utter indifference, suggests the thought of you as a threat could not be further from its mind.`,
        choices: () => [
          {
            text: "Push yourself even harder.",
            next: "dream-squirrel2",
            stats: [{ id: "will", amount: 1 }],
          },
          {
            text: "This was a bad idea. Shimmy back down before you get hurt.",
            next: "dream-squirrel-give-up",
            stats: [{ id: "will", amount: 1, isLost: true }],
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "dream-squirrel2": defineScene("dream-squirrel2", function (payload): Scene {
    return {
      id: this.id,
      background: bgTrees,
      text: `Atta boy! Quitters never win. Your brow is wet with dream sweat. Your hands and limbs are 
        all scraped up from climbing. You feel sappy bits on your clothes and face. The squirrel comes 
        a little closer to you.^^Your muscles start to tremble. The squirrel gets up in your grill.`,
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Putoat! Putoat!",
          next: "dream-squirrel3",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel3": defineScene("dream-squirrel3", function (payload): Scene {
    return {
      id: this.id,
      background: bgTrees,
      text:
        `The little vermin is taunting you!` +
        `^^In a last ditch effort, you dart your hand out to {snatch the furball}.`,
      buttonActions: () => [
        {
          next: "dream-squirrel-game",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel-game": defineScene(
    "dream-squirrel-game",
    function (payload): Scene {
      return {
        id: this.id,
        text: "",
        miniGameId: "squirrel",
        metadata: {
          sectionId,
          routes: [
            {
              text: `win`,
              next: "dream-squirrel4-success",
            },
            {
              text: `lose`,
              next: "dream-squirrel4-fail",
            },
          ],
        },
      };
    }
  ),

  "dream-squirrel4-success": defineScene(
    "dream-squirrel4-success",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgTrees,
        text: payload?.text ?? "",
        dialogSequence: () => [
          {
            characterId: "squirrel",
            text: "Puolue! Puolue!",
            next: "dream-squirrel5",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "dream-squirrel4-fail": defineScene(
    "dream-squirrel4-fail",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgTrees,
        text: payload?.text ?? "",
        buttonActions: () => [
          {
            item: "pinecone",
          },
        ],
        dialogSequence: () => [
          {
            characterId: "squirrel",
            text: "Puolue! Puolue!",
            next: "dream-squirrel5",
          },
        ],
        onPageLoad: () => {
          const audioStore = useAudioStore();
          audioStore.playGenericSound(fallingOutOfTreeSound);
        },
        metadata: { sectionId },
      };
    }
  ),

  "dream-squirrel5": defineScene("dream-squirrel5", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      text:
        `As you follow the squirrel, it is obvious the creature is very excited about something. ` +
        `You faintly hear what might be voices in unison like a sing-song chant, growing louder as you progress. ` +
        `This must be where the squirrel is leading you.`,
      choices: () => [
        {
          text: `"Where are we going?"`,
          next: "dream-squirrel6",
          payload: { filter: "where" },
          manners: [{ id: "polite", amount: 1 }],
        },
        {
          text: `"What is that infernal chanting?"`,
          next: "dream-squirrel6",
          payload: { filter: "what" },
          manners: [{ id: "depressing", amount: 1 }],
        },
        {
          text: `"Are we there yet?"`,
          next: "dream-squirrel6",
          payload: { filter: "what" },
          manners: [{ id: "rude", amount: 1 }],
          stats: [{ id: "shitheadedness", amount: 1 }],
        },
        {
          text: `Why am I following a squirrel?`,
          next: "dream-squirrel6",
          payload: { filter: "why" },
          manners: [{ id: "weird", amount: 1 }],
        },
        {
          text: `Don't speak. Don't think. Just follow.`,
          next: "dream-squirrel6",
          manners: [{ id: "polite", amount: 1 }],
          stats: [
            { id: "blueMagic", amount: 1 },
            { id: "will", amount: 1 },
          ],
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel6": defineScene("dream-squirrel6", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      text:
        getFollowSquirrelText(payload?.filter) +
        ` All the while the chanting is growing louder. You're sure it's voices now. ` +
        `It sounds like they are chanting, "We're going to a party! We're going to a party!" ` +
        `From time to time, the squirrel turns around, egging you on.`,
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Puolue! Puolue!",
          next: "dream-squirrel7",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel7": defineScene("dream-squirrel7", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      text:
        `You arrive at a clearing. The {pine faeries} you saw earlier are all laying about on the ground, ` +
        `apparently unconscious.^^The squirrel is darting here and there, sniffing the hongatar and chittering ` +
        `excitedly.`,
      buttonActions: () => [
        {
          dictionaryEntryId: "hongatar",
        },
      ],
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Puolue! Puolue!",
          next: "dream-squirrel8",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel8": defineScene("dream-squirrel8", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      text:
        `The squirrel finds an eggcorn and begins to nibble it. Suddenly, its whiskers twitch a ` +
        `few times and it swoons until it falls to ground unconcsious, just like the hongatar.`,
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Pu...o..lue.... Puo.....",
        },
      ],
      choices: () => [
        {
          text: "Inspect the hongatar.",
          next: "dream-squirrel9",
          payload: { filter: "hongatar" },
        },
        { text: "Inspect the squirrel.", next: "dream-squirrel9" },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel9": defineScene("dream-squirrel9", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      text:
        `${
          payload?.filter == "hongatar"
            ? `Yep. They're definitely unconscious, but they're breathing regularly.`
            : `Poor little fella. It's actually snoring softly with eggcorn crumbs on its furry chest.`
        } ` +
        `You notice eggcorns scattered about near where all the hongatar lay, just like the one you ` +
        `saw the squirrel eat. You see an uneaten one by your foot. {Inspect the eggcorn.}`,
      buttonActions: () => [
        {
          next: "dream-squirrel10",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-squirrel10": defineScene(
    "dream-squirrel10",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `The eggcorn's skin is a luscious, lacquered brown. ` +
          `It has a neat little cap and a fine pointy bottom. In fact, you've never found an eggcorn to be so... ` +
          `tantalizing. Definitely something odd about these eggcorns.`,
        choices: () => [
          {
            text: "YOLO! Eat the eggcorn.",
            next: `party-eggcorn`,
            payload: { filter: "squirrel" },
          },
          {
            text: "On second thought...",
            next: "party-eggcorn-check",
            payload: { filter: "squirrel" },
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "dream-squirrel-give-up": defineScene(
    "dream-squirrel-give-up",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `The squirrel is right. You could never expect to be compete with its arboreal superiority. ` +
          `Better to slide back down the tree before you get hurt.`,
        dialogSequence: () => [
          {
            characterId: "squirrel",
            text: "Putoat! Putoat!",
            next: "dream-squirrel-give-up1",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "dream-squirrel-give-up1": defineScene(
    "dream-squirrel-give-up1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text: `Dang squirrel! It's becoming aggressive, jumping on and off your head and yanking your hair.`,

        dialogSequence: () => [
          {
            characterId: "squirrel",
            text: "PUTOAT! PUTOAT!",
            next: "dream-tree-chase",
            filter: "squirrel",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),
};
