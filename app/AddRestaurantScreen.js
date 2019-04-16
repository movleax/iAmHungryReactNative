/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import ServerCommunication from './ServerCommunication';
import Loading from './Loading';
import CurrentLocation from './CurrentLocation';


class AddRestaurantScreen extends Component {
  static navigationOptions = {
    title: 'Add Restaurant',
  };

  constructor(props)
  {
    super(props);

    this.state = {
      isLoading: false
    }
  }

  async _addRestaurant(restaurantDetails)
  {
    // check to see if the restaurant already exists in the store; return if this is the case
    if(this.props.restaurant_list.some(restaurant => restaurant.id === restaurantDetails.place_id))
    {
      alert("Location already exists in list");
      this.props.navigation.state.params.RefreshParentScreen();
      this.props.navigation.goBack();
      return;
    }

    if( restaurantDetails.name == null ||
      restaurantDetails.formatted_address == null ||
      restaurantDetails.geometry.location == null ||
      restaurantDetails.formatted_phone_number == null ||
      restaurantDetails.price_level == null ||
      restaurantDetails.rating == null ||
      restaurantDetails.opening_hours == null ||
      restaurantDetails.place_id == null
    )
    {
      alert("Unable to add location");
      this.props.navigation.state.params.RefreshParentScreen();
      this.props.navigation.goBack();
      return;
    }

    if( restaurantDetails.name.length <= 0 ||
        restaurantDetails.formatted_address.length <= 0 ||
        restaurantDetails.geometry.location == null ||
        restaurantDetails.formatted_phone_number.length <= 0 ||
        restaurantDetails.price_level == null ||
        restaurantDetails.rating == null ||
        restaurantDetails.opening_hours.weekday_text.length < 7 ||
        restaurantDetails.place_id.length <= 0
      )
    {
      alert("Unable to add location");
      this.props.navigation.state.params.RefreshParentScreen();
      this.props.navigation.goBack();
      return;
    }

    if(restaurantDetails.types.find(type => type == 'food') != 'food')
    {
      alert("Unable to add location");
      this.props.navigation.state.params.RefreshParentScreen();
      this.props.navigation.goBack();
      return;
    }

    this.setState({isLoading: true});

    let resposne = (await ServerCommunication.PostRestaurantToServer(restaurantDetails));
    if(resposne.success == false){
      this.setState({isLoading: false});
      alert(resposne.message);
      return;
    }

    resposne = (await ServerCommunication.RetrieveAndStoreRestaurantList());
    if(resposne.success == false){
      this.setState({isLoading: false});
      alert(resposne.message);
      return;
    }

    this.setState({isLoading: false});
    this.props.navigation.state.params.RefreshParentScreen();
    this.props.navigation.goBack();
  }

  render() {

    return (   
      <GooglePlacesAutocomplete
      placeholder='Search'
      minLength={2} // minimum length of text to search
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        this._addRestaurant(details);
      }}

      getDefaultValue={() => ''}

      query={{
      // available options: https://developers.google.com/places/web-service/autocomplete
      key: this.props.GOOGLE_MAPS_APIKEY,
      language: 'en', // language of the results
      types: 'establishment', // default: 'geocode'
      location: this.props.currentLocation.lat + "," + this.props.currentLocation.lng,
      radius: 50,
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
      nearbyPlacesAPI='None' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
      rankby: 'distance',
      types: 'food',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      predefinedPlaces={[]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      >
        <CurrentLocation/>
      </GooglePlacesAutocomplete>
    );
  }
}
  

function mapStateToProps(state){
    return {
        GOOGLE_MAPS_APIKEY: state.GOOGLE_MAPS_APIKEY,
        restaurant_list: state.restaurant_list,
        currentLocation: state.currentLocation,
    }
}

function mapDispatchToProps(dispatch){
    return {
      setRestaurantsList: (restaurantsList) => dispatch({type:'SET_RESTAURANT_LIST', payload: restaurantsList}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurantScreen);
