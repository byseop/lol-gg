import React, { useEffect, useCallback } from 'react';
import ProfileContainer from './Profile';
import type {
  SummonerInfoTypes,
  MatchOptionTypes,
  MatchDataTypes
} from './types';
import Inner from '../Layout/Inner';
import Header from '../Layout/Header';
import Spinner from '../Layout/Spinner';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import LeagueContainer from './League';
import MatchesContainer from './Matches';
import type { Recent10GamesStatsTypes } from './StatsContainer';

type StatsPropTypes = {
  summonerInfo: SummonerInfoTypes | undefined;
  loading: boolean;
  matchData: MatchDataTypes[] | undefined;
  matchLoading: boolean;
  setMatchOption: React.Dispatch<React.SetStateAction<MatchOptionTypes>>;
  setRecent10GamesStats: React.Dispatch<
    React.SetStateAction<Recent10GamesStatsTypes[]>
  >;
  recent10GamesStats: Recent10GamesStatsTypes[];
};

const maxGameCount = 40;

export default function Stats({
  summonerInfo,
  loading,
  setMatchOption,
  matchData,
  matchLoading,
  setRecent10GamesStats,
  recent10GamesStats
}: StatsPropTypes) {
  const onIntersect = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      // More fetch function
      if (entry.isIntersecting) {
        setMatchOption((prev) => ({
          ...prev,
          endIndex:
            prev.endIndex &&
            (prev.endIndex >= maxGameCount ? maxGameCount : prev.endIndex + 10)
        }));
      }
    },
    [setMatchOption]
  );

  useEffect(() => {
    // Fetching more matches using IntersectionObserver
    if (!matchData) return;

    const observeTargetArr = document.getElementsByClassName('match');
    const observeTarget = observeTargetArr[observeTargetArr.length - 1];

    const screenObserver = new IntersectionObserver(onIntersect, {
      threshold: 1
    });

    if (observeTarget && !loading && !matchLoading) {
      screenObserver.observe(observeTarget);
    }

    return () => {
      if (screenObserver) {
        screenObserver.disconnect();
      }
    };
  }, [onIntersect, matchData, loading, matchLoading]);

  return (
    <>
      <Header />
      {summonerInfo && summonerInfo.name && summonerInfo.profileIconId && (
        <StatsScreen>
          <Helmet>
            <title>{summonerInfo.name} - LoL GG Stats</title>
          </Helmet>
          <Inner>
            <ProfileContainer
              name={summonerInfo.name}
              profileIconId={summonerInfo.profileIconId}
            />
            <div className="stats_wrap">
              <LeagueContainer
                encryptedSummonerId={summonerInfo.id as string}
                setMatchOption={setMatchOption}
                setRecent10GamesStats={setRecent10GamesStats}
              />
              <MatchesContainer
                matchData={matchData}
                matchLoading={matchLoading}
                encryptedSummonerId={summonerInfo.id as string}
                setRecent10GamesStats={setRecent10GamesStats}
                recent10GamesStats={recent10GamesStats}
              />
            </div>
          </Inner>
        </StatsScreen>
      )}
      {loading && !matchData ? <Spinner minHeight={78} /> : null}
    </>
  );
}

const StatsScreen = styled.div`
  padding-bottom: 4rem;
  .stats_wrap {
    display: flex;
    margin-top: 2rem;
    align-items: flex-start;
  }
`;
