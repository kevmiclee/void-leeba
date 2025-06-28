export type FlagId =
  | "closer-to-black-dog" // influences the outcome of the redblack dog attack
  | "healed-dog" //TODO: what they heal them into dictates something -- the redux, the chracter comes back to help them
  | "gave-dog-food" //TODO: the dog comes back to help
  | "drunk-choice"; // who they sided with on the Sun/Moon question. Dictates how the drunks assist (or not) the player during the redblack dog attack

export type FlagValues = {
  "closer-to-black-dog": boolean;
  "healed-dog": "dog" | "human";
  "gave-dog-food": boolean;
  "drunk-choice": "drunk1" | "drunk2" | undefined;
};

export type Flags = {
  [K in FlagId]?: FlagValues[K];
};
