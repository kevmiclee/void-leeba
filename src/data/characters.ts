import { Character, CharacterId } from "@/types/character";

export const characters: Record<CharacterId, Character> = {
  drunk1: {
    id: "drunk1",
    name: "Drunk #1",
    avatar: "src/assets/images/avatars/drunk1.png",
    sound: "src/assets/audio/characters/drunk1.mp3",
  },
  drunk2: {
    id: "drunk2",
    name: "Drunk #2",
    avatar: "src/assets/images/avatars/drunk2.png",
    sound: "src/assets/audio/characters/drunk2.mp3",
  },
  "black-dog": {
    id: "black-dog",
    name: "Redblack Dog",
    avatar: "src/assets/images/avatars/moon-dog.png",
    sound: "src/assets/audio/characters/redblack-dog.mp3",
  },
  "black-dog-scary": {
    id: "black-dog-scary",
    name: "Redblack Dog",
    avatar: "src/assets/images/avatars/yeth-hound.png",
    sound: "src/assets/audio/characters/redblack-dog.mp3",
  },
  faerie1: {
    id: "faerie1",
    name: "Hongatar #1",
    avatar: "src/assets/images/avatars/faerie1.png",
    sound: "src/assets/audio/characters/faerie1.mp3",
  },
  faerie2: {
    id: "faerie2",
    name: "Hongatar #2",
    avatar: "src/assets/images/avatars/faerie2.png",
    sound: "src/assets/audio/characters/faerie2.mp3",
  },
  faerie3: {
    id: "faerie3",
    name: "Hongatar #3",
    avatar: "src/assets/images/avatars/faerie3.png",
    sound: "src/assets/audio/characters/faerie3.mp3",
  },
  squirrel: {
    id: "squirrel",
    name: "Squirrel",
    avatar: "src/assets/images/avatars/squirrel.png",
    sound: "src/assets/audio/characters/squirrel.mp3",
  },
};
