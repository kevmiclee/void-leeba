import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import neighborhoodTheme from "@/assets/audio/story/background-themes/neighborhood.mp3";
import { defineScene } from "../story";
import { getNonZeroRandomDecimal } from "../helper-functions/outcome-helper-functions";
import { useCharacterStore } from "@/stores/character";

//TODO: MUSIC - dog barking sounds

export const neighborhoodScenes = {
  neighborhood: defineScene("neighborhood", function (payload): Scene {
    return {
      id: this.id,
      text:
        //TODO: seen better days
        `What a hip, ritzy little neighborhood. It's bustling with people. A perfect place to ` +
        `set up an art table and sell some art!`,
      choices: () => [
        {
          text: `Yes! Let's do it.`,
          next: "neighborhood1",
        },
        {
          text: "Not feeling it today. Go home.",
          next: "room",
          //TODO: what if they've already been to their room?
        },
      ],
      background: bgDefault,
      audio: neighborhoodTheme,
      metadata: {
        sectionId: "neighborhood",
        routes: [
          {
            text: `Yes! Let's do it.`,
            next: "neighborhood1",
          },
          {
            text: "Not feeling it today. Go home.",
            next: "room",
          },
        ],
      },
    };
  }),

  neighborhood1: defineScene("neighborhood1", function (payload): Scene {
    return {
      id: this.id,
      text: `Where do you set up your table?`,
      choices: () => {
        const character = useCharacterStore();
        return [
          {
            text: `On the corner in front of the used bookstore.`,
            next: "neighborhood-drunk",
            onChoose: () => {
              character.setFlag("art-table-success-rate", 1);
            },
          },
          {
            text: `In the middle of the street.`,
            //TODO: gets shut down faster but maybe you can shit talk him into buying a scultpture and let you keep selling
            next: "neighborhood-drunk",
            onChoose: () => {
              const rate = getNonZeroRandomDecimal(2);
              character.setFlag("art-table-success-rate", rate);
              character.setFlag("asking-for-trouble", true);
            },
          },
          {
            text: `Option 3`,
            next: "neighborhood-drunk",
            onChoose: () => {
              character.setFlag("art-table-success-rate", 1.5);
            },
          },
          {
            text: `It doesn't matter. Here's fine.`,
            next: "neighborhood-drunk",
            onChoose: () => {
              const rate = getNonZeroRandomDecimal(2);
              character.setFlag("art-table-success-rate", rate);
            },
          },
        ];
      },
      background: bgDefault,
      audio: neighborhoodTheme,
      onPageLoad: () => {
        const character = useCharacterStore();
        character.setFlag("asking-for-trouble", false);
      },
      metadata: {
        sectionId: "neighborhood",
        routes: [
          {
            text: `On the corner in front of the used bookstore.`,
            next: "neighborhood-drunk",
          },
          {
            text: `In the middle of the street.`,
            next: "neighborhood-drunk",
          },
          {
            text: `Option 3`,
            next: "neighborhood-drunk",
          },
          {
            text: `It doesn't matter. Here's fine.`,
            next: "neighborhood-drunk",
          },
        ],
      },
    };
  }),

  "neighborhood-drunk": defineScene(
    "neighborhood-drunk",
    function (payload): Scene {
      return {
        id: this.id,
        text: `Good idea.^^As soon as you finish setting up, someone walks up to your table.`,
        dialogSequence: () => [
          {
            characterId: "drunk1",
            text: "Dude... LOVE these purple cheese whiz sculptures! Cool enough not to eat!",
            popUp: true,
          },
        ],
        choices: () => [
          {
            text: `"Don't let that stop you!"`, // good chance
            next: "neighborhood-drunk1",
            onChoose: () => {},
          },
          {
            text: `"The cheese is locally sourced from grass-fed cows."`, // bad chance
            next: "neighborhood-drunk1",
            onChoose: () => {},
          },
          {
            text: `"They make a great gift for nieces and nephews."`, // neutral chance
            next: "neighborhood-drunk1",
            onChoose: () => {},
          },
        ],
        background: bgDefault,
        audio: neighborhoodTheme,
        metadata: {
          sectionId: "neighborhood",
          routes: [
            {
              text: `"Don't let that stop you!"`, // good chance
              next: "neighborhood-drunk1",
            },
            {
              text: `"The cheese is locally sourced from grass-fed cows."`, // bad chance
              next: "neighborhood-drunk1",
            },
            {
              text: `"They make a great gift for nieces and nephews."`, // neutral chance
              next: "neighborhood-drunk1",
            },
          ],
        },
      };
    }
  ),

  "neighborhood-drunk1": defineScene(
    "neighborhood-drunk1",
    function (payload): Scene {
      return {
        id: this.id,
        text: ``,
        background: bgDefault,
        audio: neighborhoodTheme,
        metadata: {
          sectionId: "neighborhood",
          routes: [],
        },
      };
    }
  ),

  //Dog just tries to eat one (maybe you run out of sculptures to sell)
  //If you're the dog kicker, chances are any potential customers havae seen you you on social media
};
