import axios, { AxiosResponse } from 'axios';
import { Champions } from './types';

export const getVersions = async () => {
  const url = 'https://ddragon.leagueoflegends.com/api/versions.json';

  try {
    const response: AxiosResponse<[string]> = await axios({
      method: 'get',
      url
    });

    if (response.status === 200) {
      return response.data[0];
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const getChamps = async (version: string) => {
  const url = `http://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`;

  try {
    const response: AxiosResponse<Champions> = await axios({
      method: 'get',
      url
    });

    if (response.status === 200) {
      return Object.values(response.data.data);
    }
  } catch (e) {
    throw new Error(e);
  }
};
