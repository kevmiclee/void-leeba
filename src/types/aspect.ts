export interface Aspect {
  id: AspectId;
  name: string;
  description: string;
  durationScenes: number; // how many scenes it lasts
  scenesRemaining: number; // decremented each scene
}

export type AspectId =
  | "magic-nosehairs"
  | "one-with-the-hongatar"
  | "god-of-the-forest"
  | "sexy-god-of-the-forest"
  | "butt-of-the-joke"
  | "boy-who-cried-wolf"
  | "nobodys-friend"
  | "squirrel-tamer"
  | "squirrel-bitch"
  | "tree-murderer"
  | "all-your-bones-are-broken"
  | "jack-be-nimble"
  | "ascetic"
  | "well-versed"
  | "life-of-the-party";
