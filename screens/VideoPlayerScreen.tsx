import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useRoute} from '@react-navigation/native';
import {SCREEN_WIDTH} from '../assets/dimensions/dimensions';
import {VideoPlayerScreenRouteProp} from '../types/navigation';
import {colors} from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/Entypo';
import {
  addVideo,
  fetchVideoIfExists,
} from '../utils/functions/firestoreFunctions';

function VideoPlayerScreen(): React.JSX.Element {
  const route = useRoute<VideoPlayerScreenRouteProp>();
  const {videoId, videoTitle, videoThumbnail, videoUrl} = route.params;

  // console.log('route.params: ', route.params);

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const [likeCount, setLikeCount] = useState<number>(0);
  const [commentCount, setCommentCount] = useState<number>(0);

  useEffect(() => {
    async function fetchVideoData() {
      // fetch video data from firestore
      await fetchVideoIfExists(videoId)
        .then(async video => {
          // dont update counts if video is null
          // and add video to firestore if it doesn't exist
          if (!video) {
            await addVideo(videoId, videoTitle, videoThumbnail, videoUrl)
              .then(() => {
                console.log('video added to firestore');
              })
              .catch(error => {
                console.log('video add error: ', error);
              });

            return;
          }

          // update counts
          setLikeCount(video.likes);
          setCommentCount(video.comments.length);
        })
        .catch(error => {
          console.log('video fetch error: ', error);
        });
    }

    fetchVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <View style={styles.root}>
      <View>
        <YoutubePlayer
          height={230}
          width={SCREEN_WIDTH}
          play={false}
          videoId={videoId}
        />

        <Text style={styles.vidTitle}>{videoTitle}</Text>
      </View>

      <View style={styles.interactionContainer}>
        {isLiked ? (
          <TouchableOpacity
            style={styles.likeRed}
            onPress={() => setIsLiked(prev => !prev)}>
            <Icon name="heart" size={30} color="red" />
            <Text style={{color: 'red'}}>{likeCount}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsLiked(prev => !prev)}
            style={styles.likeWhite}>
            <Icon name="heart-outlined" size={30} color="white" />
            <Text style={styles.likeWhiteTxt}>{likeCount}</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => {}} style={styles.comment}>
          <Icon name="chat" size={30} color="white" />
          <Text style={styles.likeWhiteTxt}>{commentCount}</Text>
        </TouchableOpacity>

        {isSaved ? (
          <TouchableOpacity
            onPress={() => setIsSaved(prev => !prev)}
            style={styles.saveRed}>
            <Icon name="save" size={30} color="red" />
            <Text style={styles.saveTxtRed}>{'saved'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => setIsSaved(prev => !prev)}
            style={styles.saveWhite}>
            <Icon name="save" size={30} color="white" />
            <Text style={styles.saveTxtWhite}>{'save'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BG_PRIMARY,

    // borderWidth: 1,
    // borderColor: 'blue',
  },

  vidTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 15,
  },

  interactionContainer: {
    width: SCREEN_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,

    // borderWidth: 1,
    // borderColor: 'red',
  },

  likeRed: {
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'blue',
  },

  likeWhite: {
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
  },

  likeWhiteTxt: {color: 'white', fontWeight: '900'},

  comment: {
    alignItems: 'center',
    justifyContent: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
  },

  saveRed: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveTxtRed: {color: 'red', fontWeight: '900'},

  saveWhite: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveTxtWhite: {color: 'white', fontWeight: '900'},
});
