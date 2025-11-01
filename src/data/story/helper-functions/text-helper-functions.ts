import { Manners, MannersId } from "@/types/manners";

export function getNapFaeries2Text(filter?: string): string {
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
        `"Thanks!".."<i>Thanks!</i>".."tHaNkS!!" The {hongatar} are mocking you ruthlessly in what you ` +
        `tell yourself is all good fun.`
      );

    case "wink":
      return "This excites the {hongatar} very much. They start to flip and spin and shout and yip.";

    case "flatter":
      return `The {hongatar} blush simultaneously. What you said has them all a-titter!`;

    case "insult":
      return (
        `"<i>tHaT iS aSiNiNe!</i>" The {hongatar} are mocking you ruthlessly, ` +
        `totally unfazed by your shallow insult.`
      );

    case "accuse":
      return `The {hongatar} dismiss you summarily. You simply don't have the proof to back your accusations.`;

    default:
      return "";
  }
}

export function getTreeChaseText(filter?: string): string {
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

export function getDrunkRescueText(filter?: string): string {
  if (filter) {
    return `The drunk from before stumbles by.`;
  } else {
    return `There are those drunks from before. You cry out for help, but they don't seem to care.`;
  }
}

export function getDrunkMannersRescueText(manners?: MannersId): string {
  switch (manners) {
    case "rude":
      return "Serves them right. Probably deserve whatever Paul has in mind for them.";
    case "depressing":
      return "A good dose of mortal fear should remind them how to appreciate the little things in life.";
    case "polite":
      return "We should help them, but only because they were so polite to us earlier.";
    default:
      return "";
  }
}

export function getFollowSquirrelText(filter?: string): string {
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

export function getBlackDogDoneText(filter: string): string {
  switch (filter) {
    case "food-dog":
      return "It whimpers happily as it snarfles the food you gave it. Then it scampers off into the neighborhood.";
    case "pets-dog":
      return "It dodges your advance, but its manner is playful. It barks happily and trots away into the neighborhood.";
    case "nothing-dog":
      return (
        `Seeing mostly surprise and wonder in your eyes, but no action, it turns tail to traipse ` +
        `across the field, stopping here and there to sniff the ground, but disappearing into the neighborhood.`
      );

    case "food-human":
      return (
        `The man eyes the food cautiously, and takes a furtive step toward it. After a suspicious sniff, he recoils in disgust, ` +
        `as if suddenly recalling an unpleasant memory. He darts an accusatory gaze at you and sprints off into the neighborhood.`
      );
    case "pets-human":
      return (
        `You reach out your hand and begin to stroke the man's hair. He does not resist but his face is a mix of conflicting emotions, until suddenly ` +
        `as if recalling an unpleasant memory, he recoils in disgust. He darts an accusatory gaze at you and sprints off into the neighborhood.`
      );
    case "nothing-human":
      return (
        `The man looks up into your eyes, looking confused and wild, looking down at himself, he covers his ` +
        `gonads, and turns tail to sprint across the field into the neighborhood.`
      );

    default:
      return "";
  }
}
