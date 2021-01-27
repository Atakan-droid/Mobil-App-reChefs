import React from 'react';
import { StyleSheet, Text, View,Modal, NativeModules } from 'react-native';
import * as firebase from 'firebase';
import {Card, Divider, Tooltip} from 'react-native-elements';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import {Container,Button} from 'native-base';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

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
        const {MealName , MealDesc, MealPhoto ,MealRecipe ,meal } = element.val();
        meals.push({MealName ,MealDesc ,MealPhoto, MealRecipe ,meal});
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
        this.registerForPushNotificationsAsync();
  }

  registerForPushNotificationsAsync = async () => {

      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync()

      let uid =firebase.auth().currentUser.uid;
      
      firebase.database().ref('users').child(uid).update({
        expoToken :token
      })
      
    };

goToaddMeal =() => {

  const {navigation} = this.props;

      navigation.navigate("Yemek Ekle");


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
          inverted
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
                <Card.Divider/>
          <View style={{flex:1, flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableOpacity style={{flex:1}} onPress={() => { this.props.navigation.navigate('Yemek Tarifi', { MealName: item.MealName, MealPhoto: item.MealPhoto, MealRecipe: item.MealRecipe })}}>
        <Button style={{backgroundColor : '#fea73a',borderRadius:10}}>
         <Text style={{color:'white', marginHorizontal:60}}>Tarifini Gör</Text>
        </Button> 
        </TouchableOpacity>
         </View>
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
