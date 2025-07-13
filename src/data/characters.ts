import { Character, CharacterId } from "@/types/character";
import drunk1Avatar from "@/assets/images/avatars/drunk1.png";
import drunk1Sound from "@/assets/audio/characters/drunk1.mp3";
import drunk2Avatar from "@/assets/images/avatars/drunk2.png";
import drunk2Sound from "@/assets/audio/characters/drunk2.mp3";
import blackDogAvatar from "@/assets/images/avatars/moon-dog.png";
import blackDogScaryAvatar from "@/assets/images/avatars/yeth-hound.png";
import blackDogSound from "@/assets/audio/characters/redblack-dog.mp3";
import faerie1Avatar from "@/assets/images/avatars/faerie1.png";
import faerie1Sound from "@/assets/audio/characters/faerie1.mp3";
import faerie2Avatar from "@/assets/images/avatars/faerie2.png";
import faerie2Sound from "@/assets/audio/characters/faerie2.mp3";
import faerie3Avatar from "@/assets/images/avatars/faerie3.png";
import faerie3Sound from "@/assets/audio/characters/faerie3.mp3";
import squirrelAvatar from "@/assets/images/avatars/squirrel.png";
import squirrelSound from "@/assets/audio/characters/squirrel.mp3";
import buzzAvatar from "@/assets/images/avatars/buzz.png";
import buzzSound from "@/assets/audio/characters/buzz.mp3";
import pinkSnakeAvatar from "@/assets/images/avatars/pink-snake.png";

export const characters: Record<CharacterId, Character> = {
  drunk1: {
    id: "drunk1",
    name: "Drunk #1",
    avatar: drunk1Avatar,
    sound: drunk1Sound,
  },

  drunk2: {
    id: "drunk2",
    name: "Drunk #2",
    avatar: drunk2Avatar,
    sound: drunk2Sound,
  },

  "black-dog": {
    id: "black-dog",
    name: "Redblack Dog",
    avatar: blackDogAvatar,
    sound: blackDogSound,
  },

  "black-dog-scary": {
    id: "black-dog-scary",
    name: "Redblack Dog",
    avatar: blackDogScaryAvatar,
    sound: blackDogSound,
  },

  faerie1: {
    id: "faerie1",
    name: "Hongatar #1",
    avatar: faerie1Avatar,
    sound: faerie1Sound,
  },

  faerie2: {
    id: "faerie2",
    name: "Hongatar #2",
    avatar: faerie2Avatar,
    sound: faerie2Sound,
  },

  faerie3: {
    id: "faerie3",
    name: "Hongatar #3",
    avatar: faerie3Avatar,
    sound: faerie3Sound,
  },

  squirrel: {
    id: "squirrel",
    name: "Squirrel",
    avatar: squirrelAvatar,
    sound: squirrelSound,
  },

  buzz: {
    id: "buzz",
    name: "Buzz Morley",
    avatar: buzzAvatar,
    sound: buzzSound,
  },

  "pink-snake": {
    id: "pink-snake",
    name: "Pink Snake",
    avatar: pinkSnakeAvatar,
    //TOOD: pink snake sound
  },
};
