import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../../utils';
import { SummonerInfoTypes, MatchInfoTypes } from './types';

export const getSummonerInfo = async (nickname: string) => {
  const url = encodeURI(
    `${BASE_URL}/summoner/v4/summoners/by-name/${nickname}`
  );
  const headers = {
    'X-Riot-Token': process.env.RIOT_API_KEY
  };

  try {
    const response: AxiosResponse<SummonerInfoTypes> = await axios({
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

export const getMatchesByAccount = async (
  accountId: string,
  params?: {
    champion?: number;
    queue?: number;
    season?: number;
    endTime?: any;
    beginTime?: any;
    endIndex?: number;
    beginIndex?: number;
  }
) => {
  const url = encodeURI(
    `${BASE_URL}/match/v4/matchlists/by-account/${accountId}`
  );
  const headers = {
    'X-Riot-Token': process.env.RIOT_API_KEY
  };

  try {
    const response: AxiosResponse<MatchInfoTypes> = await axios({
      method: 'get',
      url,
      headers,
      params
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    throw new Error(e);
  }
};
