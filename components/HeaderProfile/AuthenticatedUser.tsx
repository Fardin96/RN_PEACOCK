import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {USER_IMG, USER_NAME} from '../../assets/constants';
import {HomeScreenNavigationProp} from '../../types/navigation';
import {getLocalData} from '../../utils/functions/cachingFunctions';

function AuthenticatedUser(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      await getLocalData(USER_IMG).then(res => {
        setUserPhoto(res || '');
      });

      await getLocalData(USER_NAME).then(res => {
        setUserName(res || '');
      });
    }

    fetchUserData();
  }, []);

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => navigation.replace('Profile')}>
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

  signinTxt: {fontSize: 15, marginRight: 15, fontStyle: 'italic'},
});
