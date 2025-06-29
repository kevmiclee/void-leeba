import { Choice, Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import faeriesSong from "@/assets/audio/story/faeries.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import {
  boyWhoCriedWolf,
  buttOfTheJoke,
  godOfTheForest,
  magicNosehairs,
  nobodysFriend,
  oneWithTheHongatar,
  sexyGodOfTheForest,
} from "@/data/aspects";
import { getNapFaeries2Text } from "../helper-functions/text-helper-functions";
import { useAspectStore } from "@/stores/aspects";

export const dreamFaeriesScenes = {
  "dream-faeries": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries",
    background: bgDefault,
    audio: faeriesSong,
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
    metadata: {
      routes: [
        {
          label: "faerie dialog click",
          redirect: "dream-faeries1",
        },
      ],
    },
  }),

  "dream-faeries1": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries1",
    background: bgDefault,
    audio: faeriesSong,
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
    metadata: {
      routes: [
        {
          label: `Bow graciously. "Thanks for spitting in my nostril holes."`,
          redirect: "dream-faeries2",
        },
        {
          label: `Get on their case about littering.`,
          redirect: "dream-faeries-litter",
        },
        {
          label: `There's that squirrel again! Try to catch it.`,
          redirect: "dream-squirrel",
        },
      ],
    },
  }),

  "dream-faeries2": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries2",
    background: bgDefault,
    audio: faeriesSong,
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
    metadata: {
      routes: [
        {
          label: `faerie dialog click`,
          redirect: "dream-faeries3",
        },
      ],
    },
  }),

  "dream-faeries3": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries3",
    background: bgDefault,
    audio: faeriesSong,
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
        text: `"Um..."`,
        next: "dream-faeries-party-check",
      },
      {
        text: `"PARTY!!!"`,
        next: "dream-faeries4",
      },
    ],
    metadata: {
      routes: [
        {
          label: `"Um..."`,
          redirect: "dream-faeries-party-check",
        },
        {
          label: `"PARTY!!!"`,
          redirect: "dream-faeries4",
        },
      ],
    },
  }),

  "dream-faeries4": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries4",
    background: bgDefault,
    audio: faeriesSong,
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
    metadata: {
      routes: [
        {
          label: `faerie dialog clicks`,
          redirect: "dream-faeries5",
        },
      ],
    },
  }),

  "dream-faeries5": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries5",
    background: bgDefault,
    audio: faeriesSong,
    text:
      `Whatever that means.^^The eggcorn's skin is a luscious, lacquered brown. ` +
      `It has a neat little cap and a fine pointy bottom. In fact, you've never found an eggcorn to be so... ` +
      `tantalizing. Definitely something odd about these eggcorns. You notice that after eating an eggcorn, ` +
      `the hongatar fall to the ground unconscious. Soon you're the only one left standing.`,
    choices: () => [
      { text: "YOLO! Eat the eggcorn.", next: `party-eggcorn` },
      { text: "On second thought...", next: "party-eggcorn-check" },
    ],
    metadata: {
      routes: [
        {
          label: `YOLO! Eat the eggcorn.`,
          redirect: "party-eggcorn",
        },
        {
          label: `On second thought...`,
          redirect: "party-eggcorn-check",
        },
      ],
    },
  }),

  "dream-faeries-litter": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter",
    background: bgDefault,
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
          next: "dream-faeries-litter1",
        },
        {
          text: `"LIES!"`,
          next: "dream-faeries-litter1",
        },
      ];

      if (character.inventory.some((item) => item.id == "hongatar-trash")) {
        choices.push({
          text: "Show them the proof.",
          next: "dream-faeries-litter-police",
          //TODO: manners effects
        });
      }

      return choices;
    },
    metadata: {
      routes: [
        {
          label: `"Oh I see, you were planting snail trees! The Hongatar truly are a noble breed.`,
          redirect: "dream-faeries-litter1",
        },
        {
          label: `"LIES!"`,
          redirect: "dream-faeries-litter1",
        },
        {
          label: "Show them the proof.",
          redirect: "dream-faeries-litter-police",
        },
      ],
    },
  }),

  "dream-faeries-litter1": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter1",
    background: bgDefault,
    audio: faeriesSong,
    text: "The {hongatar} puff up, proud.",
    buttonActions: [{ dictionaryEntryId: "hongatar" }],
    dialogSequence: () => [
      {
        characterId: "faerie1",
        text:
          `Humans have decimated the snail forest. We hongatar are nobly trying to ` +
          `replant them one snail shell at a time.`,
      },
    ],
    choices: () => {
      const character = useCharacterStore();
      const aspects = useAspectStore();

      return [
        {
          text: `"You're lying. I saw you eating the snails!"`,
          next: "dream-faeries2",
          payload: { filter: "accuse" },
          onChoose: () => {
            character.setManners("depressing");
            aspects.addAspect(boyWhoCriedWolf);
          },
        },
        {
          text: `"Your dedication to the ecosystem is so inspiring. If only we humans were so thoughtful and so brave."`,
          next: "dream-faeries2",
          payload: { filter: "flatter" },
          onChoose: () => {
            character.setManners("polite");
            aspects.addAspect(oneWithTheHongatar);
          },
        },
        {
          text: `"That is asinine."`,
          next: "dream-faeries2",
          payload: { filter: "insult" },
          onChoose: () => {
            character.setManners("rude");
            aspects.addAspect(nobodysFriend);
          },
        },
      ];
    },
    metadata: {
      routes: [
        {
          label: `"You're lying. I saw you eating the snails!"`,
          redirect: "dream-faeries2",
        },
        {
          label: `"Your dedication to the ecosystem is so inspiring. If only we humans were so thoughtful and so brave."`,
          redirect: "dream-faeries2",
        },
        {
          label: `"That is asinine."`,
          redirect: "dream-faeries2",
        },
      ],
    },
  }),

  "dream-faeries-litter-police": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter-police",
    background: bgDefault,
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
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-faeries-litter-police1");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `faerie dialog click`,
          redirect: "dream-faeries-litter-police1",
        },
      ],
    },
  }),

  "dream-faeries-litter-police1": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter-police1",
    background: bgDefault,
    audio: faeriesSong,
    text:
      `The {hongatar} now all seem to hold you in great reverence and awe, ` +
      `as if you were a god of the whole forest.`,
    buttonActions: [
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
        onClick: () => {
          const character = useCharacterStore();
          character.addToInventory(
            "self-help-book",
            "dream-faeries-litter-police1"
          );
          const game = useGameStore();
          game.goToScene("dream-faeries-litter-police2");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `faerie dialog click`,
          redirect: "dream-faeries-litter-police2",
        },
      ],
    },
  }),

  "dream-faeries-litter-police2": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-litter-police2",
    background: bgDefault,
    audio: faeriesSong,
    text: `The {hongatar} all stare at you expectantly, like eager children.`,
    buttonActions: [
      {
        dictionaryEntryId: "hongatar",
      },
    ],
    choices: () => [
      {
        text: `"Let that be a lesson to you."`,
        next: "dream-faeries2",
        payload: { filter: "lesson" },
        onChoose: () => {
          const aspectStore = useAspectStore();
          aspectStore.addAspect(godOfTheForest);
        },
      },
      {
        text: `"Self-help is my favorite genre, thanks!"`,
        next: "dream-faeries2",
        payload: { filter: "thanks" },
        onChoose: () => {
          const aspectStore = useAspectStore();
          aspectStore.addAspect(buttOfTheJoke);
        },
      },
      {
        text: `Wink.`,
        next: "dream-faeries2",
        payload: { filter: "wink" },
        onChoose: () => {
          const aspectStore = useAspectStore();
          aspectStore.addAspect(sexyGodOfTheForest);
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `"Let that be a lesson to you."`,
          redirect: "dream-faeries2",
        },
        {
          label: `"Self-help is my favorite genre, thanks!"`,
          redirect: "dream-faeries2",
        },
        {
          label: `Wink.`,
          redirect: "dream-faeries2",
        },
      ],
    },
  }),

  "dream-faeries-party-check": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-party-check",
    background: bgDefault,
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
      { text: `"I'm good. Thanks."`, next: "dream-faeries-party-decline" },
      {
        text: `"PARTY!!!"`,
        next: "dream-faeries4",
      },
    ],
    metadata: {
      routes: [
        {
          label: `"I'm good. Thanks"`,
          redirect: "dream-faeries-party-decline",
        },
        {
          label: `"PARTY!!!"`,
          redirect: "dream-faeries4",
        },
      ],
    },
  }),

  "dream-faeries-party-decline": (payload?: ScenePayload): Scene => ({
    id: "dream-faeries-party-decline",
    background: bgDefault,
    audio: faeriesSong,
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
    metadata: {
      routes: [
        {
          label: `fearie dialog click`,
          redirect: "dream1",
        },
      ],
    },
  }),
};
