import React, { useState, useEffect } from 'react'; //Tämä on sitten se toinen sivu, ja itse APP ohjelmalla, koodilla navigoidaan...Kummatkin sivut omissa filuissa.
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image,
    useColorScheme,
    View,
    Button,
    useNavigation, //Tätä tarvitaan jos siirrytäänn sivuilta sivuille.
    TouchableHighlight,
    PixelRatio,
    TouchableOpacity,
  } from 'react-native';
  import axios from 'axios';
 

export default function MovieDetailScreen(props) {

  
  const { route } = props;
  const { movie } = route.params;
 
  const [movieId, setmovieId] = useState(movie.id); 
  const [getApi, setgetApi] = useState(false); 
  
  const [movieData, setmovieData] = useState(1); 
  const [movieDatasGenres, setmovieDatasGenres] = useState([]); 
  const [movieIds, setmovieIds] = useState([]); 
  
  //console.log(movieId);

 function getData() { 

    axios
        .get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=6e96b6cb4c294d52daf945c88142bbfe&append_to_response=videos') //Tässä nyt mukana ne videotiedot
        .then(response => {
        setmovieData(response.data);
        setmovieDatasGenres(response.data.genres);
        setmovieIds(response.data.videos.results) 
        setgetApi(true);
        })
  };

  if (getApi == false) getData(); //Tässä tällänen pien odotus...

  let movieItems = movieIds.map(function(movie,index){ //Tää pyörrittää elokuvien nimet ja niihin onPressit joilla käynnistetään funktio, joka taas navigoi uudelle sivulle.
    return ([
      <Text onPress={_ => itemPressed(index)} 
        key={index}>{movie.name}{'\n'}
      </Text>
    ]);
  });

  const itemPressed = (data) => {
    //alert(index);
    console.log("Eka");
    props.navigation.navigate(
      'MoviePlay',
      { movie: movieIds[data] });
  }

  const genres = movieDatasGenres.map(function(data) {
    return ([
      <Text>{data.name} </Text>
           
    ]);
 });

  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.backdrop_path;

  return (
    
    <View> 
      <Image source={{uri: imageurl}} style={styles.image}  />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text style={styles.text}>{movie.overview+'\n'}</Text>
      <Text style={styles.text}>Genres: {genres}   </Text>
      <Text style={styles.text}>Runtime: {movieData.runtime} min</Text>
      <Text style={styles.text}>Homepage: {movieData.homepage+'\n'}</Text>
      <Text style={styles.text}>Videos:{'\n'}</Text>
      <Text style={styles.links}>
        {movieItems}
      </Text>
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    aspectRatio: 670/250
  },
  container: {
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  links: {
    fontSize: 15,
    color: 'blue',
    
  },
  link: {
    marginBottom: 30,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10,
    marginTop: 5,
  },
  text: {
    fontSize: 12,
    flexWrap: 'wrap'
  }
});