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
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import AuthLoadingScreen from './AuthLoadingScreen';
import ProfileScreen from './ProfileScreen';
import {Provider} from 'react-redux';
import store from './store/store'
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

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
const ProfileStack = createStackNavigator({
  Profile: { screen: ProfileScreen },
});
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Configuration: { screen: ConfigurationStack },
    ManageRestaurants: {screen: ManageRestaurantsStack},
    Profile: {screen: ProfileStack}
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
        }else if (routeName === 'Profile') {
          iconName = `md-person`;
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
);

const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });

const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    );
  }
}

