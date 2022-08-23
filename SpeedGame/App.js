/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { TabView, SceneMap } from 'react-native-tab-view';
import React from 'react';
import type {Node} from 'react';
import Realm from "realm";


import Dialog from "react-native-dialog";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  useWindowDimensions,
} from 'react-native';

import { Header, Body, Title, Left, Right, Icon, Root} from 'native-base';



const App: () => Node = () => {

  const [timeOne, setTimeOne] = React.useState(0);
  const [score, setScore] = React.useState(0);
  
  
  const [players, setPlayers] = React.useState([]);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();

  const [addDialogVisible, setAddDialogVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  

  const Realm = require('realm');
  const Player = {
    name: 'Player',
    properties: {
        name: 'string',
        score: {type: 'int', default: 0},
    },
  };
  const realm = new Realm({schema: [Player]});

// save
  const okClicked = () => {
    setAddDialogVisible(false);
    realm.write(() => {
      const player = realm.create('Player', {
        name: name,
        score: score,
      });
    });
  }

  const indexChange = (index) => {
    setIndex(index);

    if (index === 1) {
      let players = realm.objects('Player').sorted('score');
      let playersArray = Array.from(players);
      setPlayers(playersArray);
    }
  }

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]}>
      <Text style={styles.text}>Double tap the circle as fast as you can!</Text>
      <View style={styles.circle} onTouchStart={circlePressed}/>
      <Text style={styles.text}>Time: {score}</Text>
      <View style={styles.row}>
        <View style={styles.button}>
        <Button title="Add highscores" onPress={() => setAddDialogVisible(true)} />
        </View>
        <View style={styles.button}>
          <Button title="Reset time" onPress={() => resetPressed()}/>
        </View>
      </View>
    </View>
  );

  const resetPressed = () => {
    setScore(0);
    setTimeOne(0);
  }

  const circlePressed = () => {
    if (timeOne === 0) {
      const date = new Date();
      setTimeOne(date.getTime());
      setScore(0);
    } else {
      const date = new Date();
      setScore(date.getTime() - timeOne);
    } 
  }

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: '#fff' }]}>
      <ScrollView>
          {players.map((player, index) => {
            return (
              <View key={index} style={styles.highscore}>
                <Text style={styles.highscoreName}>{player.name}</Text>
                <Text style={styles.highscoreScore}>{player.score}</Text>
              </View>
            )
          })}
      </ScrollView>
    </View>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });  


  const [routes] = React.useState([
    { key: 'first', title: 'Game' },
    { key: 'second', title: 'Highscores' },
  ]);

  return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{flex:1}}>
          <Header style={{ backgroundColor: '#2196F3' }}>
            <Left><Icon name='menu' style={{ color: '#fff' }} /></Left>
            <Body style={{ marginLeft: 70 }}>
              <Title>SPEEDGAME</Title>
            </Body>
            <Right/>
        </Header> 
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={indexChange}
          initialLayout={{ width: layout.width }}
        />

        <Dialog.Container visible={addDialogVisible}>
        <Dialog.Title>Add a new highscore</Dialog.Title>
        <Dialog.Input label="Name" placeholder="Click and type your name here" onChangeText={text => setName(text)}/>
        <Dialog.Button label="Ok" onPress={okClicked} />
        </Dialog.Container>
        </ScrollView>

  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150/2,
    backgroundColor: 'red',
    alignSelf : "center",
    marginTop: 100
  },
  text: {
    marginTop: 50,
    alignSelf : "center"
  },
  button: {
    marginRight: 20,
    marginTop: 50,
    alignSelf : "center",
    width: 150
  },
  row: {
    flexDirection: 'row',
    alignSelf : "center"
  },
  highscore: {
    flexDirection: 'row',
    margin: 10,
  },
  highscoreName: {
    fontSize: 20,
    color: 'black',
    width: '50%',
    textAlign: 'right',
    marginRight: 5
  },
  highscoreScore: {
    fontSize: 20,
    color: 'gray',
    width: '50%',
    marginLeft: 5
  }
});

export default App;
