import * as React from 'react';
import { API_RESOURCE } from '../utils/api';
import { decodeValue, encodeValue } from '../utils';
import cookie from 'js-cookie';

const authContext = React.createContext();

function useAuth() {
  // const [authed, setAuthed] = React.useState(
  //   () => localStorage.getItem('authed') !== null
  // );

  const [authed, setAuthed] = React.useState(decodeValue(cookie.get('authed')));

  React.useEffect(() => {
    cookie.set('authed', encodeValue(authed), { expires: 1 });
    //localStorage.setItem('authed', JSON.stringify(authed));
  }, [authed]);
  const [authToken, setAuthToken] = React.useState('');
  const [authName, setAuthName] = React.useState('');

  return {
    authed,
    authToken,
    authName,
    async login(formData) {
      // todo rewrite it in async/await logic
      // return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${API_RESOURCE}/auth/login`, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(response.statusText || 'Failed to authenticate');
        }

        const data = await response.json();

        if (!data.auth_token) {
          throw new Error('Token is incorrect or missing');
        }

        await cookie.set('auth_token', encodeValue(data.auth_token), {
          expires: 1,
        });
        await cookie.set('name', encodeValue(data.name), { expires: 1 });
        await setAuthed(true);
        return;
      } catch (error) {
        console.error(error.message);
        throw error('An unexpected error occurred');
      }
      // });
    },
    async logout() {
      await setAuthName('');
      await setAuthToken('');
      await setAuthed(false);
      return;
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}
