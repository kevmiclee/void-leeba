import { Scene } from "@/types/story";
import bgStart from "@/assets/images/backgrounds/Landing-Page.png";
import bgFog from "@/assets/images/backgrounds/fogland.jpg";
import bgServerFarm from "@/assets/images/backgrounds/server-city-wasteland.png";
import bgServerFarmHallway from "@/assets/images/backgrounds/server-farm-hallway.png";
import bgDataPurchaseKiosk from "@/assets/images/backgrounds/data-purchase-kiosk.png";
import bgMudsplosion from "@/assets/images/backgrounds/Mudman-Crawfish-Mudsplosion.png";

import introAudio from "@/assets/audio/story/background-themes/intro.mp3";
import windTunnel from "@/assets/audio/story/background-themes/wind-tunnel.mp3";
import mudmanTheme from "@/assets/audio/story/background-themes/mudman-theme.mp3";
import serverFarmTheme from "@/assets/audio/story/background-themes/server-farm2.mp3";
import poundingSound from "@/assets/audio/story/sounds/pounding.mp3";

import { defineScene } from "../story";
import { useGameStore } from "@/stores/game";
import { useCharacterStore } from "@/stores/character";
import { useAudioStore } from "@/stores/audio";
import { useDictionaryStore } from "@/stores/dictionary";

const sectionId = "intro";

