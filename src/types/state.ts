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
  flags: Record<FlagId, string | undefined>;
}

export type Stat =
  | "health"
  | "blueMagic"
  | "will"
  | "shitheadedness"
  | "athletics";

export type FlagId =
  | "closer-to-black-dog" //influences the outcome of the redblack dog attack
  | "healed-dog" //TODO: what they heal them into dictates something -- the redux, the chracter comes back to help them
  | "faerie-manners" //TODO: how the player response to the faeries
  | "gave-dog-food" //TODO: the dog comes back to help
  | "drunk-choice" // who they sided with on the Sun/Moon question. Dictates how the drunks assist (or not) the player during the redblack dog attack
  | "drunk-manners"; // how the player responds to the drunks. Dictates how the drunks assist (or not) the player during the redblack dog attack

export interface DrawerState {
  isDrawerOpen: boolean;
  notificationCount: number;
  didViewPhone: boolean;
  drawerView: DrawerView;
  selectedItem: Item | null;
  selectedDictionaryEntry: DictionaryEntry | null;
  phoneIsCrazy: boolean;
}

export type DrawerView =
  | "main"
  | "bag"
  | "phone"
  | "dictionary"
  | "stats"
  | "scenes"
  | "scene-graph";

export interface DictionaryState {
  entries: DictionaryEntry[];
}
