import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class ProfileScreen extends Component {
    static navigationOptions = {
        title: 'Profile',
    };

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };

    render() {
        console.log(this.props);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[{width:"45%"}]}>  
                    <Button title="Signout" onPress={this._signOutAsync} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);