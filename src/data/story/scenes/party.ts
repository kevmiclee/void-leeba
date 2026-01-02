import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import partySong from "@/assets/audio/story/background-themes/party.mp3";
import { defineScene } from "../story";

const sectionId = "party";

export const partyScenes = {
  "party-keg": defineScene("party-keg", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text: `You're the life of the party. You're the Keg.`,
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "faerie1", text: "WOOOOOOOTTT!" },
        { characterId: "squirrel", text: "JOOOOOOOO!" },
      ],
      metadata: { sectionId },
    };
  }),

  "party-squirrel": defineScene("party-squirrel", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `When you come to, the light is <i>different</i>. ` +
        `There are all kinds of organisms here. Upbeat music puppets your bones. You're jammin' out.` +
        `You scan the room.`,
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "faerie1", text: "WOOOOOOOTTT!" },
        { characterId: "squirrel", text: "JOOOOOOOO!" },
      ],
      choices: () => [
        { text: `"Oh hell yeah! There's a keg!"` },
        { text: `"LET'S GOOOOOO!"` },
        { text: "Just try to blend in." },
      ],
      metadata: { sectionId },
    };
  }),

  "party-faeries": defineScene("party-faeries", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `When you come to, you're still in the clearing, but it all seems <i>different</i>. ` +
        `The hongatar are all here, but perfectly conscious. There is upbeat music, ` +
        `merry-making and of course, a keg!`,
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "faerie1", text: "WOOOOOOOTTT!" },
        { characterId: "squirrel", text: "JOOOOOOOO!" },
      ],
      choices: () => [
        { text: `"Oh hell yeah! There's a keg!"`, next: "party-monster1"},
        { text: `"LET'S GOOOOOO!"`, next: "party-monster1" },
        { text: "Just try to blend in." },
      ],
      metadata: { sectionId },
    };
  }),

  "party-monster1": defineScene("party-monster1", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `The faeries and squirrel usher you up to the {keg}.` +
        `You can feel the thrum of their excitement as they lift you upside down.` +
        `They all work together to pump the keg.` +
        'You hold the nozzle up to your mouth, and...',
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "keg", text: "*looms*" },
      ],
      choices: () => [
        { text: `...chug.`, next: "party-monster2"},
      ],
      buttonActions: () => [
          {
            dictionaryEntryId: "keg",
          },
        ],
      metadata: { sectionId },
    };
  }),

   "party-monster2": defineScene("party-monster2", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `You drink in the keg's contents. All around you, the party erupts in glee.`,
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "squirrel", text: "Joo!" },
        { characterId: "faerie1", text: "That's the spirit!", next: "party-monster3" },
      ],
      metadata: { sectionId },
    };
  }),

   "party-monster3": defineScene("party-monster3", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `You drink in the keg's contents. All around you, the party erupts in glee.`,
      audio: partySong,
      backgroundFilter: "invert(1)",
      dialogSequence: () => [
        { characterId: "squirrel", text: "Joo!" },
        { characterId: "faerie1", text: "That's the spirit!" },
      ],
      metadata: { sectionId },
    };
  }),

};

//TODO: STORY - party
// Mudman cometh
