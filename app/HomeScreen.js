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
      <View>
          <Text  onPress={() => this.props.testFunctionOne()}>Main Screen</Text>
          <Text onPress={() => this.props.testFunctionTwo()}>{this.props.testStr}</Text>
          <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

function mapStateToProps(state){
    return {
        testStr: state.testStr
    }
}

function mapDispatchToProps(dispatch){
    return {
        testFunctionOne: () => dispatch({type:'TEST_ONE'}),
        testFunctionTwo: () => dispatch({type:'TEST_TWO'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);