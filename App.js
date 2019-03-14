import React from 'react';
import { createAppContainer, createBottomTabNavigator} from 'react-navigation';
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
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'NowPlaying') {
        iconName = `ios-play${focused ? '' : ''}`;
      } else if (routeName === 'Search') {
        iconName = `ios-search${focused ? '' : ''}`;
      } else if (routeName === 'Lists') {
        iconName = `ios-list${focused ? '' : ''}`;
      }
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