import React, {Component} from 'react';
import {Text, View, Switch, Picker} from 'react-native';
import {connect} from 'react-redux';
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-community/async-storage';

class ConfigurationScreen extends Component {
  static navigationOptions = {
    title: 'Configuration',
  };

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.props.navigation.addListener('willBlur', this._onBlur);
  }
  
  componentWillUnmount() {
    this.props.navigation.removeListener('willBlur', this._onBlur);
  }

  _onBlur = () => {
    this._saveUserConfiguration();
  };
  
  async _saveUserConfiguration(){
    await AsyncStorage.setItem('user_configuration', JSON.stringify(this.props.user_configuration));
    console.log("saving user_configuration data at ConfigurationSettings screen");
  }

  _updateRestaurantExpChoice(newValue)
  {
    var updatedUserConfig = Object.assign({}, this.props.user_configuration);
    updatedUserConfig.include_new_user_experiences = newValue;
    console.log(updatedUserConfig.include_new_user_experiences)
    this.props.updateUserConfiguration(updatedUserConfig);
  }

  _updateSearchRadius(newValue)
  {
    var updatedUserConfig = Object.assign({}, this.props.user_configuration);
    updatedUserConfig.search_radius = newValue;
    this.props.updateUserConfiguration(updatedUserConfig);
  }

  _updateMaxPriceLevel(newValue)
  {
    var updatedUserConfig = Object.assign({}, this.props.user_configuration);
    updatedUserConfig.price_level_max = newValue;
    this.props.updateUserConfiguration(updatedUserConfig);
  }

  _updateMinPriceLevel(newValue)
  {
    var updatedUserConfig = Object.assign({}, this.props.user_configuration);
    updatedUserConfig.price_level_min = newValue;
    this.props.updateUserConfiguration(updatedUserConfig);
  }

  _updateMinAvgRating(newValue)
  {
    var updatedUserConfig = Object.assign({}, this.props.user_configuration);
    updatedUserConfig.avg_rating_min = newValue;
    this.props.updateUserConfiguration(updatedUserConfig);
  }

  _updateUnitOfDistance(newValue)
  {
    var updatedUserConfig = Object.assign({}, this.props.user_configuration);
    updatedUserConfig.unitOfDistance = newValue;

    switch(newValue)
    {
      case 'mile': 
        updatedUserConfig.max_search_radius = 50; 
        if(updatedUserConfig.search_radius > 50) {
          updatedUserConfig.search_radius = 50;
        }
        break;
      case 'km': 
        updatedUserConfig.max_search_radius = 80;
        if(updatedUserConfig.search_radius > 80) {
          updatedUserConfig.search_radius = 80;
        }
        break;
      case 'meter': 
        updatedUserConfig.max_search_radius = 80470;
        if(updatedUserConfig.search_radius > 80470) {
          updatedUserConfig.search_radius = 80470;
        }
        break;
      case 'nmi': 
        updatedUserConfig.max_search_radius = 45;
        if(updatedUserConfig.search_radius > 45) {
          updatedUserConfig.search_radius = 45;
        }
        break;
    }

    this.props.updateUserConfiguration(updatedUserConfig);
  }

  render() {
    console.log(this.props);
    return (
      <View>
        <View style={{flexDirection: 'row', margin: 20}}>
          <Switch
            onValueChange = {value => this._updateRestaurantExpChoice(value)}
            value = {this.props.user_configuration.include_new_user_experiences}
          />
          <Text> Include new restaurant experiences</Text>
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight:"bold"}}>
            Search Radius: {this.props.user_configuration.search_radius <= 0 ? 1 : this.props.user_configuration.search_radius} {this.props.user_configuration.unitOfDistance}
          </Text>
          <Slider
            value={this.props.user_configuration.search_radius}
            onValueChange={value => this._updateSearchRadius(value)}
            maximumValue={this.props.user_configuration.max_search_radius}
            minimumValue={0}
            step={5}
          />
          <Picker
            selectedValue={this.props.user_configuration.unitOfDistance}
            style={{height: 50, width: 135}}
            onValueChange={(itemValue, itemIndex) =>
              this._updateUnitOfDistance(itemValue)
            }>
            <Picker.Item label="Mile" value="mile" />
            <Picker.Item label="Kilometer" value="km" />
            <Picker.Item label="Meter" value="meter" />
            <Picker.Item label="Nautical Mile" value="nmi" />
          </Picker>
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight:"bold"}}>
            Minimum price level: {this.props.user_configuration.price_level_min > 0 ? "$".repeat(this.props.user_configuration.price_level_min) : 'free'}
          </Text>
          <Slider
            value={this.props.user_configuration.price_level_min}
            onValueChange={value => this._updateMinPriceLevel(value)}
            maximumValue={4}
            minimumValue={0}
            step={1}
          />
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight:"bold"}}>
            Max price level: {this.props.user_configuration.price_level_max > 0 ? "$".repeat(this.props.user_configuration.price_level_max) : 'free'}
          </Text>
          <Slider
            value={this.props.user_configuration.price_level_max}
            onValueChange={value => this._updateMaxPriceLevel(value)}
            maximumValue={4}
            minimumValue={0}
            step={1}
          />
        </View>
        <View style={{margin: 20}}>
          <Text style={{fontWeight:"bold"}}>
            Average rating minimum: {this.props.user_configuration.avg_rating_min/10} / 5
          </Text>
          <Slider
            value={this.props.user_configuration.avg_rating_min}
            onValueChange={value => this._updateMinAvgRating(value)}
            maximumValue={50}
            minimumValue={0}
            step={1}
          />
        </View>
      </View>
    );
  }
}
  
function mapStateToProps(state){
  return {
      user_configuration: state.user_configuration
  }
}

function mapDispatchToProps(dispatch){
    return {
        updateUserConfiguration: (newUserConfiguration) => dispatch({type:'UPDATE_USER_CONFIGURATION', payload: newUserConfiguration}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationScreen);