import React from 'react';
import { Text, View } from 'react-native';
import { 
  createSwitchNavigator,
  createAppContainer,
  createBottomTabNavigator,
 } from 'react-navigation';
 import Ionicons from 'react-native-vector-icons/Ionicons';

 import NowPlaying from './components/NowPlaying'
 import Search from './components/Search'
 import Lists from './components/Lists'



const TabNavigator = createBottomTabNavigator({
  NowPlaying: NowPlaying,
  Search: Search,
  Lists: Lists,
},
{
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let IconComponent = Ionicons;
      let iconName;
      if (routeName === 'NowPlaying') {
        iconName = `ios-play${focused ? '' : ''}`;
        // Sometimes we want to add badges to some icons. 
        // You can check the implementation below.
        // IconComponent = HomeIconWithBadge; 
      } else if (routeName === 'Search') {
        iconName = `ios-search${focused ? '' : ''}`;
      } else if (routeName === 'Lists') {
        iconName = `ios-list${focused ? '' : ''}`;
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: '#4C4DFB',
    inactiveTintColor: 'gray',
  },
}
);

export default createAppContainer(TabNavigator);