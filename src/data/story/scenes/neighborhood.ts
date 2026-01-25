import { Scene } from "@/types/story";
import bgNeighborhood from "@/assets/images/backgrounds/neighborhood.png";
import neighborhoodTheme from "@/assets/audio/story/background-themes/neighborhood.mp3";
import { defineScene } from "../story";
import { getNonZeroRandomDecimal } from "../helper-functions/outcome-helper-functions";
import { useCharacterStore } from "@/stores/character";
import { useGameStore } from "@/stores/game";
import { getNeighborhoodDrunk1Dialog } from "../helper-functions/text-helper-functions";

//TODO: MUSIC - dog barking sounds

const sectionId = "neighborhod";

export const neighborhoodScenes = {
  neighborhood: defineScene("neighborhood", function (payload): Scene {
    return {
      id: this.id,
      text:
        //TODO: STORY - re-write this part
        `What a hip, ritzy little neighborhood. It's bustling with people. A perfect place to ` +
        `set up an art table and sell some art!`,
      choices: () => [
        {
          text: `Yes! Let's do it.`,
          next: "neighborhood1",
        },
        // TODO: CHORE - only if they haven't completed the room storylines
        {
          text: "Not feeling it today. Go home.",
          next: "room",
        },
      ],
      background: bgNeighborhood,
      audio: neighborhoodTheme,
      metadata: { sectionId },
    };
  }),

  neighborhood1: defineScene("neighborhood1", function (payload): Scene {
    return {
      id: this.id,
      text: `Where do you set up your table?`,
      choices: () => [
        {
          text: `On the corner in front of the used bookstore.`,
          next: "neighborhood-drunk",
          flags: [{ id: "art-table-success-rate", value: 1 }],
        },
        {
          text: `In the middle of the street.`,
          //TODO: STORY - gets shut down faster but maybe you can shit talk him into buying a scultpture and let you keep selling
          next: "neighborhood-drunk",
          flags: [
            {
              id: "art-table-success-rate",
              value: getNonZeroRandomDecimal(2),
            },
            {
              id: "asking-for-trouble",
              value: true,
            },
          ],
        },
        {
          text: `The mathematically busiest street-corner.`,
          next: "neighborhood-drunk",
          flags: [{ id: "art-table-success-rate", value: 1.5 }],
        },
        {
          text: `It doesn't matter. Here's fine.`,
          next: "neighborhood-drunk",
          flags: [
            {
              id: "art-table-success-rate",
              value: getNonZeroRandomDecimal(2),
            },
          ],
        },
      ],
      background: bgNeighborhood,
      audio: neighborhoodTheme,
      onPageLoad: () => {
        const character = useCharacterStore();
        character.setFlag("asking-for-trouble", false, this.id);
      },
      metadata: { sectionId },
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
            text: `"Don't let that stop you!"`,
            next: "neighborhood-drunk1",
            payload: { filter: "good-chance" },
          },
          {
            text: `"The cheese is locally-sourced from grass-fed cows."`,
            next: "neighborhood-drunk1",
            payload: { filter: "bad-chance" },
          },
          {
            text: `"They make a great gift for nieces or nephews."`,
            next: "neighborhood-drunk1",
            payload: { filter: "neutral-chance" },
          },
        ],
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        metadata: { sectionId },
      };
    }
  ),

  "neighborhood-drunk1": defineScene(
    "neighborhood-drunk1",
    function (payload): Scene {
      return {
        id: this.id,
        text: ``,
        dialogSequence: () => [
          {
            characterId: "drunk1",
            text: getNeighborhoodDrunk1Dialog(
              payload?.filter! as
                | "good-chance"
                | "bad-chance"
                | "neutral-chance"
            ),
            onClick: () => {
              const game = useGameStore();
              switch (payload?.filter!) {
                case "good-chance":
                  game.goToScene("neighborhood-drunk1a");
                  break;
                case "bad-chance":
                  game.goToScene("neighborhood-drunk1b");
                  break;
                case "neutral-chance":
                  game.goToScene("neighborhood-drunk1c");
                  break;
              }
            },
          },
        ],
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        metadata: {
          sectionId,
          routes: [
            {
              text: "drunk dialog click",
              next: "neighborhood-drunk1a",
            },
            {
              text: "drunk dialog click",
              next: "neighborhood-drunk1b",
            },
            {
              text: "drunk dialog click",
              next: "neighborhood-drunk1c",
            },
          ],
        },
      };
    }
  ),

  "neighborhood-drunk1a": defineScene(
    "neighborhood-drunk1a",
    function (payload): Scene {
      return {
        id: this.id,
        text: `You are so jazzed up by the praise, that you…`,
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        choices: () => [
          {
            text: `Start talkin' all brazen and free, flitting from topic to topic.`,
            next: "neighborhood-drunk2",
            stats: [
              { id: "blueMagic", amount: 1 },
              { id: "shitheadedness", amount: 1 },
            ],
          },
          {
            text: `Bench press the entire table above your head while discussing your process.`,
            next: "neighborhood-drunk2",
            stats: [
              { id: "athletics", amount: 1 },
              { id: "will", amount: 1 },
            ],
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "neighborhood-drunk1b": defineScene(
    "neighborhood-drunk1b",
    function (payload): Scene {
      return {
        id: this.id,
        text: `You have both been trapped in a conversation about your supply chain. {Buckle up…}`,
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        buttonActions: () => [
          {
            next: "neighborhood-drunk1b-1",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "neighborhood-drunk1b-1": defineScene(
    "neighborhood-drunk1b-1",
    function (payload): Scene {
      return {
        id: this.id,
        text: `<i>Three hours later...</i>^^As you return from the farm carrying your whole setup between the two of 
        you, you feel the sweat cleansing your soul.`,
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        choices: () => [
          {
            text: `"So, as you can see, local cows make for sturdier cheese sculptures."`,
            next: "neighborhood-drunk2",
            stats: [
              { id: "blueMagic", amount: 1 },
              { id: "will", amount: 1 },
            ],
          },
          {
            text: `"Farm to table, <i>literally</i>."`,
            next: "neighborhood-drunk2",
            stats: [
              { id: "athletics", amount: 1 },
              { id: "shitheadedness", amount: 1 },
            ],
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "neighborhood-drunk1c": defineScene(
    "neighborhood-drunk1c",
    function (payload): Scene {
      return {
        id: this.id,
        text: ``,
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        metadata: { sectionId },
      };
    }
  ),

  "neighborhood-drunk2": defineScene(
    "neighborhood-drunk2",
    function (payload): Scene {
      return {
        id: this.id,
        text: ``,
        background: bgNeighborhood,
        audio: neighborhoodTheme,
        dialogSequence: () => [
          {
            characterId: "drunk1",
            text: `Damn. Well, damn, cousin, you're as cool as a multitool. I transferred you 50 Leakcoin. 
          I'd like the one with the human face on the ass.`,
            next: "neighborhood2",
          },
        ],
        onPageLoad: () => {
          //TODO: CHORE - depending on the converstaion, the value here changes
          const character = useCharacterStore();
          character.addToInventory("leakcoin", this.id, 50);
        },
        metadata: { sectionId },
      };
    }
  ),

  neighborhood2: defineScene("neighborhood2", function (payload): Scene {
    return {
      id: this.id,
      text: `As the drunk walks off happily with your sculpture, you silently bid goodbye to your creation.`,
      background: bgNeighborhood,
      audio: neighborhoodTheme,
      metadata: { sectionId },
    };
  }),

  //TODO: STORY -
  //Dog just tries to eat one (maybe you run out of sculptures to sell)
  //If you're the dog kicker, chances are any potential customers havae seen you you on social media
};
