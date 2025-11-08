import { FateOutcome } from "@/types/story";

export function getBlackDogOutcome(roll: number): FateOutcome {
  if (roll >= 2) {
    return {
      text:
        `You take a running step toward it and fly through the air feet-first in preparation for a ` +
        `two-legged drop kick. The human-faced dog yelps. The dog-bodied human snarls. ` +
        `It looks right into your eyes. You abandon your maneuver mid-air. The creature retreats into the shadows. ` +
        `Something inside you stirs and you start to {feel bad}.`,
      success: true,
    };
  } else if (roll == 1) {
    return {
      text:
        `With malicious fury, you wind your leg up to your chest to prepare a wanton one-footed stomp. ` +
        `The human-faced dog squeals. The dog-bodied human snarls. ` +
        `It looks right into your eyes. You lower your foot. The creature retreats into the shadows. ` +
        `Something inside you stirs and you start to {feel bad}.`,
      success: true,
    };
  } else if (roll == 0) {
    return {
      text:
        `You close your eyes and kick out quickly where you think its face is. Your hear its panting as ` +
        `your leg furtively kicks out. You hit nothing. But strangely, you hear it depart. You open your eyes.` +
        `^^Seeing the human-faced dog scamper away, you wonder if it was wrong to judge it so quickly. You start to {feel bad}.`,
      success: true,
    };
  } else {
    return {
      text:
        `As you prepare your attack, you lose your footing. The redblack dog's eyes flicker with ` +
        `an all-to-human violence. It's bared teeth shimmer with the certainty of death. ` +
        `The dog-body rushes toward you. The human-face is inches from yours. {You close your eyes.}`,
      success: false,
    };
  }
}

export function getTreeChopOutcome(roll: number): FateOutcome {
  if (roll > 0) {
    return {
      text: "chop-success",
      success: true,
    };
  } else if (roll < 0) {
    return {
      text: "chop-fail",
      success: false,
    };
  } else {
    return {
      text: "chop-neutral",
      success: true,
    };
  }
}

export function getCatchSquirrelOutcome(roll: number): FateOutcome {
  if (roll >= 2) {
    return {
      text:
        `Sweet synergy! In one fluid motion, you grabbed that sucker! You were so fast, the squirrel didn't even see it coming. ` +
        `OK, Mr. Miyagi!` +
        `^^It almost squirms free before you can recover from the shock of actually catching it. ` +
        `Overjoyed and triumphant, you shimmy back down to the forest floor with an easy swagger. ` +
        `The squirrel crawls up your sleeve and runs a circle around your neck. You made a friend!` +
        `^^The squirrel chitters beseechingly. It wants you to follow it.`,
      success: true,
    };
  } else if (roll == 1) {
    return {
      text:
        `The squirrel is fast, but you are faster... just barely. You manage to snatch the squirrel by its tail. ` +
        `Between the shock of catching the squirrel, and the subsequent frenzy of its struggle to free itself from your grasp, ` +
        `you lose your footing on the tree. Dangling from the tree by one hand, with the squirrel in the other, ` +
        `your feet search to regain the trunk. Phew! The squirrel's frenzy abates to a limp submission. ` +
        `You're able to shimmy back down to the forest floor. Once there, the squirrel crawls up your sleeve and ` +
        `runs a circle around your neck. You made a friend!` +
        `^^The squirrel chitters beseechingly. It wants you to follow it.`,
      success: true,
    };
  } else if (roll == 0) {
    return {
      text:
        `You are fast, but the squirrel is faster. You miss, and the momentum of your action causes you to lose your footing. ` +
        `Your other hand loses its grip on the tree. As you're falling back, you flail your hand out in a final desparate attempt. ` +
        `You hit the ground and somehow, the squirrel is in your hand. You're both a bit shaken up from the fall.` +
        `^^After you both take a moment to regain your senses, the squirrel chitters beseechingly. It wants you to follow it.`,
      success: true,
    };
  } else {
    return {
      text:
        `Pfft. Of course you missed. Who catches a squirrel with their bare hands? As a result, you lose ` +
        `your grip and fall backwards like a defeated villain in slow-motion.` +
        `^^You hit the ground with a soft thud and several pinecones scatter down around you. {Pick up a pinecone.}` +
        `^^The squirrel wants you to follow it.`,
      success: false,
    };
  }
}

export function getNonZeroRandomDecimal(max: number): number {
  let num = 0;
  while (num === 0) {
    num = Math.random() * max;
  }
  return num;
}
