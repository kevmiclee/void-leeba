import { CharacterId } from "./character";
import { SceneId } from "@/data/story/story";
import { DictionaryEntryId } from "./dictionary";
import { DrawerView } from "./drawer-view";
import { MiniGameId } from "./minigame";
import { Aspect } from "./aspect";
import { Stat } from "./stat";

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
  buttonActions?: ButtonAction[];
  onPageLoad?: () => void;
  backgroundFilter?: string;
  miniGameId?: MiniGameId;
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
  label: string;
  redirect: SceneId | "drawer";
  aspect?: Aspect;
  stat?: SceneRouteStat;
}

export interface SceneRouteStat {
  id: Stat;
  amount: number;
}
