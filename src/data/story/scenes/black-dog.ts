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
          action: () => {
            const game = useGameStore();
            game.goToScene("black-dog0");
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "like shooting stars",
            next: "black-dog0",
          },
        ],
      },
    };
  }),

  "black-dog0": defineScene("black-dog0", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `^Below your gaze, you think you can see a form hunched across the field from you. Like a dark and burly bush, ` +
        `you can't make out its features. You are sure that was not there a minute ago.`,
      choices: () => [
        {
          text: "Go closer.",
          next: "black-dog1",
          onChoose: () => {
            const character = useCharacterStore();
            character.setFlag("closer-to-black-dog", true);
            character.gainStat("will", 1, this.id);
          },
        },
        {
          text: "Back away.",
          next: "black-dog1",
          onChoose: () => {
            const character = useCharacterStore();
            character.setFlag("closer-to-black-dog", false);
            character.loseStat("will", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Go closer.",
            next: "black-dog1",
            stat: {
              id: "will",
              amount: 1,
            },
          },
          {
            text: "Back away.",
            next: "black-dog1",
            stat: {
              id: "will",
              amount: -1,
            },
          },
        ],
      },
    };
  }),

  "black-dog1": defineScene("black-dog1", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text:
        `Before you move a muscle, the dark star advances at a clip. As the distance closes, you notice rust red fur, ` +
        `interspersed with oily black. You feel riveted to the spot, {unable to look away}.`,
      buttonActions: () => [
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("black-dog1a");
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Unable to look away",
            next: "black-dog1a",
          },
        ],
      },
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
      choices: () => [
        {
          text: "Start acting careful.",
          next: "black-dog2",
          //TODO: perks
        },
        {
          text: `It was hogwash then, and it's hogwash now.`,
          next: "black-dog2",
          //TODO: perks
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Start acting careful.",
            next: "black-dog2",
            //TODO: perks
          },
          {
            text: `It was hogwash then, and it's hogwash now.`,
            next: "black-dog2",
            //TODO: perks
          },
        ],
      },
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
          action: () => {
            const game = useGameStore();
            game.goToScene("black-dog2a");
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Ungroomed...",
            next: "black-dog2a",
          },
        ],
      },
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
          onChoose: () => {
            const character = useCharacterStore();
            character.gainStat("blueMagic", 1, this.id);
          },
        },
        {
          text: "Defend yourself.",
          next: "black-dog-bad",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainStat("athletics", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Good puppy.",
            next: "black-dog-good",
            stat: {
              id: "blueMagic",
              amount: 1,
            },
          },
          {
            text: "Defend yourself.",
            next: "black-dog-bad",
            stat: {
              id: "athletics",
              amount: 1,
            },
          },
        ],
      },
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
          action: () => {
            const game = useGameStore();
            game.goToScene("black-dog-good0");
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "flip onto its back",
            next: "black-dog-good0",
          },
        ],
      },
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
          action: () => {
            const game = useGameStore();
            game.goToScene("black-dog-good1");
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "open it",
            next: "black-dog-good1",
          },
        ],
      },
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
        const effects = useEffectsStore();
        effects.toggleDisappearingItem(true);
      },
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Heal the human-faced dog's face back into a dog's face.",
            next: "black-dog-heal-dog",
          },
          {
            text: "Heal the human-faced dog's body back into a human's body.",
            next: "black-dog-heal-human",
          },
        ],
      },
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
              onChoose: () => {
                character.setFlag("gave-dog-food", true);
                character.removeFromInventory("dog-food");
                character.gainManners("polite", 1, this.id);
              },
              next: "black-dog-done",
              payload: { filter: "food-dog" },
            });
          }

          choices.push(
            {
              text: "Give it some pets.",
              next: "black-dog-done",
              onChoose: () => {
                character.gainManners("polite", 1, this.id);
              },
              payload: { filter: "pets-dog" },
            },
            {
              text: "Do nothing.",
              next: "black-dog-done",
              onChoose: () => {
                character.gainManners("depressing", 1, this.id);
              },
              payload: { filter: "nothing-dog" },
            }
          );

          return choices;
        },
        metadata: {
          sectionId: "black-dog",
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
              onChoose: () => {
                character.gainStat("shitheadedness", 1, this.id);
                character.gainManners("rude", 1, this.id);
                character.setFlag("gave-human-dog-food", true);
                character.removeFromInventory("dog-food");
              },
              next: "black-dog-done",
              payload: { filter: "food-human" },
            });
          }

          choices.push(
            {
              text: "Give it some pets.",
              onChoose: () => {
                character.gainManners("weird", 1, this.id);
              },
              next: "black-dog-done",
              payload: { filter: "pets-human" },
            },
            {
              text: "Do nothing.",
              onChoose: () => {
                character.gainManners("polite", 1, this.id);
              },
              next: "black-dog-done",
              payload: { filter: "nothing-human" },
            }
          );

          return choices;
        },
        metadata: {
          sectionId: "black-dog",
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
          action: () => {
            const game = useGameStore();
            game.goToScene("black-dog-bad1");
          },
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "it begins to howl",
            next: "black-dog-bad1",
          },
        ],
      },
    };
  }),

  "black-dog-bad1": defineScene("black-dog-bad1", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,

      text:
        `The sound is eerily human, distincly <i>evil</i> in its gleeful exuberance. ` +
        `Its lips purse, and its cheeks tighen around its jaw, baring a mouth filled with human teeth. ` +
        `A stomach-seizing terror builds in you and you know...` +
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
              character.athletics.value +
              (character.flags["closer-to-black-dog"] ? 0 : 1);

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
        sectionId: "black-dog",
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
              const game = useGameStore();
              const aspects = useAspectStore();
              aspects.addAspect("animal-abuser");
              game.goToScene("black-dog-feel-bad");
            },
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "feel bad",
              next: "black-dog-feel-bad",
              aspect: "animal-abuser",
            },
          ],
        },
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
          sectionId: "black-dog",
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
              const game = useGameStore();
              character.removeFromInventory("dog-food");
              game.goToScene("black-dog-done", { filter: "food-dog" });
            },
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "let the creature take the food",
              next: "black-dog-done",
            },
          ],
        },
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
          sectionId: "black-dog",
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
        choices: () => {
          const character = useCharacterStore();
          return [
            {
              text: `"Thanks a lot!"`,
              next: "black-dog-done-drunks",
              payload: { filter: payload?.filter },
              onChoose: () => {
                character.gainManners("polite", 1, this.id);
              },
            },
            {
              text: `"I didn't ask for your help..."`,
              next: "black-dog-done-drunks",
              payload: { filter: payload?.filter },
              onChoose: () => {
                character.gainManners("rude", 1, this.id);
              },
            },
            {
              text: `"I wish you had just let it have me..."`,
              next: "black-dog-done-drunks",
              payload: { filter: payload?.filter },
              onChoose: () => {
                character.gainManners("depressing", 1, this.id);
              },
            },
            {
              text: `Go in for a hug.`,
              next: "black-dog-done-drunks",
              payload: { filter: payload?.filter },
              onChoose: () => {
                character.gainManners("weird", 1, this.id);
              },
            },
          ];
        },
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: `"Thanks a lot!"`,
              next: "black-dog-done-drunks",
              manners: "polite",
            },
            {
              text: `"I didn't ask for your help..."`,
              next: "black-dog-done-drunks",
              manners: "rude",
            },
            {
              text: `"I wish you had just let it have me..."`,
              next: "black-dog-done-drunks",
              manners: "depressing",
            },
            {
              text: `Go in for a hug.`,
              next: "black-dog-done-drunks",
              manners: "weird",
            },
          ],
        },
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
            action: () => {
              const game = useGameStore();
              game.goToScene("black-dog-feel-bad1");
            },
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "And alone",
              next: "black-dog-feel-bad1",
            },
          ],
        },
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
              onClick: () => {
                const game = useGameStore();
                game.goToScene("black-dog-feel-bad1");
              },
            },
          ];
        },
        text: "",
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "drunk dialog click",
              next: "black-dog-feel-bad1",
            },
          ],
        },
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
            action: () => {
              const game = useGameStore();
              game.goToScene("black-dog-viral");
            },
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "so scary",
              next: "black-dog-viral",
            },
          ],
        },
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
        `^^Your phone is flooded with new notifications. You've {gone viral}.`,
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
        sectionId: "black-dog",
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
            action: () => {
              const game = useGameStore();
              game.goToScene("black-dog-viral2");
            },
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "It's not helping",
              next: "black-dog-viral2",
            },
          ],
        },
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
          `Maybe they went {into the neighborhood}. Or you could {check by that snow pile}.` +
          `^^Another part of you just wants to {go home to your room} and forget about today.`,
        buttonActions: () => [
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("neighborhood");
            },
          },
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("snow-pile");
            },
          },
          {
            action: () => {
              const game = useGameStore();
              game.goToScene("room");
            },
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "into the neighborhood",
              next: "neighborhood",
            },
            {
              text: "check by that snow pile",
              next: "snow-pile",
            },
            {
              text: "go home to your room",
              next: "room",
            },
          ],
        },
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
        choices: () => [
          {
            text: "Go into the neighborhood.",
            next: "neighborhood",
            payload: { filter: "black-dog" },
          },
          {
            text: `Follow the drunk${payload?.filter ? "" : "s"}.`,
            next: "snow-pile",
          },
          {
            text: "Go back home.",
            next: "room",
          },
        ],
        metadata: {
          sectionId: "black-dog",
          routes: [
            {
              text: "Go into the neighborhood.",
              next: "neighborhood",
            },
            {
              text: `Follow the drunk${payload?.filter ? "" : "s"}.`,
              next: "snow-pile",
            },
            {
              text: "Go back home.",
              next: "room",
            },
          ],
        },
      };
    }
  ),

  "black-dog-done": defineScene("black-dog-done", function (payload): Scene {
    return {
      id: this.id,
      background: bgBurlyBush,
      audio: spookyMusic,
      text: getBlackDogDoneText(payload?.filter ?? ""),
      choices: () => [
        {
          text: "Follow it.",
          next: "neighborhood",
          payload: { filter: "black-dog" },
        },
        {
          text: "Play on the snowpile.",
          next: "snow-pile",
        },
        {
          text: "Go back home.",
          next: "room",
        },
      ],
      metadata: {
        sectionId: "black-dog",
        routes: [
          {
            text: "Follow it.",
            next: "neighborhood",
          },
          {
            text: "Play on the snowpile.",
            next: "snow-pile",
          },
          {
            text: "Go back home.",
            next: "room",
          },
        ],
      },
    };
  }),
};
