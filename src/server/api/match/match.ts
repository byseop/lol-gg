import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../utils';
import { MatchTypes } from './types';

const TOKEN = process.env.RIOT_API_KEY;

export const getMatchData = async (matchId: string) => {
  const url = encodeURI(
    `${BASE_URL}/match/v4/matches/${matchId}`
  );

  const headers = {
    'X-Riot-Token': TOKEN
  };
  try {
    const response: AxiosResponse<MatchTypes> = await axios({
      method: 'get',
      url,
      headers
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw new Error(e);
  }
};
