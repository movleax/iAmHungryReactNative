const initialState = {
    GOOGLE_MAPS_APIKEY: null,
    restaurant_list: [

    ],
    user_configuration: {
      search_radius: 25,
      max_search_radius: 50,
      unitOfDistance: 'mile',
      include_new_user_experiences: false,
      price_level_max: 3,
      price_level_min: 0,
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