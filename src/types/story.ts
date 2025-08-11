import { CharacterId } from "./character";
import { SceneId } from "@/data/story/story";
import { DictionaryEntryId } from "./dictionary";
import { DrawerView } from "./drawer-view";
import { MiniGameId } from "./mini-game";
import { AspectId } from "./aspect";
import { StatId } from "./stat";
import { Manners } from "./manners";
import { DungeonId } from "./dungeon";

export interface ScenePayload {
  filter?: string;
  text?: string;
}

export interface Choice {
  text: string;
  next?: SceneId;
  onChoose?: () => void;
  payload?: ScenePayload;
  drawerView?: DrawerView;
}

export interface Dialog {
  characterId: CharacterId;
  text: string;
  onClick?: () => void;
  popUp?: boolean;
}

export interface ButtonAction {
  id?: string;
  isItem?: boolean;
  dictionaryEntryId?: DictionaryEntryId;
  action?: () => void;
}

export interface Scene {
  id: SceneId;
  text: string;
  animationRate?: number;
  background?: string;
  audio?: string;
  dialogSequence?: () => Dialog[];
  choices?: () => Choice[];
  buttonActions?: () => ButtonAction[];
  onPageLoad?: () => void;
  backgroundFilter?: string;
  miniGameId?: MiniGameId;
  dungeonId?: DungeonId;
  metadata?: SceneMetadata;
}

export interface FateOutcome {
  text: string;
  success: boolean;
}

export interface SceneMetadata {
  routes?: SceneRouteMetadata[];
  items?: string[];
  sectionId: string;
}

export interface SceneRouteMetadata {
  text: string;
  next: SceneId | "drawer";
  aspect?: AspectId;
  stat?: SceneRouteStat;
  manners?: Manners;
}

export interface SceneRouteStat {
  id: StatId;
  amount: number;
}
