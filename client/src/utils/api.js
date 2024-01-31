import Cookies from 'js-cookie';
import { decodeValue } from '.';

export const API_RESOURCE = 'http://localhost:3000/api';

const headers = {
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': Cookies.get(decodeValue('auth_token')) || '',
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

export async function submitColor(payload) {
  try {
    const response = await fetch(`${API_RESOURCE}/game/end-game`, {
      ...headers,
      method: 'POST',
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data || null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeAllGames() {
  try {
    const response = await fetch(`${API_RESOURCE}/game/delete-all`, {
      ...headers,
      method: 'DELETE',
    });

    return response.ok;
  } catch (error) {
    console.log(error);
  }
}
