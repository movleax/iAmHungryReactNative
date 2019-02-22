import React, {Component} from 'react';
import {Text, View, FlatList, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ManageRestaurantsScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
          search: false,
          dataToShow: [],
          searchTerm: '',
          selected: (new Map(): Map<string, boolean>),
        }
      }
    
      componentWillMount(){
        this.setState({dataToShow: this.props.restaurant_list})
      }

      Refresh(){
        this.setState({dataToShow:this.props.restaurant_list, searchTerm: ''})
      }
    
      searchUpdated = (term) => {
        let matchedItemsArray = []
        if(term === ''){
          this.setState({search: false, dataToShow: this.props.restaurant_list, searchTerm: term})
        }else{
          this.setState({search:true, dataToShow: this.props.restaurant_list}, function(){
            this.state.dataToShow.map((item) => {
              if(item.name.toLowerCase().includes(term.toLowerCase())){
                matchedItemsArray.push(item);
              }
            })
            this.setState({dataToShow:matchedItemsArray, searchTerm: term})
          })
        }
      }

      _keyExtractor = (item, index) => item.id;

      _onPressItem = (id: string) => {
        console.log(this.state.selected);
        // updater functions are preferred for transactional updates
        this.setState((state) => {
          // copy the map rather than modifying state.
          const selected = new Map(state.selected);
          selected.set(id, !selected.get(id)); // toggle
          return {selected};
        });
      };

      _onPressRemove = (id: string) => {

        const newRestaurantList = this.props.restaurant_list.filter(restaurant => restaurant.id !== id);
        const newDataToShow = this.state.dataToShow.filter(restaurant => restaurant.id !== id);

        // updater functions are preferred for transactional updates
        this.setState((state) => {
          state.dataToShow = newDataToShow;
        });

        this.props.removeRestaurant(newRestaurantList);

        this.setState((state) => {
          // copy the map rather than modifying state.
          const selected = new Map(state.selected);
          selected.set(id, false); // set to false
          return {selected};
        });
      };
    
      _renderItem = ({item}) => (
        <RestaurantListItem
          onPressItem={this._onPressItem}
          onPressRemove={this._onPressRemove}
          selected={!!this.state.selected.get(item.id)}

          name={item.name}
          address={item.address}
          hours_weekly={item.hours_weekly}
          id={item.id}
          location={item.location}
          name={item.name}
          phone={item.phone}
          price_level={item.price_level}
          rating={item.rating}
        />
      );
    
    render() {
      return (
        <View style={styles.Container}>
            <TextInput 
            value={this.state.searchTerm}
            onChangeText={(term) => {this.searchUpdated(term)}} 
           // style={styles.searchInput}
            placeholder="Search restaurant"/>     

            <FlatList
              data={this.state.dataToShow}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />

            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.TouchableOpacityStyle}
                onPress={() => this.props.navigation.navigate('AddRestaurant', {
                  RefreshParentScreen: () => this.Refresh(),
                })}>
                <Ionicons name={'md-add-circle'} size={50} color={'grey'} style={styles.FloatingButtonStyle}/>
            </TouchableOpacity>

        </View>
      );
    }
  }

  class RestaurantListItem extends React.PureComponent {
    constructor(props)
    {
      super(props);
      this.state = {

      }
    }

    _onPressItem = () => {
      this.props.onPressItem(this.props.id);
    };

    _onPressRemove = () => {
      this.props.onPressRemove(this.props.id);
    };
  
    render() {
      const backgroundColor = this.props.selected ? 'lightgray' : 'white';
      return (
        <View style={{flexDirection: 'row', backgroundColor: backgroundColor, margin: 5, padding: 5}}>
          <TouchableOpacity onPress={this._onPressItem}>
            <View >
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{this.props.name}</Text>
              <Text>{this.props.address}</Text>
              <Text>Phone#: {this.props.phone}</Text>
              <Text>Hours today: {this.props.hours_weekly[new Date().getDay()]}</Text>
              <Text>Price: {"$".repeat(this.props.price_level)}</Text>
              <Text>Rating: {this.props.rating} / 5</Text>
            </View>
          </TouchableOpacity>
          { this.props.selected &&
            <TouchableOpacity onPress={this._onPressRemove} style={{position: 'absolute', right:25, top: 35}}>
              <View>
                <Ionicons name={'md-trash'} size={50} color={'tomato'} />
              </View>
            </TouchableOpacity>
          }
        </View>
      );
    }
  }
  
function mapStateToProps(state){
    return {
      restaurant_list: state.restaurant_list
    }
}

function mapDispatchToProps(dispatch){
    return {
        removeRestaurant: (restaurantArray) => dispatch({type:'REMOVE_RESTAURANT', payload: restaurantArray}),
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#F5F5F5',
      },
    
    TouchableOpacityStyle: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 10,
      bottom: 15,
    },
  
    FloatingButtonStyle: {
      //resizeMode: 'contain',
      width: 50,
      height: 50,
      //backgroundColor:'black'
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurantsScreen);