import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Header from "./Header";

class NowPlaying extends React.Component {
  static navigationOptions = {
    title: "Now Playing"
  };

  state = {
    moviePoster: null,
    movieName: null,
    moviePopularity: null,
    movieReleaseDate: null,
    movieOverview: null
  };

  getNowPlaying = async event => {
    var url = "https://api.themoviedb.org/3";
    apiKey = "8367b1854dccedcfc9001204de735470";

    urlRequest = `${url}/movie/now_playing?api_key=${apiKey}`;

    const apiCall = await fetch(urlRequest);
    const data = await apiCall.json();

    //     Generating a random number to get a random movie
    let numberOfMovies = data.results.length;
    let randomNumber = Math.floor(Math.random() * numberOfMovies);
    console.log("o número aleatorio é: " + randomNumber);

    //     Getting the image info and adding to the state
    this.state.moviePoster = `http://image.tmdb.org/t/p/original${
      data.results[randomNumber].poster_path
    }`;

    //     Getting the movie name and adding to the state
    this.state.movieName = data.results[randomNumber].original_title;

    this.state.moviePopularity = data.results[randomNumber].popularity;

    this.state.movieReleaseDate = data.results[randomNumber].release_date;

    this.state.movieOverview = data.results[randomNumber].overview;

    //     Updating the state
    this.setState({
      state: this.state
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("screen on focus");
      this.getNowPlaying();
    });
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Header style={styles.header} subtitle={"Now Playing"} />
        {this.state.moviePoster && (
          <View style={styles.mainContent}>
            <View style={styles.shadow}>
              <Image
                borderRadius="4"
                style={styles.image}
                source={{ uri: this.state.moviePoster }}
              />
            </View>
            <Text style={styles.movieName}>{this.state.movieName}</Text>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Text style={styles.regularTextLeft}>Popularity: {Math.round(this.state.moviePopularity)}</Text>
              <Text style={styles.regularTextRight}>Release Date: {this.state.movieReleaseDate}</Text>
            </View>
            <Text style={styles.descriptionCenter}>{this.state.movieOverview}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
    // justifyContent: "center"
  },
  header: {
    height: 20
  },
  mainContent: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    // flex: 1,
    width: 200,
    height: 300,
    justifyContent: "center",
    alignItems: "center"
  },
  shadow: {
    shadowColor: "#aaaaaa",
    shadowOffset: { width: 0, height: 20 },
    shadowRadius: 10,
    shadowOpacity: 0.7,
    zIndex: 1
  },
  movieName: {
    color: "#333",
    fontWeight: "bold",
    fontSize: 25,
    zIndex: 10,
    marginTop: 10
  },
  regularTextLeft: {
    color: '#aaa',
    marginRight: 10
  },
  regularTextRight: {
    color: '#aaa',
    marginLeft: 10
  },
  descriptionCenter: {
    padding: 20,
    textAlign: 'center',
    lineHeight: 25,
  }
});

export default NowPlaying;
