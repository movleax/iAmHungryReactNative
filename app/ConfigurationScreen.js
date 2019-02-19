import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {connect} from 'react-redux';


class ConfigurationScreen extends React.Component {
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Configuration!</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationScreen);