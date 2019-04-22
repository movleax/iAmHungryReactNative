import React from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, TextInput} from 'react-native';
import Loading from './Loading';
import ServerCommunication from './ServerCommunication.js';


class SignInScreen extends React.Component {
    static navigationOptions = {
      title: 'iAmHungry Sign In',
    };

    constructor(props)
    {
      super(props);

      this.state = {
        isLoading: false,
        showErrorMsg: false,
        userName: "",
        password: "",
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
        screenDisplay = (
          <View>
            <TextInput
              style={{margin: 5, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({userName:text})}
              value={this.state.userName}
              placeholder={"User name or Email"}
              placeholderTextColor={'gray'}
            />
            <TextInput
              style={{margin: 5, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({password:text})}
              value={this.state.password}
              placeholder={"Password"}
              placeholderTextColor={'gray'}
              secureTextEntry={true}
            />
            <Button title="Sign in!" onPress={() => {this._signIn()}} />
            <Text style={{top:20, color: "blue"}} onPress={() => {this._signUp()}}>Sign up</Text>
          </View>
        );
      }

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={[{width:"65%"}]}>
            {
              this.state.showErrorMsg && 
              <Text style={{color:'red'}}>{this.state.errorMsg}</Text>
            }
            {screenDisplay}
          </View>
        </View>
      );
    }

    _signIn()
    {

      if(this.state.userName.length <= 0)
      {
        this.setState({showErrorMsg: true, errorMsg: "Username field is blank", password: ""});
        return;
      }

      if(this.state.password <= 0)
      {
        this.setState({showErrorMsg: true, errorMsg: "Password field is blank"});
        return;
      }

      this._signInAsync();
    }
  
    _signInAsync = async () => {

      this.setState({isLoading: true, showErrorMsg: false});

      let response = (await ServerCommunication.RetrieveAndStoreJwt(this.state.userName, this.state.password));
      if(response.success == false){
        this.setState({isLoading: false, showErrorMsg: true, errorMsg: response.message});
        return;
      }

      response = (await ServerCommunication.RetrieveAndStoreMapsKey());
      if(response.success == false){
        this.setState({isLoading: false, showErrorMsg: true, errorMsg: response.message});
        return;
      }

      response = (await ServerCommunication.RetrieveAndStoreRestaurantList());
      if(response.success == false){
        Alert.alert('Data retrieval error', 'Unable to get user data from server', [{text: 'OK', onPress: () => { }}]);
        return;
      }

      this.setState({isLoading: false});
      this.props.navigation.navigate('App');
      
    };

    _signUp()
    {
      this.props.navigation.navigate('SignUp');
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

  export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);