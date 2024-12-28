import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
// import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_IMG, USER_NAME} from '../../assets/constants';

async function getStoredData(key: string): Promise<string | null | undefined> {
  try {
    return (await AsyncStorage.getItem(`${key}`)) || null;
  } catch (e) {
    console.warn(`Error fetching data; KEY: ${key}; ERROR: ${e}`);
  }
}

function AuthenticatedUser(): React.JSX.Element {
  //   const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      await getStoredData(USER_IMG).then(res => {
        setUserPhoto(res || '');
      });

      await getStoredData(USER_NAME).then(res => {
        setUserName(res || '');
      });
    }

    fetchUserData();
  }, []);

  return (
    <TouchableOpacity style={styles.root} onPress={() => {}}>
      <Text style={[styles.unknown, styles.signinTxt]}>
        {userName.toUpperCase()}
      </Text>

      <View style={styles.user}>
        <Image source={{uri: userPhoto}} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
}

export default AuthenticatedUser;

const styles = StyleSheet.create({
  root: {flexDirection: 'row', alignItems: 'center'},

  user: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,

    // borderWidth: 3,
    // borderColor: 'red',
  },

  img: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },

  unknown: {fontSize: 20, fontWeight: 'bold', color: 'white'},

  signinTxt: {fontSize: 15, marginRight: 15},
});
