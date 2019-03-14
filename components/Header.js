import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import { LinearGradient } from "expo";

const Header = props => (
  <View style={styles.header}>
    <LinearGradient
      colors={["#7671FB", "#4C4DFB"]}
      start={[0.0, 0.5]}
      end={[1.0, 0.5]}
      locations={[0.0, 1.0]}
    >
      <View style={styles.headerInternal}>
        <Text style={styles.headerText}>Movies</Text>
        <Text style={styles.subtitleText}>{props.subtitle}</Text>
      </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
//     width: "100%",
//     height: 110,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    
  },
  headerText: {
    color: "white",
    alignSelf: "stretch",
    textAlign: "center",
    width: 400,
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 45,
    
    
  },
  subtitleText: {
        fontSize: 20,
        color: 'white',
        fontWeight: '100',
        marginTop: 3
  },
  headerInternal: {
    flexGrow: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Header;
