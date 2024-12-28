import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../assets/colors/colors';
import {getStoredData} from '../utils/functions/cachingFunctions';
import {USER_EMAIL, USER_IMG, USER_NAME} from '../assets/constants';

/*
    Profile screen Features
    - Display user profile name - editable
    - Display user profile picture - editable via async storage
    - Display user email
*/

function Profile(): React.JSX.Element {
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      await getStoredData(USER_IMG).then(res => {
        setUserPhoto(res || '');
      });

      await getStoredData(USER_NAME).then(res => {
        setUserName(res || '');
      });

      await getStoredData(USER_EMAIL).then(res => {
        setUserEmail(res || '');
      });
    }

    fetchUserData();
  }, []);

  return (
    <View style={styles.root}>
      <Image source={{uri: userPhoto}} style={styles.img} />

      <Text style={styles.txt}>{userName.toUpperCase()}</Text>

      <Text style={[styles.txt, {fontSize: 15}]}>{userEmail}</Text>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: colors.BG_PRIMARY,
  },

  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  txt: {color: 'white', fontSize: 30, marginTop: 20},
});
