import {Component} from 'react';
import {AppState} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

class CurrentLocation extends Component{

    constructor(props){
      super(props);
      
      this.state = {
          appState: AppState.currentState,
      }
    }

    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);
      this.setCurrentLocation();
    }
    
    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
    }
  
    _handleAppStateChange = (nextAppState) => {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        this.setCurrentLocation();
      }
      this.setState({appState: nextAppState});
    };

    setCurrentLocation = async () => {

      const lastLocation = JSON.parse(await AsyncStorage.getItem('location'));
      if(lastLocation != null)
      {
        this.props.setCurrentLocation(lastLocation);
      }

      let options = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      };
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          this.props.setCurrentLocation({lat: position.coords.latitude, lng: position.coords.longitude});
          await AsyncStorage.setItem('location', JSON.stringify({lat: position.coords.latitude, lng: position.coords.longitude}));
        },
        (error) => {
          alert(error.message);
        },
        options
      );
    }
    
    render(){
        return null;
    }
}

function mapStateToProps(state){
    return {

    }
}

function mapDispatchToProps(dispatch){
    return {
        setCurrentLocation: (newCurrentLocation) => dispatch({type:'SET_CURRENT_LOCATION', payload: newCurrentLocation}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLocation);