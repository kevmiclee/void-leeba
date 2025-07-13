export type FlagId =
  | "closer-to-black-dog" // influences the outcome of the redblack dog attack
  | "healed-dog" //TODO: what they heal them into dictates something -- the redux, the chracter comes back to help them
  | "gave-dog-food" //TODO: the dog comes back to help
  | "gave-human-dog-food" //TODO: the human comes back to harm, they don't get the redux, or they get an unhappy redux
  | "drunk-choice" // who they sided with on the Sun/Moon question. Dictates how the drunks assist (or not) the player during the redblack dog attack
  | "caught-squirrel" //TODO: they caught the squirrel so something can happen later on
  | "fell-from-tree" //TODO: they fell from the tree so something can happen later on
  | "did-nap" // they went through the nap branch and opted out. removes nap option from dream1 choices.
  | "did-faeries" // they went through the faeries branch and opted out. removes faeires option from dream1 choices.
  | "pie-choice"; // TODO: which pie they smellled last dicates something later on

export type FlagValues = {
  "closer-to-black-dog": boolean;
  "healed-dog": "dog" | "human";
  "gave-dog-food": boolean;
  "gave-human-dog-food": boolean;
  "drunk-choice": "drunk1" | "drunk2" | undefined;
  "caught-squirrel": boolean;
  "fell-from-tree": boolean;
  "did-nap": boolean;
  "did-faeries": boolean;
  "pie-choice": "pecan" | "key-lime" | "cherry";
};

export type Flags = {
  [K in FlagId]?: FlagValues[K];
};
