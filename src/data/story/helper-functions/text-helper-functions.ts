import { Manners } from "@/types/manners";

export function getNapFaeries2Text(filter?: string) {
  switch (filter) {
    case "bow":
      return `The {hongatar} seem giddy at your gracious display and you can feel your nosehairs tingling.`;

    case "lesson":
      return (
        `The {hongatar} nod solemnly. After a moment of quiet reflection, they all begin to ` +
        `extol the virtues of not littering.`
      );

    case "thanks":
      return (
        `"Thanks!".."\`Thanks!\`".."tHaNkS!!" The {hongatar} are mocking you ruthlessly in what you ` +
        `tell yourself is all in good fun.`
      );

    case "wink":
      return "This excites the {hongatar} very much. They start to flip and spin and shout and yip.";

    case "flatter":
      return `The {hongatar} blush simultaneously. What you said has them all a-titter!`;

    case "insult":
      return (
        `"\`tHaT's ThE sTuPiDeSt ThInG i'Ve EvEr HeArD!\`" The {hongatar} are mocking you ruthlessly, ` +
        `totally unfazed by your shallow insult.`
      );

    case "accuse":
      return `The {hongatar} dismiss you summarily. You simply don't have the proof to back your accusations.`;

    default:
      return "";
  }
}

export function getTreeChaseText(filter?: string) {
  switch (filter) {
    case "dream":
      return (
        `The thuds you were hearing turned out to be very real. Well, for a dream... ` +
        `especially considering you were dreaming twice.^^`
      );

    case "squirrel":
      return (
        `As you swat at the pesky vermin you lose your grip and fall backwards like a defeated villain ` +
        `in slow-motion, finally hitting the ground with a thud. `
      );

    case "chop-success":
      return (
        `You slice through the tree with one fell swoop. Wow! Your parking lot dreams just might come true!` +
        `^^The huge tree creaks ominously as it starts to fall. Just as you are about to yell, "Timber!", you hear strange ` +
        `noises from the depths of the forest. The tree hits the ground with a dull, lifeless thud. `
      );

    case "chop-fail":
      return (
        `The axe bounces off the tree and flies out of your hands, disappearing into the forest. ` +
        `Not even a dent. Lame! Looks like you won't get your parking lot after all. `
      );

    case "chop-neutral":
      return (
        `You manage to slice into the tree, but the axe gets stuck in the trunk. You yank it free, ` +
        `and as you do, it flies out of your hands, disappearing into the forest. `
      );

    default:
      return "";
  }
}

export function getDrunkRescueText(filter?: string) {
  if (filter) {
    return `The drunk from before stumbles by.`;
  } else {
    return `There are those drunks from before. You cry out for help, but they don't see to care.`;
  }
}

export function getDrunkMannersRescueText(manners?: Manners) {
  switch (manners) {
    case "rude":
      return "Serves them right. Probably deserve whatever Paul has in mind for them.";
    case "depressing":
      return "A good dose of mortal fear should remind them how to appreciate the little things in life.";
    case "polite":
      return "We should help them, but only because they were so polite to us earlier.";
  }
}

export function getFollowSquirrelText(filter?: string) {
  switch (filter) {
    case "where":
      return (
        `The squirrel has no reply. You rememeber someone telling you: "Travel is about ` +
        `the gorgeous feeling of teetering in the unknown." You suppose this is one of those times.`
      );
    case "what":
      return `The squirrel has no reply. You rememeber someone telling you: "It's not a question, but a lesson learned in time." You suppose this is one of those times.`;
    case "why":
      return `You remember someone telling you: "Peculiar travel suggestions are dancing lessons from god." You suppose this is one of those times.`;
    default:
      return "";
  }
}
