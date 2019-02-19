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
    render() {
      return (
        <View >
          <GooglePlacesAutocomplete
            placeholder='Search'
            minLength={2} // minimum length of text to search
            autoFocus={false}
            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
            listViewDisplayed='auto'    // true/false/undefined
            fetchDetails={true}
            renderDescription={row => row.description} // custom description render
            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
            console.log(data, details);
            }}

            getDefaultValue={() => ''}

            query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: this.props.GOOGLE_MAPS_APIKEY,
            language: 'en', // language of the results
            types: '(cities)' // default: 'geocode'
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

            currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
            currentLocationLabel="Current location"
            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
            GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
            }}
            GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'food'
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
            //predefinedPlaces={[homePlace, workPlace]}

            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            renderLeftButton={()  => <Text> Left Button or Left Icon </Text>}
            renderRightButton={() => <Text>Custom text after the input</Text>}
            />
        </View>
      );
    }
  }
  

function mapStateToProps(state){
    return {
        GOOGLE_MAPS_APIKEY: state.GOOGLE_MAPS_APIKEY
    }
}

function mapDispatchToProps(dispatch){
    return {
        testFunctionOne: () => dispatch({type:'TEST_ONE'}),
        testFunctionTwo: () => dispatch({type:'TEST_TWO'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRestaurantScreen);
