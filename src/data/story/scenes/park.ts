import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import bgPark from "@/assets/images/backgrounds/park.png";
import bgParkNight from "@/assets/images/backgrounds/park-night.png";
import parkMusic from "@/assets/audio/story/background-themes/walk-in-the-park.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { CharacterId } from "@/types/character";
import { defineScene } from "../story";

//TODO: MUSIC - park - add egg-shaker sound, and like fun guttural burpy percussive noises, crickets

export const parkScenes = {
  park: defineScene("park", function (payload): Scene {
    return {
      id: this.id,
      background: bgPark,
      audio: parkMusic,
      text:
        `You are in the park. In the distance, a rusted children's play structure. ` +
        `Behind the play structure, an empty public pool, long disused in bleached yellow and blue. ` +
        `Behind you, a derelict soccer field, basketball court, and extensive skatepark. To your side, a huge snow pile.`,
      choices: () => [
        {
          text: "Still yourself and listen to the sounds.",
          next: "park-drunks",
        },
        {
          text: "Leave the park and enter the neighborhood.",
          next: "neighborhood",
        },
        {
          text: "Play on the snowpile.",
          next: "snow-pile",
        },
      ],
      metadata: {
        sectionId: "park",
        routes: [
          {
            text: `Still yourself and listen to the sounds.`,
            next: "park-drunks",
          },
          {
            text: `Leave the park and enter the neighborhood.`,
            next: "neighborhood",
          },
          {
            text: `Play on the snowpile.`,
            next: "snow-pile",
          },
        ],
      },
    };
  }),

  "park-drunks": defineScene("park-drunks", function (payload): Scene {
    return {
      id: this.id,
      background: bgParkNight,
      audio: parkMusic,
      text:
        `The sun sets over the park. A few stars resist the city's lights. The playground and fences now 
        set into silhouettes. As your eyes adjust, the park takes on a dark grey black clarity. The stars 
        and a white crescent illuminate it with a soft whiteness devoid of color.` +
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
            text: `drunk dialog click`,
            next: "park-drunks1",
          },
        ],
      },
    };
  }),

  "park-drunks1": defineScene("park-drunks1", function (payload): Scene {
    return {
      id: this.id,
      background: bgParkNight,
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
            text: `I'm sorry, I'm not from around here.`,
            next: "park-drunks2a",
          },
          {
            text: `It's the sun`,
            next: "park-drunks2b",
          },
          {
            text: `It's the moon`,
            next: "park-drunks2b",
          },
        ],
      },
    };
  }),

  "park-drunks2a": defineScene("park-drunks2a", function (payload): Scene {
    return {
      id: this.id,
      background: bgParkNight,
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
            character.gainManners("rude", 1, this.id);
          },
        },
        {
          text: `"Looking up is for the young and hopeful."`,
          next: "park-drunks3",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainManners("depressing", 1, this.id);
          },
        },
        {
          text: "Just laugh.",
          next: "park-drunks3",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainManners("polite", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "park",
        routes: [
          {
            text: `I dont have time for this`,
            next: "park-drunks3",
            manners: "rude",
          },
          {
            text: `Looking up is for the young and hopeful`,
            next: "park-drunks3",
            manners: "depressing",
          },
          {
            text: `Just laugh`,
            next: "park-drunks3",
            manners: "polite",
          },
        ],
      },
    };
  }),

  "park-drunks2b": defineScene("park-drunks2b", function (payload): Scene {
    return {
      id: this.id,
      background: bgParkNight,
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
            text: `drunk dialog click`,
            next: "park-drunks2c",
          },
        ],
      },
    };
  }),

  "park-drunks2c": defineScene("park-drunks2c", function (payload): Scene {
    return {
      id: this.id,
      background: bgParkNight,
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
            character.gainManners("depressing", 1, this.id);
          },
        },
        {
          text: `"YEAH! EAT IT, YA DOPE!"`,
          next: "park-drunks3",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainManners("rude", 1, this.id);
          },
        },
        {
          text: "Just laugh.",
          next: "park-drunks3",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainManners("polite", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "park",
        routes: [
          {
            text: `Not cool`,
            next: "park-drunks3",
            manners: "depressing",
          },
          {
            text: `YEAH! EAT IT, YA DOPE!`,
            next: "park-drunks3",
            manners: "rude",
          },
          {
            text: `Just laugh`,
            next: "park-drunks3",
            manners: "polite",
          },
        ],
      },
    };
  }),

  "park-drunks3": defineScene("park-drunks3", function (payload): Scene {
    return {
      id: this.id,
      background: bgParkNight,
      audio: parkMusic,
      text: "",

      dialogSequence: () => {
        const character = useCharacterStore();
        const manners = character.getManners();
        const drunkChoice = character.flags["drunk-choice"];

        const mannersText =
          manners == "rude"
            ? drunkChoice
              ? "Woah. Easy man, tha's my friend yer talkin' about!"
              : "Rude!"
            : manners == "depressing"
              ? "Depressing!"
              : "";

        const dialogs = [];

        if (mannersText != "") {
          dialogs.push({
            characterId: (drunkChoice ?? "drunk1") as CharacterId,
            text: mannersText,
          });
        }

        dialogs.push({
          characterId: (drunkChoice ?? "drunk1") as CharacterId,
          text: `Oh dang! A skatepark! Cool! Bye!`,
          onClick: () => {
            const store = useGameStore();
            store.goToScene("black-dog");
          },
        });

        return dialogs;
      },
      metadata: {
        sectionId: "park",
        routes: [
          {
            text: `drunk dialog click`,
            next: "black-dog",
          },
        ],
      },
    };
  }),
};
