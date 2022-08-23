import React, { useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,

  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  TextInput,
  Linking,
} from 'react-native';

const App: () => Node = () => {

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const launchMap = () => {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  }

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View>
        <Text> Give latitude value:</Text>
        <TextInput  style={styles.input}
          placeholder='Latitude' 
          onChangeText={text => setLatitude(text)}/>
        <Text> Give longitude value:</Text>
        <TextInput style={styles.input}
          placeholder='Longitude' 
          onChangeText={text => setLongitude(text)}/>
      </View>
      <View style={styles.button}>
      <Button title="Launch a Map" onPress={launchMap}/>
      </View>  
    </SafeAreaView> 
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 30, 
  },
  input: {
    borderWidth: 1,
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
  }
});

export default App;
