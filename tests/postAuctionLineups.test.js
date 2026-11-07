import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getLineupRequirements,
  getRequiredLineupPlayerCount,
  getLineupStrength,
  getLineupWinners,
  getSquadPlayerIds,
} from '../src/lib/postAuctionLineups.js';

test('lineup strength is the average rating of the selected starters', () => {
  const players = new Map(
    Array.from({ length: 11 }, (_, index) => [
      `p${index}`,
      { rating: 80 },
    ]),
  );
  const lineup = {
    startingXI: Array.from({ length: 11 }, (_, index) => `p${index}`),
  };

  assert.deepEqual(getLineupStrength(lineup, players), {
    startersRating: 80,
    score: 80,
  });
});

test('lineup strength rejects incomplete saved lineups', () => {
  assert.equal(getLineupStrength({ startingXI: ['p1'] }, new Map()), null);
});

test('winner selection supports a single winner, joint winners, and empty rankings', () => {
  const first = { teamName: 'Team A', strength: { score: 82.4 } };
  const tied = { teamName: 'Team B', strength: { score: 82.4 } };
  const third = { teamName: 'Team C', strength: { score: 80.1 } };

  assert.deepEqual(getLineupWinners([first, third]), [first]);
  assert.deepEqual(getLineupWinners([first, tied, third]), [first, tied]);
  assert.deepEqual(getLineupWinners([]), []);
});

test('each mode requires only its starting lineup size', () => {
  assert.deepEqual(getLineupRequirements('mega'), { startingCount: 11 });
  assert.deepEqual(getLineupRequirements('sprint11'), { startingCount: 11 });
  assert.deepEqual(getLineupRequirements('sprint5'), { startingCount: 5 });
  assert.equal(getRequiredLineupPlayerCount('sprint5'), 5);
  assert.equal(getRequiredLineupPlayerCount('sprint11'), 11);
  assert.equal(getRequiredLineupPlayerCount('mega'), 11);

  const players = new Map(
    Array.from({ length: 11 }, (_, index) => [`p${index}`, { rating: 70 + index }]),
  );
  const classicLineup = {
    startingXI: Array.from({ length: 11 }, (_, index) => `p${index}`),
  };
  const classicStrength = getLineupStrength(classicLineup, players, 'sprint11');
  assert.equal(classicStrength.score, 75);

  const sprintLineup = {
    startingXI: Array.from({ length: 5 }, (_, index) => `p${index}`),
  };
  assert.ok(getLineupStrength(sprintLineup, players, 'sprint5'));
});

test('squad player ids support legacy strings and auction player objects', () => {
  assert.deepEqual(getSquadPlayerIds(['p1', { id: 'p2', bid: 3 }, null]), ['p1', 'p2']);
});
