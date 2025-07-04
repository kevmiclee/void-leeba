import { Scene } from "@/types/story";
import bgDefault from "@/assets/images/backgrounds/new-game.png";
import morningBirds from "@/assets/audio/story/background-themes/morning-birds.mp3";
import homeSong from "@/assets/audio/story/background-themes/home.mp3";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { useAspectStore } from "@/stores/aspects";
import { ascetic } from "@/data/aspects";
import { defineScene } from "../story";

export const homeScenes = {
  home: defineScene("home", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      audio: morningBirds,
      text:
        `You have just moved away from the countryside, finally. Endless evergreens, oceans and coves, silence and stars, and quiet. ` +
        `People knew you, but you only knew a few. You didn't grow up near the ocean. You're from away. Isolation multiplies where ` +
        `one doesn't belong. Your grandma died recently, removing your last obligation to stay.` +
        `^^Now you live in the suburbs of the city of Poetland. In the suburbs, you can choose to know your neighbors, or not. ` +
        `No one knows you unless you want them to know you.` +
        `^^You have on your grandfather's dragon ring. The dragon is made of stainless steel with ruby red eyes, and in its claws, ` +
        `it holds a swirling planet of turquoise. You wear your grandmother's wool coat, with an intricately-hooked patch on its ` +
        `back that shows four images: an ancient windmill, an historic longship, a modern wind turbine, and a lobster boat. {Continue.}`,
      buttonActions: [
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("home1");
          },
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          {
            label: `Continue`,
            redirect: "home1",
          },
        ],
      },
    };
  }),

  home1: defineScene("home1", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      audio: homeSong,
      text:
        `Your rented room shares its house with roommates, who are at work. Daylight filters through the blinds of the living room window and is spilt onto the ceiling in stripes. ` +
        `The view out your window shows a lawn, a small tree speckled with red berries, and a quiet road with cars parked along its length.` +
        `^^You could go out and explore. Also, no one is home. You might enjoy some quiet time in your room.`,
      choices: () => [
        {
          text: "Go out and explore.",
          next: "home2",
        },
        {
          text: "Enjoy some quiet time in your room.",
          next: "room",
        },
        {
          text: "You can do anything! Look at your phone.",
          drawerView: "phone",
          onChoose: () => {
            const character = useCharacterStore();
            character.gainStat("shitheadedness", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          {
            label: `Go out and explore`,
            redirect: "home2",
          },
          {
            label: `Enjoy some quiet time in your room`,
            redirect: "room",
          },
          {
            label: `Look at your phone`,
            redirect: "drawer",
            stat: {
              id: "shitheadedness",
              amount: 1,
            },
          },
        ],
      },
    };
  }),

  home2: defineScene("home2", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      audio: homeSong,
      text: `Will you take anything with you?`,
      choices: () => [
        {
          text: "Dog food can",
          next: "home3",
          payload: {
            text: "Maybe you'll meet a hungry dog. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("dog-food", this.id);
            character.gainStat("athletics", 1, this.id);
          },
        },
        {
          text: "Playing cards",
          next: "home3",
          payload: {
            text: "Maybe someone will want to play. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("cards", this.id);
            character.gainStat("blueMagic", 1, this.id);
          },
        },
        {
          text: "Orange spray paint",
          next: "home3",
          payload: {
            text: "Maybe you'll spray paint something. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("spray-paint", this.id);
            character.gainStat("shitheadedness", 1, this.id);
          },
        },
        {
          text: "Translator",
          next: "home3",
          payload: {
            text: "Maybe you'll encounter a language you can't comprehend. {Continue.}",
          },
          onChoose: () => {
            const character = useCharacterStore();
            character.addToInventory("translator", this.id);
            character.gainStat("blueMagic", 1, this.id);
          },
        },
        {
          text: "Nothing",
          next: "home3",
          payload: {
            text: "Maybe you won't need anything. {Continue.}",
          },
          onChoose: () => {
            const aspects = useAspectStore();
            const character = useCharacterStore();

            aspects.addAspect(ascetic);
            character.gainStat("will", 1, this.id);
          },
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          {
            label: `Dog food can`,
            redirect: "home3",
            stat: {
              id: "athletics",
              amount: 1,
            },
          },
          {
            label: `Playing cards`,
            redirect: "home3",
            stat: {
              id: "blueMagic",
              amount: 1,
            },
          },
          {
            label: `Orange spray paint`,
            redirect: "home3",
            stat: {
              id: "shitheadedness",
              amount: 1,
            },
          },
          {
            label: `Translator`,
            redirect: "home3",
            stat: {
              id: "blueMagic",
              amount: 1,
            },
          },
          {
            label: `Nothing`,
            redirect: "home3",
            aspect: ascetic,
            stat: {
              id: "will",
              amount: 1,
            },
          },
        ],
      },
    };
  }),

  home3: defineScene("home3", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      background: bgDefault,
      text: payload?.text ?? "",
      buttonActions: [
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("park");
          },
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          {
            label: `Continue`,
            redirect: "park",
          },
        ],
      },
    };
  }),

  room: defineScene("room", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      background: bgDefault,
      text:
        `You trudge up the light green carpeted narrow stairs to your room. Your room is festooned with posters, orderly piles of sorted odds and ends, and trinkets. ` +
        `Your bed may be a full, but its puffy yellow comforter looks inviting. {A nap sounds nice}.` +
        `^^A notebook sits on a little desk, a stiff chair next to it. Drawing utensils rest here. {Settle into the chair to make something}.` +
        `^^The empty bed and the blank page remind you of fresh snow, a bright day, the smell of morning mud, and afternoon heat. Wait, ` +
        `{I'm going to the park}.`,
      buttonActions: [
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("nap");
          },
        },
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("make-something");
          },
        },
        {
          action: () => {
            const store = useGameStore();
            store.goToScene("park");
          },
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          {
            label: `A nap sounds nice`,
            redirect: "nap",
          },
          {
            label: `Settle into the chair and make something`,
            redirect: "make-something",
          },
          {
            label: `I'm going to the park`,
            redirect: "park",
          },
        ],
      },
    };
  }),

  nap: defineScene("nap", function (payload): Scene {
    return {
      id: this.id,
      background: bgDefault,
      audio: homeSong,
      text:
        `You get over to your bed, pull up the sheets, slip in and nestle into the blankets. You're not very tired, ` +
        `but you're so unmotivated it hardly matters.`,
      choices: () => [
        { text: "Close your eyes.", next: "dream" },
        {
          text: `Noooo!!! I'm not sleepy! I'd rather sit at my desk.`,
          next: "make-something",
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          {
            label: `Close your eyes`,
            redirect: "dream",
          },
          {
            label: `rather sit at my desk`,
            redirect: "make-something",
          },
        ],
      },
    };
  }),

  "make-something": defineScene("make-something", function (payload): Scene {
    return {
      id: this.id,
      audio: homeSong,
      text:
        `You sit down at the desk and open to a fresh page of the pad.` +
        `^You look down onto the off-white paper. A void to fill. Dimensionless.` +
        `^The desire to form and create something in that void. It pulls you, amuses you, scares you. ` +
        `You feel like proving your stoicism, resisting the urge to make marks. Go {into the Void}.` +
        `^^You can feel the spirit rising in you, and the thrill of channeling that spirit! ` +
        `Feelings with no where to go are like idle hands...they animate. Or, no, do they become animate hands!? ` +
        `Nonononono! You pick up the paintbrush, smoosh some acrylic paint into the palette and {paint with your heart}.` +
        `^^Nah, nevermind, I'm {going to sleep}.`,
      background: bgDefault,
      buttonActions: [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("void");
          },
        },
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("paint");
          },
        },
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("nap");
          },
        },
      ],
      metadata: {
        sectionId: "home",
        routes: [
          // {
          //   label: `into the void`,
          //   redirect: "void",
          // },
          // {
          //   label: `paint with your heart`,
          //   redirect: "paint",
          // },
          {
            label: `going to sleep`,
            redirect: "nap",
          },
        ],
      },
    };
  }),
};
