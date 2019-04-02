import React from 'react';
import {View, Button, AsyncStorage} from 'react-native';
import Loading from './Loading';
import axios from 'axios';

class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'Please sign in',
    };

    constructor(props)
    {
      super(props);

      this.state = {
        loading: false,
      };
    }
  
    render() 
    {
      let screenDisplay;

      if(this.state.loading)
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
        </View>
      );
    }
  
    _signInAsync = async () => {

      axios.post("http://192.168.50.101:5000/api/signin",{
      user: {
        username: "email",
        password: "secretpassword",
      }
      },)
      .then((response) => {
        // Handle the JWT response here
        console.log(response);
      })
      .catch((error) => {
        // Handle returned errors here
        console.log(error);
      });

      await AsyncStorage.setItem('userToken', 'abc');
      this.props.navigation.navigate('App');
    };
  }

  export default SignInScreen;