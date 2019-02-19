/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ConfigurationScreen from './ConfigurationScreen';
import ManageRestaurantsScreen from './ManageRestaurantsScreen';
import AddRestaurantScreen from './AddRestaurantScreen';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: DetailsScreen },
});

const ConfigurationStack = createStackNavigator({
  Configuration: { screen: ConfigurationScreen },
  Details: { screen: DetailsScreen },
});
const ManageRestaurantsStack = createStackNavigator({
  ManageRestaurants: {screen: ManageRestaurantsScreen},
  AddRestaurant: {screen: AddRestaurantScreen},
}); 
const AppContainer = createAppContainer(createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Configuration: { screen: ConfigurationStack },
    ManageRestaurants: {screen: ManageRestaurantsStack},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `md-home`;
        } else if (routeName === 'Configuration') {
          iconName = `md-settings`;
        } else if (routeName === 'ManageRestaurants') {
          iconName = `md-business`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
));



const initialState = {
  testStr: 'hello',
}

const reducer = (state = initialState, action) => {
  switch(action.type)
  {
    case 'TEST_ONE':
    console.log("test_one");
      return {testStr:"hello"};
    case 'TEST_TWO':
    console.log("test_two");
      return {testStr:"Heyo"};
  }
  return state;
}

const store = createStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

