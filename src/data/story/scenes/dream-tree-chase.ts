import { Scene } from "@/types/story";
import bgForest from "@/assets/images/backgrounds/pine-forest.png";
import treeFallingSound from "@/assets/audio/story/sounds/tree-falling.mp3";
import { useCharacterStore } from "@/stores/character";
import { getTreeChaseText } from "../helper-functions/text-helper-functions";
import { defineScene } from "../story";
import { useAudioStore } from "@/stores/audio";
import { useEffectsStore } from "@/stores/effects";
import { useAspectStore } from "@/stores/aspects";

// MUSIC - tree-chase
//TODO: MUSIC - tree-chase game

const sectionId = "dream-tree-chase";

export const dreamTreeChaseScenes = {
  "dream-tree-chase": defineScene(
    "dream-tree-chase",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          getTreeChaseText(payload?.filter) +
          `As the dull sound resounds, it is joined by a chorus of snapping, cracking, creaking. ` +
          `Soft at first, {the din grows louder and louder}.`,
        buttonActions: () => [
          {
            next: "dream-tree-chase1",
          },
        ],
        onPageLoad: () => {
          const audioStore = useAudioStore();
          audioStore.playGenericSound(treeFallingSound);
        },
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase1": defineScene(
    "dream-tree-chase1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          getTreeChaseText(payload?.filter) +
          `A tree slams as it splinters and crashes into the ground behind you, making you jump. 
          Another tree falls, narrowly missing your shoulder. A tree that wasn't even there before 
          begins to fall directly overhead. You dive out of the way at the last moment.^^The trees are chasing you!`,
        choices: () => {
          const character = useCharacterStore();
          const itemWeight = character.inventory.reduce(
            (sum, item) => sum + item.weight,
            0,
          );

          return [
            {
              text: "Run.",
              next: "dream-tree-chase-game-intro",
              payload: {
                text:
                  itemWeight < 4
                    ? "You feel unencumbered and are able to move nimbly."
                    : itemWeight < 7
                      ? "You feel somewhat burdened by the weight of your bag. Your agility is limited."
                      : "Why did you pick up so much stuff? You can barely move to save your life.",
              },
            },
            {
              text: "Pick up a handful of pine needles",
              items: [{ id: "pine-needles", amount: 1 }],
            },
          ];
        },
        onPageLoad: () => {
          const audioStore = useAudioStore();
          audioStore.playGenericSound(treeFallingSound);
        },
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase-game-intro": defineScene(
    "dream-tree-chase-game-intro",

    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          (payload?.text ?? "") +
          "^^Trees are falling all around you. You have to {dodge them}.",
        buttonActions: () => [
          {
            next: "dream-tree-chase-game",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase-game": defineScene(
    "dream-tree-chase-game",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text: "",
        miniGameId: "tree-chase",
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `win`,
              next: "dream-tree-chase-game-win",
              aspect: "part-bird",
            },
            {
              text: `lose`,
              next: "dream-tree-chase-game-lose",
              aspect: "all-your-bones-are-broken",
            },
          ],
        },
      };
    },
  ),

  "dream-tree-chase-game-win": defineScene(
    "dream-tree-chase-game-win",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `It suddenly occurs to you that your legs feel unprecedentedly supple. Like those little rubber poppers you ` +
          `used to get from the toy dispenser at the front of the grocery store. You'd put a quarter in the slot, twist the knob, ` +
          `and out came a round clear plastic capsule with a colorful little rubber popper inside. You'd turn the popper inside-out, ` +
          `set it down and...` +
          `^^FWOOM!!! You're leaping and bounding through the air, {springing off the pine needles} like a tree frog on a trampoline.`,
        buttonActions: () => [
          {
            next: "dream-tree-chase-fly",
          },
        ],
        onPageLoad: () => {
          const aspects = useAspectStore();
          aspects.addAspect("part-bird");
        },
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase-game-lose": defineScene(
    "dream-tree-chase-game-lose",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `You feel yourself starting to sink. You try to run but you can't move your legs, like in a bad dream. ` +
          `You remember that you're dreaming and realize that's exactly what this is. A bad dream.` +
          `^^The trees are closing in on you now and there is nothing you can do.` +
          `^^WHACK!^THOOMB!!^CRACK!!!` +
          `^^You're mangled in a barrage of falling trees. {All your bones are broken.}`,
        buttonActions: () => [
          {
            next: "dream-tree-chase-sink",
          },
        ],
        onPageLoad: () => {
          const aspects = useAspectStore();
          aspects.addAspect("all-your-bones-are-broken");
        },
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase-fly": defineScene(
    "dream-tree-chase-fly",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        //TODO: IMAGE - forest viewed from above
        //TODO: SOUND - speeding into space sound
        text:
          `As you vault above the canopy, a great bird grabs you by your turtleneck. It carries you {high above the forest}. ` +
          `You can see the tree line and a sprawling countryside beyond it. Before long, you feel a sudden shift in trajectory and you ` +
          `and the bird shooting up, up, up at a very high speed. Craning your neck back, you see a pair of huge tatooed arms that ` +
          `have latched on to the bird. The arms are attached to a rocket. The tattoo-armed rocket propels you and the bird into space, 
          {just beyond the atmosphere}.`,
        onPageLoad: () => {
          const effects = useEffectsStore();
          effects.toggleIsZoomedOut(true);
        },
        buttonActions: () => [
          {
            next: "dream-tree-chase-fly1",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase-fly1": defineScene(
    "dream-tree-chase-fly1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        //TODO: SOUND - crashing back down to earth in an explosion sound
        // TODO: IMAGE - explosion animation -> crater
        //TODO: STORY - now you end up at the party as a part-bird
        text:
          `Reaching its zenith, there is a moment of quiet, motionless stillness, then you're re-entering the atmosphere, careening faster and faster ` +
          `back down until you all meet the forest floor in an explosive blast. You find yourself at the center of a massive crater. ` +
          `There is no sign of the bird, but you now have wings. The force of the blast must have fused your body and the bird's in some magical union.`,
        onPageLoad: async () => {
          const effects = useEffectsStore();
          await new Promise((resolve) => setTimeout(resolve, 2000));
          effects.toggleIsZoomedOut(false);
          effects.toggleIsSpinning(true);
          //TODO: UI/UX - toggle spin off;
          const aspects = useAspectStore();
          aspects.addAspect("part-bird");
        },
      };
    },
  ),

  "dream-tree-chase-sink": defineScene(
    "dream-tree-chase-sink",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `As you lay there motionless, in a mangled heap, conciousness slipping, what appears to be one of the faeries ` +
          `from before enters your vision.`,
        dialogSequence: () => [
          {
            characterId: "faerie1",
            text:
              `Oh little pölkkypää... What you tried to do to the trees was not nice! I guess you learned your lesson though. ` +
              `Rest now.`,
            next: "dream-tree-chase-sink1",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "dream-tree-chase-sink1": defineScene(
    "dream-tree-chase-sink1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgForest,
        text:
          `The faerie has something round and shiny in its hand, which it inserts into your mouth. ` +
          `You have no choice but to {swallow it}.`,
        buttonActions: () => [
          {
            next: "party-eggcorn",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),
};
