export const getLineupRequirements = (auctionType = 'mega') => {
  if (auctionType === 'sprint5') return { startingCount: 5 };
  if (auctionType === 'sprint11') return { startingCount: 11 };
  return { startingCount: 11 };
};

export const getRequiredLineupPlayerCount = (auctionType = 'mega') => (
  getLineupRequirements(auctionType).startingCount
);

export const getSquadPlayerIds = (squad = []) => squad
  .map((player) => (typeof player === 'string' ? player : player?.id))
  .filter(Boolean);

export const getLineupStrength = (lineup, playersById, auctionType = 'mega') => {
  const { startingCount } = getLineupRequirements(auctionType);
  const startingPlayers = (lineup?.startingXI || [])
    .map((playerId) => playersById.get(playerId))
    .filter(Boolean);

  if (startingPlayers.length !== startingCount) {
    return null;
  }

  const startersRating = startingPlayers.reduce(
    (total, player) => total + (Number(player.rating) || 0),
    0,
  ) / startingPlayers.length;

  return {
    startersRating,
    score: Number(startersRating.toFixed(1)),
  };
};

export const getLineupWinners = (rankings = []) => {
  if (rankings.length === 0) return [];
  const topScore = rankings[0].strength.score;
  return rankings.filter((entry) => entry.strength.score === topScore);
};
