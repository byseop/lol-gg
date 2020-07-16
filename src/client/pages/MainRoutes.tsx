import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomeContainer from '../components/Home';
import StatsContainer from '../components/Stats';
import { useQuery } from '@apollo/react-hooks';
import ApolloClient, { gql } from 'apollo-boost';
import { atom, useRecoilState } from 'recoil';
import type { GameData } from 'src/server/api/data/types';

const client = new ApolloClient({ uri: '/.netlify/functions/data' });

export const gameDataAtom = atom<GameData | null>({
  key: 'gameDataState',
  default: null
});

export default function MainRoutes() {
  const [gameData, setGameData] = useRecoilState(gameDataAtom);
  
  const QUERY_GAMEDATA = gql`
    query {
      gameData {
        version
        champs {
          key
          name
          id
        }
        spells
        runes
        items
      }
    }
  `;

  const { data, loading, error } = useQuery(QUERY_GAMEDATA, { client });

  useEffect(() => {
    if (!data || loading || error || gameData) {
      return;
    }
    setGameData(data);
  }, [data, loading, error, setGameData, gameData]);

  return (
    <Switch>
      <Route path="/" exact component={HomeContainer} />
      <Route path="/stats/@:nickname" exact component={StatsContainer} />
      <Redirect to="/" />
    </Switch>
  );
}
