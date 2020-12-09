import React from 'react';
import { StyleSheet, Text, View,Modal, NativeModules } from 'react-native';
import * as firebase from 'firebase';
import {Card, Tooltip} from 'react-native-elements';
import {Container,Content,Header,Form,Input,Item,Label,Button, Image} from 'native-base';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class mainPage extends React.Component {

  constructor(porps){
    super(porps)
   
  }


  state = {
    meals : [],
    
    

  }
  componentDidMount = async () => {

    firebase.database().ref('meals').on('value', snap =>{
      var meals = [];
      snap.forEach(element =>{
        const {MealName , MealDesc, MealPhoto ,meal } = element.val();
        meals.push({MealName ,MealDesc ,MealPhoto ,meal});
      });
      this.setState({meals : meals});
    });
   


      firebase.auth().onAuthStateChanged(auth=>{
          if(auth){
            firebase.database().ref('meals').child(auth.uid).once('value',(snap) =>{
              this.setState({meal :snap.val()})
            })
          }
        });



  }

goToaddMeal =() => {

  const {navigation} = this.props;

      navigation.navigate("Add Meal");


}

render(){
 
  return(
<Container style = {styles.container}>
      <View>
        <TouchableOpacity onPress={() => this.goToaddMeal()}>
        <Button style={{alignItems:'center' , backgroundColor : '#fea73a'}}
        full
        rounded>
         <Text style={{color:'white'}}>Yemek Ekle</Text>
        </Button>
        </TouchableOpacity>
        <FlatList
          data={this.state.meals}
          keyExtractor={(item) => item.meal}
          renderItem={({item})=>
             <Card>
                <Card.Title >{item.MealName}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: item.MealPhoto}} />
                <Text style={{marginBottom: 10}}>
                              {item.MealDesc}
                </Text>
             </Card>}>
          </FlatList>
      </View> 
</Container>
 
   );  
  }
};
const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#FCD4CB',
    padding:10,
    
  },
  labelStyle:{
    color :'gray',
  },
});
