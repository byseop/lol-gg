import axios from 'axios';
import { BASE_URL } from '../utils';

export const getSummonerInfo = async (nickname: string) => {
  const url = encodeURI(`${BASE_URL}/summoner/v4/summoners/by-name/${nickname}`);
  const headers = {
    'X-Riot-Token': process.env.RIOT_API_KEY
  };

  const response = await axios({
    method: 'get',
    url,
    headers
  });

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const getMatchesByAccount = async (accountId: string, params?: {
  champion?: number;
  queue?: number;
  season?: number;
  endTime?: any;
  beginTime?: any;
  endIndex?: number;
  beginIndex?: number;
}) => {
  const url = encodeURI(`${BASE_URL}/match/v4/matchlists/by-account/${accountId}`);
  const headers = {
    'X-Riot-Token': process.env.RIOT_API_KEY
  };

  const response = await axios({
    method: 'get',
    url,
    headers,
    params
  });

  try {
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw new Error(e);
  }
}