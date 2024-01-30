import Cookies from 'js-cookie';

export const API_RESOURCE = 'http://localhost:3000/api';

const headers = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': Cookies.get('auth_token') || '',
  },
};

export async function getGameData() {
  try {
    const response = await fetch(`${API_RESOURCE}/game`, {
      ...headers,
      method: 'GET',
    });
    if (!response.ok) {
      // error(response);
    }
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.log(error);
  }
}
