import { SceneId } from "@/data/story/story";
import { Item } from "./item";
import { ScenePayload } from "./story";
import { DictionaryEntry } from "./dictionary";
import { Flags } from "./flag";
import { DrawerView } from "./drawer-view";
import { Manners } from "./manners";
import { Aspect } from "./aspect";
import { Stat } from "./stat";

export interface GameState {
  currentSceneId: SceneId;
  currentScenePayload: ScenePayload | undefined;
  currentSceneIndex: number;
  started: boolean;
  scenes: SceneId[];
  showSceneGraph: boolean;
}

export interface CharacterState {
  name: string;
  health: number;
  blueMagic: Stat;
  will: Stat;
  shitheadedness: Stat;
  athletics: Stat;
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

export interface EffectsState {
  showChoices: boolean;
  animationSkipped: boolean;
  showOverlay: boolean;
  showDisappearingItem: boolean;
  isPsychedelic: boolean;
  psychedelicScenesRemaining: number;
  isZoomedOut: boolean;
  isSpinning: boolean;
  blurChoices: boolean;
  stretchAvatar: boolean;
}
