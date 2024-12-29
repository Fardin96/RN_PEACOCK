import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../assets/colors/colors';
import {
  clearLocalData,
  getLocalData,
  setLocalData,
} from '../utils/functions/cachingFunctions';
import {
  AUTH_TOKEN,
  USER_EMAIL,
  USER_ID,
  USER_IMG,
  USER_NAME,
} from '../assets/constants';
import Icon from 'react-native-vector-icons/Feather';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProp} from '../types/navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

async function openImagePicker(
  setSelectedImage: (uri: string | undefined) => void,
): Promise<string> {
  let imageUri: string = '';

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  await launchImageLibrary(options, response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      console.log('Image picker error: ', response.errorMessage);
    } else {
      imageUri = response.assets?.[0]?.uri || '';
      setSelectedImage(imageUri);
    }
  });

  return imageUri;
}

function Profile(): React.JSX.Element {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [userPhoto, setUserPhoto] = useState<string | undefined>('');
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string | undefined>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    async function fetchUserData(): Promise<void> {
      await getLocalData(USER_IMG).then(res => {
        setUserPhoto(res || '');
      });

      await getLocalData(USER_NAME).then(res => {
        setUserName(res || '');
      });

      await getLocalData(USER_EMAIL).then(res => {
        setUserEmail(res || '');
      });

      if (selectedImg !== '') {
        setUserPhoto(selectedImg);
      }
    }

    fetchUserData();
  }, [selectedImg]);

  return (
    <View style={styles.root}>
      <View style={styles.profilePicContainer}>
        <Image source={{uri: userPhoto}} style={styles.img} />

        <TouchableOpacity
          style={styles.editIcContainer}
          onPress={() => {
            openImagePicker(setSelectedImg).then(imageUri => {
              // store to local storage ONLY
              setLocalData(USER_IMG, imageUri);
            });
          }}>
          <Icon name="edit" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View>
        {isEditing ? (
          <TextInput
            maxLength={30}
            style={[styles.txt, styles.txtInput]}
            value={userName}
            onChangeText={text => setUserName(text)}
            onEndEditing={() => {
              setIsEditing(prev => !prev);
              setLocalData(USER_NAME, userName);
            }}
          />
        ) : (
          <>
            <Text style={styles.txt}>{userName?.toUpperCase()}</Text>
            <TouchableOpacity
              style={[styles.editIcContainer, styles.nameEditIcContainer]}
              onPress={() => setIsEditing(prev => !prev)}>
              <Icon name="edit" size={20} color="white" />
            </TouchableOpacity>
          </>
        )}
      </View>

      <Text style={[styles.txt, styles.email]}>{userEmail}</Text>

      <TouchableOpacity style={styles.savedVids} onPress={() => {}}>
        <Text style={[styles.txtBtn, styles.saveArrow]}>Saved Vids</Text>
        <Icon name="arrow-right" size={25} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          // clear user data locally
          clearLocalData(USER_ID);
          clearLocalData(USER_NAME);
          clearLocalData(USER_IMG);
          clearLocalData(USER_EMAIL);
          clearLocalData(AUTH_TOKEN);

          // sign-out of google
          await GoogleSignin.signOut();

          // might need to replace!
          navigation.navigate('Home');
        }}>
        <Text style={styles.txtBtn}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Profile;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: colors.BG_PRIMARY,
  },

  profilePicContainer: {
    // borderWidth: 1, borderColor: 'blue'
  },

  editIcContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,

    // borderWidth: 1,
    // borderColor: 'red',
  },

  nameEditIcContainer: {right: -30, bottom: 10},

  img: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },

  btn: {
    height: 75,
    width: 150,
    bottom: 50,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },

  savedVids: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'white',
    marginTop: 50,
    paddingHorizontal: 20,
  },

  saveArrow: {marginRight: 15},

  txtBtn: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  txt: {color: 'white', fontSize: 30, marginTop: 20},

  txtInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
  },

  email: {fontSize: 15},
});
