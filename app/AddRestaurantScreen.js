/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

class AddRestaurantScreen extends Component {

    _addRestaurant(restaurantDetails)
    {
      // check to see if the restaurant already exists in the store
      if(this.props.restaurant_list.some(restaurant => restaurant.id === restaurantDetails.place_id))
      {
        return;
      }

      var restaurantObj = {
        name: restaurantDetails.name,
        address: restaurantDetails.formatted_address,
        location: restaurantDetails.geometry.location,
        phone: restaurantDetails.formatted_phone_number,
        price_level: restaurantDetails.price_level,
        rating: restaurantDetails.rating,
        hours_weekly: restaurantDetails.opening_hours.weekday_text,
        id: restaurantDetails.place_id,
      }

      // add this restaurant to the end of the restaurant list prop.
      const newRestaurantList = this.props.restaurant_list.concat(restaurantObj);

      console.log(newRestaurantList);

      // call our action to update the redux store
      this.props.addRestaurant(newRestaurantList);

      
    }

    render() {
      return (
        //<View >
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={true}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
              console.log(data);
              console.log(details);
              this._addRestaurant(details);
              this.props.navigation.state.params.RefreshParentScreen();
              this.props.navigation.goBack();
            }}

            getDefaultValue={() => ''}

            query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: this.props.GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
            types: 'establishment' // default: 'geocode'
            }}

            styles={{
            textInputContainer: {
                width: '100%'
            },
            description: {
                fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
                color: '#1faadb'
            }
            }}

            currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'restaurant'
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            predefinedPlaces={[]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        //</View>
      );
    }
  }
  

function mapStateToProps(state){
    return {
        GOOGLE_MAPS_APIKEY: state.GOOGLE_MAPS_APIKEY,
        restaurant_list: state.restaurant_list
    }
}

function mapDispatchToProps(dispatch){
    return {
        addRestaurant: (restaurantArray) => dispatch({type:'ADD_RESTAURANT', payload: restaurantArray}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurantScreen);
