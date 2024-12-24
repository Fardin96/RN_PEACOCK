import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';

function SignIn(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.txt}>Sign-In with google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SignIn;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btn: {
    height: 75,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },

  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
