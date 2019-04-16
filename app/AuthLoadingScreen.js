import React from 'react';
import {View, PermissionsAndroid} from 'react-native';
import Loading from './Loading';
import ServerCommunication from './ServerCommunication';

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
    }

    componentDidMount(){
      this.requestLocationPermission();
      this._bootstrapAsync();
    }
  
    // Fetch fetch user data from the server then navigate to our appropriate place
    _bootstrapAsync = async () => {

      if((await ServerCommunication.RetrieveAndStoreMapsKey()).success == false){
        this.props.navigation.navigate('Auth');
        return;
      }

      if((await ServerCommunication.RetrieveAndStoreRestaurantList()).success == false){
        this.props.navigation.navigate('Auth');
        return;
      }
  
      // This will switch to the App screen
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate('App');
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading/>
        </View>
      );
    }

    async requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'iAmHungry Location Permission',
            message:
              "iAmHungry application uses phone location for Google's maps service in order to search for establishments",
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
        } else {
          
        }
      } catch (err) {
        console.warn(err);
      }
    }
  }

  export default AuthLoadingScreen;