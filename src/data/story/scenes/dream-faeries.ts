import { Choice, Scene } from "@/types/story";
import bgForest from "@/assets/images/backgrounds/pine-forest.png";
import faeriesSong from "@/assets/audio/story/background-themes/faeries.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { getNapFaeries2Text } from "../helper-functions/text-helper-functions";
import { defineScene } from "../story";
import { useDictionaryStore } from "@/stores/dictionary";

const sectionId = "dream-faeries";

export const dreamFaeriesScenes = {
  "dream-faeries": defineScene("dream-faeries", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text:
        `You follow after the {hongatar}. They all have the same dutch boy haircut and cro-magnon facial features. ` +
        `The wings look like fly's wings. The pack flies through the air, leaving rapidly fading trails of light in their wake. ` +
        `They seem to be eating small snails, and then casting their shells to the forest floor.` +
        `^^{Pick up a handful of hongatar trash.}` +
        `^^The faeries are excitedly chattering amongst themselves.`,
      buttonActions: () => [
        {
          dictionaryEntryId: "hongatar",
        },
        {
          item: "hongatar-trash",
        },
      ],
      dialogSequence: () => [
        {
          characterId: "faerie1",
          text: `Mun muru, if you're with me, I can endure any frat party without crying.`,
        },
        {
          characterId: "faerie2",
          text: `Aww kullannuppu, that's so sweet. Are you gonna do a Keg stand this time?`,
        },
        {
          characterId: "faerie1",
          text: `Muru, I would do it, but I would have to cry first.`,
        },
        {
          characterId: "faerie3",
          text: `Hey funny faces, let's see if the Keg can do an us-stand!`,
        },
        {
          characterId: "faerie2",
          text: `Söpöt pikku puput, a thingy is following us.`,
          next: "dream-faeries1",
        },
      ],
      onPageLoad: () => {
        const dict = useDictionaryStore();
        dict.addEntry("hongatar");
      },
      metadata: { sectionId },
    };
  }),

  "dream-faeries1": defineScene("dream-faeries1", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text: "The group of {hongatar} turn to look at you.",
      buttonActions: () => [
        {
          dictionaryEntryId: "hongatar",
        },
      ],
      choices: () => [
        {
          text: 'Bow graciously. "Thanks for spitting in my nostril holes."',
          next: "dream-faeries2",
          payload: { filter: "bow" },
          aspect: "magic-nosehairs",
        },
        {
          text: "Get on their case about littering.",
          next: "dream-faeries-litter",
        },
        {
          text: `There's that squirrel again! Try to catch it.`,
          next: "dream-squirrel",
          stats: [{ id: "athletics", amount: 1 }],
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-faeries2": defineScene("dream-faeries2", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text:
        `${getNapFaeries2Text(payload?.filter)} ` +
        `Their excited chattering finds a rhythmic unison in a sing-song chant.`,
      buttonActions: () => [
        {
          dictionaryEntryId: "hongatar",
        },
      ],
      dialogSequence: () => [
        { characterId: "faerie1", text: `We're going to a party!` },
        { characterId: "faerie2", text: `We're going to a party!` },
        { characterId: "faerie1", text: `We want to sing and drink and eat!` },
        { characterId: "faerie3", text: `A party is the thing we need!` },
        { characterId: "faerie2", text: `Heed the call!` },
        { characterId: "faerie1", text: `Come one, come all!` },
        { characterId: "faerie3", text: `We're going to a party!` },
        {
          characterId: "faerie1",
          text: `We're going to a party!`,
          next: "dream-faeries3",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-faeries3": defineScene("dream-faeries3", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text: `The {hongatar} with the coolest outfit addresses you.`,
      buttonActions: () => [
        {
          dictionaryEntryId: "hongatar",
        },
      ],
      dialogSequence: () => [
        {
          characterId: "faerie2",
          text:
            `Wow, a human that understands Faerie etiquette, how amusing, how rare! What a find! ` +
            `Will you join us? We are headed to a Leak Party.`,
          popUp: true,
        },
      ],
      choices: () => [
        {
          text: `"Um..."`,
          next: "dream-faeries-party-check",
        },
        {
          text: `"PARTY!!!"`,
          next: "dream-faeries4",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-faeries4": defineScene("dream-faeries4", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text:
        `You follow them into a clearing where the hongatar with the dullest outfit starts ` +
        `handing out eggcorns. He hands you one.`,
      dialogSequence: () => [
        {
          characterId: "faerie3",
          text: `See you soon raccoon!`,
          next: "dream-faeries5",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-faeries5": defineScene("dream-faeries5", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text: `The eggcorn's skin is a luscious, lacquered brown. It has a neat little cap and a fine pointy bottom. 
        In fact, you've never found an eggcorn to be so...tantalizing. Definitely something odd about these eggcorns. 
        You notice that after eating an eggcorn, the hongatar fall to the ground unconscious. Soon you're the only 
        one left standing.`,
      choices: () => [
        { text: "YOLO! Eat the eggcorn.", next: `party-eggcorn` },
        { text: "On second thought...", next: "party-eggcorn-check" },
      ],
      metadata: { sectionId },
    };
  }),

  "dream-faeries-litter": defineScene(
    "dream-faeries-litter",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: "",
        dialogSequence: () => [
          {
            characterId: "faerie1",
            text: `What? Pölkkypää! Everyone knows hongatar don't litter.`,
            popUp: true,
          },
        ],
        choices: () => {
          const character = useCharacterStore();

          const choices: Choice[] = [
            {
              text: `"Oh I see, you were planting snail trees! The Hongatar truly are a noble breed.`,
              next: "dream-faeries-litter-no-proof",
            },
            {
              text: `"LIES!"`,
              next: "dream-faeries-litter-no-proof",
            },
          ];

          if (character.inventory.some((item) => item.id == "hongatar-trash")) {
            choices.push({
              text: "Show them the proof.",
              next: "dream-faeries-litter-proof",
            });
          }

          return choices;
        },
        metadata: {
          sectionId,
          routes: [
            {
              text: `"Oh I see, you were planting snail trees! The Hongatar truly are a noble breed.`,
              next: "dream-faeries-litter-no-proof",
            },
            {
              text: `"LIES!"`,
              next: "dream-faeries-litter-no-proof",
            },
            {
              text: "Show them the proof.",
              next: "dream-faeries-litter-proof",
            },
          ],
        },
      };
    },
  ),

  "dream-faeries-litter-no-proof": defineScene(
    "dream-faeries-litter-no-proof",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: "The {hongatar} puff up, proud.",
        buttonActions: () => [{ dictionaryEntryId: "hongatar" }],
        dialogSequence: () => [
          {
            characterId: "faerie1",
            text:
              `Humans have decimated the snail forest. We hongatar are nobly trying to ` +
              `replant them one snail shell at a time.`,
          },
        ],
        choices: () => [
          //TODO: if you have the trash, you get the option again
          {
            text: `"You're lying. I saw you eating the snails!"`,
            next: "dream-faeries2",
            payload: { filter: "accuse" },
            manners: [{ id: "depressing", amount: 1 }],
          },
          {
            text: `"Your dedication to the ecosystem is so inspiring. If only we humans were so thoughtful and so brave."`,
            next: "dream-faeries2",
            payload: { filter: "flatter" },
            manners: [{ id: "polite", amount: 1 }],
            stats: [{ id: "shitheadedness", amount: 1 }],
          },
          {
            text: `"That is asinine."`,
            next: "dream-faeries2",
            payload: { filter: "insult" },
            manners: [{ id: "rude", amount: 1 }],
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-faeries-litter-proof": defineScene(
    "dream-faeries-litter-proof",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: "",
        dialogSequence: () => [
          {
            characterId: "faerie2",
            text: "Mercy!",
          },
          {
            characterId: "faerie1",
            text: "Forgive us!",
            next: "dream-faeries-litter-proof1",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-faeries-litter-proof1": defineScene(
    "dream-faeries-litter-proof1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: `The {hongatar} now all seem to hold you in great reverence and awe, 
          as if you were a god of the whole forest.`,
        buttonActions: () => [
          {
            dictionaryEntryId: "hongatar",
          },
        ],
        dialogSequence: () => [
          {
            characterId: "faerie3",
            text: `A being of your stature should not dirty their hands with such filth.`,
            onClick: () => {
              const character = useCharacterStore();
              character.removeFromInventory("hongatar-trash");
            },
          },
          {
            characterId: "faerie3",
            text: `We found this magical tome in the forest. We can't read it but we know it's valuable. Here.`,
            next: "dream-faeries-litter-proof2",
            onClick: () => {
              const character = useCharacterStore();
              character.addToInventory("self-help-book", this.id);
            },
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-faeries-litter-proof2": defineScene(
    "dream-faeries-litter-proof2",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: `The {hongatar} all stare at you expectantly, like eager children.`,
        buttonActions: () => [
          {
            dictionaryEntryId: "hongatar",
          },
        ],
        choices: () => [
          {
            text: `"Let that be a lesson to you."`,
            next: "dream-faeries2",
            payload: { filter: "lesson" },
            manners: [{ id: "depressing", amount: 1 }],
          },
          {
            text: `"Self-help is my favorite genre, thanks!"`,
            next: "dream-faeries2",
            payload: { filter: "thanks" },
            manners: [{ id: "polite", amount: 1 }],
          },
          {
            text: `Wink.`,
            next: "dream-faeries2",
            payload: { filter: "wink" },
            manners: [{ id: "weird", amount: 1 }],
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-faeries-party-check": defineScene(
    "dream-faeries-party-check",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: ``,
        dialogSequence: () => [
          {
            characterId: "faerie2",
            text: `Are you sure Armaani? The party train is leaving!`,
            popUp: true,
          },
        ],
        choices: () => [
          {
            text: `"I'm good. Thanks."`,
            next: "dream-faeries-party-decline",
            stats: [{ id: "will", amount: 1 }],
          },
          {
            text: `"PARTY!!!"`,
            next: "dream-faeries4",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-faeries-party-decline": defineScene(
    "dream-faeries-party-decline",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        audio: faeriesSong,
        text: ``,
        dialogSequence: () => [
          {
            characterId: "faerie2",
            text: `Suit yourself!`,
            next: "dream1",
            onClick: () => {
              const character = useCharacterStore();
              character.setFlag("did-faeries", true, this.id);
            },
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "party-eggcorn": defineScene("party-eggcorn", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      audio: faeriesSong,
      text:
        `Yuck! It tastes like...^^You don't get a chance to finish the thought. ` +
        `It feels like the whole world is being stretched inside-out. You hear a voice, like an echo ` +
        `in your mind, "See you soon, raccoon!" Then {everything goes dark}.`,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            if (payload?.filter == "squirrel") {
              game.goToScene("party-squirrel");
            } else {
              game.goToScene("party-faeries");
            }
          },
        },
      ],
      metadata: {
        sectionId,
        routes: [
          {
            text: `everything goes dark`,
            next: "party-faeries",
          },
          {
            text: `everything goes dark`,
            next: "party-squirrel",
          },
        ],
      },
    };
  }),

  "party-eggcorn-check": defineScene(
    "party-eggcorn-check",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text: `But it's <i>so tantalizing!</i>`,
        choices: () => [
          {
            text: "YOLO! Eat the eggcorn.",
            next: "party-eggcorn",
            payload: payload,
          },
          {
            text: `No. Seriously. I'm not eating it.`,
            next: "dream1",
            stats: [{ id: "will", amount: 1 }],
            flags: [{ id: "did-faeries", value: true }],
          },
        ],
        metadata: { sectionId },
      };
    },
  ),
};
