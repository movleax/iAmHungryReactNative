import React from 'react';
import {connect} from 'react-redux';
import {View, Button, Text, TextInput} from 'react-native';
import Loading from './Loading';
import ServerCommunication from './ServerCommunication.js'
import { HeaderBackButton } from 'react-navigation';

class SignUpScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'iAmHungry Sign Up',
            headerLeft:(
                <HeaderBackButton onPress={navigation.getParam('goBack')}/>
            ),
        };
    };

    constructor(props)
    {
      super(props);

      this.state = {
        isLoading: false,
        showErrorMsg: false,
        errorMsg: "",
        email: "",
        userName: "",
        password: "",
        passwordRetype: "",
      };
    }

    componentDidMount() {
        this.props.navigation.setParams({ goBack: this._goBack });
    }

    _goBack = () =>{
        this.setState({
            isLoading: false,
            showErrorMsg: false,
            errorMsg: "",
            email: "",
            userName: "",
            password: "",
            passwordRetype: "",
          });
        this.props.navigation.goBack();
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
              onChangeText={(text) => this.setState({email:text})}
              value={this.state.email}
              placeholder={"Email"}
              placeholderTextColor={'gray'}
            />
            <TextInput
              style={{margin: 5, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({userName:text})}
              value={this.state.userName}
              placeholder={"User name"}
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
            <TextInput
              style={{margin: 5, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({passwordRetype:text})}
              value={this.state.passwordRetype}
              placeholder={"Re-type Password"}
              placeholderTextColor={'gray'}
              secureTextEntry={true}
            />
            <Button title="Register!" onPress={() => {this._signUp()}} />
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
    
    _signUp()
    {
        this.setState({showErrorMsg: false, errorMsg: ""});

        if(this.state.email.length <= 0)
        {
            this.setState({showErrorMsg:true, errorMsg: "Email field cannot be blank", password: "", passwordRetype: ""})
            return;
        }

        if(this.state.email.length > 40)
        {
            this.setState({showErrorMsg:true, errorMsg: "Email cannot contain more than 40 characters", password: "", passwordRetype: ""})
            return;
        }

        if(!this._checkEmailFormat())
        {
            this.setState({showErrorMsg:true, errorMsg: "Invalid email format", password: "", passwordRetype: ""})
            return;
        }

        if(this.state.userName.length <= 0)
        {
            this.setState({showErrorMsg:true, errorMsg: "Username field cannot be blank", password: "", passwordRetype: ""})
            return;
        }

        if(this.state.userName.length <= 2 || this.state.userName.length > 15)
        {
            this.setState({showErrorMsg:true, errorMsg: "Username must be between 3 and 15 characters", password: "", passwordRetype: ""})
            return;
        }

        if(this.state.password.length < 6 || this.state.password.length > 20)
        {
            this.setState({showErrorMsg:true, errorMsg: "Password must be between 6 and 20 characters", password: "", passwordRetype: ""})
            return;
        }

        if(!this._checkPasswordsMatch())
        {
            this.setState({showErrorMsg:true, errorMsg: "Passwords do not match!", password: "", passwordRetype: ""})
            return;
        }
        
        this._signUpAsync();
    }

    _checkEmailFormat()
    {
        if(this.state.email.length > 64)
        {
            return false;
        }

        if(this.state.email.search(/^(([a-zA-Z0-9]|(!|#|\$|%|&|'|\*|\+|-|\/|=|\?|\^|_|`|\{|\||\}|~|\)))+\.?)+@((([a-zA-Z0-9])+)\-?)+\.([a-zA-Z])+$/) < 0)
        {
            return false;
        }

        return true;
    }

    _checkPasswordsMatch()
    {
        if(this.state.password.length != this.state.passwordRetype.length)
        {
            return false;
        }

        for(var i=0; i < this.state.password.length; i++)
        {
            if(this.state.password[i] != this.state.passwordRetype[i])
            {
                return false;
            }
        }

        return true;
    }

    _signUpAsync = async () => {

      this.setState({isLoading: true});

      let response = await ServerCommunication.RequestSignUp(this.state.email, this.state.userName, this.state.password);
      if(response.success == false){
        this.setState({isLoading: false, showErrorMsg: true, errorMsg: response.message, password: "", passwordRetype: ""});
        return;
      }

      response = await ServerCommunication.RetrieveAndStoreJwt(this.state.userName, this.state.password);
      if(response.success == false){
        this.setState({isLoading: false, showErrorMsg: true, errorMsg: response.message, password: "", passwordRetype: ""});
        return;
      }

      response = await ServerCommunication.RetrieveAndStoreMapsKey();
      if(response.success == false){
        this.setState({isLoading: false, showErrorMsg: true, errorMsg: response.message, password: "", passwordRetype: ""});
        return;
      }

      response = await ServerCommunication.RetrieveAndStoreRestaurantList();
      if(response.success == false){
        this.setState({isLoading: false, showErrorMsg: true, errorMsg: response.message, password: "", passwordRetype: ""});
        return;
      }

      this.setState({isLoading: false, password: "", passwordRetype: ""});
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

  export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);