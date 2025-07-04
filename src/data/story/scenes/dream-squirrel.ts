import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import fallingOutOfTreeSound from "@/assets/audio/story/sounds/falling-out-of-tree.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { fateContest } from "../helper-functions/roll-helper-functions";
import { useAspectStore } from "@/stores/aspects";
import { getFollowSquirrelText } from "../helper-functions/text-helper-functions";
import { defineScene } from "../story";
import { useAudioStore } from "@/stores/audio";

//TODO: MUSIC - squirrel

export const dreamSquirrelScenes = {
  "dream-squirrel": defineScene("dream-squirrel", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `You lock in on a squirrel. Its grey body is a corkscrew streak around the trunk. It's time to give chase. ` +
        `You straddle the trunk, feeling the roughness of the bark tugging at your turtleneck as you shimmy up. Just a little closer... ` +
        `The squirrel is right there! Its little face, filled with alarm (or is it amusement?), fills you with determination.`,
      choices: () => [
        { text: "Reach for the closest branch.", next: "dream-squirrel1a" },
        {
          text: "Keep shimmying up.",
          next: "dream-squirrel1b",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainStat("athletics", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `Reach for the closest branch.`,
            redirect: "dream-squirrel1a",
          },
          {
            label: `Keep shimmying up.`,
            redirect: "dream-squirrel1b",
            stat: {
              id: "athletics",
              amount: 1,
            },
          },
        ],
      },
    };
  }),

  "dream-squirrel1a": defineScene(
    "dream-squirrel1a",
    function (payload): Scene {
      return {
        id: this.id,
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
        metadata: {
          sectionId: "dream-squirrel",
          routes: [
            {
              label: `Keep shimmying up`,
              redirect: "dream-squirrel1b",
            },
          ],
        },
      };
    }
  ),

  "dream-squirrel1b": defineScene(
    "dream-squirrel1b",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `You keep shimmying up the trunk, past the first branch. Your arms and legs are ` +
          `giving out. The squirrel hasn't moved. The way it watches you, vacillating between ` +
          `tepid curiosity and utter indifference, suggests the thought of you as a threat could ` +
          `not be further from its mind.`,
        choices: () => {
          const character = useCharacterStore();

          return [
            {
              text: "Push yourself even harder.",
              next: "dream-squirrel2",
              onChoose: () => {
                character.gainStat("will", 1, this.id);
              },
            },
            {
              text: "This was a bad idea. Shimmy back down before you get hurt.",
              next: "dream-squirrel-give-up",
              onChoose: () => {
                character.loseStat("will", 1, this.id);
              },
            },
          ];
        },
        metadata: {
          sectionId: "dream-squirrel",
          routes: [
            {
              label: `Push yourself even harder.`,
              redirect: "dream-squirrel2",
              stat: {
                id: "will",
                amount: 1,
              },
            },
            {
              label: `This was a bad idea. Shimmy back down before you get hurt.`,
              redirect: "dream-squirrel-give-up",
              stat: {
                id: "will",
                amount: -1,
              },
            },
          ],
        },
      };
    }
  ),

  "dream-squirrel2": defineScene("dream-squirrel2", function (payload): Scene {
    return {
      id: this.id,
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
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `squirrel dialog click`,
            redirect: "dream-squirrel3",
          },
        ],
      },
    };
  }),

  "dream-squirrel3": defineScene("dream-squirrel3", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text: `The little vermin is taunting you!`,
      choices: () => [
        {
          text: "In a last ditch effort, dart your hand out to snatch the furball.",
          onChoose: () => {
            const character = useCharacterStore();
            const squirrelAthletics = 2;
            const roll = fateContest(
              character.athletics.value,
              squirrelAthletics
            );
            //TODO: more granualar outcomes

            const filter = roll >= 0 ? "success" : "fail";
            const game = useGameStore();

            if (roll >= 0) {
              character.setFlag("caught-squirrel", true);
              game.goToScene("dream-squirrel4-success");
            } else {
              character.setFlag("caught-squirrel", false);
              game.goToScene("dream-squirrel4-fail");
            }
          },
        },
      ],
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `snatch the furball success`,
            redirect: "dream-squirrel4-success",
          },
          {
            label: `snatch the furball fail`,
            redirect: "dream-squirrel4-fail",
          },
        ],
      },
    };
  }),

  "dream-squirrel4-success": defineScene(
    "dream-squirrel4-success",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `Sweet synergy! You grabbed that sucker! It almost squirms free before you can recover from the ` +
          `shock of actually catching it. Overjoyed and triumphant, you shimmy back down to the forest floor ` +
          `with an easy swagger. The squirrel crawls up your sleeve and runs a circle around your neck. ` +
          `You made a friend!^^The squirrel wants you to follow it.`,

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
        metadata: {
          sectionId: "dream-squirrel",
          routes: [
            {
              label: `squirrel dialog click`,
              redirect: "dream-squirrel5",
            },
          ],
        },
      };
    }
  ),

  "dream-squirrel4-fail": defineScene(
    "dream-squirrel4-fail",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `Pfft. Of course you missed. Who catches a squirrel with their bare hands? As a result, you lose ` +
          `your grip and fall backwards like a defeated villain in slow-motion.` +
          `^^You hit the ground with a soft thud and several pinecones scatter down around you. {Pick up a pinecone.}` +
          `^^The squirrel wants you to follow it.`,
        buttonActions: [
          {
            isItem: true,
            action: () => {
              const character = useCharacterStore();
              character.addToInventory("pinecone", this.id);
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
        onPageLoad: () => {
          const audioStore = useAudioStore();
          audioStore.playGenericSound(fallingOutOfTreeSound);
        },
        metadata: {
          sectionId: "dream-squirrel",
          routes: [
            {
              label: `squirrel dialog click`,
              redirect: "dream-squirrel5",
            },
          ],
        },
      };
    }
  ),

  "dream-squirrel5": defineScene("dream-squirrel5", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `As you follow the squirrel, it is obvious the creature is very excited about something. ` +
        `You faintly hear what might be voices in unison like a sing-song chant, growing louder as you progress. ` +
        `This must be where the squirrel is leading you.`,
      choices: () => {
        const character = useCharacterStore();

        return [
          {
            text: `"Where are we going?"`,
            next: "dream-squirrel6",
            payload: { filter: "where" },
            onChoose: () => {
              character.setManners("polite");
            },
          },
          {
            text: `"What is that infernal chanting?"`,
            next: "dream-squirrel6",
            payload: { filter: "what" },
            onChoose: () => {
              character.setManners("depressing");
            },
          },
          {
            text: `"Are we there yet?"`,
            next: "dream-squirrel6",
            payload: { filter: "what" },
            onChoose: () => {
              character.setManners("rude");
            },
          },
          {
            text: `Why am I following a squirrel?`,
            next: "dream-squirrel6",
            payload: { filter: "why" },
            onChoose: () => {
              character.setManners("weird");
            },
          },
        ];
      },
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `"Where are we going?"`,
            redirect: "dream-squirrel6",
            manners: "polite",
          },
          {
            label: `"What is that infernal chanting"`,
            redirect: "dream-squirrel6",
            manners: "depressing",
          },
          {
            label: `"Are we there yet?"`,
            redirect: "dream-squirrel6",
            manners: "rude",
          },
          {
            label: `Why am I following a squirrel?`,
            redirect: "dream-squirrel6",
            manners: "weird",
          },
        ],
      },
    };
  }),

  "dream-squirrel6": defineScene("dream-squirrel6", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        getFollowSquirrelText(payload?.filter) +
        `^^All the while the chanting is growing louder. You're sure it's voices now. ` +
        `It sounds like they are chanting, "We're going to a party! We're going to a party!" ` +
        `From time to time, the squirrel turns around, egging you on.`,
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Puolue! Puolue!",
          onClick: () => {
            const game = useGameStore();
            game.goToScene("dream-squirrel7");
          },
        },
      ],
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `squirrel dialog click`,
            redirect: "dream-squirrel7",
          },
        ],
      },
    };
  }),

  "dream-squirrel7": defineScene("dream-squirrel7", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `You arrive at a clearing. The {pine faeries} you saw earlier are all laying about on the ground, ` +
        `apparently unconscious.^^The squirrel is darting here and there, sniffing the hongatar and chittering ` +
        `excitedly.`,
      buttonActions: [
        {
          dictionaryEntryId: "hongatar",
        },
      ],
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Puolue! Puolue!",
          onClick: () => {
            const game = useGameStore();
            game.goToScene("dream-squirrel8");
          },
        },
      ],
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `squirrel dialog click`,
            redirect: "dream-squirrel8",
          },
        ],
      },
    };
  }),

  "dream-squirrel8": defineScene("dream-squirrel8", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `The squirrel finds an eggcorn and begins to nibble it. Suddenly, its whiskers twitch a ` +
        `few times and it swoons until it falls to ground unconcsious, just like the hongatar.`,
      dialogSequence: () => [
        {
          characterId: "squirrel",
          text: "Pu...o..lue.... Puo.....",
        },
      ],
      choices: () => [
        { text: "Inspect the hongatar", next: "dream-squirrel9" },
        { text: "Inspect the squirrel", next: "dream-squirrel9" },
      ],
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `Inspect the hongatar`,
            redirect: "dream-squirrel9",
          },
          {
            label: `Inspect the squirrel`,
            redirect: "dream-squirrel9",
          },
        ],
      },
    };
  }),

  "dream-squirrel9": defineScene("dream-squirrel9", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      text:
        `${
          payload?.filter == "hongatar"
            ? `Yep. They're definitely unconscious, but they're breathing regularly.`
            : `Poor little fella. It's actually snoring softly with eggcorn crumbs on its furry chest.`
        } ` +
        `You notice eggcorns scattered about near where all the hongatar lay, just like the one you ` +
        `saw the squirrel eat. You see an uneaten one by your foot. {Inspect the eggcorn.}`,
      buttonActions: [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("dream-faeries5");
          },
        },
      ],
      metadata: {
        sectionId: "dream-squirrel",
        routes: [
          {
            label: `Inspect the eggcorn`,
            redirect: "dream-faeries5",
          },
        ],
      },
    };
  }),

  "dream-squirrel-give-up": defineScene(
    "dream-squirrel-give-up",
    function (payload): Scene {
      return {
        id: this.id,
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
        metadata: {
          sectionId: "dream-squirrel",
          routes: [
            {
              label: `squirrel dialog click`,
              redirect: "dream-squirrel-give-up1",
            },
          ],
        },
      };
    }
  ),

  "dream-squirrel-give-up1": defineScene(
    "dream-squirrel-give-up1",
    function (payload): Scene {
      return {
        id: this.id,
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
        metadata: {
          sectionId: "dream-squirrel",
          routes: [
            {
              label: `squirrel dialog click`,
              redirect: "dream-tree-chase",
            },
          ],
        },
      };
    }
  ),
};
