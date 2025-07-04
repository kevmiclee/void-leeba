import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import treeFallingSound from "@/assets/audio/story/sounds/tree-falling.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { getTreeChaseText } from "../helper-functions/text-helper-functions";
import { allYourBonesAreBroken, jackBeNimble } from "@/data/aspects";
import { defineScene } from "../story";
import { useAudioStore } from "@/stores/audio";

// MUSIC - tree-chase
//TODO: MUSIC - tree-chase game

export const dreamTreeChaseScenes = {
  "dream-tree-chase": defineScene(
    "dream-tree-chase",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          getTreeChaseText(payload?.filter) +
          `As the dull sound resounds, it is joined by a chorus of snapping, cracking, creaking. ` +
          `Soft at first, the din grows louder and louder.^^A tree slams as it splinters and crashes ` +
          `into the ground behind you, making you jump. Another tree falls, narrowly missing ` +
          `your shoulder. A tree that wasn't even there before begins to fall directly overhead. ` +
          `You dive out of the way at the last moment.` +
          `^^The trees are chasing you!` +
          `^^You {run} forward through the forest.` +
          `^^{Pick up a handful of pine needles.}`,
        buttonActions: [
          {
            action: () => {
              const game = useGameStore();
              const character = useCharacterStore();
              const itemWeight = character.inventory.reduce(
                (sum, item) => sum + item.weight,
                0
              );
              game.goToScene("dream-tree-chase-game-intro", {
                text:
                  itemWeight < 4
                    ? "You feel unencumbered and are able to move nimbly."
                    : itemWeight < 7
                      ? "You feel somewhat burdened by the weight of your bag. Your agility is limited."
                      : "Why did you pick up so much stuff? You can barely move to save your life.",
              });
            },
          },
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
          audioStore.playGenericSound(treeFallingSound);
        },
        metadata: {
          sectionId: "dream-tree-chase",
          routes: [
            {
              label: `run`,
              redirect: "dream-tree-chase-game-intro",
            },
          ],
        },
      };
    }
  ),

  "dream-tree-chase-game-intro": defineScene(
    "dream-tree-chase-game-intro",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          (payload?.text ?? "") +
          "^^Trees are falling all around you. You have to {dodge them}.",
        buttonActions: [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-tree-chase-game");
            },
          },
        ],
        metadata: {
          sectionId: "dream-tree-chase",
          routes: [
            {
              label: `dodge them`,
              redirect: "dream-tree-chase-game",
            },
          ],
        },
      };
    }
  ),

  "dream-tree-chase-game": defineScene(
    "dream-tree-chase-game",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: "",
        miniGameId: "tree-chase",
        metadata: {
          sectionId: "dream-tree-chase",
          routes: [
            {
              label: `win`,
              redirect: "dream-tree-chase-game-win",
              aspect: jackBeNimble,
            },
            {
              label: `lose`,
              redirect: "dream-tree-chase-game-lose",
              aspect: allYourBonesAreBroken,
            },
          ],
        },
      };
    }
  ),

  "dream-tree-chase-game-win": defineScene(
    "dream-tree-chase-game-win",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `It suddenly occurs to you that your legs feel unprecedentedly supple. Like those little rubber poppers you ` +
          `used to get from the toy dispenser at the front of the grocery store. You'd put a quarter in the slot, twist the knob, ` +
          `and out came a round clear plastic capsule with a colorful little rubber popper inside. You'd turn the popper inside-out, ` +
          `set it down and...` +
          `^^FWOOM!!! You're leaping and bounding through the air, {springing off the pine needles} like a tree frog on a trampoline.`,
        buttonActions: [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-tree-chase-fly");
            },
          },
        ],
      };
    }
  ),

  "dream-tree-chase-game-lose": defineScene(
    "dream-tree-chase-game-lose",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `You feel yourself starting to sink. You try to run but you can't move your legs, like in a bad dream. ` +
          `You remember that you're dreaming and realize that's exactly what this is. A bad dream.` +
          `^^The trees are closing in on you now and there is nothing you can do.` +
          `^^WHACK!^THOOMB!!^CRACK!!!` +
          `^^You're mangled in a barrage of falling trees. {All your bones are broken.}`,
        buttonActions: [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("dream-tree-chase-sink");
            },
          },
        ],
      };
    }
  ),

  "dream-tree-chase-fly": defineScene(
    "dream-tree-chase-fly",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: `fly`,
        //TODO:
      };
    }
  ),

  "dream-tree-chase-sink": defineScene(
    "dream-tree-chase-sink",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: `sink`,
        //TODO:
      };
    }
  ),
};
