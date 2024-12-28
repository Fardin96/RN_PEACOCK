import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getStoredData(
  key: string,
): Promise<string | null | undefined> {
  try {
    return (await AsyncStorage.getItem(`${key}`)) || null;
  } catch (e) {
    console.warn(`Error fetching data; KEY: ${key}; ERROR: ${e}`);
  }
}
