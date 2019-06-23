module.exports = {
  /**
   * Returns the new elo of two players in a match 
   * @param  {Integer} winnerElo Winner's old elo
   * @param  {Integer} loserElo Loser's old elo
   * @return {List[Integer]}    list of new elos in the order winner, loser
   */
  findNewElo(winnerElo, loserElo) {
    const k = 32;
    const r1 = Math.pow(10, winnerElo/400);
    const r2 = Math.pow(10, loserElo/400);
    const e1 = r1/(r1+r2);
    const e2 = r2/(r1+r2);
    const s1 = 1;
    const s2 = 0;
    return [parseInt(winnerElo + k * (s1 - e1), 10), parseInt(loserElo + k * (s2 - e2), 10)]
  }
}
