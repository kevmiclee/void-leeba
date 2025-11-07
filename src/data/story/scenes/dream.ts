import { ButtonAction, Scene } from "@/types/story";
import bgForest from "@/assets/images/backgrounds/pine-forest.png";
import crunchyWalkingSound from "@/assets/audio/story/sounds/crunchy-walking.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { getTreeChopOutcome } from "../helper-functions/outcome-helper-functions";
import { fateContest } from "../helper-functions/roll-helper-functions";
import { useAspectStore } from "@/stores/aspects";
import { useAudioStore } from "@/stores/audio";
import { defineScene } from "../story";

//TODO: MUSIC dream music

const sectionId = "dream";

export const dreamScenes = {
  dream: defineScene("dream", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      text:
        `"Ah, to sleep, perchance to dream."^^...^^A great forest towers over you. The ground is layered with pine needles. ` +
        `The stacked needles must be at least 40cm deep! It feels like this bed of needles is just barely supporting your weight and ` +
        `if you were any heavier, you might start to sink. Your progress is slow while you focus on balance. ` +
        `{Pick up a handful of pine needles.}`,
      choices: () => [{ text: "Admire the trees.", next: "dream1" }],
      buttonActions: () => [
        {
          isItem: true,
          action: () => {
            const character = useCharacterStore();
            character.addToInventory("pine-needles", this.id);
          },
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playGenericSound(crunchyWalkingSound);
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `Admire the trees`,
            next: "dream1",
          },
        ],
      },
    };
  }),

  dream1: defineScene("dream1", function (payload): Scene {
    const character = useCharacterStore();
    const didFaeries = character.flags["did-faeries"];
    const didNap = character.flags["did-nap"];

    // payload?.filter == "fromNap"
    //       ? `You're able to wake up from the dream within the dream, but you're still dreaming. You are back ` +
    //         `where you started.^^`
    //       :

    return {
      id: this.id,
      background: bgForest,
      text:
        `${
          didFaeries || didNap
            ? "You find your way back to where you started.^^"
            : ""
        }` +
        `Trees! Grand, huge, awe-inspiring trees! The crisp, beautiful pine scent cuts through the pervading damp of the forest. ` +
        `${payload?.filter == "noSquirrel" ? "" : "There are squirrels and spiders scurrying and spindling. {Try to catch one}. "}` +
        `Above, the pines' trunks creak. Their creaky columns bend into the sky. You gaze at the trees, taking them in like a worshipper ` +
        `at the shrine. The woody deities are set in bas-relief against the backdrop of clear sky.` +
        `${
          didFaeries
            ? ""
            : `^^A group of {pine faeries} emerge from the knot of a nearby tree. They circle around you, teasing you, ` +
              `plucking your eyelashes and spitting in your nostril holes. They swirl away off to your left. {Follow them}.`
        }` +
        `^^Dad-gum forest faeries. Yep, if you had you an ax, you'd {start chopping} down all these trees, right this second. If you don't, ` +
        `someone else surely will. A place like this? Prime real estate. Goodbye paradise, hello parking lot!` +
        `${
          didNap
            ? ""
            : `^^Forget the faeries, forget the trees, forget the parking lot... look at that brain-colored moss over there! ` +
              `Mmm, awww.... you wanna curl up and {take a nap}.`
        }` +
        `^^{Pick up a handful of pine needles.}`,
      buttonActions: () => {
        const character = useCharacterStore();
        const game = useGameStore();

        let buttonActions: ButtonAction[] = [
          {
            id: "squirrel",
            action: () => {
              character.gainStat("athletics", 1, this.id);
              game.goToScene("dream-squirrel");
            },
          },
          {
            id: "faeries",
            dictionaryEntryId: "hongatar",
          },
          {
            id: "faeries",
            action: () => {
              character.gainStat("blueMagic", 1, this.id);
              game.goToScene("dream-faeries");
            },
          },
          {
            id: "chop",
            action: () => {
              character.gainStat("shitheadedness", 1, this.id);
              game.goToScene("dream-chop");
            },
          },
          {
            id: "nap",
            action: () => {
              character.gainStat("will", 1, this.id);
              game.goToScene("dream-within-a-dream");
            },
          },
          {
            isItem: true,
            action: () => {
              character.addToInventory("pine-needles", this.id);
            },
          },
        ];

        buttonActions = buttonActions.filter(
          (action) =>
            (!character.flags["did-faeries"] || action.id != "faeries") &&
            (!character.flags["did-nap"] || action.id != "nap")
        );

        return buttonActions;
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `Try to catch one`,
            next: "dream-squirrel",
            stat: {
              id: "athletics",
              amount: 1,
            },
          },
          {
            text: `Follow them`,
            next: "dream-faeries",
            stat: {
              id: "blueMagic",
              amount: 1,
            },
          },
          {
            text: `start chopping`,
            next: "dream-chop",
            stat: {
              id: "shitheadedness",
              amount: 1,
            },
          },
          {
            text: `take a nap`,
            next: "dream-within-a-dream",
            stat: {
              id: "will",
              amount: 1,
            },
          },
        ],
      },
    };
  }),

  "dream-within-a-dream": defineScene(
    "dream-within-a-dream",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `It's so serene and beautiful here. It would be funny if you could go to sleep again when you ` +
          `are already dreaming. You pick a spot to nap on the brain moss, sinking into it, supple and cozy.` +
          `^^{Pick up a handful of brain moss.}`,
        buttonActions: () => [
          {
            isItem: true,
            action: () => {
              const character = useCharacterStore();
              character.addToInventory("brain-moss", this.id);
            },
          },
        ],
        choices: () => [
          { text: "Fall asleep.", next: "dream-within-a-dream1" },
          {
            text: `Nevermind.`,
            next: "dream1",
            payload: { filter: "nap" },
            onChoose: () => {
              const character = useCharacterStore();
              character.setFlag("did-nap", true, this.id);
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `Fall asleep`,
              next: "dream-within-a-dream1",
            },
            {
              text: `Nevermind`,
              next: "dream1",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream1": defineScene(
    "dream-within-a-dream1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text: `You fell asleep on some brain moss. Now you are dreaming twice.`,
        choices: () => [
          {
            text: `Wait... will I fall asleep <i>forever</i>?`,
            next: "dream-within-a-dream2",
          },
          {
            text: `No, that's silly. Don't entertain that worry.`,
            next: "dream-within-a-dream-refuse",
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `Wait... will I fall asleep forever?`,
              next: "dream-within-a-dream2",
            },
            {
              text: `Nevermind`,
              next: "dream-within-a-dream-refuse",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream-refuse": defineScene(
    "dream-within-a-dream-refuse",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text: `The concept of dreaming twice is so scary! {What if you don't wake up?}`,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-within-a-dream-refuse1");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `WHat if you don't wake up?`,
              next: "dream-within-a-dream-refuse1",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream-refuse1": defineScene(
    "dream-within-a-dream-refuse1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text: `Too late! You fell asleep anyway. Radiating anxiety, your raw nerves attack you. 
          After a spiral of overthinking, you notice that you are hugging a brightly colored mushroom. 
          You can tell because your face is right up against it and your arms are surrounding it. 
          The mushroom smells like marshmallows, pencil shavings, sad carnivals and tests. Its flesh is soft, 
          like a rotting orange. You recoil. {What a gross mushroom!}`,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-within-a-dream-refuse2");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `What a gross mushroom!`,
              next: "dream-within-a-dream-refuse2",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream-refuse2": defineScene(
    "dream-within-a-dream-refuse2",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        //TODO: Break this up
        text:
          `What a cruddy day! You feel off.^^You hear yourself say aloud, "Eugh! What a wash."` +
          `^^You lean back for a while just admiring the mushroom's disgustingness, worrying that you'll never wake up again.` +
          `^^{Grab up a handful of the mushroom's flesh.}` +
          `^^You begin to hear a faint thudding noise like the labored heartbeat of ` +
          `some distant goliath. Oh no. Your dreaming was weak, filled with worry. A foreboding sense of doom cuts forces ` +
          `you to {awaken back into the first dream}.`,
        buttonActions: () => [
          {
            isItem: true,
            action: () => {
              const character = useCharacterStore();
              character.addToInventory("mushroom", this.id);
            },
          },
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-tree-chase", { filter: "dream" });
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `awaken back into the first dream`,
              next: "dream-tree-chase",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream2": defineScene(
    "dream-within-a-dream2",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        //TODO: break this up
        text:
          `Completely serene, without a worry in your mind, you fall asleep in your dream. {You breathe in}.` +
          `^^A new dream! You notice that you are hugging a brightly colored mushroom! You can tell because ` +
          `your face is right up against it and your arms are embracing it. The mushroom smells like a marshmallow ` +
          `pencil, graphite and sugar. Its flesh is soft, yet springy. {What a special mushroom}! What a special day! ` +
          `You feel content.^^You hear yourself say aloud, "Wow! What a colorful mushroom."` +
          `^^You lean back for a while just admiring the mushroom's shape.` +
          `^^{Grab up a handful of the mushroom's flesh.}` +
          `^^Looking up from the shroom, {a hilly landscape sprawls out before you}.`,
        buttonActions: () => [
          {
            isItem: true,
            action: () => {
              const character = useCharacterStore();
              character.addToInventory("mushroom", this.id);
            },
          },
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-within-a-dream3");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `a hilly landscape sprawls out before you`,
              next: "dream-within-a-dream3",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream3": defineScene(
    "dream-within-a-dream3",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        //TODO: break this up
        text:
          `The landscape expands into a void panorama, filling every corner of the emptiness as you inhale deeper. ` +
          `Day, night, day, night. Seasons cycle and time dutifully carves the terrain with imperceptible changes.` +
          `^^You've never had a dream like this before. Usually it's packing, or missing busses.` +
          `^^Settlements form. Clusters of huts dot the hillsides. Farms appear in patchwork sewn around the huts.` +
          `^^You begin to exhale and as you do, the huts morph into vinyl-sided cookie-cutter houses. Spidery networks of highways ` +
          `fan out and spread upon the landscape like mycelia exploring a forest floor.` +
          `^^A hill flattens here, a plain rises into a mountain there. The houses multiply and spread out along the roads, and from ` +
          `their coverage, large buildings and the grey of steel and asphalt overtake the vegetative green. The stars in the night ` +
          `sky become less, the clarity of day is obscured by haze. The quiet is consumed by an ever-surmounting hum.` +
          `^^{Breathe in.}`,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-within-a-dream4");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `Breathe in`,
              next: "dream-within-a-dream4",
            },
          ],
        },
      };
    }
  ),

  "dream-within-a-dream4": defineScene(
    "dream-within-a-dream4",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        //TODO: break this up
        text:
          `The hum intensifies until it almost becomes unbearable, making you wince. It reaches a cresecendo and ` +
          `slowly begins its ebb back into entropic silence, leaving a ghostly impression of its power in your memory.` +
          `^^With each milliliter of breath that exits your lungs, the pervading artifical glow diminishes and the stars ` +
          `return to their former glory, one by one.^^Buildings topple and decay as trees and fields reclaim the landscape. ` +
          `The highways wither like wisps of smoke disintegrating into the hills. The once imposing grids of farms and ` +
          `neighborhoods fade into amorphous wilderness.^^Day, night, day, night. Seasons cycle and time dutifully carves ` +
          `the terrain with imperceptible changes. All is as it was before.^^{Open your eyes}.`,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("hypno");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `Open your eyes`,
              next: "hypno",
            },
          ],
        },
      };
    }
  ),

  "dream-chop": defineScene("dream-chop", function (payload): Scene {
    return {
      id: this.id,
      background: bgForest,
      //use tree-chase music
      //TODO: break this up
      text:
        `You have chosen to swing a dream ax at a dream tree.` +
        `^^Looking down, you see a single-headed carbon-fiber ax in your left hand. Heh. Hefty!` +
        `^^You spit into each of your palms and aiming at the nearest tree, you get a good look at its bark. ` +
        `The brown armor is thick and full of a maze of paths, following the pine's vertical growth. ` +
        `You position the ax over your left shoulder, and closing one eye, take a swing at a healthy angle to hit the tree.`,
      onPageLoad: () => {
        const character = useCharacterStore();
        const hasAxe = character.hasItem("axe");

        if (!hasAxe) {
          character.addToInventory("axe", this.id);
        }
      },

      choices: () => [
        {
          text: "THUNK",
          onChoose: () => {
            const character = useCharacterStore();
            const treeAthletics = 0;

            const roll = fateContest(character.athletics.value, treeAthletics);
            const outcome = getTreeChopOutcome(roll);

            if (outcome.success) {
              const aspects = useAspectStore();
              aspects.addAspect("tree-murderer");
            }

            const game = useGameStore();
            game.goToScene("dream-tree-chase", { filter: outcome.text });

            if (roll <= 0) {
              character.removeFromInventory("axe");
            }
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `THUNK`,
            next: "dream-tree-chase",
            aspect: "tree-murderer",
          },
        ],
      },
    };
  }),
};
