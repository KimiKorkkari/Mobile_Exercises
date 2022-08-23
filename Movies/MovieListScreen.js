/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState, useEffect } from 'react';
 
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   Image,
   useColorScheme,
   View,
   useNavigation,
   TouchableHighlight,
 } from 'react-native';
 import axios from 'axios';
 const MovieListScreen: () => Node = ({navigation}) => {

    const [movies, setMovies] = useState([]); 
    function MovieListItem(props) {  
    let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
    let imageurl = IMAGEPATH + props.movie.poster_path;
    
    return (
      <View style={styles.movieItem}>
        <View style={styles.movieItemImage}>
          <Image source={{uri: imageurl}} style={{width: 99, height: 146}} />
        </View>
        <View style={{marginRight: 50}}>
          <Text style={styles.movieItemTitle}>{props.movie.title}</Text>
          <Text style={styles.movieItemText}>{props.movie.release_date}</Text>
          <Text numberOfLines={6} ellipsizeMode="tail" style={styles.movieItemText}>{props.movie.overview}</Text>
        </View> 
      </View>
    )
  }

  function MoviesList(props) {
    const itemPressed = (index) => {
        props.navigation.navigate(
          'MovieDetails',
          { movie: movies[index] });
      }

  if (movies.length === 0) {
    return(
      <View style={{flex: 1, padding: 20}}>
        <Text>Loading, please wait...</Text>
      </View>
    )
  }

  let movieItems = movies.map(function(movie,index){ 
    return (
      <TouchableHighlight onPress={_ => itemPressed(index)} 
                    underlayColor="lightgray" key={index}>
        <MovieListItem movie={movie} key={index}/> 
      </TouchableHighlight>
    )
  });

  return (
    <ScrollView>
      {movieItems}
    </ScrollView>
  )
}

    useEffect(() => {
        axios
        .get('https://api.themoviedb.org/3/movie/now_playing?api_key=6e96b6cb4c294d52daf945c88142bbfe&append_to_response=videos')
        .then(response => {
            // check console - a movie data should be visible there
            console.log(response.data.results);
            setMovies(response.data.results);
        })
    }, [])

   return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
       <MoviesList navigation={ navigation }/>
      </ScrollView>
    </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row'
  },
  movieItemImage: {
    marginRight: 5
  },
  movieItemTitle: {
    fontWeight: 'bold',
  },
  movieItemText: {
    flexWrap: 'wrap'
  }
});
 export default MovieListScreen;