export interface Aspect {
  id: AspectId;
  name: string;
  description: string;
  durationScenes: number; // how many scenes it lasts
  scenesRemaining: number; // decremented each scene
}

export type AspectId =
  | "magic-nosehairs"
  | "tree-murderer"
  | "all-your-bones-are-broken"
  | "ascetic"
  | "well-versed"
  | "animal-abuser"
  | "part-bird";
