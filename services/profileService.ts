import axios from 'axios';

const BASE_URL = 'https://app.swimwell.co.in/api';

export const getProfile = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  return response.data;
};
