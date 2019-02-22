import React, {Component} from 'react';
import {Text, View, Switch, Slider} from 'react-native';
import {connect} from 'react-redux';


class ConfigurationScreen extends Component {

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

    _updateMinAvgRating(newValue)
    {
      var updatedUserConfig = Object.assign({}, this.props.user_configuration);
      updatedUserConfig.avg_rating_min = newValue;
      this.props.updateUserConfiguration(updatedUserConfig);
    }

    render() {
      console.log(this.props);
      return (
        <View>
          <View style={{flexDirection: 'row'}}>
            <Switch
              onValueChange = {value => this._updateRestaurantExpChoice(value)}
              value = {this.props.user_configuration.include_new_user_experiences}
            />
            <Text>Include new restaurant experiences</Text>
          </View>
          <View>
            <Text>
              Search Radius: {this.props.user_configuration.search_radius <= 0 ? 1 : this.props.user_configuration.search_radius} mi
            </Text>
            <Slider
              value={this.props.user_configuration.search_radius}
              onValueChange={value => this._updateSearchRadius(value)}
              maximumValue={25}
              minimumValue={0}
              step={5}
            />
          </View>
          <View>
            <Text>
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
          <View>
            <Text>
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