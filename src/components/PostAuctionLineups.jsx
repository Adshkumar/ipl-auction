import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Loader2, Save, Star, Trophy } from 'lucide-react';
import { IPL_PLAYERS } from '../data/players';
import { TEAMS } from '../data/teams';
import { getFirebaseRtdbErrorMessage } from '../lib/firebaseRtdbErrors';
import {
  getLineupStrength,
  getLineupWinners,
  getLineupRequirements,
  getRequiredLineupPlayerCount,
  getSquadPlayerIds,
} from '../lib/postAuctionLineups';

const PostAuctionLineups = ({
  roomId,
  serverLabel,
  user,
  auction,
  roomTeams,
  lineups,
  lineupsLoading,
  lineupsError,
  saveLineup,
  revealComparison,
}) => {
  const [startingXI, setStartingXI] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [actionError, setActionError] = useState('');

  const playerById = useMemo(() => new Map(IPL_PLAYERS.map((player) => [player.id, player])), []);
  const { startingCount } = getLineupRequirements(auction?.auctionType);
  const managers = auction?.players || [];
  const teamsWithManagers = managers
    .filter((manager) => manager.team && !manager.isBot)
    .map((manager) => {
      const team = roomTeams.find(
        (entry) => entry.userId === manager.id && entry.teamId === manager.team,
      );
      const teamInfo = TEAMS.find((entry) => entry.id === manager.team);
      return {
        manager,
        team,
        teamId: manager.team,
        teamName: teamInfo?.name || manager.team,
        squadIds: getSquadPlayerIds(team?.squad),
      };
    });
  const requiredPlayerCount = getRequiredLineupPlayerCount(auction?.auctionType);
  const eligibleTeams = teamsWithManagers.filter((entry) => entry.squadIds.length >= requiredPlayerCount);
  const ownTeam = teamsWithManagers.find((entry) => entry.manager.id === user?.uid);
  const ownLineup = user?.uid ? lineups?.[user.uid] : null;
  const isHost = auction?.hostId === user?.uid;
  const isCompleted = auction?.status === 'completed';
  const isRevealed = auction?.lineupComparisonRevealed === true;

  useEffect(() => {
    setStartingXI(ownLineup?.startingXI || []);
  }, [ownLineup?.startingXI]);

  const savedCount = eligibleTeams.filter((entry) => {
    const lineup = lineups?.[entry.manager.id];
    return getLineupStrength(lineup, playerById, auction?.auctionType) !== null;
  }).length;
  const allLineupsSaved = eligibleTeams.length > 0 && savedCount === eligibleTeams.length;

  const rankings = isRevealed
    ? eligibleTeams
      .map((entry) => ({
        ...entry,
        strength: getLineupStrength(lineups?.[entry.manager.id], playerById, auction?.auctionType),
      }))
      .filter((entry) => entry.strength)
      .sort((a, b) => b.strength.score - a.strength.score)
    : [];
  const winners = getLineupWinners(rankings);

  const toggleSelection = (playerId) => {
    setActionError('');
    if (startingXI.includes(playerId)) {
      setStartingXI(startingXI.filter((id) => id !== playerId));
    } else if (startingXI.length < startingCount) {
      setStartingXI([...startingXI, playerId]);
    }
  };

  const handleSave = async () => {
    if (!ownTeam || startingXI.length !== startingCount) return;
    setIsSaving(true);
    setActionError('');
    try {
      await saveLineup(roomId, ownTeam.teamId, startingXI);
    } catch (error) {
      setActionError(getFirebaseRtdbErrorMessage(error, serverLabel));
    } finally {
      setIsSaving(false);
    }
  };

  const handleReveal = async () => {
    setIsRevealing(true);
    setActionError('');
    try {
      await revealComparison(roomId);
    } catch (error) {
      setActionError(getFirebaseRtdbErrorMessage(error, serverLabel));
    } finally {
      setIsRevealing(false);
    }
  };

  if (!isCompleted) {
    return (
      <section className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <h2 className="text-xl font-black uppercase">Best XI comparison</h2>
        <p className="mt-2 text-sm text-gray-400">This feature unlocks after the auction is complete.</p>
      </section>
    );
  }

  const ownSquad = ownTeam?.squadIds
    .map((playerId) => playerById.get(playerId))
    .filter(Boolean) || [];
  const canSave = ownTeam
    && startingXI.length === startingCount
    && !isRevealed;

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <header className="rounded-3xl border border-[#f5bd55]/20 bg-[#f5bd55]/[0.04] p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <Star className="text-[#f5bd55]" />
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight">Build Your Best XI</h2>
            <p className="mt-1 text-xs text-gray-400">
              Choose {startingCount} players from your auction squad. The team score is based on the average rating of this lineup; no external AI is used.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-black uppercase tracking-wider">
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-white">
            Starting lineup: {startingXI.length}/{startingCount}
          </span>
          <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-gray-400">
            Lineups saved: {savedCount}/{eligibleTeams.length} eligible teams
          </span>
        </div>
      </header>

      {lineupsLoading && (
        <p className="flex items-center gap-2 text-xs text-gray-400"><Loader2 size={14} className="animate-spin" /> Loading saved lineups…</p>
      )}
      {lineupsError && <p role="alert" className="text-sm text-red-400">{lineupsError}</p>}

      {ownTeam ? (
        ownTeam.squadIds.length < requiredPlayerCount ? (
          <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4 text-sm text-yellow-200">
            Your squad needs at least {requiredPlayerCount} players to save the lineup for this mode. Teams with fewer players can’t be included in this comparison.
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-black uppercase tracking-wide">{ownTeam.teamName} · Your squad</h3>
              <button
                type="button"
                onClick={handleSave}
                disabled={!canSave || isSaving || lineupsLoading}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#f5bd55] px-4 py-2 text-[10px] font-black uppercase tracking-wider text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                {ownLineup ? 'Update lineup' : 'Save lineup'}
              </button>
            </div>
            <div className="space-y-2">
              {ownSquad.map((player) => {
                const inStarting = startingXI.includes(player.id);
                return (
                  <div key={player.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/5 bg-white/[0.025] px-3 py-2.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{player.name}</p>
                      <p className="text-[10px] uppercase tracking-wider text-gray-500">{player.role} · Rating {player.rating ?? '—'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        aria-pressed={inStarting}
                        disabled={isRevealed || (!inStarting && startingXI.length >= startingCount)}
                        onClick={() => toggleSelection(player.id)}
                        className={`rounded-lg border px-3 py-2 text-[9px] font-black uppercase tracking-wide disabled:opacity-40 ${inStarting ? 'border-[#f5bd55]/50 bg-[#f5bd55]/15 text-[#f5bd55]' : 'border-white/10 text-gray-400'}`}
                      >
                        {inStarting ? 'Starting XI ✓' : 'Add to XI'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            {ownLineup && <p className="mt-3 flex items-center gap-2 text-xs text-green-400"><CheckCircle2 size={14} /> Your lineup is saved.</p>}
          </div>
        )
      ) : (
        <p className="rounded-2xl border border-white/10 p-4 text-sm text-gray-400">Only a manager with an assigned team can save a lineup.</p>
      )}

      {actionError && <p role="alert" className="text-sm text-red-400">{actionError}</p>}

      <div className="rounded-3xl border border-white/10 bg-[#0c0c0c] p-5 sm:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="flex items-center gap-2 font-black uppercase"><Trophy size={17} className="text-[#f5bd55]" /> Team strength comparison</h3>
            <p className="mt-1 text-xs text-gray-500">
              Score = average rating of the selected starting lineup.
            </p>
          </div>
          {isHost && !isRevealed && (
            <button
              type="button"
              onClick={handleReveal}
              disabled={!allLineupsSaved || isRevealing}
              className="min-h-11 rounded-xl bg-gradient-to-r from-[#f5bd55] to-[#d89b37] px-5 py-3 text-[10px] font-black uppercase tracking-wider text-black disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isRevealing ? 'Comparing…' : `Compare ${eligibleTeams.length} teams`}
            </button>
          )}
        </div>
        {isHost && !isRevealed && !allLineupsSaved && (
          <p className="mt-3 text-xs text-gray-500">
            The host can compare after all {eligibleTeams.length} eligible teams have saved. Teams with fewer than {requiredPlayerCount} players are excluded.
          </p>
        )}
        {isRevealed ? (
          rankings.length > 0 ? (
            <>
              <div className="mt-5 rounded-2xl border border-[#f5bd55]/40 bg-gradient-to-br from-[#f5bd55]/15 to-[#f5bd55]/[0.04] p-5 sm:p-7">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5bd55]/15 text-[#f5bd55] sm:h-14 sm:w-14">
                    <Trophy size={24} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f5bd55]">
                      {winners.length > 1 ? 'Joint winners' : 'Winning team'}
                    </p>
                    {winners.map((winner) => (
                      <div key={winner.manager.id} className="mt-1">
                        <h4 className="break-words text-xl font-black uppercase leading-tight text-white sm:text-2xl">
                          {winner.teamName}
                        </h4>
                        <p className="mt-1 break-words text-xs text-gray-300 sm:text-sm">
                          Managed by {winner.manager.name || 'Manager'}
                        </p>
                      </div>
                    ))}
                    <p className="mt-3 text-sm font-bold text-[#f5bd55]">
                      Best lineup average: {winners[0].strength.score.toFixed(1)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 space-y-3">
              {rankings.map((entry, index) => (
                <article key={entry.manager.id} className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 ${index === 0 ? 'border-[#f5bd55]/40 bg-[#f5bd55]/[0.07]' : 'border-white/5 bg-white/[0.02]'}`}>
                  <div className="min-w-0">
                    <p className="break-words text-sm font-black uppercase">#{index + 1} {entry.teamName}</p>
                    <p className="mt-1 break-words text-[10px] text-gray-500 sm:text-xs">
                      Starting lineup {entry.strength.startersRating.toFixed(1)}
                      {` · ${entry.manager.name || 'Manager'}`}
                    </p>
                  </div>
                  <p className="shrink-0 text-2xl font-black text-[#f5bd55]">{entry.strength.score.toFixed(1)}</p>
                </article>
              ))}
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-gray-400">No valid lineups were saved for comparison.</p>
          )
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            {isHost ? 'Rankings remain hidden until you compare the saved lineups.' : 'The host will reveal the rankings after teams have saved their lineups.'}
          </p>
        )}
      </div>
    </section>
  );
};

export default PostAuctionLineups;