export const introScenes = {
  start: defineScene("start", function (payload): Scene {
    return {
      id: this.id,
      text: "An intro to the Leakyverse",
      animationRate: 250,
      background: bgStart,
      audio: introAudio,
      choices: () => [
        {
          text: "New game",
          next: "intro",
        },
        {
          text: "Credits",
          next: "credits",
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `New game`,
            next: "intro",
          },
          {
            text: `Credits`,
            next: "credits",
          },
        ],
      },
    };
  }),

  intro: defineScene("intro", function (payload): Scene {
    return {
      id: this.id,
      text: "Hey there! You are dreaming.",
      audio: windTunnel,
      background: bgFog,
      choices: () => {
        const character = useCharacterStore();
        return [
          {
            text: "Start to wake up.",
            next: "intro1",
            payload: { text: `NO! Don't wake up!` },
            onChoose: () => {
              character.gainStat("will", 1, this.id);
            },
          },
          {
            text: "Vivid dream? Start flying!",
            next: "intro1",
            payload: { text: `NO! Don't fly away!` },

            onChoose: () => {
              character.gainStat("athletics", 1, this.id);
            },
          },
          {
            text: `Don't dream, just sleep.`,
            next: "intro1",
            payload: { text: `NO! Don't stop dreaming!` },
            onChoose: () => {
              character.gainStat("shitheadedness", 1, this.id);
            },
          },
          {
            text: `Mmm... okay.`,
            next: "intro1",
            payload: { text: `YES!` },
            onChoose: () => {
              character.gainStat("blueMagic", 1, this.id);
            },
          },
        ];
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "Start to wake up.",
            next: "intro1",
          },
          {
            text: "Vivid dream? Start flying!",
            next: "intro1",
          },
          {
            text: `Don't dream, just sleep.`,
            next: "intro1",
          },
          {
            text: `Mmm... okay.`,
            next: "intro1",
          },
        ],
      },
    };
  }),

  intro1: defineScene("intro1", function (payload): Scene {
    return {
      id: this.id,
      text: `${payload?.text} I paid for this dream, don't try to screw this up for me. 
      Remember: I chose you, a splashing hapless clownfish, because I see something 
      special in you. So {pay attention}!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro2");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `pay attention`,
            next: "intro2",
          },
        ],
      },
    };
  }),

  intro2: defineScene("intro2", function (payload): Scene {
    return {
      id: this.id,
      text: `Philosophically, you are an amalgam of choices dissolved in squishy, watery body-stuff. 
      Your choices will lead you this way or that. Or maybe nowhere fast. Either way, they will affect 
      how you turn out. Do what you will, but {take responsibility}!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro3");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `take responsibility`,
            next: "intro3",
          },
        ],
      },
    };
  }),

  intro3: defineScene("intro3", function (payload): Scene {
    return {
      id: this.id,
      text: `Quaint organism, IT IS I! The Supreme Hegemon of Tangential Reality. 
      It's true! I have the talent of Tangents—the power to spring {Leaks} to my liking. So get on my good side. 
      Entertain me. Make me laugh...{You won't}!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          dictionaryEntryId: "leaks",
        },
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro4");
          },
        },
      ],
      onPageLoad: () => {
        const dict = useDictionaryStore();
        dict.addEntry("leaks");
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `You won't`,
            next: "intro4",
          },
        ],
      },
    };
  }),

  intro4: defineScene("intro4", function (payload): Scene {
    return {
      id: this.id,
      text: `The dream you are about to see will help you...and me. It's a premonitory one 
      that Dirtgirl potted. All her dreams are good soil. So grow! I bartered real good for it 
      too—Sandperson told me about this dream the Giant Sand Worm had the other night. So funny, 
      it had me in tears...whoops! Off on a tangent.^^Anyway, {enjoy the dream!}`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro5");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `enjoy the dream`,
            next: "intro5",
          },
        ],
      },
    };
  }),

  intro5: defineScene("intro5", function (payload): Scene {
    return {
      id: this.id,
      text: `Enter Mudman...^^The sound of the squishy, sludgy slop as he schlepps 
      up to you is so thick you can feel it. His voice is like a flatulent ooze.`,
      audio: windTunnel,
      background: bgFog,
      dialogSequence: () => [
        {
          characterId: "mudman",
          text: `What's that in your pocket? Are you happy to see me?`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("intro6");
            game.setPersistAvatar(true);
          },
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playGenericSound(mudmanTheme);
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "mudman dialog",
            next: "intro6",
          },
        ],
      },
    };
  }),

  intro6: defineScene("intro6", function (payload): Scene {
    return {
      id: this.id,
      text: `Mudman's slimy mud-hand creeps into your pocket.`,
      audio: windTunnel,
      background: bgFog,
      dialogSequence: () => [
        {
          characterId: "mudman",
          text: `Not happy to see me? What are you some kinda prude?`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("intro7");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "mudman dialog",
            next: "intro7",
          },
        ],
      },
    };
  }),

  intro7: defineScene("intro7", function (payload): Scene {
    return {
      id: this.id,
      text: `The hand slips out of your pocket and out of view. Whatever he has, 
      he cradles it and croons.`,
      audio: windTunnel,
      background: bgFog,
      dialogSequence: () => [
        {
          characterId: "mudman",
          text: `Lovely. Just lovely. Lovely weather for ducks all in a row row row your 
          boat gently into that good night, good night! Parting is such a sweaty sheet...`,
          onClick: () => {
            const audioStore = useAudioStore();
            audioStore.playGenericSound(serverFarmTheme);
            const game = useGameStore();
            game.goToScene("intro8");
            game.setPersistAvatar(false);
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "mudman dialog",
            next: "intro8",
          },
        ],
      },
    };
  }),

  intro8: defineScene("intro8", function (payload): Scene {
    //TODO: SOUND - mudman laugh, loud, echo-y, glurpy
    return {
      id: this.id,
      text: `Aw man. What did he take?^^Mudman departs, gurgling his slimy gulp of a snicker 
      like a suctioned shoe un-stuck from the muck. As he fades into the distance, 
      a wash of fog recedes and at the edge of the horizon you see a gargantuan city 
      of server farms. Economically organized squares, well-lit and sterile. An atonal 
      hum {emits from them}.`,
      audio: windTunnel,
      background: bgServerFarm,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro9");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "emits from them",
            next: "intro9",
          },
        ],
      },
    };
  }),

  intro9: defineScene("intro9", function (payload): Scene {
    return {
      id: this.id,
      text: `In the next instant, you observe Mudman standing in line at a kiosk along 
      the server farm fences accompanied by a hog-sized crawfish. He is still cradling 
      the glowing object he stole from you.^^He plops it down on the counter.^^Kioskman 
      recognizes Mudman, and knocks on the backroom door of the kiosk.`,
      audio: windTunnel,
      background: bgDataPurchaseKiosk,
      dialogSequence: () => [
        {
          characterId: "kioskman",
          text: `Oh, Mr. Ebenenezer! Mr. Mudman is here.`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("intro10");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "dialog click",
            next: "intro10",
          },
        ],
      },
    };
  }),

  intro10: defineScene("intro10", function (payload): Scene {
    return {
      id: this.id,
      text: `Mr. Ebeneezer comes out, an unctuous look in his eyes.`,
      audio: windTunnel,
      background: bgDataPurchaseKiosk,
      dialogSequence: () => [
        {
          characterId: "mr-ebeneezer",
          text: `Ah Mudman! What good fortune! You kept your word. At this rate we'll exceed 
          our Q3 earnings by 1%! Survtek recognizes loyalty. As agreed, here, one 
          Leak Drop. Kindly deposit your loot.`,
          onClick: () => {
            const game = useGameStore();
            game.goToScene("intro11");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "dialog click",
            next: "intro11",
          },
        ],
      },
    };
  }),

  intro11: defineScene("intro11", function (payload): Scene {
    return {
      id: this.id,
      text: `Mudman raises the glowing object above his head. The earth below him turns to mud. The mud ripples 
      slowly at first, building up power, until he releases the glowing object and the mud explodes upward in a
      geyser. You watch it disappear {into the sky}.`,
      audio: windTunnel,
      background: bgMudsplosion,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro12");
          },
        },
      ],

      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "into the sky",
            next: "intro12",
          },
        ],
      },
    };
  }),

  intro12: defineScene("intro12", function (payload): Scene {
    return {
      id: this.id,
      text: `Straining to see, your will pulls you like a telescope. You enter a shiny concrete 
      hallway with caged computer servers stacked up to the ceiling in dense black rectangles 
      studded with coldly glowing status lights. You see a myriad of programmers, coding programs 
      that will sell the behavioral futures of entire {Leaks}. To torque each reality to its limit, 
      to squeeze it dry of its data, to milk it for all the relevance it's worth. One of the 
      programmers eyes you with a standoffish glare that says, {"No noobs allowed"}.`,
      audio: windTunnel,
      background: bgServerFarmHallway,
      buttonActions: () => [
        {
          dictionaryEntryId: "leaks",
        },
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro13");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "no noobs allowed",
            next: "intro13",
          },
        ],
      },
    };
  }),

  intro13: defineScene("intro13", function (payload): Scene {
    return {
      id: this.id,
      text: `Server farms, Leaks, Leak Drops...what kind of dream is this? The Supreme Hegemon of Tangential 
      Reality...what? And Sandperson, and Dirtgirl? Not to mention Mudman! Ugh, and he <i>stole</i> from you. 
      Uh oh...do you recall your name?`,
      audio: windTunnel,
      background: bgFog,
      hasInput: true,
      onInputEntered: () => {
        const game = useGameStore();
        const character = useCharacterStore();
        game.goToScene("intro14", { text: character.name });
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "name input enetered",
            next: "intro14",
          },
        ],
      },
    };
  }),

  intro14: defineScene("intro14", function (payload): Scene {
    return {
      id: this.id,
      text: `Oh, that's right, ${payload?.text}! Well at least you still have your name.^^
      And yet...what's missing? You can feel the hole, but not the shape of what fit there. Was it your courage? 
      Your heart? No — something deeper, older. {A promise you made before you were born, maybe}...`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("intro15");
          },
        },
      ],
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "A promise made before you were born",
            next: "intro15",
          },
        ],
      },
    };
  }),

  intro15: defineScene("intro15", function (payload): Scene {
    return {
      id: this.id,
      text: `You start to hear a dull rhythmic pounding, like someone hammering shut a chest. Each thud 
      resonates through you, sealing something away, while also filling the mysterious gap, as if {trying to replace it}.`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          action: () => {
            const game = useGameStore();
            game.goToScene("bedroom");
          },
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playGenericSound(poundingSound);
      },
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: "trying to replace it",
            next: "bedroom",
          },
        ],
      },
    };
  }),

  dungeon: defineScene("dungeon", function (payload): Scene {
    return {
      id: this.id,
      text: "",
      dungeonId: "forest",
      metadata: {
        sectionId: sectionId,
        routes: [
          {
            text: `trigger`,
            next: "bedroom",
          },
        ],
      },
    };
  }),

  credits: defineScene("credits", function (payload): Scene {
    //TODO: MUSIC - credits music
    return {
      id: this.id,
      text: "credits",
      //TODO: credits
    };
  }),

  preamble: defineScene("preamble", function (payload): Scene {
    return {
      id: this.id,
      text: "",
    };
  }),
};
