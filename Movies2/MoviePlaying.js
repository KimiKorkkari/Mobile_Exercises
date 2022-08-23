import React, { useState, useEffect } from 'react';
import {
  View,
  Dimensions
} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';

export default function MoviePlaying(props) {

    const { route } = props;
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

    console.log(route.params.movie.key)
    return (
    
      <View style={{ transform: [{ rotate: "90deg"}]}}>
        <View style={{backgroundColor: "black"}}>
            <YoutubePlayer
            height={SCREEN_WIDTH}
            width={SCREEN_HEIGHT}
            play={true}
            videoId={route.params.movie.key}
            />
        </View>
      </View>
      )
}

