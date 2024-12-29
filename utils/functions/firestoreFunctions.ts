import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export async function addUser(
  authToken: string,
  userId: string,
  name: string,
  email: string,
  userPhotoUrl: string,
): Promise<void> {
  await firestore()
    .collection('Users')
    .add({
      userId,
      authToken,
      name,
      email,
      userPhotoUrl,
    })
    .then(() => {
      console.log('User added!');
      Alert.alert('User added!');
    })
    .catch(error => {
      console.warn('Error adding user:', error);
    });
}
