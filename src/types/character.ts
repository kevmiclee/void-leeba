export interface Character {
  id: CharacterId;
  name: string;
  avatar: string;
  sound?: string;
}

export type CharacterId =
  | "drunk1"
  | "drunk2"
  | "black-dog"
  | "black-dog-scary"
  | "faerie1"
  | "faerie2"
  | "faerie3"
  | "squirrel";
