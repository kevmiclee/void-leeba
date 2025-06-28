import { CharacterId } from "./character";
import { SceneId } from "@/data/story/story";
import { DictionaryEntryId } from "./dictionary";
import { DrawerView } from "./drawer-view";

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
  miniGameId?: string;
}

export interface FateOutcome {
  text: string;
  success: boolean;
}
