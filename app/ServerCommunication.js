import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import store from './store/store';

class ServerCommunication{

    constructor(){
      
    }

    static getServerUrl()
    {
      return "http://192.168.50.101:5000";
    }

    static async RequestSignUp(email, username, password){

      const response = await axios.post(this.getServerUrl() + "/api/auth/signup",{
        email: email,
        username: username,
        password: password
      
      },)
      .then((response) => {
        // Handle the JWT response here
        jwt = response.data; 
        response.data.success = true;
        return response.data;
      })
      .catch((error) => {
        // Handle returned errors here
        if(!error.response)
        {
          error = {...error, response: {data: {message: "Unable to get data from server"}}};
        }

        error.response.data.success = false;
        return error.response.data;
      });

      return response;
  }

    static async DeleteRestaurantFromServer(restaurantId){
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await axios.delete(this.getServerUrl() + "/api/restaurant/remove",{
            
            headers: {
                'Content-Type': 'application/json',
                Authorization:  jwt,
            },
            data:{
                id: restaurantId,
            }
        })
        .then(async (response) => {
          response.data.success = true;
          return response.data;
        })
        .catch((error) => {
          if(!error.response)
          {
            error = {...error, response: {data: {message: "Unable to get data from server"}}};
          }

          error.response.data.success = false;
          return error.response.data;
        });

        return response;
    }
    
    static async PostRestaurantToServer(restaurantDetails){
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await axios.post(this.getServerUrl() + "/api/restaurant/add",{
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
          response.data.success = true;
          return response.data;
        })
        .catch((error) => {
          if(!error.response)
          {
            error = {...error, response: {data: {message: "Unable to get data from server"}}};
          }

          error.response.data.success = false;
          return error.response.data;
        });

        return response;
    }

    static async RetrieveAndStoreJwt(userNameOrEmail, password){
        let jwt;
        
        const response = await axios.post(this.getServerUrl() + "/api/auth/signin",{
        
          usernameOrEmail: userNameOrEmail,
          password: password
        
        },)
        .then((response) => {
          // Handle the JWT response here
          jwt = response.data; 
          response.data.success = true;
          
          return response.data;
        })
        .catch((error) => {
          if(!error.response)
          {
            error = {...error, response: {data: {message: "Unable to get data from server"}}};
          }

          error.response.data.success = false;
          return error.response.data;
        });

        if(response.success)
        {
          await AsyncStorage.setItem('jwt', jwt.tokenType + " " + jwt.accessToken);
        }
        
        return response;
    }

    static async RetrieveAndStoreMapsKey(){
        const jwt = await AsyncStorage.getItem('jwt');

        const response = await axios.get(this.getServerUrl() + "/api/maps/key",{
          headers: {
            'Content-Type': 'application/json',
            Authorization:  jwt,
          }
        },)
        .then((response) => {
          store.dispatch({type:'SET_MAPS_API_KEY', payload: response.data.mapsApiKey});
          response.data.success = true;
          return response.data;
        })
        .catch((error) => {
          if(!error.response)
          {
            error = {...error, response: {data: {message: "Unable to get data from server"}}};
          }

          error.response.data.success = false;
          return error.response.data;
        });

        return response;
    }

    static async RetrieveAndStoreRestaurantList(){
        const jwt = await AsyncStorage.getItem('jwt');
        
        const response = await axios.get(this.getServerUrl() + "/api/restaurant/getlist",{
          headers: {
            'Content-Type': 'application/json',
            Authorization:  jwt,
          }
        },)
        .then((response) => {
          store.dispatch({type:'SET_RESTAURANT_LIST', payload: response.data})
          response.data.success = true;
          return response.data;
        })
        .catch((error) => {
          if(!error.response)
          {
            error = {...error, response: {data: {message: "Unable to get data from server"}}};
          }

          error.response.data.success = false;
          return error.response.data;
        });

        return response;
    }

}


export default ServerCommunication;