import { SceneId } from "@/data/story/story";
import { Item } from "./item";
import { ScenePayload } from "./story";
import { DictionaryEntry } from "./dictionary";

export interface GameState {
  currentSceneId: SceneId;
  currentScenePayload: ScenePayload | undefined;
  started: boolean;
  showChoices: boolean;
  animationSkipped: boolean;
  showOverlay: boolean;
  scenes: SceneId[];
  showDisappearingItem: boolean;
  isPsychedelic: boolean;
}

export interface CharacterState {
  name: string;
  health: number;
  blueMagic: number;
  will: number;
  shitheadedness: number;
  athletics: number;
  inventory: Item[];
  flags: Record<string, string | undefined>;
}

export interface DrawerState {
  isDrawerOpen: boolean;
  notificationCount: number;
  didViewPhone: boolean;
  drawerView: DrawerView;
  selectedItem: Item | null;
  selectedDictionaryEntry: DictionaryEntry | null;
}

export type DrawerView =
  | "main"
  | "bag"
  | "phone"
  | "dictionary"
  | "stats"
  | "scenes";

export interface DictionaryState {
  entries: DictionaryEntry[];
}
