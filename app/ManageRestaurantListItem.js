import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Restaurant from './Restaurant';

class ManageRestaurantListItem extends React.PureComponent {
    constructor(props)
    {
      super(props);
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
            <Restaurant
              nameStyle={{fontSize: 20, fontWeight: 'bold'}}

              name={this.props.name}
              address={this.props.address}
              hours_weekly={this.props.hours_weekly}
              id={this.props.id}
              location={this.props.location}
              name={this.props.name}
              phone={this.props.phone}
              price_level={this.props.price_level}
              rating={this.props.rating}
            />
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

    }
}

function mapDispatchToProps(dispatch){
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurantListItem);