import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../types/navigation';

function UnknownUser(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => navigation.navigate('SignIn')}>
      <Text style={[styles.unknown, styles.signinTxt]}>{'Sign In'}</Text>

      <View style={styles.user}>
        <Text style={styles.unknown}>{'?'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default UnknownUser;

const styles = StyleSheet.create({
  root: {flexDirection: 'row', alignItems: 'center'},

  user: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,

    borderWidth: 3,
    borderColor: 'red',
  },

  unknown: {fontSize: 20, fontWeight: 'bold', color: 'white'},

  signinTxt: {fontSize: 15, marginRight: 15},
});
