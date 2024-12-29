import React from 'react';
import Home from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from './screens/Auth/SignIn';
import VideoPlayerScreen from './screens/VideoPlayerScreen';
import {RootStackParamList} from './types/navigation';
import HeaderProfile from './components/HeaderProfile';
import Profile from './screens/Profile';
import Cancel from './components/Cancel';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: '#191919'},
          headerTitleStyle: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerRight: () => HeaderProfile(),
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VideoPlayerScreen"
          component={VideoPlayerScreen}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: 'My Profile',
            headerRight: () => Cancel(),
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
