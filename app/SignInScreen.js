import React from 'react';
import {connect} from 'react-redux';
import {View, Button, Text} from 'react-native';
import Loading from './Loading';
import ServerCommunication from './ServerCommunication.js';


class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };

    constructor(props)
    {
      super(props);

      this.state = {
        isLoading: false,
        showErrorMsg: false,
      };
    }
  
    render() 
    {
      let screenDisplay;

      if(this.state.isLoading)
      {
        screenDisplay = <Loading></Loading>;
      }
      else
      {
        screenDisplay = <Button title="Sign in!" onPress={this._signInAsync} />;
      }

      return (
        <View>
          {screenDisplay}
          {
            this.state.showErrorMsg && 
            <Text style={{color:'red'}}>Error signing in</Text>
          }
        </View>
      );
    }
  
    _signInAsync = async () => {

      this.setState({isLoading: true, showErrorMsg: false});

      if((await ServerCommunication.RetrieveAndStoreJwt()).status != 200){
        this.setState({isLoading: false, showErrorMsg: true});
        return;
      }

      if((await ServerCommunication.RetrieveAndStoreMapsKey()).status != 200){
        this.setState({isLoading: false, showErrorMsg: true});
        return;
      }

      if((await ServerCommunication.RetrieveAndStoreRestaurantList()).status != 200){
        this.setState({isLoading: false, showErrorMsg: true});
        return;
      }

      this.setState({isLoading: false});
      this.props.navigation.navigate('App');
      
    };
  }

  function mapStateToProps(state){
    return {
        
    }
}

  function mapDispatchToProps(dispatch){
    return {
        
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);