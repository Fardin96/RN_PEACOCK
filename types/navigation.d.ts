import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../App';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  VideoPlayerScreen: {videoId: string};
};

export type VideoPlayerScreenRouteProp = RouteProp<
  RootStackParamList,
  'VideoPlayerScreen'
>;

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type SignInNavigationProp = StackNavigationProp<
  RootStackParamList,
  'SignIn'
>;
