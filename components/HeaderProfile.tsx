import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function HeaderProfile(): React.JSX.Element {
  return <View style={styles.root}></View>;
}

export default HeaderProfile;

const styles = StyleSheet.create({
  root: {
    height: 40,
    width: 40,
    borderRadius: 20,

    borderWidth: 3,
    borderColor: 'red',
  },
});
