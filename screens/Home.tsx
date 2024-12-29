import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {YOUTUBE_API_KEY, YOUTUBE_API_V3} from '@env';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../types/navigation';
import {colors} from '../assets/colors/colors';

async function getVids(): Promise<any[]> {
  const url = `${YOUTUBE_API_V3}/videos?part=snippet&chart=mostPopular&maxResults=10&key=${YOUTUBE_API_KEY}`;
  // regionCode=es

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

function Home(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchVideos() {
      const vids: any[] = await getVids();
      setVideos(vids);
    }

    fetchVideos();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        {videos.map(video => (
          <TouchableOpacity
            key={video.id}
            style={styles.videoContainer}
            onPress={() =>
              navigation.navigate('VideoPlayerScreen', {
                videoId: video.id,
                videoTitle: video.snippet.title,
                videoThumbnail: video.snippet.thumbnails.standard.url,
                videoUrl: `https://www.youtube.com/watch?v=${video.id}`,
              })
            }>
            <Image
              source={{uri: video.snippet.thumbnails.standard.url}}
              style={styles.img}
            />

            <Text style={styles.vidTitle}>{video.snippet.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BG_PRIMARY,
  },

  scrollView: {
    // borderWidth: 1, borderColor: 'green'
  },

  scrollViewContent: {flexGrow: 1},

  videoContainer: {
    // height: 100,
    // width: 300,
    marginBottom: 25,

    // borderWidth: 1,
    // borderColor: 'red',
  },

  img: {
    height: 200,
    // width: 300,
  },

  vidTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
  },
});
