import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useRoute} from '@react-navigation/native';
import {SCREEN_WIDTH} from '../assets/dimensions/dimensions';
import {VideoPlayerScreenRouteProp} from '../types/navigation';
import {colors} from '../assets/colors/colors';
import Icon from 'react-native-vector-icons/Entypo';

function VideoPlayerScreen(): React.JSX.Element {
  const route = useRoute<VideoPlayerScreenRouteProp>();
  const {videoId} = route.params;

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  return (
    <View style={styles.root}>
      <YoutubePlayer
        height={300}
        width={SCREEN_WIDTH}
        play={true}
        videoId={videoId}
        webViewStyle={{borderWidth: 1, borderColor: 'green'}}
      />

      <View
        style={{
          width: SCREEN_WIDTH,
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: -50,

          // borderWidth: 1,
          // borderColor: 'red',
        }}>
        {isLiked ? (
          <TouchableOpacity onPress={() => setIsLiked(prev => !prev)}>
            <Icon name="heart" size={30} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsLiked(prev => !prev)}>
            <Icon name="heart-outlined" size={30} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => {}}>
          <Icon name="chat" size={30} color="white" />
        </TouchableOpacity>

        {isSaved ? (
          <TouchableOpacity onPress={() => setIsSaved(prev => !prev)}>
            <Icon name="save" size={30} color="red" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsSaved(prev => !prev)}>
            <Icon name="save" size={30} color="white" />
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

  txt: {color: 'black'},
});
