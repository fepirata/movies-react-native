import React from "react";
import { Text, View, Button, Image, FlatList, StyleSheet } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import SegmentedControlTab from "react-native-segmented-control-tab";
import ListItem from './ListItem'
import Header from './Header'
import { LinearGradient } from "expo";

class Lists extends React.Component {
  state = {
    selectedIndex: 0,
    movieResultTitle: "Popular Movies",
    queryResultData: null,
    pageSubtitle: 'Popular Movies List'
  };
  handleContent(item, index) {
    moviePoster = `http://image.tmdb.org/t/p/original`


    if (this.state.queryResultData != null) {
      if (index == 0) {
        return <ListItem
        title={item.title} 
        image={moviePoster+item.poster_path}
        overview={item.overview}/>
      } else if (index == 1) {
        return <ListItem
        title={item.title} 
        image={moviePoster+item.poster_path}
        overview={item.overview}/>;
      } else if (index == 2) {
        return <ListItem
        title={item.title} 
        image={moviePoster+item.poster_path}
        overview={item.overview}/>;
      }
    } else {
      return <Text>Nothing to see here</Text>;
    }
  }
  handleIndexChange = async index => {

    var pageSubtitle;
    switch (index) {
      case 0:
        pageSubtitle = "Popular Movies List";
        break;
      case 1:
        pageSubtitle = "Top Rated Movies List";
        break;
      case 2:
        pageSubtitle = "Upcoming Movies List";
        break;
      default:
        pageSubtitle = "Popular Movies List";
        break;
    }

    await this.setState({
      ...this.state,
      selectedIndex: index,
      pageSubtitle: pageSubtitle
    });
    this.getListResult(index);
  };
  getListResult = async index => {
    var url = "https://api.themoviedb.org/3/movie/";
    apiKey = "8367b1854dccedcfc9001204de735470";
    var querySearch, resultTitle;

    switch (index) {
      case 0:
        querySearch = "popular";
        resultTitle = `Popular Movies`
        break;
      case 1:
        querySearch = "top_rated";
        resultTitle = `Top rated Movies`
        break;
      case 2:
        querySearch = "upcoming";
        resultTitle = `Upcoming Movies`
        break;
      default:
        querySearch = "popular";
        break;
    }

    urlRequest = `${url}${querySearch}?api_key=${apiKey}&language=en-US&page=1`;
    console.log(urlRequest);

    const apiCall = await fetch(urlRequest);
    const data = await apiCall.json();

    this.state.queryResultData = data.results;

    this.state.testContent = urlRequest;
    this.state.movieResultTitle = resultTitle;

    //     Updating the state
    this.setState({
      state: this.state
    });
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      console.log("A tela está em foco");
      this.handleIndexChange(this.state.selectedIndex)
    });
  }

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
                values={["Popular", "Top Rated", "Upcoming"]}
                selectedIndex={this.state.selectedIndex}
                onTabPress={this.handleIndexChange}
                tabsContainerStyle={styles.tabsContainerStyle}
                tabStyle={styles.tabStyle}
                tabTextStyle={styles.tabTextStyle}
                activeTabStyle={styles.activeTabStyle}
                activeTabTextStyle={styles.activeTabTextStyle}
              />
            </View>
          </LinearGradient>

        
        <View style={{ flex: 8, maxHeight: 560, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.resultTitle}>{this.state.movieResultTitle}</Text>
          <FlatList
            data={this.state.queryResultData}
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

export default Lists;
