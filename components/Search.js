import React from "react";
import {
  Text,
  View,
  SegmentedControlIOS,
  TextInput,
  SectionList,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet
} from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import SegmentedControlTab from "react-native-segmented-control-tab";
import ListItem from "./ListItem";
import Header from "./Header";
import { LinearGradient } from "expo";

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

class Search extends React.Component {
  state = {
    selectedIndex: 0,
    testContent: null,
    querySearchData: null,
    text: "",
    searchResultsTitle: null,
    pageSubtitle: "Movies Search"
  };

  handleText = text => {
    this.setState({ text: text });
  };

  handleContent(item, index) {
    moviePoster = `http://image.tmdb.org/t/p/original`;

    if (this.state.querySearchData != null) {
      if (index == 0) {
        return (
          <ListItem
            title={item.title}
            image={moviePoster + item.poster_path}
            overview={item.overview}
          />
        );
      } else if (index == 1) {
        return (
          <ListItem
            title={item.name}
            image={moviePoster + item.known_for[0].poster_path}
            overview={item.known_for[0].overview}
          />
        );
      } else if (index == 2) {
        return (
          <ListItem
            title={item.name}
            image={moviePoster + item.poster_path}
            overview={item.overview}
          />
        );
      }
    } else {
      return <Text>Nothing to see here</Text>;
    }
  }
  handleTextFieldSearch = async => {
    this.getSearchResults(this.state.selectedIndex);
  };

  handleIndexChange = async index => {
    var pageSubtitle;
    switch (index) {
      case 0:
        pageSubtitle = "Movies Search";
        break;
      case 1:
        pageSubtitle = "People Search";
        break;
      case 2:
        pageSubtitle = "Tv Shows";
        break;
      default:
        pageSubtitle = "Movies Search";
        break;
    }

    await this.setState({
      ...this.state,
      selectedIndex: index,
      pageSubtitle: pageSubtitle
    });
    if (this.state.text != "") {
      this.getSearchResults(index);
    }
  };

  getSearchResults = async index => {
    var url = "https://api.themoviedb.org/3/search/";
    apiKey = "8367b1854dccedcfc9001204de735470";
    var querySearch, titleSearch;

    switch (index) {
      case 0:
        querySearch = "movie";
        titleSearch = `Movie results for ${this.state.text}:`;
        break;
      case 1:
        querySearch = "person";
        titleSearch = `${this.state.text} is in the following movies:`;
        break;
      case 2:
        querySearch = "tv";
        titleSearch = `TV Show results for ${this.state.text}:`;
        break;
      default:
        querySearch = "movie";
        break;
    }

    urlRequest = `${url}${querySearch}?api_key=${apiKey}&language=en-US&query=${
      this.state.text
    }`;
    console.log(urlRequest);

    const apiCall = await fetch(urlRequest);
    const data = await apiCall.json();

    this.state.querySearchData = data.results;

    this.state.testContent = urlRequest;
    this.state.searchResultsTitle = titleSearch;
    // this.state.pageSubtitle = pageSubtitle;

    //     Updating the state
    this.setState({
      state: this.state
    });
  };

  render() {
    return (
      <View style={styles.mainView}>
        <Header style={styles.header} subtitle={this.state.pageSubtitle} />
        <View style={styles.mainContent}>
          <LinearGradient
            colors={["#7671FB", "#4C4DFB"]}
            start={[0.0, 0.5]}
            end={[1.0, 0.5]}
            locations={[0.0, 1.0]}
            style={{
              flex: 1,
              minWidth: 400,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View style={{ width: 300 }}>
              <SegmentedControlTab
                values={["Movies", "People", "TV Show"]}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ text })}
                placeholder="Type your search query here"
                placeholderTextColor="#C5CBF8"
                enablesReturnKeyAutomatically={true}
                returnKeyType="search"
                onSubmitEditing={this.handleTextFieldSearch}
              />
            </View>
          </LinearGradient>
          <View style={styles.resultsView}>
            {this.state.text != "" && (
              <Text style={styles.resultTitle}>{this.state.searchResultsTitle}</Text>
            )}
            <View style={{ flex: 1, maxHeight: 560 }}>
              <FlatList
                data={this.state.querySearchData}
                renderItem={({ item }) => (
                  <View>
                    {this.handleContent(item, this.state.selectedIndex)}
                  </View>
                )}
                keyExtractor={item => `${item.id}`}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1
    // justifyContent: "center"
  },
  tabStyle: {
    height: 40,
    borderColor: "white",
    backgroundColor: "transparent",
    marginBottom: 12
  },
  activeTabStyle: {
    backgroundColor: "white"
  },
  activeTabTextStyle: {
    color: "#4C4DFB"
  },
  tabTextStyle: {
    color: "white"
  },
  header: {
    height: 20
  },
  textInput: {
    height: 40,
    // borderColor: "gray",
    borderWidth: 0,
    minWidth: 300,
    backgroundColor: "rgba(230, 240, 250, 0.3)",
    borderRadius: 4,
    padding: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  mainContent: {
    flex: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  resultsView: {
    flex: 4,
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
    color: "#aaa",
    marginRight: 10
  },
  regularTextRight: {
    color: "#aaa",
    marginLeft: 10
  },
  descriptionCenter: {
    padding: 20,
    textAlign: "center",
    lineHeight: 25
  },
  resultTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#4C4DFB'
  }
});

export default Search;
