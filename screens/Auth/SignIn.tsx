import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

async function onGoogleButtonPress(): Promise<void> {
  try {
    // Check if Google Play Services are available
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    // Attempt to sign in
    const signInResult = await GoogleSignin.signIn();

    // Ensure we have the required token
    if (!signInResult?.data?.idToken) {
      throw new Error('No ID token found');
    }

    if (!signInResult.data) {
      throw new Error('No data found in signInResult');
    }

    // Create Google credential
    const googleCredential = auth.GoogleAuthProvider.credential(
      signInResult.data.idToken,
    );

    // Sign in to Firebase with the credential
    await auth().signInWithCredential(googleCredential);
  } catch (error: unknown) {
    // Narrow down the error type
    if (error instanceof Error) {
      console.error('Google Sign-In Error:', error.message);

      // Handle specific errors
      if (error.message.includes('No ID token found')) {
        Alert.alert(
          'Failed to sign in. Please ensure your Google account is configured properly.',
        );
      }
    } else {
      // Handle unexpected error types
      console.error('An unexpected error occurred:', error);
    }

    // Optionally re-throw the error if necessary
    throw error;
  }
}

function SignIn(): React.JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '479350528160-tveavo7l61j2gmgigtogi7m75msi3ukl.apps.googleusercontent.com',
    });
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => onGoogleButtonPress()}>
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
