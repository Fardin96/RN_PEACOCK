import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {savedVids} from '../../types/userData';

export async function addUser(
  authToken: string,
  userId: string,
  name: string,
  email: string,
  userPhotoUrl: string,
  savedVideos: savedVids[] = [],
): Promise<void> {
  await firestore()
    .collection('Users')
    .add({
      userId,
      authToken,
      name,
      email,
      userPhotoUrl,
      savedVideos,
    })
    .then(() => {
      console.log('User added!');
      Alert.alert('User added!');
    })
    .catch(error => {
      console.warn('Error adding user:', error);
    });
}
