import { Choice, Scene, ScenePayload } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { fateContest } from "../helper-functions/roll-helper-functions";
import { getBlackDogOutcome } from "../helper-functions/outcome-helper-functions";
import {
  getDrunkMannersRescueText,
  getDrunkRescueText,
} from "../helper-functions/text-helper-functions";
import { useDrawerStore } from "@/stores/drawer";

export const blackDogScenes = {
  "black-dog": (payload?: ScenePayload): Scene => ({
    id: "black-dog",
    background: bgDefault,
    text:
      `They run past you to the skatepark. As they lope off, you turn around and lean against a tree.` +
      `^^Your attention shifts to the field as the distant lights of the highway pull your gaze, like shooting stars.` +
      `^^Below your gaze, you think you can see a form hunched across the field from you. Like a dark and burly bush, ` +
      `you can't make out its features. You are sure that was not there a minute ago.`,
    choices: () => [
      {
        text: "Go closer.",
        next: "black-dog1",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("closer-to-black-dog", "true");
          character.gainStat("will", 1);
        },
      },
      {
        text: "Back away.",
        next: "black-dog1",
        onChoose: () => {
          const character = useCharacterStore();
          character.setFlag("closer-to-black-dog", "false");
          character.loseStat("will", 1);
        },
      },
    ],
  }),

  "black-dog1": (payload?: ScenePayload): Scene => ({
    id: "black-dog1",
    background: bgDefault,
    text:
      `Before you move a muscle, the dark star advances at a clip. As the distance closes, you notice rust red fur, ` +
      `interspersed with oily black. You feel riveted to the spot, unable to look away.` +
      `^^You recall the words of your sister the last time she read your fortune using those weird blocks and strings, ` +
      `"You must be careful! There is a Red Dog. And, there is a Black Dog." But...` +
      `^^...this is both? ` +
      `^^{You start acting careful.}`,
    buttonActions: [
      {
        action: () => {
          const store = useGameStore();
          store.goToScene("black-dog2");
        },
      },
    ],
  }),

  "black-dog2": (payload?: ScenePayload): Scene => ({
    id: "black-dog2",
    background: bgDefault,
    text:
      `As the Redblack dog approaches, you observe with rising nausea that it has a humanlike face but with dog flesh, ` +
      `and full dark eyes. The dog snarls, and it sounds like a hungry snarl. As it closes the distance to you, you see ` +
      `that its hair is caught in snarls too. Ungroomed...^^The human-faced dog circles you, growling, barking, with ` +
      `human-like lips that reveal its strong jaw and saliva-wet teeth. The redblack dog lunges at your ankles, its teeth ` +
      `snapping around your heels as you leap back.`,
    dialogSequence: () => [
      {
        characterId: "black-dog",
        text: `<i>Grrrrrrrrrrr</i>`,
        popUp: true,
      },
    ],
    choices: () => [
      { text: "Good puppy.", next: "black-dog-good" },
      { text: "Defend yourself.", next: "black-dog-bad" },
    ],
  }),

  "black-dog-good": (payload?: ScenePayload): Scene => ({
    id: "black-dog-good",
    background: bgDefault,
    text:
      `You remember back to your childhood, to a dog you had, Calla. Calla, so stinky, so sweet, so loyal. The contrast between ` +
      `your childhood pet and this creature is striking. You feel few of the same feelings, despite the bodily similarity. ` +
      `And yet, you just love dogs, and you know that if you follow certain procedures, a mean-seeming dog may flip onto its back.` +
      `^^The dog submits to your touch, and leans against you. You find a collar with a locket wrapped around its neck. ` +
      `The locket is glowing faintly with a sigul of a crescent moon. The dog does not react to you touching the locket, and you ` +
      `think to {open it}.`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("black-dog-good1");
        },
      },
    ],
  }),

  "black-dog-good1": (payload?: ScenePayload): Scene => ({
    id: "black-dog-good1",
    background: bgDefault,
    text:
      `Inside the locket is a dried bit of plant matter that smells of vanilla, and a taped lock of hair.` +
      `^^As you hold these items, they dissolve in your palm, and you feel an energy fill you with intention.`,
    choices: () => {
      const character = useCharacterStore();
      return [
        {
          text: `Heal the human-faced dog's face back into a dog's face.`,
          next: "black-dog-heal-dog",
          onChoose: () => {
            character.setFlag("healed-dog", "dog");
          },
        },
        {
          text: `Heal the human-faced dog's body back into a human's body.`,
          next: "black-dog-heal-human",
          onChoose: () => {
            character.setFlag("healed-dog", "human");
          },
        },
      ];
    },
    onPageLoad: () => {
      const game = useGameStore();
      game.updateShowDisappearingItem(true);
    },
  }),

  "black-dog-heal-dog": (payload?: ScenePayload): Scene => ({
    id: "black-dog-heal-dog",
    background: bgDefault,
    text:
      `The creature's body seems to glow blue. Its human features morph and melt into the shape of a ` +
      `regular dog, keeping its general size, shape, and coloration, albeit red and black piebald.` +
      `^^The dog looks up at you, panting, its eyes searching you cautiously for treats or pets. Seeing mostly ` +
      `surprise and wonder in your eyes, but no action, it turns tail to traipse across the field, stopping here ` +
      `and there to sniff the ground, but disappearing into the neighborhood.`,
    choices: () => {
      const choices: Choice[] = [];

      const character = useCharacterStore();
      if (character.hasItem("dog-food")) {
        choices.push({
          text: "Give it some dog food.",
          onChoose: () => {
            character.setFlag("gave-dog-food", "true");
            character.removeFromInventory("dog-food");
          },
          next: "black-dog-heal-dog-food",
        });
      }

      //TODO: other choices
      return choices;
    },
  }),

  "black-dog-heal-dog-food": (payload?: ScenePayload): Scene => ({
    id: "black-dog-heal-dog-food",
    background: bgDefault,
    text: "",
    //TODO: the dog eats the food
  }),

  "black-dog-heal-human": (payload?: ScenePayload): Scene => ({
    id: "black-dog-heal-human",
    background: bgDefault,
    text:
      `The creature's body seems to glow pink. Its dog features seem to morph and melt into the shape ` +
      `of a human, kneeling on the ground, its limbs lengthening and its fur receeding and shifting into ` +
      `a mop of red-black hair on the top of the skull, and faint hairs on the back and arms.` +
      `^^The man looks up into your eyes, looking confused and wild, looking down at himself, he covers his ` +
      `gonads, and turns tail to sprint across the field into the neighborhood.`,
    choices: () => [],
    //TODO: choices
  }),

  "black-dog-heal-human-redux": (payload?: ScenePayload): Scene => ({
    id: "black-dog-heal-human-redux",
    background: bgDefault,
    text:
      `I saw the Moondog again today. Under the empty playground slide in the park. An empty locket hangs around their neck. ` +
      `They contemplate the slide and my hide. I work up the guts to say, “You're not a dog now, what the heck!”Moondog says, ` +
      `“You made me this way, and it's been so long since I've been just one thing. Don't you think you ought to take responsibility?”` +
      `I thought about it, and with my gait, I rose to the top of the slide's deck. I purse my lips, open my chest, and sing. ` +
      `The Moon-former-dog pipes up, “You've got real ability! Though, please, could you show me how to be human?” I looked the Moondog ` +
      `in its eyes, eyes unchanged through the transformation. Then I took them to a museum. But they wouldn't let the Moondog in. ` +
      `Something about <i>parts flapping in the wind</i>. So I took the Moondog to a Lost and Found full of clothes they could fit into.` +
      `Then I brought the Moondog to a swamp, the wastewater treatment plant, the grocery store, a shelter, and a job placement agency.` +
      `The Moondog said, “I don't want to be human if I have to be poor, to stop my howling before I get too loud, and keep things I ` +
      `find inside a door, inside a box within a box, in a box. I'm out.” I never saw the Moondog again, until I went to buy some used CDs. ` +
      `I heard the Moondog at the counter—I stop, I freeze. There they were, winking back at me, bearded, beastly, and barking up the tree` +
      `—of music—it was music to my ease.`,
  }),

  "black-dog-bad": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad",
    background: bgDefault,

    text:
      `Its bloodshot eyes stare into yours with shameless hunger. The smell of stale smoke like the stench of clothing bathed ` +
      `in campfire fills your nostrils. It begins to howl. The sound is eerily human, distincly <i>evil</i> in its gleeful exuberance. ` +
      `Its lips purse, and its cheeks tighen around its jaw, baring a mouth filled with human teeth. A stomach-seizing terror builds in you and you know...` +
      `^^<i>This kind of creature feeds on fear.</i>` +
      `^^You shall try a gambit, or it may best ye. You must latch onto a solid wavelength, to stabilize, secure your base.`,
    dialogSequence: () => [
      {
        characterId: "black-dog-scary",
        text: "AWOOOOOOOOOOO!!!!",
        onClick: () => {
          const character = useCharacterStore();
          const blackDogAthletics = 3;

          //If the player is closer to the dog, it's harder to dodge its attack
          const playerAthletics =
            character.athletics +
            (character.flags["closer-to-black-dog"] == "true" ? 0 : 1);

          const roll = fateContest(playerAthletics, blackDogAthletics);

          const outcome = getBlackDogOutcome(roll);

          const game = useGameStore();

          if (outcome.success) {
            game.goToScene("black-dog-bad-success", { text: outcome.text });
          } else {
            game.goToScene("black-dog-bad-fail", { text: outcome.text });
          }
        },
      },
    ],
  }),

  "black-dog-bad-success": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-success",
    background: bgDefault,
    text: payload?.text ?? "",
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("black-dog-feel-bad");
        },
      },
    ],
  }),

  "black-dog-bad-fail": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-fail",
    background: bgDefault,
    text: payload?.text ?? "",
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          const character = useCharacterStore();
          const hasDogFood = character.inventory.some(
            (item) => item.id == "dog-food"
          );
          const drunkChoice = character.flags["drunk-choice"];

          if (hasDogFood) {
            game.goToScene("black-dog-bad-fail-food");
          } else {
            game.goToScene("black-dog-bad-fail-drunks", {
              filter: drunkChoice,
            });
          }
        },
      },
    ],
  }),

  "black-dog-bad-fail-food": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-fail-food",
    background: bgDefault,
    text:
      `...^^But wait! You're still here... You open your eyes. The redblack dog is harmlessly sniffing ` +
      `around your pack. That's when you remember -- the dog food! Sweet serendiptity! Cautiously, you ` +
      `open your pack and {let the creature take the food}.`,
    buttonActions: [
      {
        action: () => {
          const character = useCharacterStore();
          const game = useGameStore();
          character.removeFromInventory("dog-food");
          game.goToScene("black-dog-bad-fail-food1");
        },
      },
    ],
  }),

  "black-dog-bad-fail-food1": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-fail-food1",
    background: bgDefault,
    text: ``,
    dialogSequence: () => [
      {
        characterId: "black-dog",
        text: "<i>*whimpers happily*</i>",
      },
    ],
    //TODO:
  }),

  "black-dog-bad-fail-drunks": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-fail-drunks",
    background: bgDefault,
    text: getDrunkRescueText(payload?.filter),
    dialogSequence: () => {
      if (payload?.filter) {
        return [
          {
            characterId: payload.filter == "sun" ? "drunk1" : "drunk2",
            text:
              `Hey, my friend! I see you've met Paul. He's not as scary as he looks. The little fella's jus' hangry. ` +
              `Don't you have any dog food?`,
          },
          {
            characterId: payload.filter == "sun" ? "drunk1" : "drunk2",
            text: `No worries. I owe you one from before!`,
            onClick: () => {
              const game = useGameStore();
              game.goToScene("black-dog-bad-fail-drunks-help", {
                filter: "single",
              });
            },
          },
        ];
      } else {
        const character = useCharacterStore();
        const drunkManners = character.flags["drunk-manners"];
        return [
          {
            characterId: "drunk2",
            text: `Look! It's Mr. <i>"Not-from-around-here"</i>!`,
          },
          {
            characterId: "drunk1",
            text: `HAHAHA!! Looks like they made a new friend!`,
          },
          {
            characterId: "drunk2",
            text: `They were awfully <i>${drunkManners}</i> for someone who's <i>not from around here</i>.`,
          },
          {
            characterId: "drunk1",
            text: `Facts. ${getDrunkMannersRescueText(drunkManners)}`,
            onClick: () => {
              const game = useGameStore();

              if (drunkManners == "polite") {
                game.goToScene("black-dog-bad-fail-drunks-help", {
                  filter: "both",
                });
              } else {
                game.goToScene("black-dog-bad-fail-drunks-leave", {
                  filter: "both",
                });
              }
            },
          },
        ];
      }
    },
  }),

  "black-dog-bad-fail-drunks-help": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-fail-drunks-help",
    background: bgDefault,
    text:
      `The ${payload?.filter == "both" ? "drunks scatter" : "drunk scatters"}  some dog food on the ground. The redblack dog retreats ` +
      `and busies itself with the food.`,
  }),

  "black-dog-bad-fail-drunks-leave": (payload?: ScenePayload): Scene => ({
    id: "black-dog-bad-fail-drunks-leave",
    background: bgDefault,
    text:
      `They leave. And miracualously, so does the redblack dog. It seems to recognize the drunks and follows them happily.^^` +
      `You feel embarassed for what just happened. {And alone}.`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("black-dog-viral");
        },
      },
    ],
  }),

  "black-dog-feel-bad": (payload?: ScenePayload): Scene => ({
    id: "black-dog-feel-bad",
    background: bgDefault,
    text:
      `You animal abuser!! But...its face is human, you say. Does that make it okay?` +
      `^^Do you hate the human-faced dog because it's pieces of you?` +
      `^Did you kick the dog-bodied human because it's pieces of you?` +
      `^^Or was it because it was {<i>so scary</i>}?`,
    buttonActions: [
      {
        action: () => {
          const game = useGameStore();
          game.goToScene("black-dog-viral");
        },
      },
    ],
  }),

  "black-dog-viral": (payload?: ScenePayload): Scene => ({
    id: "black-dog-viral",
    background: bgDefault,
    text: "Suddenly, it's like a bomb went off on your phone. Alerts chirping like crazy.",
    onPageLoad: () => {
      const drawer = useDrawerStore();
      drawer.togglePhoneIsCrazy();
    },

    //TODO:
    // Your phone is popping off and there is a video of you all over social media.
    // the drunk you didn't agree with records you
    //  or if you said I'm not from around here, they are both recording you especially because you 'not from around here'
    //   use the drunkManners to dictate some dialog
    // toggle phone back to isCrazy: false
  }),
};
