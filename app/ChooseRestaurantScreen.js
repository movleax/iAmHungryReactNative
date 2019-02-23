/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';
import {connect} from 'react-redux';
import Restaurant from './Restaurant';
import {NavigationEvents} from 'react-navigation';
import { Popup } from 'react-native-map-link';


class ChooseRestaurantScreen extends Component {
  static navigationOptions = {
    title: 'Choose a Restaurant',
  };

    constructor(props)
    {
      super(props);
      this.state ={
        restaurantsToDisplay: [],
        displayIndex: 0,
        reachedEndOfList: false,
        isVisible: false,
        chosenLat: -30,
        chosenLon: 28,
        chosenTitle: '',
        chosenId: '',
      }
    }

    _generateRestaurantList()
    {
      if(this.props.restaurant_list <= 0)
      {
          return;
      }

      // TODO: implement way to search new experiances, where the user has not been to the restaurant

      var filteredRestaurantList = Object.assign({}, this.props.restaurant_list);
      console.log(filteredRestaurantList);
      filteredRestaurantList = this.props.restaurant_list.filter(restaurant => restaurant.price_level <= this.props.user_configuration.price_level_max);
      console.log(filteredRestaurantList);
      filteredRestaurantList = filteredRestaurantList.filter(restaurant => restaurant.rating >= this.props.user_configuration.avg_rating_min/10); // NOTE: need to divide by 10 because of our rating slider hack. See ConfigurationScreen.js; commit log should also contain info on this.
      console.log(filteredRestaurantList);
      // TODO: implement way to filter out search radius using the haversine algorithm below
        // var R = 6371e3; // earths radius in metres
        // var radLat1 = lat1.toRadians();
        // var radLat2 = lat2.toRadians();
        // var deltaLat = (lat2-lat1).toRadians();
        // var deltaLon = (lon2-lon1).toRadians();
        // var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
        //         Math.cos(radLat1) * Math.cos(radLat2) *
        //         Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
        // var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        // var d = R * c;

      // jumble up the results and store into an array in the component's state. I feel no need to put this into redux store.
      for(var i=0; i < filteredRestaurantList.length; i++)
      {
        var randomIndex = Math.floor((Math.random() * filteredRestaurantList.length));
        var swap = filteredRestaurantList[i];
        filteredRestaurantList[i] = filteredRestaurantList[randomIndex];
        filteredRestaurantList[randomIndex] = swap;
      }
      this.setState({restaurantsToDisplay: filteredRestaurantList, reachedEndOfList: false, displayIndex: 0});
    }

    _incrementRestaurantIndex()
    {
      if(this.state.displayIndex < this.state.restaurantsToDisplay.length-1)
      {
        this.setState({displayIndex: this.state.displayIndex + 1});
      }
      else
      {
        this.setState({reachedEndOfList: true});
        this.setState({displayIndex: 0});
      }
    }

    _chooseRestaurant()
    {
      this.setState({
        isVisible: true, 
        chosenLat: this.state.restaurantsToDisplay[this.state.displayIndex].location.lat, 
        chosenLon: this.state.restaurantsToDisplay[this.state.displayIndex].location.lng,
        chosenTitle: this.state.restaurantsToDisplay[this.state.displayIndex].name,
        chosenId: this.state.restaurantsToDisplay[this.state.displayIndex].id,
      });
    }

    componentDidMount()
    {
      this._generateRestaurantList();
    }

    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <NavigationEvents
            onWillFocus={() => this._generateRestaurantList()}
          />
          { 
            this.props.restaurant_list.length <= 0 &&
            <View>
              <Text>Cannot choose a restaurant because there are none in user's list</Text>
              <Text>Please goto ManageRestaurants tab and add restaurants</Text>
            </View>
          }
          { 
            this.props.restaurant_list.length > 0 && this.state.restaurantsToDisplay.length <= 0 &&
            <View>
              <Text>No results</Text>
              <Text>Try changing settings in the Configuration tab</Text>
            </View>
          }
          { 
            this.props.restaurant_list.length > 0 && this.state.restaurantsToDisplay.length > 0 &&
            <View style={{margin: 10}}>
              <Restaurant
                containerStyle={{marginBottom: 50, marginLeft: 20}}
                nameStyle={{fontSize: 30, fontWeight: 'bold'}}

                name={this.state.restaurantsToDisplay[this.state.displayIndex].name}
                address={this.state.restaurantsToDisplay[this.state.displayIndex].address}
                hours_weekly={this.state.restaurantsToDisplay[this.state.displayIndex].hours_weekly}
                id={this.state.restaurantsToDisplay[this.state.displayIndex].id}
                location={this.state.restaurantsToDisplay[this.state.displayIndex].location}
                name={this.state.restaurantsToDisplay[this.state.displayIndex].name}
                phone={this.state.restaurantsToDisplay[this.state.displayIndex].phone}
                price_level={this.state.restaurantsToDisplay[this.state.displayIndex].price_level}
                rating={this.state.restaurantsToDisplay[this.state.displayIndex].rating}
              />
              <View style={{flexDirection: 'row'}}>
                <View style={[{width:"45%", margin: 10}]}>
                  <Button
                    title="Not feeling it."
                    onPress={() => this._incrementRestaurantIndex()}
                  />
                </View>
                <View style={[{width:"45%", margin: 10}]}>
                  <Button
                    title="Let's go!"
                    onPress={() => this._chooseRestaurant()}
                  />
                </View>
              </View>
              { this.state.reachedEndOfList &&
                <Text style={{color:'red'}}>Cycled through list. Consider changing Configuration settings or add more restaurants</Text>
              }
              <Popup
                isVisible={this.state.isVisible}
                onCancelPressed={() => this.setState({ isVisible: false })}
                onAppPressed={() => this.setState({ isVisible: false })}
                onBackButtonPressed={() => this.setState({ isVisible: false })}
                modalProps={{ // you can put all react-native-modal props inside.
                    animationIn: 'slideInUp'
                }}
                // appsWhiteList={{ /* Array of apps (apple-maps, google-maps, etc...) that you want
                // to show in the popup, if is undefined or an empty array it will show all supported apps installed on device.*/}}
                options={{ /* See `showLocation` method above, this accepts the same options. */ 
                  title: this.state.chosenTitle,
                  latitude: this.state.chosenLat,
                  longitude: this.state.chosenLon,
                  googlePlaceId: this.state.chosenId,
                  googleForceLatLon: true,
                }}
                // style={{ /* Optional: you can override default style by passing your values. */ }}
            />
            </View>
          }
        </View>
      );
    }
  }
  

function mapStateToProps(state){
    return {
      restaurant_list: state.restaurant_list,
      user_configuration: state.user_configuration
    }
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseRestaurantScreen);
