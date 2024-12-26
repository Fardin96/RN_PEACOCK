import {StyleSheet, View} from 'react-native';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {SCREEN_WIDTH} from '../assets/dimensions/dimensions';

type VideoPlayerScreenRouteProp = RouteProp<
  RootStackParamList,
  'VideoPlayerScreen'
>;

function VideoPlayerScreen(): React.JSX.Element {
  const route = useRoute<VideoPlayerScreenRouteProp>();
  const {videoId} = route.params;

  return (
    <View style={styles.root}>
      <YoutubePlayer
        height={300}
        width={SCREEN_WIDTH}
        play={true}
        videoId={videoId}
      />
    </View>
  );
}

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'dimgray',

    // borderWidth: 1,
    // borderColor: 'blue',
  },

  txt: {color: 'black'},
});
