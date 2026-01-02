import { Scene } from "@/types/story";
import bgStart from "@/assets/images/backgrounds/Landing-Page.png";
import bgFog from "@/assets/images/backgrounds/fogland.jpg";
import bgServerFarm from "@/assets/images/backgrounds/server-city-wasteland.png";
import bgServerHallway from "@/assets/images/backgrounds/server-hallway.png";
import bgMudsplosion1 from "@/assets/images/backgrounds/mudsplosion1.png";
import bgMudsplosion2 from "@/assets/images/backgrounds/mudsplosion2.png";
import bgAboveTheClouds from "@/assets/images/backgrounds/above-the-clouds.png";
import bgDataPurchaseKiosk from "@/assets/images/backgrounds/data-purchase-kiosk.png";

import introAudio from "@/assets/audio/story/background-themes/intro.mp3";
import windTunnel from "@/assets/audio/story/background-themes/wind-tunnel.mp3";
import mudmanTheme from "@/assets/audio/story/background-themes/mudman-theme.mp3";
import serverFarmTheme from "@/assets/audio/story/background-themes/server-farm2.mp3";
import poundingSound from "@/assets/audio/story/sounds/pounding.mp3";
import shtr from "@/assets/audio/characters/shtr.mp3";
import mudman from "@/assets/audio/characters/mudman.mp3";

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
      metadata: { sectionId },
    };
  }),

  intro: defineScene("intro", function (payload): Scene {
    return {
      id: this.id,
      text: "Hey there! You are dreaming.",
      audio: windTunnel,
      background: bgFog,
      choices: () => [
        {
          text: "Start to wake up.",
          next: "intro1",
          payload: { text: `NO! Don't wake up!` },
          stats: [{ id: "will", amount: 1 }],
        },
        {
          text: "Vivid dream? Start flying!",
          next: "intro1",
          payload: { text: `NO! Don't fly away!` },
          stats: [{ id: "athletics", amount: 1 }],
        },
        {
          text: `Don't dream, just sleep.`,
          next: "intro1",
          payload: { text: `NO! Don't stop dreaming!` },
          stats: [{ id: "shitheadedness", amount: 1 }],
        },
        {
          text: `Mmm... okay.`,
          next: "intro1",
          payload: { text: `YES!` },
          stats: [{ id: "blueMagic", amount: 1 }],
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playGenericSound(shtr);
      },
      metadata: { sectionId },
    };
  }),

  intro1: defineScene("intro1", function (payload): Scene {
    return {
      id: this.id,
      text: `${payload?.text} I paid for this dream, ${payload?.text == "YES!" ? "so be a good little oneiromancer." : `don't try to screw this up for me.`} 
      Remember: I chose you, a splashing hapless clownfish, because I see something 
      special in you. So {pay attention}!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          next: "intro2",
        },
      ],
      metadata: { sectionId },
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
          next: "intro3",
        },
      ],
      metadata: { sectionId },
    };
  }),

  intro3: defineScene("intro3", function (payload): Scene {
    return {
      id: this.id,
      text: `Quaint organism, IT IS I! The Supreme Hegemon of Tangential Reality. I was born from the 
      Goofball Dust explosion. It's true! I have the talent of Tangents—the power to spring {Leaks} to my liking. 
      So get on my good side. Entertain me. Make me laugh...You won't!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          dictionaryEntryId: "leaks",
        },
      ],
      choices: () => [
        {
          text: `"Goofball Dust Explosion?"`,
          next: "intro3a",
        },
      ],
      onPageLoad: () => {
        const dict = useDictionaryStore();
        dict.addEntry("leaks");
        const audioStore = useAudioStore();
        audioStore.playGenericSound(shtr);
      },
      metadata: { sectionId },
    };
  }),

  intro3a: defineScene("intro3a", function (payload): Scene {
    return {
      id: this.id,
      text: `INDEED! I am the most prominent entity born from that epochal event! My responsibility and power are 
      unknown to other entities, whose lives it is my wont to {toy with}!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          next: "intro4",
        },
      ],
      onPageLoad: () => {
        const dict = useDictionaryStore();
        dict.addEntry("Goofball Dust Explosion");
      },
      metadata: { sectionId },
    };
  }),

  intro4: defineScene("intro4", function (payload): Scene {
    return {
      id: this.id,
      text: `TAKE HEED! The dream you are about to see will help you...and me. It's a premonitory one 
      that Dirtgirl potted. All her dreams are good soil. So grow! I bartered real good for it 
      too—Sandperson told me about this dream the Giant Sand Worm had the other night. So funny, 
      it had me in tears...whoops! Off on a tangent.^^Anyway, {enjoy the dream}!`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          next: "intro5",
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playGenericSound(shtr);
      },
      metadata: { sectionId },
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
          next: "intro6",
          onClick: () => {
            const game = useGameStore();
            game.setPersistAvatar(true);
          },
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playTrack(mudmanTheme);
      },
      metadata: { sectionId },
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
          next: "intro7",
        },
      ],
      metadata: { sectionId },
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
          next: "intro8",
          onClick: () => {
            const audioStore = useAudioStore();
            audioStore.fadeOutTrack();
            audioStore.playTrack(serverFarmTheme);
            const game = useGameStore();
            game.setPersistAvatar(false);
          },
        },
      ],
      metadata: { sectionId },
    };
  }),

  intro8: defineScene("intro8", function (payload): Scene {
    //TODO: SOUND - mudman laugh, loud, echo-y, glurpy
    return {
      id: this.id,
      text: `Aw man... What did he take?^^Mudman departs, gurgling his slimy gulp of a snicker 
      like a suctioned shoe un-stuck from the muck. As he fades into the distance, 
      a wash of fog recedes and at the edge of the horizon you see a gargantuan city 
      of server farms. Economically organized squares, well-lit and sterile. An atonal 
      hum {emits from them}.`,
      audio: windTunnel,
      background: bgServerFarm,
      narrativeOffset: {
        top: "19vw",
        left: "-28vw",
        margin: "1vw 30vw",
      },
      buttonActions: () => [
        {
          next: "intro9",
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.playGenericSound(mudman);
      },
      metadata: { sectionId },
    };
  }),

  intro9: defineScene("intro9", function (payload): Scene {
    return {
      id: this.id,
      text: `In the next instant, you observe Mudman standing at a kiosk along 
      the server farm fences accompanied by a hog-sized crawfish. He is still cradling 
      the glowing object he stole from you. The smarmy kioskman greets Mudman.`,
      audio: windTunnel,
      background: bgDataPurchaseKiosk,
      dialogSequence: () => [
        {
          characterId: "kioskman",
          text: `Oh, Mr. Mudman! A pleasure as always.`,
          next: "intro10",
        },
      ],
      metadata: { sectionId },
    };
  }),

  intro10: defineScene("intro10", function (payload): Scene {
    return {
      id: this.id,
      text: `The kioskman looks a little nervous, as if he anticipates some trouble.`,
      audio: windTunnel,
      background: bgDataPurchaseKiosk,
      dialogSequence: () => [
        {
          characterId: "mudman",
          text: `...`,
        },
        {
          characterId: "kioskman",
          text: `Kindly proffer your loot, and I will deposit it...`,
          next: "intro11",
        },
      ],
      metadata: { sectionId },
    };
  }),

  intro11: defineScene("intro11", function (payload): Scene {
    return {
      id: this.id,
      text: `Before the kioskman can finish, Mudman raises the glowing object above his head. The earth below him gurgles
      and turns to mud. The mud ripples slowly at first, building up power, as {clouds gather above the kiosk}.`,
      audio: windTunnel,
      background: bgMudsplosion1,
      buttonActions: () => [
        {
          next: "intro11a",
        },
      ],

      metadata: { sectionId },
    };
  }),

  intro11a: defineScene("intro11a", function (payload): Scene {
    return {
      id: this.id,
      text: `The mud explodes into a geyser. Electrical tendrils whip out from the clouds. The giant crawfish shrieks 
      with apparent ecstacy. Amid all the chaos, a stoic Mudman releases the object. It levitates serenely into the 
      clouds, licked by the electrical tendrils, {and is carried away}.`,
      audio: windTunnel,
      background: bgMudsplosion2,
      buttonActions: () => [
        {
          next: "intro12",
        },
      ],

      metadata: { sectionId },
    };
  }),

  intro12: defineScene("intro12", function (payload): Scene {
    return {
      id: this.id,
      text: `Straining to see, your will pulls you like a telescope. You follow as the object is guided 
      by strange currents across the clouded sky toward the towering server farms. The towers have large 
      portals in them for the purpose of receving {objects such as these}.`,
      audio: windTunnel,
      background: bgAboveTheClouds,
      narrativeOffset: {
        top: "11vw",
        left: "-28vw",
        margin: "1vw 30vw",
      },
      buttonActions: () => [
        {
          next: "intro12a",
        },
      ],
      metadata: { sectionId },
    };
  }),

  intro12a: defineScene("intro12a", function (payload): Scene {
    return {
      id: this.id,
      text: `The portal opens into pink hallway. You see a myriad of programmers, coding programs 
      that will sell the behavioral futures of entire {Leaks}. To torque each reality to its limit, 
      to squeeze it dry of its data, to milk it for all the relevance it's worth. You see your orb 
      drift into one of the many slimy spirals that line the walls. The programmer at the terminal 
      glares at you standoffishly, as if to say, {"No noobs allowed"}.`,
      audio: windTunnel,
      background: bgServerHallway,
      buttonActions: () => [
        {
          dictionaryEntryId: "leaks",
        },
        {
          next: "intro13",
        },
      ],
      metadata: { sectionId },
    };
  }),

  intro13: defineScene("intro13", function (payload): Scene {
    return {
      id: this.id,
      text: `Server farms, Leaks, Leakcoin...what kind of dream is this? The Supreme Hegemon of Tangential 
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
        sectionId,
        routes: [{ text: "input name", next: "intro14" }],
      },
    };
  }),

  intro14: defineScene("intro14", function (payload): Scene {
    return {
      id: this.id,
      text: `Oh, that's right, {${payload?.text}}! Well at least you still have your name.^^
      And yet...what's missing? You can feel the hole, but not the shape of what fit there. Was it your courage? 
      Your heart? No — something deeper, older. {A promise you made before you were born, maybe}...`,
      audio: windTunnel,
      background: bgFog,
      buttonActions: () => [
        {
          dictionaryEntryId: "player",
        },
        {
          next: "intro15",
        },
      ],
      onPageLoad: () => {
        const dict = useDictionaryStore();
        dict.addEntry("Supreme Hegemon of Tangential Reality");
      },
      metadata: { sectionId },
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
          next: "bedroom",
        },
      ],
      onPageLoad: () => {
        const audioStore = useAudioStore();
        audioStore.fadeOutTrack();
        audioStore.playTrack(poundingSound);
      },
      metadata: { sectionId },
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
