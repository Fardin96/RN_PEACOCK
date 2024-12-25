import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {YOUTUBE_API_KEY, YOUTUBE_API_V3} from '@env';

async function getVids(): Promise<any[]> {
  const url = `${YOUTUBE_API_V3}/videos?part=snippet&chart=mostPopular&maxResults=10&regionCode=es&&key=${YOUTUBE_API_KEY}`;

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
          <View key={video.id} style={styles.videoContainer}>
            <Image
              source={{uri: video.snippet.thumbnails.standard.url}}
              style={styles.img}
            />

            <Text style={{color: 'white'}}>{video.snippet.title}</Text>
          </View>
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
  },

  scrollView: {borderWidth: 1, borderColor: 'green'},

  scrollViewContent: {flexGrow: 1},

  videoContainer: {
    // height: 100,
    // width: 300,
    borderWidth: 1,
    borderColor: 'red',
  },

  img: {
    height: 100,
    width: 300,
  },

  txt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
