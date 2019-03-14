import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";

const ListItem = props => (
  <View style={styles.listItem}>
    <View style={styles.ViewLeft}>
      <Image style={styles.image} source={{ uri: props.image }} />
    </View>
    <View>
      <Text numberOfLines={2} style={styles.movieListTitle}>{props.title}</Text>
      <Text numberOfLines={3} style={{ width: 230 }}>{props.overview}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  listItem: {
    width: 335,
    height: 110,
//     borderWidth: 1,
//     borderColor: "#ddd",
    borderRadius: 4,
    margin: 8,
    marginBottom: 10,
    shadowColor: "#aaaaaa",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 5,
    shadowOpacity: 0.3,
    zIndex: 1,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  ViewLeft: {
        width: 90,
  },
  image: {
        width: 75,
        height: 110,
        borderRadius: 4
  },
  headerText: {
    color: "white"
  },
  movieListTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 230,
        marginBottom: 5,

  },
});

export default ListItem;
