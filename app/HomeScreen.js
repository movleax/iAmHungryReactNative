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

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'iAmHungry',
  };

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
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);