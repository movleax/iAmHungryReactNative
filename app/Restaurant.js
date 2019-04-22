import React from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';

class Restaurant extends React.PureComponent {
    constructor(props)
    {
      super(props);
    }

    render() {
      return (
        <View style={this.props.containerStyle}>
            <Text style={this.props.nameStyle}>{this.props.name}</Text>
            <Text style={this.props.addressStyle}>{this.props.address}</Text>
            <Text style={this.props.phoneStyle}>Phone#: {this.props.phone ? this.props.phone : "N/A"}</Text>
            <Text style={this.props.hoursStyle}>Hours today: {this.props.hours_weekly ? this.props.hours_weekly[(new Date().getDay()+6)%7] : "N/A"}</Text>
            <Text style={this.props.priceStyle}>Price: {this.props.price_level >= 0 ? (this.props.price_level > 0 ? "$".repeat(this.props.price_level) : 'free' ): "N/A"}</Text>
            <Text style={this.props.ratingStyle}>Rating: {this.props.rating ? this.props.rating : "N/A"} / 5</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);