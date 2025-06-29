import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { getTreeChopOutcome } from "../helper-functions/outcome-helper-functions";
import { fateContest } from "../helper-functions/roll-helper-functions";
import { useAspectStore } from "@/stores/aspects";
import { treeMurderer } from "@/data/aspects";

export const dreamScenes = {
  dream: (payload?: ScenePayload): Scene => ({
    id: "dream",
    background: bgDefault,
    text:
      `"Ah, to sleep, perchance to dream."^^...^^A great forest towers over you. The ground is layered with pine needles. ` +
      `The stacked needles must be at least 40cm deep! It feels like this bed of needles is just barely supporting your weight and ` +
      `if you were any heavier, you might start to sink. Your progress is slow while you focus on balance. ` +
      `{Pick up a handful of pine needles.}`,
    choices: () => [{ text: "Admire the trees.", next: "dream1" }],
    buttonActions: [
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("pine-needles", "dream");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `Admire the trees`,
          redirect: "dream1",
        },
      ],
    },
  }),

  dream1: (payload?: ScenePayload): Scene => ({
    id: "dream1",
    background: bgDefault,
    text:
      `${
        payload?.filter == "fromNap"
          ? `You're able to wake up from the dream within the dream, but you're still dreaming. You are back ` +
            `where you started.^^`
          : payload?.filter
            ? "You find your way back to where you started.^^"
            : ""
      }` +
      `Trees! Grand, huge, awe-inspiring trees! The crisp, beautiful pine scent cuts through the pervading damp of the forest. ` +
      `${payload?.filter == "noSquirrel" ? "" : "There are squirrels and spiders scurrying and spindling. {Try to catch one}. "}` +
      `Above, the pines' trunks creak. Their creaky columns bend into the sky. You gaze at the trees, taking them in like a worshipper ` +
      `at the shrine. The woody deities are set in bas-relief against the backdrop of clear sky.` +
      `${
        payload?.filter == "noFaeries"
          ? ""
          : `^^A group of {pine faeries} emerge from the knot of a nearby tree. They circle around you, teasing you, ` +
            `plucking your eyelashes and spitting in your nostril holes. They swirl away off to your left.^{Follow them}.`
      }` +
      `^^Dad-gum forest faeries. Yep, if you had you an ax, you'd {start chopping} down all these trees, right this second. If you don't, ` +
      `someone else surely will. A place like this? Prime real estate. Goodbye paradise, hello parking lot!` +
      `${
        payload?.filter == "nap"
          ? ""
          : `^^Forget the faeries, forget the trees, forget the parking lot... look at that brain-colored moss over there! ` +
            `Mmm, awww.... you wanna curl up and {take a nap}.^^{Pick up a handful of pine needles.}`
      }`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("dream-squirrel");
        },
      },
      {
        dictionaryEntryId: "hongatar",
      },
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("dream-faeries");
        },
      },
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("dream-chop");
        },
      },
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("dream-within-a-dream");
        },
      },
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("pine-needles", "dream1");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `Try to catch one`,
          redirect: "dream-squirrel",
        },
        {
          label: `Follow them`,
          redirect: "dream-faeries",
        },
        {
          label: `start chopping`,
          redirect: "dream-chop",
        },
        {
          label: `take a nap`,
          redirect: "dream-within-a-dream",
        },
      ],
    },
  }),

  "dream-within-a-dream": (payload?: ScenePayload): Scene => ({
    id: "dream-within-a-dream",
    background: bgDefault,
    text:
      `It's so serene and beautiful here. It would be funny if you could go to sleep again when you ` +
      `are already dreaming. You pick a spot to nap on the brain moss, sinking into it, supple and cozy.` +
      `^^{Pick up a handful of brain moss.}`,
    buttonActions: [
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("brain-moss", "dream-within-a-dream");
        },
      },
    ],
    choices: () => [
      { text: "Fall asleep.", next: "dream-within-a-dream1" },
      {
        text: `Nevermind`,
        next: "dream1",
      },
    ],
    metadata: {
      routes: [
        {
          label: `Fall asleep`,
          redirect: "dream-within-a-dream1",
        },
        {
          label: `Nevermind`,
          redirect: "dream1",
        },
      ],
    },
  }),

  "dream-within-a-dream1": (payload?: ScenePayload): Scene => ({
    id: "dream-within-a-dream1",
    background: bgDefault,
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
      routes: [
        {
          label: `Wait... will I fall asleep forever?`,
          redirect: "dream-within-a-dream2",
        },
        {
          label: `Nevermind`,
          redirect: "dream-within-a-dream-refuse",
        },
      ],
    },
  }),

  "dream-within-a-dream-refuse": (payload?: ScenePayload): Scene => ({
    id: "dream-within-a-dream-refuse",
    background: bgDefault,
    text:
      `The concept of dreaming twice is so scary! What if you don't wake up? ` +
      `^^Too late, you fell asleep anyway. Radiating anxiety, your raw nerves attack you.` +
      `^^After a spiral of overthinking, you notice that you are hugging a brightly colored mushroom. ` +
      `You can tell because your face is right up against it and your arms are surrounding it. ` +
      `The mushroom smells like marshmallows, pencil shavings, sad carnivals and tests. Its flesh is soft, like a rotting orange. ` +
      `You recoil. What a gross mushroom! What a cruddy day! You feel off.^^You hear yourself say aloud, "Eugh! What a wash."` +
      `^^You lean back for a while just admiring the mushroom's disgustingness, worrying that you'll never wake up again.` +
      `^^{Grab up a handful of the mushroom's flesh.}^^You begin to hear a faint thudding noise like the labored heartbeat of ` +
      `some distant goliath. Oh no. Your dreaming was weak, filled with worry. A foreboding sense of doom cuts forces ` +
      `you to {awaken back into the first dream}.`,
    buttonActions: [
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("mushroom", "dream-within-a-dream-refuse");
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
      routes: [
        {
          label: `awaken back into the first dream`,
          redirect: "dream-tree-chase",
        },
      ],
    },
  }),

  "dream-within-a-dream2": (payload?: ScenePayload): Scene => ({
    id: "dream-within-a-dream2",
    background: bgDefault,
    text:
      `Completely serene, without a worry in your mind, you fall asleep in your dream. You breathe in.` +
      `^^A new dream! You notice that you are hugging a brightly colored mushroom! You can tell because ` +
      `your face is right up against it and your arms are embracing it. The mushroom smells like a marshmallow ` +
      `pencil, graphite and sugar. Its flesh is soft, yet springy. What a special mushroom! What a special day! ` +
      `You feel content.^^You hear yourself say aloud, "Wow! What a colorful mushroom."` +
      `^^You lean back for a while just admiring the mushroom's shape.` +
      `^^{Grab up a handful of the mushroom's flesh.}` +
      `^^Looking up from the shroom, {a hilly landscape sprawls out before you}.`,
    buttonActions: [
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("mushroom", "dream-within-a-dream2");
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
      routes: [
        {
          label: `a hilly landscape sprawls out before you`,
          redirect: "dream-within-a-dream3",
        },
      ],
    },
  }),

  "dream-within-a-dream3": (payload?: ScenePayload): Scene => ({
    id: "dream-within-a-dream3",
    background: bgDefault,
    text:
      `The landscape expands into a void panorama, filling every corner of the emptiness as you inhale deeper. ` +
      `Day, night, day, night. Seasons cycle and time dutifully carves the terrain with imperceptible changes.` +
      `^^You've never had a dream like this before. Usually it's packing, or missing busses.` +
      `^^Settlements form. Clusters of huts dot the hillsides. Farms appear in patchwork sewn around the huts.` +
      `^^You begin to exhale and as you do, the huts morph into vinyl-sided cookie-cutter houses. Spidery networks of highways ` +
      `fan out and spread upon the landscape like mycelia exploring a forest floor.` +
      `^^A hill flattens here, a plain rises into a mountain there. The houses multiply and spread out along the roads, and from ` +
      `their coverage, large buildings and the grey of steel and asphalt overtakes the vegetative green. The stars in the night ` +
      `sky become less, the clarity of day is obscured by haze. The quiet is consumed by an ever-surmounting hum.` +
      `^^{Breathe in.}`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("dream-within-a-dream4");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `Breathe in`,
          redirect: "dream-within-a-dream4",
        },
      ],
    },
  }),

  "dream-within-a-dream4": (payload?: ScenePayload): Scene => ({
    id: "dream-within-a-dream4",
    background: bgDefault,
    text:
      `The hum intensifies until it almost becomes unbearable, making you wince. It reaches a cresecendo and ` +
      `slowly begins its ebb back into entropic silence, leaving a ghostly impression of its power in your memory.` +
      `^^With each milliliter of breath that exits your lungs, the pervading artifical glow diminishes and the stars ` +
      `return to their former glory, one by one.^^Buildings topple and decay as trees and fields reclaim the landscape. ` +
      `The highways wither like wisps of smoke disintegrating into the hills. The once imposing grids of farms and ` +
      `neighborhoods fade into amorphous wilderness.^^Day, night, day, night. Seasons cycle and time dutifully carves ` +
      `the terrain with imperceptible changes. All is as it was before.^^{Open your eyes}.`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("hypno");
        },
      },
    ],
    metadata: {
      routes: [
        {
          label: `Open your eyes`,
          redirect: "hypno",
        },
      ],
    },
  }),

  "dream-chop": (payload?: ScenePayload): Scene => ({
    id: "dream-chop",
    background: bgDefault,
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
        character.addToInventory("axe", "dream-chop");
      }
    },

    choices: () => [
      {
        text: "THUNK",
        onChoose: () => {
          const character = useCharacterStore();
          const treeAthletics = 0;

          const roll = fateContest(character.athletics, treeAthletics);
          const outcome = getTreeChopOutcome(roll);

          if (outcome.success) {
            const aspects = useAspectStore();
            aspects.addAspect(treeMurderer);
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
      routes: [
        {
          label: `THUNK`,
          redirect: "dream-tree-chase",
        },
      ],
    },
  }),
};
