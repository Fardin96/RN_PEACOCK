import {TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../types/navigation';
import Icon from 'react-native-vector-icons/Entypo';

function Cancel(): React.JSX.Element {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Home');
      }}>
      <Icon name="cross" size={30} color="white" />
    </TouchableOpacity>
  );
}

export default Cancel;
