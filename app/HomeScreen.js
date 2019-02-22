/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {connect} from 'react-redux';

class HomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={[{width:"45%"}]}>
          <Button
            title="Find me food!"
            onPress={() => this.props.navigation.navigate('ChooseRestaurant')}
          />
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