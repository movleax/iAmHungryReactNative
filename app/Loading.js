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
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  export default Loading;