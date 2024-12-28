import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../assets/colors/colors';
import {getLocalData} from '../utils/functions/cachingFunctions';
import {USER_EMAIL, USER_IMG, USER_NAME} from '../assets/constants';
import Icon from 'react-native-vector-icons/Feather';

function Profile(): React.JSX.Element {
  const [userPhoto, setUserPhoto] = useState<string>('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      await getLocalData(USER_IMG).then(res => {
        setUserPhoto(res || '');
      });

      await getLocalData(USER_NAME).then(res => {
        setUserName(res || '');
      });

      await getLocalData(USER_EMAIL).then(res => {
        setUserEmail(res || '');
      });
    }

    fetchUserData();
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.profilePicContainer}>
        <Image source={{uri: userPhoto}} style={styles.img} />

        <TouchableOpacity style={styles.editIcContainer}>
          <Icon name="edit" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={{}}>
        <Text style={styles.txt}>{userName.toUpperCase()}</Text>

        <TouchableOpacity
          style={[styles.editIcContainer, styles.nameEditIcContainer]}>
          <Icon name="edit" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.txt, styles.email]}>{userEmail}</Text>

      <TouchableOpacity style={styles.savedVids} onPress={() => {}}>
        <Text style={[styles.txtBtn, styles.saveArrow]}>Saved Vids</Text>
        <Icon name="arrow-right" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => {}}>
        <Text style={styles.txtBtn}>Sign Out</Text>
      </TouchableOpacity>
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

  profilePicContainer: {
    // borderWidth: 1, borderColor: 'blue'
  },

  editIcContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,

    // borderWidth: 1,
    // borderColor: 'red',
  },

  nameEditIcContainer: {right: -30, bottom: 10},

  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  btn: {
    height: 75,
    width: 150,
    bottom: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },

  savedVids: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'white',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  saveArrow: {marginRight: 15},

  txtBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  txt: {color: 'white', fontSize: 30, marginTop: 20},

  email: {fontSize: 15},
});
