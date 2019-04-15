const initialState = {
    GOOGLE_MAPS_APIKEY: null,
    restaurant_list: [
      {
        name: "McDonald's",
        address: "2400 Sunrise Blvd, Rancho Cordova, CA 95670, USA",
        hours_weekly: ["Monday: 5:00 AM – 12:00 AM", "Tuesday: 5:00 AM – 12:00 AM", "Wednesday: 5:00 AM – 12:00 AM", "Thursday: 5:00 AM – 12:00 AM", "Friday: 5:00 AM – 1:00 AM", "Saturday: 5:00 AM – 1:00 AM", "Sunday: 5:00 AM – 1:00 AM"],
        id: "ChIJcxJNR4LdmoARHohf4RwJhbM",
        location: {lat: 38.6151029, lng: -121.2699112},
        phone: "(916) 635-1991",
        price_level: 1,
        rating: 3.3,
      }
    ],
    user_configuration: {
      search_radius: 25,
      include_new_user_experiences: true,
      price_level_max: 3,
      avg_rating_min: 0
    },
    currentLocation: {lat: 37.76999, lng: -122.44696},
  }


const reducer = (state = initialState, action) => {
    switch(action.type)
    {
      case 'TEST_ONE':
        console.log("test_one");
        return {testStr:"hello"};
      case 'TEST_TWO':
        console.log("test_two");
        return {testStr:"Heyo"};
      case 'ADD_RESTAURANT':
        return {...state, restaurant_list: action.payload};
      case 'REMOVE_RESTAURANT':
        return {...state, restaurant_list: action.payload};
      case 'UPDATE_USER_CONFIGURATION':
        return {...state, user_configuration: action.payload};
      case 'SET_MAPS_API_KEY':
        return {...state, GOOGLE_MAPS_APIKEY: action.payload};
      case 'SET_RESTAURANT_LIST':
        return {...state, restaurant_list: action.payload};
      case 'SET_CURRENT_LOCATION':
        return {...state, currentLocation: action.payload};
    }
    return state;
  }

  export default reducer;