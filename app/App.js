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
import ChooseRestaurantScreen from './ChooseRestaurantScreen';
import ConfigurationScreen from './ConfigurationScreen';
import ManageRestaurantsScreen from './ManageRestaurantsScreen';
import AddRestaurantScreen from './AddRestaurantScreen';
import {createStore} from 'redux';
import {Provider} from 'react-redux';


import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
const HomeStack = createStackNavigator({
  Home: { screen: HomeScreen },
  ChooseRestaurant: { screen: ChooseRestaurantScreen },
});

const ConfigurationStack = createStackNavigator({
  Configuration: { screen: ConfigurationScreen },
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
  
  restaurant_list: [
    {
      name: "McDonald's",
      address: "2400 Sunrise Blvd, Rancho Cordova, CA 95670, USA",
      hours_weekly: ["Monday: 5:00 AM – 12:00 AM", "Tuesday: 5:00 AM – 12:00 AM", "Wednesday: 5:00 AM – 12:00 AM", "Thursday: 5:00 AM – 12:00 AM", "Friday: 5:00 AM – 1:00 AM", "Saturday: 5:00 AM – 1:00 AM", "Sunday: 5:00 AM – 1:00 AM"],
      id: "ChIJcxJNR4LdmoARHohf4RwJhbM",
      location: {lat: 38.6151029, lng: -121.2699112},
      phone: "(916) 635-1991",
      price_level: 1,
      rating: 3.3,
    }
  ],
  user_configuration: {
    search_radius: 25,
    include_new_user_experiences: true,
    price_level_max: 3,
    avg_rating_min: 0
  },
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
    case 'ADD_RESTAURANT':
      return {...state, restaurant_list: action.payload};
    case 'REMOVE_RESTAURANT':
      return {...state, restaurant_list: action.payload};
    case 'UPDATE_USER_CONFIGURATION':
      return {...state, user_configuration: action.payload};
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

