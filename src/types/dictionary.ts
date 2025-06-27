export interface DictionaryEntry {
  id: DictionaryEntryId;
  name: string;
  description: string;
}

export type DictionaryEntryId =
  | "hongatar"
  | "dorgang"
  | "hyperleak"
  | "whatever";
