import { SceneId } from "@/data/story/story";
import { Item } from "./item";
import { ScenePayload } from "./story";
import { DictionaryEntry } from "./dictionary";
import { FlagId, Flags } from "./flag";
import { DrawerView } from "./drawer-view";
import { Manners } from "./manners";
import { Aspect } from "./aspect";

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
  psychedelicScenesRemaining: number;
  showSceneGraph: boolean;
}

export interface CharacterState {
  name: string;
  health: number;
  blueMagic: number;
  will: number;
  shitheadedness: number;
  athletics: number;
  inventory: Item[];
  flags: Flags;
  manners: Manners | undefined;
}

export interface DrawerState {
  isDrawerOpen: boolean;
  notificationCount: number;
  didViewPhone: boolean;
  drawerView: DrawerView;
  selectedItem: Item | null;
  selectedDictionaryEntry: DictionaryEntry | null;
  phoneIsCrazy: boolean;
}

export interface DictionaryState {
  entries: DictionaryEntry[];
}

export interface AspectState {
  aspects: Aspect[];
}
