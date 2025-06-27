import { Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { getTreeChaseText } from "../helper-functions/text-helper-functions";

export const dreamTreeChaseScenes = {
  "dream-tree-chase": (payload?: ScenePayload): Scene => ({
    id: "dream-tree-chase",
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
          const itemCount = character.inventory.length;
          game.goToScene("dream-tree-chase-game-intro", {
            text:
              itemCount < 4
                ? "You feel unencumbered and are able to move nimbly."
                : itemCount < 7
                  ? "You feel somewhat burdened by the weight of your bag. Your agility is limited."
                  : "Why did you pick up so much stuff? You can barely move to save your life.",
          });
        },
      },
      {
        isItem: true,
        action: () => {
          const character = useCharacterStore();
          character.addToInventory("pine-needles", "dream-tree-chase");
        },
      },
    ],
  }),

  "dream-tree-chase-game-intro": (payload?: ScenePayload): Scene => ({
    id: "dream-tree-chase-game-intro",
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
  }),

  "dream-tree-chase-game": (payload?: ScenePayload): Scene => ({
    id: "dream-tree-chase-game",
    background: bgDefault,
    text: "",
    miniGameId: "tree-chase",
  }),

  "dream-tree-chase-game-win": (payload?: ScenePayload): Scene => ({
    //TODO: aspect?
    id: "dream-tree-chase-game-win",
    background: bgDefault,
    text:
      `It suddenly occurs to you that your legs feel unprecedentedly supple. Like those little rubber caps you ` +
      `used to get from the toy dispensers at the front of the grocery store. You'd put a quarter in and you'd get a ` +
      `round clear plastic capsule with a colorful little rubber cap inside. You'd turn the cap inside-out, ` +
      `set it down and...` +
      `^^FWOOM!!! You're leaping and bounding through the air, {springing off the pine needles} like a tree frog on a trampoline.`,
    buttonActions: [
      {
        action: () => {
          // const game = useGameStore();
          // game.goToScene("dream-tree-chase-fly");
          //TODO:
        },
      },
    ],
  }),

  "dream-tree-chase-game-lose": (payload?: ScenePayload): Scene => ({
    //TODO: aspect?
    id: "dream-tree-chase-game-lose",
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
          // const game = useGameStore();
          // game.goToScene("dream-tree-chase-sink");
          //TODO:
        },
      },
    ],
  }),
};
