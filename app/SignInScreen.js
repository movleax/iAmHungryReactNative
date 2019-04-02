import React from 'react';
import {View, Button, Text, AsyncStorage} from 'react-native';
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

    _retrieveAndStoreJwt(){
      return new Promise(async resolve=> {
        let jwt;
        
        axios.post("http://192.168.50.101:5000/api/auth/signin",{
        
          usernameOrEmail: "testUname",
          password: "secretpassword"
        
        },)
        .then(async (response) => {
          // Handle the JWT response here
          jwt = response.data; 
          await AsyncStorage.setItem('jwt', jwt.tokenType + " " + jwt.accessToken);
        })
        .catch((error) => {
          // Handle returned errors here
          resolve(false);
        });

        resolve(true);
      });
    }

    _retrieveAndStoreMapsKey(){
      return new Promise(async resolve=> {
        const jwt = await AsyncStorage.getItem('jwt');
        let mapsApiKey;

        axios.get("http://192.168.50.101:5000/api/maps/key",{
          headers: { Authorization:  jwt} 
        },)
        .then((response) => {
          mapsApiKey = response.data;
        })
        .catch((error) => {
          resolve(false);
        });

        resolve(true);
      });
    }
  
    _signInAsync = async () => {

      this.setState({isLoading: true, showErrorMsg: false});

      if(!await this._retrieveAndStoreJwt()){
        this.setState({isLoading: false, showErrorMsg: true});
        return;
      }

      if(!await this._retrieveAndStoreMapsKey()){
        this.setState({isLoading: false, showErrorMsg: true});
        return;
      }

      this.setState({isLoading: false});
      this.props.navigation.navigate('App');
      
    };
  }

  export default SignInScreen;