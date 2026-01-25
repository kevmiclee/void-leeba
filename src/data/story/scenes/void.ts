import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import { defineScene } from "../story";
import { useSnackbarStore } from "@/stores/snackbar";
import { useEffectsStore } from "@/stores/effects";

//TODO: MUSIC - void

const sectionId = "void";

export const voidScenes = {
  void: defineScene("void", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text:
        `The embodiment of Mu, the non-being of all things. When looked at closely, things have nothing in them. 
        You can magnify skin until you see there are voids between even the building blocks of life! 
        In the little bags of water that make us up, there is information with no use. There are third eyes that do not see. ` +
        `The only "living forever" for us is {in death}.`,
      buttonActions: () => [
        {
          next: "void1",
        },
      ],
      metadata: { sectionId },
    };
  }),

  void1: defineScene("void1", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text:
        `Death and the Void are not the same, however. If you are dead, you are somewhere. If you are dead, 
        it means you once walked this Earf. The dead live on in others' minds--in the lessons they taught us, 
        in the examples they set, in our memories and in our genes. Absence is <i>more</i> than the Void. 
        The Void is nothing, nowhere. <i>There is no misery in the Void!</i>` +
        `^^Is the Void alone?`,
      choices: () => [
        {
          text: '"Not anymore!"',
          next: "void-not-alone",
          manners: [{ id: "weird", amount: 1 }],
        },
        {
          text: "The Void will always be alone...",
          next: "void-alone",
          manners: [{ id: "depressing", amount: 1 }],
        },
        {
          text: "Whatever.",
          next: "void-whatever",
          manners: [{ id: "rude", amount: 1 }],
        },
      ],
      metadata: { sectionId },
    };
  }),

  "void-not-alone": defineScene("void-not-alone", function (payload): Scene {
    //TODO: UI/UX void stirring animation
    return {
      id: this.id,
      background: "white",
      text:
        `You were worried that the Void was alone. How nice. How niche. How <i>Nietzsche!</i>` +
        `^Look at you, all empathetic and virtuous, always helping out. Good on you, Void-lover!` +
        `^^Your emotion stirs the Void and from this disturbance a <i>something</i> {is born}.`,
      buttonActions: () => [
        {
          next: "void-not-alone1",
        },
      ],
      metadata: { sectionId },
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

        //TODO: Clear variables here and for tall balloon man and any other variables
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
      metadata: { sectionId },
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
          `and up and up. Your arms stay the same size. Your lunch sits on the table, remnants of white cod with hollandaise sauce, ` +
          `cracker breadcrumbs, a squished slice of yellow lemon, a smear of boxed mashed potatoes. ` +
          `You are now so tall you cannot reach your lunch.`,
        choices: () => [
          {
            text: "Cry openly.",
            next: "void-not-alone-lunch1",
            stats: [{ id: "blueMagic", amount: 1 }],
          },
          {
            text: "Stifle back the tears.",
            next: "void-not-alone-lunch1",
            stats: [{ id: "will", amount: 1 }],
          },
          {
            text: `It doesn't matter. I wasn't that hungry anyway.`,
            next: "void-not-alone-lunch1",
            stats: [{ id: "shitheadedness", amount: 1 }],
          },
          {
            text: `Finish eating by using your legs.`,
            next: "void-not-alone-lunch1",
            stats: [{ id: "athletics", amount: 1 }],
          },
        ],
        onPageLoad: () => {
          const effects = useEffectsStore();
          effects.toggleStretchAvatar(true);
        },
        metadata: { sectionId },
      };
    },
  ),

  "void-not-alone-lunch1": defineScene(
    "void-not-alone-lunch1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        //TODO: STORY - void-not-alone-lunch1
        text: ``,
        choices: () => [],
        metadata: { sectionId },
      };
    },
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
            flags: [{ id: "pie-choice", value: "pecan" }],
          },
          {
            text: "Key lime.",
            next: "void-not-alone-pie1",
            flags: [{ id: "pie-choice", value: "key-lime" }],
          },
          {
            text: "Cherry.",
            next: "void-not-alone-pie1",
            flags: [{ id: "pie-choice", value: "cherry" }],
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "void-not-alone-pie1": defineScene(
    "void-not-alone-pie1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: `Ugh ... oh my god, yeah that's right. Mmmmmmm. Oh boy. What you wouldn't do for some pie right now.`,
        choices: () => [
          //TODO: STORY -choices
        ],
        metadata: { sectionId },
      };
    },
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
            text: `"Sometimes survival is the only moral choice."`,
            next: "void-not-alone-adage1",
          },
          {
            text: `"It is not because things are difficult that we do not dare, it is because we do not dare that they are difficult".`,
            next: "void-not-alone-adage1",
          },
          {
            text: `"Do not wait to strike till the iron is hot; but make it hot by striking."`,
            next: "void-not-alone-adage1",
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "void-not-alone-adage1": defineScene(
    "void-not-alone-adage1",
    function (payload): Scene {
      //TODO: UI/UX - cheese puffs
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
            next: "zombies",
            payload: { filter: "stay-inside" },
          },
        ],
        metadata: { sectionId },
      };
    },
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
        metadata: { sectionId },
      };
    },
  ),

  "void-not-alone-hummus1": defineScene(
    "void-not-alone-hummus1",
    function (payload): Scene {
      return {
        id: this.id,
        background: bgDefault,
        text: `Dude... the hamster was joking! How could you give up your ${payload?.filter} to a hamster you just met?`,
        choices: () => [
          //TODO: STORY - choices
        ],
        onPageLoad: () => {
          const snackbar = useSnackbarStore();
          snackbar.show(`-1 ${payload?.filter}`);
        },
        metadata: { sectionId },
      };
    },
  ),

  "void-not-alone-kickflip": defineScene(
    "void-not-alone-kickflip",
    function (payload): Scene {
      return {
        id: this.id,
        background: "white",
        text: `Get out there and show 'em what?`,
        choices: () => [
          {
            text: `How it's done!`,
            next: `zombies`,
            payload: { filter: "how-its-done" },
            stats: [{ id: "athletics", amount: 1 }],
          },
          {
            text: `Who they're messin' with!`,
            next: `zombies`,
            payload: { filter: "who-theyre-messin-with" },
            stats: [{ id: "shitheadedness", amount: 1 }],
          },
          {
            text: `How many gluten-free cheese puffs you can fit in your mouth!`,
            next: `zombies`,
            payload: { filter: "cheese-puffs" },
            stats: [{ id: "blueMagic", amount: 1 }],
          },
          {
            text: "The meaning of life.",
            next: `zombies`,
            payload: { filter: "meaning-of-life" },
            stats: [{ id: "will", amount: 1 }],
          },
        ],
        metadata: { sectionId },
      };
    },
  ),

  "void-alone": defineScene("void-alone", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text: ``,
      //TODO: STORY - void-alone
      choices: () => [],
      metadata: { sectionId },
    };
  }),

  "void-whatever": defineScene("void-whatever", function (payload): Scene {
    return {
      id: this.id,
      background: "white",
      text: ``,
      //TODO: STORY - void whatever
      choices: () => [],
      metadata: { sectionId },
    };
  }),
};
