import axios from 'axios';
import { BASE_URL } from '../utils';

export const getSummonerInfo = async (nickname: String) => {
  const url = encodeURI(`${BASE_URL}/summoners/by-name/${nickname}`);
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
