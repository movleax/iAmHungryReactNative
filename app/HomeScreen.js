/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import CurrentLocation from './CurrentLocation';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'iAmHungry',
  };

  constructor(props){
    super(props);
    this._loadUserConfiguration();
  }

  async _loadUserConfiguration(){
    const user_configuration = JSON.parse(await AsyncStorage.getItem('user_configuration'));
    if(user_configuration != null)
    {
      this.props.updateUserConfiguration(user_configuration);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[{width:"45%"}]}>
          <Button
            title="Find me food!"
            onPress={() => this.props.navigation.navigate('ChooseRestaurant')}
          />
          <CurrentLocation/>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state){
    return {
      
    }
}

function mapDispatchToProps(dispatch){
    return {
      updateUserConfiguration: (newUserConfiguration) => dispatch({type:'UPDATE_USER_CONFIGURATION', payload: newUserConfiguration}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);