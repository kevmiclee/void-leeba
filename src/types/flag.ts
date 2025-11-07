export type FlagId =
  | "black-dog-readiness" // influences the outcome of the redblack dog attack
  | "healed-dog" // what they heal them into dictates something -- the redux, the chracter comes back to help them
  | "gave-dog-food" // the dog comes back to help
  | "gave-human-dog-food" // the human comes back to harm, they don't get the redux, or they get an unhappy redux
  | "drunk-choice" // who they sided with on the Sun/Moon question. Dictates how the drunks assist (or not) the player during the redblack dog attack
  | "caught-squirrel" // they caught the squirrel so something can happen later on
  | "fell-from-tree" // they fell from the tree so something can happen later on
  | "did-nap" // they went through the nap branch and opted out. removes nap option from dream1 choices.
  | "did-faeries" // they went through the faeries branch and opted out. removes faeires option from dream1 choices.
  | "pie-choice" //  which pie they smellled last dicates something later on
  | "art-table-success-rate" // how well you're able to sell your art
  | "asking-for-trouble" // makes it more likely for 'bad' things to happen
  | "time-fly-choice"
  | "shib-sequence-count";

export type FlagValues = {
  "black-dog-readiness": number;
  "healed-dog": "dog" | "human";
  "gave-dog-food": boolean;
  "gave-human-dog-food": boolean;
  "drunk-choice": "drunk1" | "drunk2" | undefined;
  "caught-squirrel": boolean;
  "fell-from-tree": boolean;
  "did-nap": boolean;
  "did-faeries": boolean;
  "pie-choice": "pecan" | "key-lime" | "cherry";
  "art-table-success-rate": number;
  "asking-for-trouble": boolean;
  "time-fly-choice": "kill" | "free" | "keep";
  "shib-sequence-count": number;
};

export type Flags = {
  [K in FlagId]?: FlagValues[K];
};
