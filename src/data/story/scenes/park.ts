import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";

export const parkScenes = {
  park: (payload?: ScenePayload): Scene => ({
    id: "park",
    background: bgDefault,
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
  }),

  "park-drunks": (payload?: ScenePayload): Scene => ({
    id: "park-drunks",
    background: bgDefault,
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
    choices: () => [],
  }),

  "park-drunks1": (payload?: ScenePayload): Scene => ({
    id: "park-drunks1",
    background: bgDefault,
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
          character.setFlag("drunk-choice", "sun");
        },
      },
      {
        text: `"It's the Moon."`,
        next: "park-drunks2b",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-choice", "moon");
        },
      },
    ],
  }),

  "park-drunks2a": (payload?: ScenePayload): Scene => ({
    id: "park-drunks2a",
    background: bgDefault,
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
          character.setFlag("drunk-manners", "rude");
        },
      },
      {
        text: `"Looking up is for the young and hopeful."`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "depressing");
        },
      },
      {
        text: "Just laugh.",
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "polite");
        },
      },
    ],
  }),

  "park-drunks2b": (payload?: ScenePayload): Scene => ({
    id: "park-drunks2b",
    background: bgDefault,
    text: "",
    dialogSequence: () => {
      const character = useCharacterStore();
      return [
        {
          characterId:
            character.flags["drunk-choice"] == "sun" ? "drunk1" : "drunk2",
          text:
            character.flags["drunk-choice"] == "sun"
              ? "THANK YOU!!"
              : "BOOYAH!!",
        },
        {
          characterId:
            character.flags["drunk-choice"] == "sun" ? "drunk2" : "drunk1",
          text: `.........`,
          onClick: () => {
            const store = useGameStore();
            store.goToScene("park-drunks2c");
          },
        },
      ];
    },
    choices: () => [
      {
        text: `"Not cool."`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "depressing");
        },
      },
      {
        text: `"YEAH! EAT IT, YA DOPE!"`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "rude");
        },
      },
      {
        text: "Just laugh.",
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "polite");
        },
      },
    ],
  }),

  "park-drunks2c": (payload?: ScenePayload): Scene => ({
    id: "park-drunks2c",
    background: bgDefault,
    text: "The one celebrates to the other.",
    dialogSequence: () => {
      const character = useCharacterStore();
      return [
        {
          characterId:
            character.flags["drunk-choice"] == "sun" ? "drunk1" : "drunk2",
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
          character.setFlag("drunk-manners", "depressing");
        },
      },
      {
        text: `"YEAH! EAT IT, YA DOPE!"`,
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "rude");
        },
      },
      {
        text: "Just laugh.",
        next: "park-drunks3",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("drunk-manners", "polite");
        },
      },
    ],
  }),

  "park-drunks3": (payload?: ScenePayload): Scene => ({
    id: "park-drunks3",
    background: bgDefault,
    text: "",

    dialogSequence: () => {
      const character = useCharacterStore();
      const drunkManners = character.flags["drunk-manners"];
      const drunkChoice = character.flags["drunk-choice"];

      const mannersText =
        drunkManners == "rude"
          ? drunkChoice
            ? "Woah. Easy man, that's my friend you're talking about! "
            : "Rude! "
          : drunkManners == "depressing"
            ? "Depressing! "
            : "";
      return [
        {
          characterId: drunkChoice == "moon" ? "drunk2" : "drunk1",
          text: `${mannersText}Oh dang! A skatepark! Cool! Bye!`,
          onClick: () => {
            const store = useGameStore();
            store.goToScene("black-dog");
          },
        },
      ];
    },
  }),
};

//TODO: fix the right avatars on some choices like in black-dog scenes
