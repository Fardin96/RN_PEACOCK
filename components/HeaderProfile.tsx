import React, {useEffect, useState} from 'react';
import UnknownUser from './HeaderProfile/UnknownUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN} from '../assets/constants';
import AuthenticatedUser from './HeaderProfile/AuthenticatedUser';

async function isAuthenticated(): Promise<string | null | undefined> {
  try {
    return (await AsyncStorage.getItem(AUTH_TOKEN)) || null;
  } catch (e) {
    console.warn(`Error fetching data; KEY: ${AUTH_TOKEN}; ERROR: ${e}`);
  }
}

function HeaderProfile(): React.JSX.Element {
  const [userExists, setUserExists] = useState<boolean>(false);

  useEffect(() => {
    async function checkUser(): Promise<void> {
      const user = await isAuthenticated();

      console.log('userExists', user);

      if (user !== null || user !== undefined) {
        setUserExists(true);
      }
    }

    checkUser();
  }, []);

  if (!userExists) {
    console.log('this one/1');
    return <UnknownUser />;
  }

  return <AuthenticatedUser />;
}

export default HeaderProfile;
