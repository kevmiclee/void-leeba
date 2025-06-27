import { Choice, Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { magicNosehairs } from "@/data/aspects";
import { getNapFaeries2Text } from "../helper-functions/text-helper-functions";
import { useAspectStore } from "@/stores/aspects";

export const dreamFaeriesScenes = {
  "dream-faeries": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text:
      `You follow after the {hongatar}. They all have the same dutch boy haircut and cro-magnon facial features. ` +
      `The wings look like fly's wings. The pack flies through the air, leaving rapidly fading trails of light in their wake. ` +
      `They seem to be eating small snails, and then casting their shells to the forest floor.` +
      `^^{Pick up a handful of hongatar trash.}` +
      `^^The faeries are excitedly chattering amongst themselves.`,
    buttonActions: [
      {
        dictionaryEntryId: "hongatar",
      },
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("hongatar-trash", "dream-faeries");
        },
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
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-faeries1");
        },
      },
    ],
  }),

  "dream-faeries1": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries1",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text: "The group of {hongatar} turn to look at you.",
    buttonActions: [
      {
        dictionaryEntryId: "hongatar",
      },
    ],
    choices: () => [
      {
        text: 'Bow graciously. "Thanks for spitting in my nostril holes."',
        next: "dream-faeries2",
        payload: { filter: "bow" },
        onChoose: () => {
          const aspectStore = useAspectStore();
          aspectStore.addAspect(magicNosehairs);
        },
      },
      {
        text: "Get on their case about littering.",
        next: "dream-faeries-litter",
      },
      {
        text: `There's that squirrel again! Try to catch it.`,
        next: "dream-squirrel",
      },
    ],
  }),

  "dream-faeries2": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries2",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text:
      `${getNapFaeries2Text(payload?.filter)} ` +
      `Their excited chattering finds a rhythmic unison in a sing-song chant.`,
    buttonActions: [
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
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-faeries3");
        },
      },
    ],
  }),

  "dream-faeries3": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries3",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text: `The {hongatar} with the coolest outfit addresses you.`,
    buttonActions: [
      {
        dictionaryEntryId: "hongatar",
      },
    ],
    dialogSequence: () => [
      {
        characterId: "faerie2",
        text:
          `Wow, a human that understands Fairy etiquette, how amusing, how rare! What a find! ` +
          `Will you join us? We are headed to a Leak Party.`,
        popUp: true,
      },
    ],
    choices: () => [
      {
        text: "Um...",
        next: "dream-faeries-party-check",
      },
      {
        text: "PARTY!!!",
        next: "dream-faeries4",
      },
    ],
  }),

  "dream-faeries4": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries4",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text:
      `You follow them into a clearing where the hongatar with the dullest outfit starts ` +
      `handing out eggcorns. He hands you one.`,
    dialogSequence: () => [
      {
        characterId: "faerie3",
        text: `See you soon raccoon!`,
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-faeries5");
        },
      },
    ],
  }),

  "dream-faeries5": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries5",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text:
      `Whatever that means.^^The eggcorn's skin is a luscious, lacquered brown. ` +
      `It has a neat little cap and a fine pointy bottom. In fact, you've never found an eggcorn to be so... ` +
      `tantalizing. Definitely something odd about these eggcorns. You notice that after eating an eggcorn, ` +
      `the hongatar fall to the ground unconscious. Soon you're the only one left standing.`,
    choices: () => [
      { text: "YOLO! Eat the eggcorn.", next: `party-eggcorn` },
      { text: "On second thought...", next: "party-eggcorn-check" },
    ],
  }),

  "dream-faeries-litter": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
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
          // next: "dream-faeries-litter1",
          //TODO:
          onChoose: () => {
            character.setFlag("faerie-manners", "polite");
          },
        },
        {
          text: `"LIES!"`,
          // next: "dream-faeries-litter1",
          //TODO:
          onChoose: () => {
            character.setFlag("faerie-manners", "rude");
          },
        },
      ];

      if (character.inventory.some((item) => item.id == "hongatar-trash")) {
        //TODO: The faeries think you need to loosen up and definitely need some party action
        choices.push({
          text: "Show them the proof.",
          next: "dream-faeries-litter-police",
          onChoose: () => {
            character.setFlag("faerie-manners", "depressing");
          },
        });
      }

      return [];
    },
  }),

  "dream-faeries-litter-police": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter-police",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text: "",
  }),

  "dream-faeries-party-check": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-party-check",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text: ``,
    dialogSequence: () => [
      {
        characterId: "faerie2",
        text: `Are you sure Armaani? The party train is leaving!`,
        popUp: true,
      },
    ],
    choices: () => [
      { text: `I'm good. Thanks`, next: "dream-faeries-party-decline" },
      {
        text: "PARTY!!!",
        next: "dream-faeries4",
      },
    ],
  }),

  "dream-faeries-party-decline": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-party-decline",
    background: bgDefault,
    audio: "src/assets/audio/story/faeries.mp3",
    text: ``,
    dialogSequence: () => [
      {
        characterId: "faerie2",
        text: `Suit yourself!`,
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream1", { filter: "noFaeries" });
        },
      },
    ],
  }),
};
