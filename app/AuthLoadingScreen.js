import React from 'react';
import {View} from 'react-native';
import Loading from './Loading';
import ServerCommunication from './ServerCommunication';

class AuthLoadingScreen extends React.Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const response = await ServerCommunication.RetrieveAndStoreMapsKey();
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(response.status == 200 ? 'App' : 'Auth');
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loading/>
        </View>
      );
    }
  }

  export default AuthLoadingScreen;