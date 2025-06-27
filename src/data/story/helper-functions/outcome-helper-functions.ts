import { FateOutcome } from "@/types/story";

export function getBlackDogOutcome(roll: number): FateOutcome {
  if (roll >= 2) {
    return {
      text:
        `You take a running step toward it and fly through the air feet-first in preparation for a ` +
        `two-legged drop kick. The human-faced dog yelps. The dog-bodied human snarls. ` +
        `It looks right into your eyes. You abandon your maneuver mid-air and start to {feel bad}.`,
      success: true,
    };
  } else if (roll == 1) {
    return {
      text:
        `With malicious fury, you wind your leg up to your chest to prepare a wanton one-footed stomp. ` +
        `The human-faced dog squeals. The dog-bodied human snarls. ` +
        `It looks right into your eyes. You lower your foot and start to {feel bad}.`,
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
