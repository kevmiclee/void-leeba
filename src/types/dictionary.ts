export interface DictionaryEntry {
  id: DictionaryEntryId;
  name: string;
  description: string;
}

export type DictionaryEntryId =
  | "hongatar"
  | "dorgang"
  | "hyperleak"
  | "whatever"
  | "leaks"
  | "player"
  | "Supreme Hegemon of Tangential Reality"
  | "Goofball Dust Explosion"
  | "Mudman";
