/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {AsyncStorage, View, Button} from 'react-native';
import {connect} from 'react-redux';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'iAmHungry',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[{width:"45%"}]}>
          <Button
            title="Find me food!"
            onPress={() => this.props.navigation.navigate('ChooseRestaurant')}
          />
          <Button title="Signout" onPress={this._signOutAsync} />
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