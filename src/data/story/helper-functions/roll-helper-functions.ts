function rollFateDice(): number {
  const dice: number[] = Array.from({ length: 4 }, () => {
    const roll = Math.floor(Math.random() * 3);
    return roll === 0 ? -1 : roll === 1 ? 0 : 1;
  });

  return dice.reduce((sum, val) => sum + val, 0);
}

// type FateRollResult = {
//   playerTotal: number;
//   npcTotal: number;
//   outcome: "success" | "failure" | "tie";
// };

export function fateContest(playerSkill: number, npcStat: number): number {
  const playerRoll = rollFateDice();
  const npcRoll = rollFateDice();

  const playerTotal = playerSkill + playerRoll;
  const npcTotal = npcStat + npcRoll;

  //   if (playerTotal > npcTotal) {
  //     outcome = "success";
  //   } else if (playerTotal < npcTotal) {
  //     outcome = "failure";
  //   } else {
  //     outcome = "tie";
  //   }

  return playerTotal - npcTotal;
}
