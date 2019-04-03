import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from './store/store';

class ServerCommunication{

    constructor(){

    }

    static async DeleteRestaurantFromServer(restaurantId){
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await axios.post("http://192.168.50.101:5000/api/restaurant/remove",{
            id: restaurantId,
        },{
            headers: {
            'Content-Type': 'application/json',
            Authorization:  jwt,
        }
        })
        .then(async (response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });

        return response;
    }
    
    static async PostRestaurantToServer(restaurantDetails){
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await axios.post("http://192.168.50.101:5000/api/restaurant/add",{
            name: restaurantDetails.name,
            address: restaurantDetails.formatted_address,
            location: restaurantDetails.geometry.location,
            phone: restaurantDetails.formatted_phone_number,
            price_level: restaurantDetails.price_level,
            rating: restaurantDetails.rating,
            hours_weekly: restaurantDetails.opening_hours.weekday_text,
            id: restaurantDetails.place_id,
        },{
            headers: {
            'Content-Type': 'application/json',
            Authorization:  jwt,
        }
        })
        .then(async (response) => {
            return response;
        })
        .catch((error) => {
            return error;
        });

        return response;
    }

    static async RetrieveAndStoreJwt(){
        let jwt;

        const response = await axios.post("http://192.168.50.101:5000/api/auth/signin",{
        
          usernameOrEmail: "testUname",
          password: "secretpassword"
        
        },)
        .then((response) => {
          // Handle the JWT response here
          jwt = response.data; 
          return response;
        })
        .catch((error) => {
          // Handle returned errors here
          return error;
        });

        await AsyncStorage.setItem('jwt', jwt.tokenType + " " + jwt.accessToken);
        return response;
    }

    static async RetrieveAndStoreMapsKey(){
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await axios.get("http://192.168.50.101:5000/api/maps/key",{
          headers: {
            'Content-Type': 'application/json',
            Authorization:  jwt,
          }
        },)
        .then((response) => {
          store.dispatch({type:'SET_MAPS_API_KEY', payload: response.data.mapsApiKey});
          return response;
        })
        .catch((error) => {
          return error;
        });

        return response;
    }

    static async RetrieveAndStoreRestaurantList(){
        const jwt = await AsyncStorage.getItem('jwt');
        
        const response = await axios.get("http://192.168.50.101:5000/api/restaurant/getlist",{
          headers: {
            'Content-Type': 'application/json',
            Authorization:  jwt,
          }
        },)
        .then((response) => {
            store.dispatch({type:'SET_RESTAURANT_LIST', payload: response.data})

          return response;
        })
        .catch((error) => {
          return error;
        });

        return response;
    }

}


export default ServerCommunication;