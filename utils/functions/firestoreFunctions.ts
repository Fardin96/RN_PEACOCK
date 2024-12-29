import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';
import {savedVids} from '../../types/userData';
import {comment, video} from '../../types/video';

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

export async function addVideo(
  videoId: string,
  videoTitle: string,
  videoThumbnail: string,
  videoUrl: string,
  likes: number = 0,
  comments: comment[] = [],
): Promise<void> {
  await firestore()
    .collection('Videos')
    .add({
      videoId,
      videoTitle,
      videoThumbnail,
      videoUrl,
      likes,
      comments,
    })
    .then(() => {
      console.log('Video added!');
      Alert.alert('Video added!');
    })
    .catch(error => {
      console.warn('Error adding video:', error);
    });
}

export async function fetchVideoIfExists(
  videoId: string,
): Promise<video | null> {
  try {
    const videoRef = firestore()
      .collection('Videos')
      .where('videoId', '==', videoId);

    const snapshot = await videoRef.get();

    if (snapshot.empty) {
      // console.log('Video does not exist in Firestore.');
      return null;
    }

    const videoDoc = snapshot.docs[0];
    const videoData = videoDoc.data();

    return {
      videoId: videoData.videoId,
      videoTitle: videoData.videoTitle,
      videoThumbnail: videoData.videoThumbnail,
      videoUrl: videoData.videoUrl,
      likes: videoData.likes || 0,
      comments: videoData.comments || [],
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    throw new Error('Could not fetch video');
  }
}

// export async function handleLike(videoId: string, likeCount: number) {}
