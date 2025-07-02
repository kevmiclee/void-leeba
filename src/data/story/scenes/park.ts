import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import parkMusic from "@/assets/audio/story/background-themes/walk-in-the-park.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { CharacterId } from "@/types/character";

export const parkScenes = {
  park: (payload?: ScenePayload): Scene => ({
    id: "park",
    background: bgDefault,
    audio: parkMusic,
    text:
      `You are in the park. In the distance, a children's play structure. ` +
      `Behind the play structure, an empty public pool in yellow and light blue. ` +
      `Behind you, a soccer field, basketball court, and extensive skatepark. To your side, a huge snow pile.`,
    choices: () => [
      {
        text: "Still yourself and listen to the sounds.",
        next: "park-drunks",
      },
      {
        text: "Leave the park and enter the neighborhood.",
        // next: "neighborhood",
        //TODO:
      },
      {
        text: "Play on the snowpile.",
        // next: "snow-pile",
        //TODO:
      },
    ],
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `Still yourself and listen to the sounds.`,
          redirect: "park-drunks",
        },
        // {
        //   label: `Leave the park and enter the neighborhood.`,
        //   redirect: "neighborhood",
        // },
        // {
        //   label: `Play on the snowpile.`,
        //   redirect: "snow-pile",
        // },
      ],
    },
  }),

  "park-drunks": (payload?: ScenePayload): Scene => ({
    id: "park-drunks",
    background: bgDefault,
    audio: parkMusic,
    text:
      `The sun sets over the park. A few stars resist the city's lights. The playground and fences now set into silhouettes. ` +
      `As your eyes adjust, the park takes on a dark grey black clarity. The stars and a white crescent illuminate it with a soft ` +
      `whiteness devoid of color.` +
      `^^You hear two drunks arguing as they walk along, looking up and pointing.`,
    dialogSequence: () => [
      { characterId: "drunk1", text: `That's not the Moon! It's the Sun!` },
      {
        characterId: "drunk2",
        text: `That's not the Sun! It's the Moon!`,
        onClick: () => {
          const store = useGameStore();
          store.goToScene("park-drunks1");
        },
      },
    ],
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `drunk dialog click`,
          redirect: "park-drunks1",
        },
      ],
    },
  }),

  "park-drunks1": (payload?: ScenePayload): Scene => ({
    id: "park-drunks1",
    background: bgDefault,
    audio: parkMusic,
    text:
      `In loopy diagonals from either direction, they come up to you.` +
      `^^The first drunk seizes on the opportunity to accost you, her breath bequeathing hot sick.`,
    dialogSequence: () => [
      {
        characterId: "drunk1",
        text:
          `Hey <i>obversant</i> one, settle this for us. <i>*hiccup*</i> You see that thing up there in the sky? ` +
          `Is that the Sun or the Moon?`,
        popUp: true,
      },
    ],
    choices: () => [
      {
        text: `"I'm sorry, I'm not from around here."`,
        next: "park-drunks2a",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-choice", undefined);
        },
      },
      {
        text: `"It's the Sun."`,
        next: "park-drunks2b",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-choice", "drunk1");
        },
      },
      {
        text: `"It's the Moon."`,
        next: "park-drunks2b",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-choice", "drunk2");
        },
      },
    ],
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `I'm sorry, I'm not from around here.`,
          redirect: "park-drunks2a",
        },
        {
          label: `It's the sun`,
          redirect: "park-drunks2b",
        },
        {
          label: `It's the moon`,
          redirect: "park-drunks2b",
        },
      ],
    },
  }),

  "park-drunks2a": (payload?: ScenePayload): Scene => ({
    id: "park-drunks2a",
    background: bgDefault,
    audio: parkMusic,
    text: "",
    dialogSequence: () => [
      {
        characterId: "drunk1",
        text: `And you never looked up before neither, huh?`,
        popUp: true,
      },
    ],
    choices: () => [
      {
        text: `"I don't have time for this."`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setManners("rude");
        },
      },
      {
        text: `"Looking up is for the young and hopeful."`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setManners("depressing");
        },
      },
      {
        text: "Just laugh.",
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setManners("polite");
        },
      },
    ],
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `I dont have time for this`,
          redirect: "park-drunks3",
        },
        {
          label: `Looki ngup is for the young and hopeful`,
          redirect: "park-drunks3",
        },
        {
          label: `Just laugh`,
          redirect: "park-drunks3",
        },
      ],
    },
  }),

  "park-drunks2b": (payload?: ScenePayload): Scene => ({
    id: "park-drunks2b",
    background: bgDefault,
    audio: parkMusic,
    text: "",
    dialogSequence: () => {
      const character = useCharacterStore();
      return [
        {
          characterId: character.flags["drunk-choice"] as CharacterId,
          text:
            character.flags["drunk-choice"] == "drunk1"
              ? "THANK YOU!!"
              : "BOOYAH!!",
        },
        {
          characterId:
            character.flags["drunk-choice"] == "drunk1"
              ? "drunk2"
              : ("drunk1" as CharacterId),
          text: `.........`,
          onClick: () => {
            const store = useGameStore();
            store.goToScene("park-drunks2c");
          },
        },
      ];
    },
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `drunk dialog click`,
          redirect: "park-drunks2c",
        },
      ],
    },
  }),

  "park-drunks2c": (payload?: ScenePayload): Scene => ({
    id: "park-drunks2c",
    background: bgDefault,
    audio: parkMusic,
    text: "The one celebrates to the other.",
    dialogSequence: () => {
      const character = useCharacterStore();
      return [
        {
          characterId: character.flags["drunk-choice"] as CharacterId,
          text: `HA, EAT IT!`,
          popUp: true,
        },
      ];
    },
    choices: () => [
      {
        text: `"Not cool."`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setManners("depressing");
        },
      },
      {
        text: `"YEAH! EAT IT, YA DOPE!"`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setManners("rude");
        },
      },
      {
        text: "Just laugh.",
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setManners("polite");
        },
      },
    ],
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `Not cool`,
          redirect: "park-drunks3",
        },
        {
          label: `YEAH! EAT IT, YA DOPE!`,
          redirect: "park-drunks3",
        },
        {
          label: `Just laugh`,
          redirect: "park-drunks3",
        },
      ],
    },
  }),

  "park-drunks3": (payload?: ScenePayload): Scene => ({
    id: "park-drunks3",
    background: bgDefault,
    audio: parkMusic,
    text: "",

    dialogSequence: () => {
      const character = useCharacterStore();
      const manners = character.manners;
      const drunkChoice = character.flags["drunk-choice"];

      const mannersText =
        manners == "rude"
          ? drunkChoice
            ? "Woah. Easy man, that's my friend you're talking about! "
            : "Rude! "
          : manners == "depressing"
            ? "Depressing! "
            : "";
      return [
        {
          characterId: (drunkChoice ?? "drunk1") as CharacterId,
          text: `${mannersText}Oh dang! A skatepark! Cool! Bye!`,
          onClick: () => {
            const store = useGameStore();
            store.goToScene("black-dog");
          },
        },
      ];
    },
    metadata: {
      sectionId: "park",
      routes: [
        {
          label: `drunk dialog click`,
          redirect: "black-dog",
        },
      ],
    },
  }),
};
