import { Choice, Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import bgBurlyBush from "@/assets/images/backgrounds/burly-bush.png";
import spookyMusic from "@/assets/audio/story/background-themes/spooky1.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { fateContest } from "../helper-functions/roll-helper-functions";
import { getBlackDogOutcome } from "../helper-functions/outcome-helper-functions";
import {
  getBlackDogDoneText,
  getDrunkMannersRescueText,
  getDrunkRescueText,
} from "../helper-functions/text-helper-functions";
import { useDrawerStore } from "@/stores/drawer";
import { defineScene } from "../story";
import { CharacterId } from "@/types/character";
import { useAspectStore } from "@/stores/aspects";
import { useEffectsStore } from "@/stores/effects";

//TODO: MUSIC - Add bass drum

const sectionId = "black-dog";

export const blackDogScenes = {
  "black-dog": defineScene("black-dog", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `They run past you to the skatepark. As they lope off, you turn around and lean against a tree.` +
        `^^Your attention shifts to the field as the distant lights of the highway pull your gaze, {like shooting stars}.`,
      buttonActions: () => [
        {
          next: "black-dog0",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog0": defineScene("black-dog0", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `Below your gaze, you think you can see a form hunched across the field from you. Like a dark and burly bush, ` +
        `you can't make out its features. You are sure that was not there a minute ago.`,
      choices: () => [
        {
          text: "Go closer.",
          next: "black-dog1",
          stats: [{ id: "will", amount: 1 }],
          flags: [{ id: "black-dog-readiness", value: -1 }],
          onChoose: () => {
            const effects = useEffectsStore();
            effects.toggleCloser(true);
          },
        },
        {
          text: "Back away.",
          next: "black-dog1",
          stats: [{ id: "will", amount: 1, isLost: true }],
          flags: [{ id: "black-dog-readiness", value: 1 }],
          onChoose: () => {
            const effects = useEffectsStore();
            effects.toggleBackAway(true);
          },
        },
        {
          text: "Don't move a muscle.",
          next: "black-dog1",
          flags: [{ id: "black-dog-readiness", value: 0 }],
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog1": defineScene("black-dog1", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `Sensing your presence, the dark star advances at a clip. As the distance closes, you notice rust red fur, ` +
        `interspersed with oily black. You feel riveted to the spot, {unable to look away}.`,
      buttonActions: () => [
        {
          next: "black-dog1a",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog1a": defineScene("black-dog1a", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `You recall the words of your sister the last time she read your fortune using those weird blocks and strings, ` +
        `"You must be careful! There is a Red Dog. And, there is a Black Dog." But...` +
        `^^...this is both? `,
      choices: () => {
        const character = useCharacterStore();
        const blackDogReadiness = character.flags["black-dog-readiness"] ?? 0;
        return [
          {
            text: "Start acting careful.",
            next: "black-dog2",
            flags: [
              { id: "black-dog-readiness", value: blackDogReadiness + 1 },
            ],
          },
          {
            text: `You don't believe any of that nonsense.`,
            next: "black-dog2",
            flags: [
              { id: "black-dog-readiness", value: blackDogReadiness - 1 },
            ],
          },
        ];
      },
      metadata: { sectionId },
    };
  }),

  "black-dog2": defineScene("black-dog2", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `As the Redblack dog approaches, you observe with burgeoning nausea that it has a humanlike face but with dog flesh, ` +
        `and full dark eyes. The dog snarls, and it sounds like a hungry snarl. As it closes the distance to you, you see ` +
        `that its hair is caught in snarls too.{ Ungroomed...}`,
      buttonActions: () => [
        {
          next: "black-dog2a",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog2a": defineScene("black-dog2a", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text: `The human-faced dog circles you, growling, barking, with human-like lips that reveal its strong 
        jaw and saliva-wet teeth. The redblack dog lunges at your ankles, its teeth snapping around your heels 
        as you leap back.`,
      dialogSequence: () => [
        {
          characterId: "black-dog",
          text: `<i>Grrrrrrrrrrr</i>`,
          popUp: true,
        },
      ],
      choices: () => [
        {
          text: "Good puppy.",
          next: "black-dog-good",
          stats: [{ id: "blueMagic", amount: 1 }],
        },
        {
          text: "Defend yourself.",
          next: "black-dog-bad",
          stats: [{ id: "athletics", amount: 1 }],
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog-good": defineScene("black-dog-good", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text: `You remember back to your childhood, to a dog you had, Calla. Calla, so stinky, so sweet, so loyal. 
        The contrast between your childhood pet and this creature is striking. You feel few of the same feelings, 
        despite the bodily similarity. And yet, you just love dogs, and you know that if you follow certain procedures, 
        a mean-seeming dog may {flip onto its back}.`,
      buttonActions: () => [
        {
          next: "black-dog-good0",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog-good0": defineScene("black-dog-good0", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text: `The dog submits to your touch, and leans against you. You find a collar with a locket wrapped around 
        its neck. The locket is glowing faintly with a sigul of a crescent moon. The dog does not react to you 
        touching the locket, and you think to {open it}.`,
      buttonActions: () => [
        {
          next: "black-dog-good1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog-good1": defineScene("black-dog-good1", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `Inside the locket is a dried bit of plant matter that smells of vanilla, and a taped lock of hair.` +
        `^^As you hold these items, they dissolve in your palm, and you feel an energy fill you with intention.`,
      choices: () => [
        {
          text: `Heal the human-faced dog's face back into a dog's face.`,
          next: "black-dog-heal-dog",
          flags: [{ id: "healed-dog", value: "dog" }],
        },
        {
          text: `Heal the human-faced dog's body back into a human's body.`,
          next: "black-dog-heal-human",
          flags: [{ id: "healed-dog", value: "human" }],
        },
      ],
      onPageLoad: () => {
        const effects = useEffectsStore();
        effects.toggleDisappearingItem(true);
      },
      metadata: { sectionId },
    };
  }),

  "black-dog-heal-dog": defineScene(
    "black-dog-heal-dog",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `The creature's body seems to glow blue. Its human features morph and melt into the shape of a ` +
          `regular dog, keeping its general size, shape, and coloration, albeit red and black piebald.` +
          `^^The dog looks up at you, panting, its eyes searching you cautiously for treats or pets.`,
        choices: () => {
          const choices: Choice[] = [];

          const character = useCharacterStore();
          if (character.hasItem("dog-food")) {
            7;

            choices.push({
              text: "Give it some dog food.",
              flags: [{ id: "gave-dog-food", value: true }],
              manners: [{ id: "polite", amount: 1 }],
              items: [{ id: "dog-food", amount: 1, isLost: true }],
              next: "black-dog-done",
              payload: { filter: "food-dog" },
            });
          }

          choices.push(
            {
              text: "Give it some pets.",
              next: "black-dog-done",
              manners: [{ id: "polite", amount: 1 }],
              payload: { filter: "pets-dog" },
            },
            {
              text: "Do nothing.",
              next: "black-dog-done",
              manners: [{ id: "depressing", amount: 1 }],
              payload: { filter: "nothing-dog" },
            }
          );

          return choices;
        },
        metadata: {
          sectionId,
          routes: [
            {
              text: "Give it some dog food.",
              next: "black-dog-done",
              manners: "polite",
            },
            {
              text: "Give it some pets.",
              next: "black-dog-done",
              manners: "polite",
            },
            {
              text: "Do nothing.",
              next: "black-dog-done",
              manners: "depressing",
            },
          ],
        },
      };
    }
  ),

  "black-dog-heal-human": defineScene(
    "black-dog-heal-human",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `The creature's body glows pink. Its dog features seem to morph and melt into the shape ` +
          `of a human, kneeling on the ground, its limbs lengthening and its fur receeding and shifting into ` +
          `a mop of red-black hair on the top of the skull, and faint hairs on the back and arms.`,
        choices: () => {
          const choices: Choice[] = [];

          const character = useCharacterStore();
          if (character.hasItem("dog-food")) {
            7;

            choices.push({
              text: "Give it some dog food.",
              stats: [{ id: "shitheadedness", amount: 1 }],
              manners: [{ id: "rude", amount: 1 }],
              flags: [{ id: "gave-human-dog-food", value: true }],
              items: [{ id: "dog-food", amount: 1, isLost: true }],
              next: "black-dog-done",
              payload: { filter: "food-human" },
            });
          }

          choices.push(
            {
              text: "Give it some pets.",
              next: "black-dog-done",
              manners: [{ id: "weird", amount: 1 }],
              payload: { filter: "pets-human" },
            },
            {
              text: "Do nothing.",
              next: "black-dog-done",
              manners: [{ id: "polite", amount: 1 }],
              payload: { filter: "nothing-human" },
            }
          );

          return choices;
        },
        metadata: {
          sectionId,
          routes: [
            {
              text: "Give it some dog food.",
              next: "black-dog-done",
              stat: {
                id: "shitheadedness",
                amount: 1,
              },
              manners: "rude",
            },
            {
              text: "Give it some pets.",
              next: "black-dog-done",
              manners: "weird",
            },
            {
              text: "Do nothing.",
              next: "black-dog-done",
              manners: "polite",
            },
          ],
        },
      };
    }
  ),

  "black-dog-heal-human-redux": defineScene(
    "black-dog-heal-human-redux",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        audio: spookyMusic,
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
      };
    }
  ),

  "black-dog-bad": defineScene("black-dog-bad", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,

      text:
        `Its bloodshot eyes stare into yours with shameless hunger. The smell of stale smoke like the stench of clothing bathed ` +
        `in campfire fills your nostrils. {It begins to howl}.`,
      buttonActions: () => [
        {
          next: "black-dog-bad1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog-bad1": defineScene("black-dog-bad1", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,

      text: `The sound is eerily human, distincly <i>evil</i> in its gleeful exuberance. Its lips 
        purse, and its cheeks tighen around its jaw, baring a mouth filled with human teeth. 
        A stomach-seizing terror builds in you and you know... 
        ^^{This kind of creature feeds on fear}.`,
      buttonActions: () => [
        {
          next: "black-dog-bad1a",
        },
      ],
      metadata: { sectionId },
    };
  }),

  "black-dog-bad1a": defineScene("black-dog-bad1a", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,

      text: `You shall try a gambit, or it may best ye. You must latch onto a solid wavelength, to stabilize, secure your base.`,
      dialogSequence: () => [
        {
          characterId: "black-dog-scary",
          text: "AWOOOOOOOOOOO!!!!",
          onClick: () => {
            const character = useCharacterStore();
            const blackDogAthletics = 3;
            const blackDogReadiness =
              character.flags["black-dog-readiness"] ?? 0;

            // If the player is closer to the dog or thinks their sister's fortune-telling is hogwash,
            // it's harder to dodge its attack
            const playerAthletics =
              character.athletics.value + blackDogReadiness;

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
      metadata: {
        sectionId,
        routes: [
          {
            text: "getBlackDogOutcome success",
            next: "black-dog-bad-success",
          },
          {
            text: "getBlackDogOutcome fail",
            next: "black-dog-bad-fail",
          },
        ],
      },
    };
  }),

  "black-dog-bad-success": defineScene(
    "black-dog-bad-success",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text: payload?.text ?? "",
        buttonActions: () => [
          {
            action: () => {
              const aspects = useAspectStore();
              aspects.addAspect("animal-abuser");
            },
            next: "black-dog-feel-bad",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-bad-fail": defineScene(
    "black-dog-bad-fail",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text: payload?.text ?? "",
        buttonActions: () => [
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
        metadata: {
          sectionId,
          routes: [
            {
              text: "has dog food",
              next: "black-dog-bad-fail-food",
            },
            {
              text: "does not have dog food",
              next: "black-dog-bad-fail-drunks",
            },
          ],
        },
      };
    }
  ),

  "black-dog-bad-fail-food": defineScene(
    "black-dog-bad-fail-food",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `...^^But wait! You're still here... You open your eyes. The redblack dog is harmlessly sniffing ` +
          `around your pack. That's when you remember--the dog food! Sweet serendiptity! Cautiously, you ` +
          `open your pack and {let the creature take the food}.`,
        buttonActions: () => [
          {
            action: () => {
              const character = useCharacterStore();
              character.removeFromInventory("dog-food");
            },
            next: "black-dog-done",
            filter: "food-dog",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-bad-fail-drunks": defineScene(
    "black-dog-bad-fail-drunks",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text: getDrunkRescueText(payload?.filter),
        dialogSequence: () => {
          if (payload?.filter) {
            return [
              {
                characterId: payload.filter as CharacterId,
                text:
                  `Hey, my friend! I see you've met Paul. He's not as scary as he looks. The little fella's jus' hangry. ` +
                  `Don't you have any dog food? No worries. I owe you one from before!`,
                onClick: () => {
                  const game = useGameStore();
                  game.goToScene("black-dog-bad-fail-drunks-help", {
                    filter: payload.filter,
                  });
                },
              },
            ];
          } else {
            const character = useCharacterStore();
            const manners = character.getManners();
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
                text: `They were awfully <i>${manners}</i> for someone who's <i>not from around here</i>.`,
              },
              {
                characterId: "drunk1",
                text: `Facts. ${getDrunkMannersRescueText(manners)}`,
                onClick: () => {
                  const game = useGameStore();

                  if (manners == "polite") {
                    game.goToScene("black-dog-bad-fail-drunks-help");
                  } else {
                    game.goToScene("black-dog-bad-fail-drunks-leave");
                  }
                },
              },
            ];
          }
        },
        metadata: {
          sectionId,
          routes: [
            {
              text: "sided with a drunk or is polite",
              next: "black-dog-bad-fail-drunks-help",
            },
            {
              text: "not from around here and not polite",
              next: "black-dog-bad-fail-drunks-leave",
            },
          ],
        },
      };
    }
  ),

  "black-dog-bad-fail-drunks-help": defineScene(
    "black-dog-bad-fail-drunks-help",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `The ${payload?.filter ? "drunk sets" : "drunks set"}  a can of dog food on the ground. The redblack dog retreats ` +
          `and busies itself with the food.`,
        dialogSequence: () => [
          {
            characterId: payload?.filter
              ? (payload?.filter as CharacterId)
              : "drunk1",
            text: `Now you owe <i>${payload?.filter ? "me" : "us"}</i> one!`,
          },
        ],
        choices: () => [
          {
            text: `"Thanks a lot!"`,
            next: "black-dog-done-drunks",
            payload: { filter: payload?.filter },
            manners: [{ id: "polite", amount: 1 }],
          },
          {
            text: `"I didn't ask for your help..."`,
            next: "black-dog-done-drunks",
            payload: { filter: payload?.filter },
            manners: [{ id: "rude", amount: 1 }],
          },
          {
            text: `"I wish you had just let it have me..."`,
            next: "black-dog-done-drunks",
            payload: { filter: payload?.filter },
            manners: [{ id: "depressing", amount: 1 }],
          },
          {
            text: `Go in for a hug.`,
            next: "black-dog-done-drunks",
            payload: { filter: payload?.filter },
            manners: [{ id: "weird", amount: 1 }],
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-bad-fail-drunks-leave": defineScene(
    "black-dog-bad-fail-drunks-leave",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `They leave. And miracualously, so does the redblack dog. It seems to recognize the drunks, ` +
          `and follows them happily.^^` +
          `You feel embarassed for what just happened. {And alone}.`,
        buttonActions: () => [
          {
            next: "black-dog-feel-bad1",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-feel-bad": defineScene(
    "black-dog-feel-bad",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        dialogSequence: () => {
          const character = useCharacterStore();
          const drunkChoice = character.flags["drunk-choice"];
          const characterId = (drunkChoice ?? "drunk1") as CharacterId;
          return [
            {
              characterId: characterId,
              text: "Animal abuser!!",
              next: "black-dog-feel-bad1",
            },
          ];
        },
        text: "",
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-feel-bad1": defineScene(
    "black-dog-feel-bad1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `But...its face is human, you say. Does that make it okay?` +
          `^^Does that make you want to kick it?` +
          `^^Do you hate the human-faced dog because it's pieces of you?` +
          `^^Or was it because it was {so scary}?`,
        buttonActions: () => [
          {
            next: "black-dog-viral",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-viral": defineScene("black-dog-viral", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `It doesn't matter how you spin it. One of the drunks recorded it all on their phone, ` +
        `and they've already posted to social media.` +
        `^^Your Drip💧 is flooded with new notifications. You've {gone viral}.`,
      onPageLoad: () => {
        const drawer = useDrawerStore();
        drawer.togglePhoneIsCrazy();
      },
      buttonActions: () => [
        {
          action: () => {
            const drawer = useDrawerStore();
            drawer.toggleDrawer();
            drawer.setDrawerView("phone");
          },
        },
      ],
      metadata: {
        sectionId,
        routes: [
          {
            text: "viewed viral comments",
            next: "black-dog-viral1",
          },
        ],
      },
    };
  }),

  "black-dog-viral1": defineScene(
    "black-dog-viral1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `Brutal... you try to console yourself with the Oscar Wilde quip you conveniently memorized.` +
          `^^<i>“There's only one thing in the world worse than being talked about, and that is not being talked about."</i>` +
          `^^{It's not helping...}`,
        buttonActions: () => [
          {
            next: "black-dog-viral2",
          },
        ],
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-viral2": defineScene(
    "black-dog-viral2",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text:
          `You're done with this park. Part of you wishes you could find those drunks to give them a piece of your mind. ` +
          `Maybe they went {into the neighborhood}.` + // Or you could {check by that snow pile}.
          `^^Another part of you just wants to {go home to your room} and forget about today.`,
        buttonActions: () => {
          const effects = useEffectsStore();

          return [
            {
              next: "neighborhood",
              action: () => {
                effects.clearEffects();
              },
            },
            // {
            //   next: "snow-pile",
            //   action: () => {
            //     effects.clearEffects();
            //   },
            // },
            {
              next: "room",
              action: () => {
                effects.clearEffects();
              },
            },
          ];
        },
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-done-drunks": defineScene(
    "black-dog-done-drunks",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgBurlyBush,
        audio: spookyMusic,
        text: getBlackDogDoneText(payload?.filter ?? ""),
        dialogSequence: () => {
          const character = useCharacterStore();
          const manners = character.getManners();

          const mannersText =
            manners == "rude"
              ? "Rude!"
              : manners == "weird"
                ? "Weird!"
                : manners == "depressing"
                  ? "Depressing! "
                  : "";

          const dialogs = [];

          if (mannersText != "") {
            dialogs.push({
              characterId: payload?.filter
                ? (payload.filter as CharacterId)
                : "drunk2",
              text: mannersText,
            });
          }

          dialogs.push({
            characterId: payload?.filter
              ? (payload.filter as CharacterId)
              : "drunk2",
            text: `Oh dang! A snowpile! Cool! Bye!`,
          });

          return dialogs;
        },
        choices: () => {
          const effects = useEffectsStore();

          return [
            {
              text: "Go into the neighborhood.",
              next: "neighborhood",
              payload: { filter: "black-dog" },
              onChoose: () => {
                effects.clearEffects();
              },
            },
            // {
            //   text: `Follow the drunk${payload?.filter ? "" : "s"}.`,
            //   next: "snow-pile",
            //   onChoose: () => {
            //     effects.clearEffects();
            //   },
            // },
            {
              text: "Go back home.",
              next: "room",
              onChoose: () => {
                effects.clearEffects();
              },
            },
          ];
        },
        metadata: { sectionId },
      };
    }
  ),

  "black-dog-done": defineScene("black-dog-done", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text: getBlackDogDoneText(payload?.filter ?? ""),
      choices: () => {
        const effects = useEffectsStore();

        return [
          {
            text: "Follow it.",
            next: "neighborhood",
            payload: { filter: "black-dog" },
            onChoose: () => {
              effects.clearEffects();
            },
          },
          // {
          //   text: "Play on the snowpile.",
          //   next: "snow-pile",
          //   onChoose: () => {
          //     effects.clearEffects();
          //   },
          // },
          {
            text: "Go back home.",
            next: "room",
            onChoose: () => {
              effects.clearEffects();
            },
          },
        ];
      },
      metadata: { sectionId },
    };
  }),
};
