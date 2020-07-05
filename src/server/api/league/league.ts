import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../utils';
import { LeagueTypes } from './types';

const TOKEN = process.env.RIOT_API_KEY;

export const getLeagueDatas = async (encryptedSummonerId: string) => {
  const url = encodeURI(
    `${BASE_URL}/league/v4/entries/by-summoner/${encryptedSummonerId}`
  );

  const headers = {
    'X-Riot-Token': TOKEN
  };
  try {
    const response: AxiosResponse<LeagueTypes> = await axios({
      method: 'GET',
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
