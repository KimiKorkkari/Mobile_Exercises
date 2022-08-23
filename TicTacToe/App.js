import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Button, 
  ScrollView,
  Keyboard,
  TouchableOpacity
} from 'react-native';


export default function App() {

  const [currentPlayer, setcurrentPlayer] = useState(1);
  const [winnerPlayer, setwinnerPlayer] = useState("Vuorossa: Pelaaja 1");
  const [gameOff, setgameoff] = useState(false);
  
  const refreshGame = () => {
    setgameState([
      [0,0,0],
      [0,0,0],
      [0,0,0]
    ])
    setcurrentPlayer(1)
    setgameoff(false)
    setwinnerPlayer("Vuorossa: Pelaaja 1")
  }

  const renderIcon = (row, col) => {
    let value = gameState[row][col];
    //console.log("moi" + value);

    switch(value)
    {
      case 1: return <Text style={styles.tiles}>X</Text>
      case -1: return <Text style={styles.tiles}>O</Text>
    }
  }

  const [gameState, setgameState] = useState([
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ]);

  const onPress = (row, col) => {
    
    let state = gameState[row][col];
    let player = currentPlayer;
    let arr = gameState.slice();

    if (state == 0 && gameOff == false){
      if (currentPlayer == 1) setwinnerPlayer("Vuorossa: Pelaaja 2");
      else if (currentPlayer == -1) setwinnerPlayer("Vuorossa: Pelaaja 1");
      arr[row][col] = currentPlayer;
      setgameState(arr);
      let nextPlayer = (currentPlayer ==1) ? -1 : 1;
    setcurrentPlayer(nextPlayer);

    }

    let winner = winnerCheck();

    if (winner == 1) {
      setwinnerPlayer("1. pelaaja voitti!")
      setgameoff(true)
    }
    if (winner == -1) {
      setwinnerPlayer("2. pelaaja voitti!")
      setgameoff(true)
    }

  }

  const winnerCheck = () => {

    let arr = gameState;
    let sum;

    for (let i = 0; i < 3; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {return 1;}
      else if (sum == -3) {return -1;}
    }

    for (let i = 0; i < 3; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {return 1;}
      else if (sum == -3) {return -1;}
    }

    if (arr[0][0] + arr[1][1] + arr[2][2] == 3) {return 1;}
    else if  (arr[0][2] + arr[1][1] + arr[2][0] == 3) {return 1;}
    else if (arr[0][0] + arr[1][1] + arr[2][2] == -3) {return -1;}
    else if  (arr[0][2] + arr[1][1] + arr[2][0] == -3) {return -1;}
    return 0;
  }
 
  return (
    <View style={styles.container}>
      <Text style={{marginBottom: 20, fontSize: 20}}>{winnerPlayer}</Text>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onPress(0,0)}>
          <View style={styles.tile}>{renderIcon(0, 0)}</View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onPress(0,1)}>
          <View style={styles.tile}>{renderIcon(0, 1)}</View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onPress(0,2)}>
          <View style={styles.tile}>{renderIcon(0, 2)}</View>
        </TouchableOpacity> 
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onPress(1,0)}>
          <View style={styles.tile}>{renderIcon(1, 0)}</View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onPress(1,1)}>
          <View style={styles.tile}>{renderIcon(1, 1)}</View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onPress(1,2)}>
          <View style={styles.tile}>{renderIcon(1, 2)}</View>
        </TouchableOpacity> 
      </View>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => onPress(2,0)}>
          <View style={styles.tile}>{renderIcon(2, 0)}</View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onPress(2,1)}>
          <View style={styles.tile}>{renderIcon(2, 1)}</View>
        </TouchableOpacity> 
        <TouchableOpacity onPress={() => onPress(2,2)}>
          <View style={styles.tile}>{renderIcon(2, 2)}</View>
        </TouchableOpacity> 
      </View>
      <View style={styles.button}>
        <Button 
            title="Uusi Peli!" 
            onPress={() => refreshGame()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  tile: {
    borderWidth: 1,
    width: 100,
    height: 100,
    
  },
  button: {
    paddingTop: 30,
    color: 'green'
  },
  tiles: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize:70,
  } 
});
