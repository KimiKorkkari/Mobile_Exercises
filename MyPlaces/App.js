import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, TouchableOpacity, StyleSheet,Button} from 'react-native';
import Dialog from "react-native-dialog";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import axios from 'axios';

const App: () => Node = () => {

  const [region, setRegion] = useState({
    latitude: 65,
    longitude: 26,
    latitudeDelta: 11,
    longitudeDelta: 0.121,
  });

  const [modalVisible, setModalVisible] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cityInfo, setCityInfo] = useState(""); 

  const [cities, setCities] = useState([]);
  const [cities2, setCities2] = useState([]);

  let time = new Date().toLocaleString()

  const openDialog = () => {
    setModalVisible(true);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const addCity = () => {
    GetDataUsingAsyncAwaitGetCall();
    setModalVisible(false);
  }


  useEffect(() => {
    getData();
  },[]);  

  useEffect(() => {
    storeData();
  },[cities]); 

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('@cities', JSON.stringify(cities));
    } catch (e) {
      console.log("Cities saving error!");
      alert("Cities saving error");
    }
  }
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@cities')
      if(value !== null) {
        setCities(JSON.parse([value]));
      }
    } catch(e) {
      console.log("Cities loading error!");
      alert("Cities loading error");

    }
  }
 
  const GetDataUsingAsyncAwaitGetCall = async () => {

    const city = cityName;
    const API_KEY = 'aeceaa8e87b55094cf6ab8b27ee6ee54';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
        axios
        .get(URL+city+'&appid='+API_KEY+'&units=metric')
        .then(response => {
          //console.log(response.data);
          setCities( [...cities,{id:Math.random(), name:cityName, info: cityInfo , lat:response.data.coord.lat, lon:response.data.coord.lon } ]);
        })
  }
 
  return (
    <SafeAreaView>
    <View style={styles.container}>
     
     <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.container}
        region={region}> 

      {cities[0] != null && cities.map(item => (
          <Marker key= {item.id} title={item.name} description={item.info} coordinate={{latitude: item.lat ,
            longitude: item.lon}} />
      ))}

      </MapView>  
    
      <View style={styles.buttonback}>
       <TouchableOpacity
         onPress={openDialog}
         style={styles.button}>
         <Text style={styles.text}>+</Text>
       </TouchableOpacity>
       </View>

    </View>
    <Dialog.Container visible={modalVisible}>
      <Dialog.Title>Add a new city</Dialog.Title>
      <Dialog.Input placeholder="City" onChangeText={ (text) => setCityName(text)}></Dialog.Input>
      <Dialog.Input placeholder="Text" onChangeText={ (text) => setCityInfo(text)}></Dialog.Input>
      <Dialog.Button label="Cancel" onPress={cancelCity} />
      <Dialog.Button label="Add" onPress={addCity} />
    </Dialog.Container>

  </SafeAreaView>
  );
  
};

const styles = StyleSheet.create({
 
  del: {
    color: 'blue',
    marginTop: 10,
    
  },
  buttonback:{
    position: 'absolute',
    left:'80%',
    top:'90%',
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'blue',
    
    
  },
    container: {
      height: '100%',
        width: '100%',
        justifyContent: "center",
        alignItems: 'center', 
    },
  
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      color: 'white',
    },
  
  ref: {
    color: 'blue',
    marginTop: 10,
    marginLeft: 230,
  },
  buttons: {
    flexDirection: 'row',
  }
});

export default App; 