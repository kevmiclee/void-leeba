import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { squirrelBitch, squirrelTamer } from "@/data/aspects";
import { fateContest } from "../helper-functions/roll-helper-functions";
import { useAspectStore } from "@/stores/aspects";

export const dreamSquirrelScenes = {
  "dream-squirrel": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel",
    background: bgDefault,
    text:
      `You lock in on a squirrel. Its grey body is a corkscrew streak around the trunk. It's time to give chase. ` +
      `You straddle the trunk, feeling the roughness of the bark tugging at your turtleneck as you shimmy up. Just a little closer... ` +
      `The squirrel is right there! Its little face, filled with alarm (or is it amusement?), fills you with determination.`,
    choices: () => [
      { text: "Reach for the closest branch.", next: "dream-squirrel1a" },
      { text: "Keep shimmying up.", next: "dream-squirrel1b" },
    ],
  }),
  "dream-squirrel1a": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel1a",
    background: bgDefault,
    text:
      `You reach for a nearby branch. It breaks, but your thighs remain firmly clenched on the trunk. ` +
      `{Keep shimmying up}.`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("dream-squirrel1b");
        },
      },
    ],
  }),
  "dream-squirrel1b": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel1b",
    background: bgDefault,
    text:
      `You keep shimmying up the trunk, past the first branch. Your arms and legs are ` +
      `giving out. The squirrel hasn't moved. The way it watches you, vacillating between ` +
      `tepid curiosity and utter indifference, suggests the thought of you as a threat could ` +
      `not be further from its mind.`,
    choices: () => [
      { text: "Push yourself even harder.", next: "dream-squirrel2" },
      {
        text: "This was a bad idea. Shimmy back down before you get hurt.",
        next: "dream-squirrel-give-up",
      },
    ],
  }),
  "dream-squirrel2": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel2",
    background: bgDefault,
    text:
      `Atta boy! Quitters never win. Your brow is wet with dream sweat. ` +
      `Your hands and limbs are all scraped up from climbing. You feel sappy bits on your clothes and face. ` +
      `The squirrel comes a little closer to you.` +
      `^^Your muscles start to tremble. The squirrel gets up in your grill.`,
    dialogSequence: () => [
      {
        characterId: "squirrel",
        text: "Putoat! Putoat!",
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-squirrel3");
        },
      },
    ],
  }),

  "dream-squirrel3": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel3",
    background: bgDefault,
    text: `The little vermin is taunting you!`,
    choices: () => [
      {
        text: "In a last ditch effort, dart your hand out to snatch the furball.",
        next: "dream-squirrel4",
        onChoose: () => {
          const character = useCharacterStore();
          const aspects = useAspectStore();
          const squirrelAthletics = 2;
          const roll = fateContest(character.athletics, squirrelAthletics);
          //TODO: more granualar outcomes

          const filter = roll >= 0 ? "success" : "fail";

          if (roll >= 0) {
            aspects.addAspect(squirrelTamer);
          } else {
            aspects.addAspect(squirrelBitch);
          }
          const game = useGameStore();
          game.goToScene("dream-squirrel4", { filter: filter });
        },
      },
    ],
  }),

  "dream-squirrel4": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel4",
    background: bgDefault,
    text:
      payload?.filter == "success"
        ? `Sweet synergy! You grabbed that sucker! It almost squirms free before you can recover from the ` +
          `shock of actually catching it. Overjoyed and triumphant, you shimmy back down to the forest floor ` +
          `with an easy swagger. The squirrel crawls up your sleeve and runs a circle around your neck. ` +
          `You made a friend!^^The squirrel wants you to follow it.`
        : `Pfft. Of course you missed. Who catches a squirrel with their bare hands? As a result, you lose ` +
          `your grip and fall backwards like a defeated villain in slow-motion.` +
          `^^You hit the ground with a soft thud and several pinecones scatter down around you. {Pick up a pinecone.}` +
          `^^The squirrel wants you to follow it.`,
    buttonActions:
      payload?.filter == "success"
        ? []
        : [
            {
              isItem: true,
              action: () => {
                const character = useCharacterStore();
                character.addToInventory("pinecone", "dream-squirrel4");
              },
            },
          ],
    dialogSequence: () => [
      {
        characterId: "squirrel",
        text: "Puolue! Puolue!",
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-squirrel5");
        },
      },
    ],
  }),

  "dream-squirrel5": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel5",
    background: bgDefault,
    text: "",
  }),

  "dream-squirrel-give-up": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel-give-up",
    background: bgDefault,
    text:
      `The squirrel is right. You could never expect to be compete with its arboreal superiority. ` +
      `Better to slide back down the tree before you get hurt.`,
    dialogSequence: () => [
      {
        characterId: "squirrel",
        text: "Putoat! Putoat!",
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-squirrel-give-up1");
        },
      },
    ],
  }),

  "dream-squirrel-give-up1": (payload?: ScenePayload): Scene => ({
    id: "dream-squirrel-give-up1",
    background: bgDefault,
    text: `Dang squirrel! It's becoming aggressive, jumping on and off your head and yanking your hair.`,

    dialogSequence: () => [
      {
        characterId: "squirrel",
        text: "PUTOAT! PUTOAT!",
        onClick: () => {
          const game = useGameStore();
          game.goToScene("dream-tree-chase", { filter: "squirrel" });
        },
      },
    ],
  }),
};
