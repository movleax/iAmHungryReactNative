import React from 'react';
import {View, ActivityIndicator, StatusBar} from 'react-native';


class Loading extends React.Component {
    constructor() {
      super();
    }
  
    // Render any loading content that you like here
    render() {
      return (
        <View>
          <ActivityIndicator />
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }

  export default Loading;