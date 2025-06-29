function rollFateDice(): number {
  const dice: number[] = Array.from({ length: 4 }, () => {
    const roll = Math.floor(Math.random() * 3);
    return roll === 0 ? -1 : roll === 1 ? 0 : 1;
  });

  return dice.reduce((sum, val) => sum + val, 0);
}

export function fateContest(playerSkill: number, npcStat: number): number {
  const playerRoll = rollFateDice();
  const npcRoll = rollFateDice();

  const playerTotal = playerSkill + playerRoll;
  const npcTotal = npcStat + npcRoll;

  return playerTotal - npcTotal;
}
