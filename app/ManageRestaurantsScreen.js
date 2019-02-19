import React, {Component} from 'react';
import {Text, View, SectionList, TextInput} from 'react-native';
import {connect} from 'react-redux';

// test data
const ClusterData = [
    {title: 'Cluster1', data: [{name: 'passionate'},{name: 'rousing'},{name: 'confident'},{name: 'boisterous'},{name: 'rowdy'}]},
    {title: 'Cluster2', data: [{name: 'rollicking'},{name: 'cheerful'},{name: 'fun'},{name: 'sweet'},{name: 'amiable'},{name: 'natured'}]}
  ]

class ManageRestaurantsScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
          search: false,
          dataToShow: []
        }
      }
    
      componentWillMount(){
        this.setState({dataToShow: ClusterData})
      }
    
      searchUpdated = (term) => {
        let matchedItemsArray = []
        if(term === ''){
          this.setState({search: false, dataToShow: ClusterData})
        }else{
          this.setState({search:true, dataToShow: ClusterData}, function(){
            this.state.dataToShow.map((item) => {
              if(item.title.includes(term)){
                matchedItemsArray.push(item)
              }
            })
            this.setState({dataToShow:matchedItemsArray})
          })
        }
      }
    
    render() {
      return (
        // <SectionList
        //     renderItem={({item, index, section}) => <Text style={{marginLeft: 5}} key={index}>{item}</Text>}
        //     renderSectionHeader={({section: {title}}) => (
        //         <Text style={{fontWeight: 'bold'}}>{title}</Text>
        //     )}
        //     sections={[
        //         {title: 'Title1', data: ['item1','item1','item1','item1','item1','item1','item1', 'item2','item1', 'item2','item1', 'item2','item1', 'item2']},
        //         {title: 'Title2', data: ['item3','item3','item3','item3','item3','item3','item3', 'item4','item3', 'item4','item3', 'item4','item3', 'item4']},
        //         {title: 'Title3', data: ['item5','item5','item5','item5','item5', 'item6','item5', 'item6','item5', 'item6','item5', 'item6','item5', 'item6']},
        //     ]}
        //     keyExtractor={(item, index) => item + index}
        // />

        <View>
            <TextInput 
            onChangeText={(term) => {this.searchUpdated(term)}} 
           // style={styles.searchInput}
            placeholder="Type a mood to search"/>        
            <SectionList
            renderItem={({item}) => <Text >{item.name}</Text>}
            renderSectionHeader={({section}) => <Text>{section.title}</Text>}
            sections={this.state.dataToShow}
            keyExtractor={(item, index) => item + index}
            />
        </View>
      );
    }
  }
  
  function mapStateToProps(state){
    return {
        testStr: state.testStr
    }
}

function mapDispatchToProps(dispatch){
    return {
        testFunctionOne: () => dispatch({type:'TEST_ONE'}),
        testFunctionTwo: () => dispatch({type:'TEST_TWO'}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestaurantsScreen);