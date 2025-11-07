import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";
import { useCharacterStore } from "@/stores/character";
import { useGameStore } from "@/stores/game";
import { useSnackbarStore } from "@/stores/snackbar";
import { useEffectsStore } from "@/stores/effects";

//TODO: MUSIC - void
//TODO: stats?
//TODO: items?

const sectionId = "void";

export const voidScenes = {
  void: defineScene("void", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text:
        `Misery is okay! It loves. Misery loves company. The Void cannot have company. It isn't <i>really there</i>. ` +
        `It is the embodiment of Mu, the non-being of all things. When looked at closely, things have nothing in them. ` +
        `You can magnify skin until you see there are voids between even the building blocks of life!` +
        `^In the little bags of water that make us up, there is information with no use. There are third eyes that do not see. ` +
        `The only "living forever" for us is in death.^Death and the Void are not the same, however. ` +
        `If you are dead, you are somewhere. If you are dead, it means you once walked this Earf. ` +
        `^The dead live on in others' minds--in the lessons they taught us, in the examples they set, in our memories and in our genes. ` +
        `Absence is <i>more</i> than the Void. The Void is nothing, nowhere. ` +
        `<i>There is no misery in the Void!</i>` +
        `^^Is the Void alone?`,
      choices: () => {
        const character = useCharacterStore();

        return [
          {
            text: '"Not anymore!"',
            next: "void-not-alone",
            onChoose: () => {
              character.gainManners("weird", 1, this.id);
            },
          },
          {
            text: "The Void will always be alone...",
            next: "void-alone",
            onChoose: () => {
              character.gainManners("depressing", 1, this.id);
            },
          },
          {
            text: "Whatever.",
            next: "void-whatever",
            onChoose: () => {
              character.gainManners("rude", 1, this.id);
              const game = useGameStore();
            },
          },
        ];
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "Not anymore!",
            next: "void-not-alone",
            manners: "weird",
          },
          {
            text: "The Void will always be alone...",
            next: "void-alone",
            manners: "depressing",
          },
          {
            text: "Whatever.",
            next: "void-whatever",
            manners: "rude",
          },
        ],
      },
    };
  }),

  "void-not-alone": defineScene("void-not-alone", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text:
        `You were worried that the Void was alone. How nice. How niche. How <i>Nietzsche!</i>` +
        `^Look at you, all empathetic and virtuous, always helping out. Good on you, Void-lover!` +
        `^^A question mark bubble appears on the page, blurring the Void. The appearance of the ? ` +
        `triggers in you a cascade of thoughts that form into a gridded web of ideas.` +
        `^^<i>...need to get bread and lube from the grocer, your skillshare with that twinkly-eyed, ` +
        `tilty-capped camera-machinist, the laundry in the dryer, the pen in your cup holder, ` +
        `a movie about Winnipeg with all-Arabic signs, A Tale of Two Towns, the R.A. Petertore tomes, ` +
        `the black-comedy fantasy-action series about that Unitarian Universalist minister...</i>` +
        `^^The web grows more and more complex. The connections between nodes multiply. A balmy chaos builds. ` +
        `All of a sudden, the web explodes outwards, hurtling at light speed, getting smaller and smaller on the blank page. ` +
        `And then {a set of questions appears}.`,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("void-not-alone1");
          },
        },
      ],
      onPageLoad: () => {
        //TODO: a web of thoughts zooming out
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "a set of questions appears",
            next: "void-not-alone1",
          },
        ],
      },
    };
  }),

  "void-not-alone1": defineScene("void-not-alone1", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text:
        `Your once blank-page-Void is now filled with questions. As you focus on each one, ` +
        `the others seem to imperceptibly fade, as if your attention is all that makes them real.`,
      choices: () => {
        const effects = useEffectsStore();

        return [
          {
            text: "Do you believe in lice after lunch?",
            next: "void-not-alone-lunch",
            onChoose: () => {
              effects.toggleBlurChoices(false);
            },
          },
          {
            text: "Dad, if I have some pie, will you have some pie?",
            next: "void-not-alone-pie",
            onChoose: () => {
              effects.toggleBlurChoices(false);
            },
          },
          {
            text: `What's my adage again?`,
            next: "void-not-alone-adage",
            onChoose: () => {
              effects.toggleBlurChoices(false);
            },
          },
          {
            text: "Are we hummus or are we dander?",
            next: "void-not-alone-hummus",
            onChoose: () => {
              effects.toggleBlurChoices(false);
            },
          },
        ];
      },
      onPageLoad: () => {
        const effects = useEffectsStore();
        effects.toggleBlurChoices(true);
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "Do you believe in lice after lunch?",
            next: "void-not-alone-lunch",
          },
          {
            text: "Dad, if I have some pie, will you have some pie?",
            next: "void-not-alone-pie",
          },
          {
            text: `What's my adage again?`,
            next: "void-not-alone-adage",
          },
          {
            text: "Are we hummus or are we dander?",
            next: "void-not-alone-hummus",
          },
        ],
      },
    };
  }),

  "void-not-alone-lunch": defineScene(
    "void-not-alone-lunch",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `I can feel some things upon my legs, I really don't think I ate enough nooo!` +
          `^^Your legs stretch longer and longer, longer and longer, as the lice crawl up and up, ` +
          `and up and up. Your lunch sits on the table, remnants of white cod with hollandaise sauce, ` +
          `cracker breadcrumbs, a squished slice of yellow lemon, a smear of boxed mashed potatoes. ` +
          `You are now so tall you cannot reach your lunch.`,
        choices: () => [
          {
            text: "Cry openly.",
            next: "void-not-alone-lunch1",
          },
          { text: "Stifle back the tears.", next: "void-not-alone-lunch1" },
        ],
        onPageLoad: () => {
          const effects = useEffectsStore();
          effects.toggleStretchAvatar(true);
        },
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: "Cry openly.",
              next: "void-not-alone-lunch1",
            },
            {
              text: "Stifle back the tears",
              next: "void-not-alone-lunch1",
            },
          ],
        },
      };
    }
  ),

  "void-not-alone-lunch1": defineScene(
    "void-not-alone-lunch1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        //TODO: void-not-alone-lunch1
        text: ``,
        choices: () => [],
        metadata: {
          sectionId: sectionId,
          routes: [],
        },
      };
    }
  ),

  "void-not-alone-pie": defineScene(
    "void-not-alone-pie",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `Because Dad's a major player in the pieface scene. He signs to a reservation, ` +
          `looks and gets seen. He's gonna house a pie...he's gonna house a pie. And you start ` +
          `to think back to the last time you smelled a pie...what flavor was it?`,
        choices: () => [
          {
            text: "Pecan.",
            next: "void-not-alone-pie1",
            onChoose: () => {
              const character = useCharacterStore();
              character.setFlag("pie-choice", "pecan");
            },
          },
          {
            text: "Key lime.",
            next: "void-not-alone-pie1",
            onChoose: () => {
              const character = useCharacterStore();
              character.setFlag("pie-choice", "key-lime");
            },
          },
          {
            text: "Cherry.",
            next: "void-not-alone-pie1",
            onChoose: () => {
              const character = useCharacterStore();
              character.setFlag("pie-choice", "cherry");
            },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: "Pecan.",
              next: "void-not-alone-pie1",
            },
            {
              text: "Key lime.",
              next: "void-not-alone-pie1",
            },
            {
              text: "Cherry.",
              next: "void-not-alone-pie1",
            },
          ],
        },
      };
    }
  ),

  "void-not-alone-pie1": defineScene(
    "void-not-alone-pie1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: `Ugh ... oh my god, yeah that's right. Mmmmmmm. Oh boy. What you wouldn't do for some pie right now.`,
        choices: () => [
          //TODO: choices
        ],
        metadata: {
          sectionId: sectionId,
          routes: [],
        },
      };
    }
  ),

  "void-not-alone-adage": defineScene(
    "void-not-alone-adage",
    function (payload): Scene {
      return {
        id: this.id,
        background: "white",
        text:
          `And that's about the time she quoted Hermann Hesse.` +
          `^She said, "Love isn't there to make us happy."` +
          `^^That reminds you! Your adage was...`,
        choices: () => [
          {
            text: `"Sometimes survival is the only moral choice." ...wasn't it?`,
            next: "void-not-alone-adage1",
          },
          {
            text: `No wait it was, "It is not because things are difficult that we do not dare, it is because we do not dare that they are difficult".`,
            next: "void-not-alone-adage1",
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `"Sometimes survival is the only moral choice." ...wasn't it?`,
              next: "void-not-alone-adage1",
            },
            {
              text: `No wait it was, "It is not because things are difficult that we do not dare, it is because we do not dare that they are difficult".`,
              next: "void-not-alone-adage1",
            },
          ],
        },
      };
    }
  ),

  "void-not-alone-adage1": defineScene(
    "void-not-alone-adage1",
    function (payload): Scene {
      return {
        id: this.id,
        background: "white",
        text:
          `Yes! That was it! You love collecting sayings like that, reflecting upon your life in the light they cast.` +
          `^^You see a clean, well-lit living room coalesce. It's you in the seat of the couch, crunching on gluten-free cheese puffs. ` +
          `You're laughing. You glance outside, and see someone doing kickflips on the pavement. Wait a second... that's <i>your</i> skateboard! ` +
          `Shouldn't you...?`,
        choices: () => [
          {
            text: `Get out there an' show 'em!`,
            next: "void-not-alone-kickflip",
          },
          {
            text: `It can't be helped. Stay inside and weep into your gluten-free cheese puffs.`,
            //TODO: zombies?
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: `Get out there an' show 'em!`,
              next: "void-not-alone-kickflip",
            },
          ],
        },
      };
    }
  ),

  "void-not-alone-hummus": defineScene(
    "void-not-alone-hummus",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text:
          `Your sinuses are viral. Your hams are moldy. You mugged your niece... ` +
          `You thought she looked familiar.^And now you seek for the hamster to spin its wheel ` +
          `in exchange for your memories. The hamster gives you two options...`,
        choices: () => [
          {
            text: "Give it your soul.",
            next: "void-not-alone-hummus1",
            payload: { filter: "soul" },
          },
          {
            text: "Sacrifice your inner child.",
            next: "void-not-alone-hummus1",
            payload: { filter: "inner child" },
          },
        ],
        metadata: {
          sectionId: sectionId,
          routes: [
            {
              text: "Give it your soul.",
              next: "void-not-alone-hummus1",
            },
            {
              text: "Sacrifice your inner child.",
              next: "void-not-alone-hummus1",
            },
          ],
        },
      };
    }
  ),

  "void-not-alone-hummus1": defineScene(
    "void-not-alone-hummus1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: `Dude... the hamster was joking! How could you give up your ${payload?.filter} to a hamster you just met?`,
        choices: () => [
          //TODO: choices
        ],
        onPageLoad: () => {
          const snackbar = useSnackbarStore();
          snackbar.show(`-1 ${payload?.filter}`);
        },
        metadata: {
          sectionId: sectionId,
          routes: [],
        },
      };
    }
  ),

  "void-not-alone-kickflip": defineScene(
    "void-not-alone-kickflip",
    function (payload): Scene {
      return {
        id: this.id,
        background: "white",
        text: `Get out there and show 'em what?`,
        choices: () => {
          const character = useCharacterStore();
          //TODO: these
          return [
            {
              text: `How it's done!`,
              onChoose: () => {
                character.gainStat("athletics", 1, this.id);
              },
            },
            {
              text: `Who they're messin' with!`,
              onChoose: () => {
                character.gainStat("shitheadedness", 1, this.id);
              },
            },
            {
              text: `How many gluten-free cheese puffs you can fit in your mouth!`,
              onChoose: () => {
                character.gainStat("blueMagic", 1, this.id);
              },
            },
            {
              text: "The meaning of life.",
              onChoose: () => {
                character.gainStat("will", 1, this.id);
              },
            },
          ];
        },
        metadata: {
          sectionId: sectionId,
          routes: [],
        },
      };
    }
  ),

  "void-alone": defineScene("void-alone", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text: ``,
      //TODO: void-alone
      choices: () => [],
      metadata: {
        sectionId: sectionId,
        routes: [],
      },
    };
  }),

  "void-whatever": defineScene("void-whatever", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text: ``,
      //TODO: void whatever
      choices: () => [],
      metadata: {
        sectionId: sectionId,
        routes: [],
      },
    };
  }),
};
