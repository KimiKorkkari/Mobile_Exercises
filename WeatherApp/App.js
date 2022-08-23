import React, { useState, useEffect } from 'react';
import type {Node} from 'react';
import { SafeAreaView, ScrollView, Text, Image, View, TouchableHighlight, StyleSheet,} from 'react-native';
import Dialog from "react-native-dialog";
import { Header, Card} from 'react-native-elements';
import useAxios from 'axios-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App: () => Node = () => {

  const [modalVisible, setModalVisible] = useState(false); 
  const [cityName, setCityName] = useState(""); 
  const [cities, setCities] = useState([]);

  let time = new Date().toLocaleString()

  const openDialog = () => {
    setModalVisible(true);
  }

  const cancelCity = () => {
    setModalVisible(false);
  }

  const addCity = () => {
    setCities( [...cities,{id:Math.random(), name:cityName}]);
    setModalVisible(false);
  }

  const deleteCity = (deleteCity) => {
  let filteredArray = cities.filter(city => city.name !== deleteCity);
  setCities(filteredArray);
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
        setCities(JSON.parse(value));
      }
    } catch(e) {
      console.log("Cities loading error!");
      alert("Cities loading error");

    }
  }


  const WeatherForecast = (params) => {
    
    const city = params.city;
    const API_KEY = 'aeceaa8e87b55094cf6ab8b27ee6ee54';
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  
    const [{ data, loading, error }, refetch] = useAxios(
      URL+city+'&appid='+API_KEY+'&units=metric'
    )
  
    if (loading) return (
      <Card>
        <Card.Title>Loading....</Card.Title>
      </Card>
    )
    if (error) return (
      <Card>
        <Card.Title>Error loading weather forecast!</Card.Title>
      </Card>
    )
    const refreshForecast = () => {
      refetch();
    }

    const deleteCity = () => {
      params.deleteCity(city);
    }


    return (
      <Card>
        <Card.Title>{city} {time}</Card.Title>
        <Text>Pilvisyys: {data.weather[0].main}</Text>
        <Text>Lämpotila: {data.main.temp} °C</Text>
        <Text>Tuntuu kuin: {data.main.feels_like} °C</Text>
        <Text>Tuuli: {data.wind.speed} m/s</Text>
        <View style={styles.buttons}>
          <Text style={styles.del} onPress={_ => deleteCity()}>del </Text>
          <Text style={styles.ref} onPress={_ => refreshForecast()}>refresh </Text>
        </View>
      </Card>
    );
  }
  

  return (
    <SafeAreaView>
    <Header
      centerComponent={{ text: 'Weather App', style: { color: '#fff' } }}
      rightComponent={{ icon: 'add', color: '#fff', onPress: openDialog }}
    />
     <ScrollView>
     {!modalVisible && cities.map(city => (
        <WeatherForecast key={city.id} city={city.name} deleteCity={deleteCity}/>))}

      </ScrollView>

    <Dialog.Container visible={modalVisible}>
      <Dialog.Title>Add a new city</Dialog.Title>
      <Dialog.Input placeholder="Set city name here" onChangeText={ (text) => setCityName(text)}></Dialog.Input>
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