import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';


export default function App() {
  const [count, setCount] = useState(0);
  const [interstitial, setInterstitial] = useState("ca-app-pub-3940256099942544/1033173712");
  const [banner, setBanner] = useState("ca-app-pub-3940256099942544/6300978111");
  const [rewardAds, setRewardAds] = useState("ca-app-pub-3940256099942544/5224354917");
  

  const showInterstitial = async () => {
    await AdMobInterstitial.setAdUnitID(interstitial); // Test ID, Replace with your-admob-unit-id
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    await AdMobInterstitial.showAdAsync();
  }

  const showRewardAds = async () => {
    await setTestDeviceIDAsync('EMULATOR');
    await AdMobRewarded.setAdUnitID(rewardAds);
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
    setCount(count + 10);
  }

  return (
    <View style={styles.container}>
      <View style={styles.int}>
          <Button title="INTERSTITIAL" onPress={showInterstitial}></Button>
        </View>
        <View style={styles.vid}>
          <Button title="REWARD VIDEO" onPress={showRewardAds}></Button>
        </View>

        <View style={styles.vid}>
          {<Text>Rewarded count: {count}</Text>}
        </View>

        <View style={styles.ban}>
          
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID={banner} // Test ID, Replace with your-admob-unit-id
        servePersonalizedAds={false}
         />
      <StatusBar style="auto" />
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
  vid: {
    margin: 20,
    width: 300,
  },
  int: {
    margin: 20,
    width: 300,
  },
  ban: {
    marginTop: 430,
    
    justifyContent: "center",
    alignItems: "center" 
  }
});
