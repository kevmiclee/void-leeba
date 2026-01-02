import { CharacterId } from "./character";
import { SceneId } from "@/data/story/story";
import { DictionaryEntryId } from "./dictionary";
import { DrawerView } from "./drawer-view";
import { MiniGameId } from "./mini-game";
import { AspectId } from "./aspect";
import { StatId } from "./stat";
import { Manners, MannersId } from "./manners";
import { DungeonId } from "./dungeon";
import { ItemId } from "./item";
import { FlagId, FlagValues } from "./flag";

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
  itemId?: ItemId;
  stats?: StatAffect[];
  flags?: FlagAffect[];
  manners?: MannersAffect[];
  aspect?: AspectId;
  items?: ItemAffect[];
}

export interface Dialog {
  characterId: CharacterId;
  text: string;
  onClick?: () => void;
  //TODO: CHORE - Make next a function whereever it is present
  next?: SceneId;
  popUp?: boolean;
  filter?: string | undefined;
}

export interface ButtonAction {
  id?: string;
  dictionaryEntryId?: DictionaryEntryId;
  action?: () => void;
  next?: SceneId;
  filter?: string | undefined;
  item?: ItemId;
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
  hasInput?: boolean;
  onInputEntered?: () => void;
  narrativeOffset?: any;
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
  stat?: StatAffect;
  manners?: MannersId;
}

export interface StatAffect {
  id: StatId;
  amount: number;
  isLost?: boolean;
}

export interface FlagAffect<K extends FlagId = FlagId> {
  id: K;
  value: FlagValues[K];
}

export interface MannersAffect {
  id: MannersId;
  amount: number;
}

export interface ItemAffect {
  id: ItemId;
  amount: number;
  isLost?: boolean;
  showSnackbar?: boolean;
}
