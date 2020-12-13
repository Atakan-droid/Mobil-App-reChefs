import React from 'react';
import { StyleSheet, Text, View ,SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import {Container,Content,Header,Form,Input,Item,Label,Button ,Thumbnail} from 'native-base';
import * as firebase from 'firebase';

export default class addMealPage extends React.Component {


    constructor(porps){
        super(porps)
       
    
        this.state = {

            meal :{},
            MealName: '',
            MealDesc : [],
            MealPhoto : '',
            MealRecipe : '',
            likes: 0,
           

        }
    }
    componentDidMount = async () => {


        firebase.auth().onAuthStateChanged(auth=>{
            if(auth){
              firebase.database().ref('meals').child(auth.uid).once('value',(snap) =>{
                this.setState({meal :snap.val()})
              })
            }
          });
    }
    createMeal =() => {
      const {navigation} =this.props;
      const timestamp = new Date().getTime();

        firebase.database().ref('meals').child(timestamp).set({
      
         timestamp:timestamp,   
         MealName:this.state.MealName,
         MealDesc:this.state.MealDesc,
         MealPhoto:this.state.MealPhoto,
         MealRecipe: this.state.MealRecipe,
         meal:this.state.meal,
        

            }).then(() => {
                navigation.navigate("Ana Sayfa");
            })
          }
    render() {

        return(
    <Container style = {styles.container}>
      <Form>
      <View style={{alignItems:'center'}}>
          <Thumbnail source={require('../img/200x200.png')}/>
          <Text style ={{padding:5 }}>reChefs</Text>
       </View>
      <Item floatingLabel>
          <Label style={styles.labelStyle}>Yemek Adı</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(MealName)=>this.setState({MealName :MealName})}/>

        </Item>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Yemek Açıklaması</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(MealDesc)=>this.setState({MealDesc :MealDesc})}/>

        </Item>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Yemek Tarifi</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(MealRecipe)=>this.setState({MealRecipe :MealRecipe})}/>

        </Item>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Fotoğraf Linki</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(MealPhoto)=>this.setState({MealPhoto :MealPhoto})}/>

        </Item>
        <Button style={{marginTop:10, backgroundColor : '#fea73a'}}
        full
        rounded
        onPress={() => this.createMeal()}>
         <Text style={{color:'white'}}>Yemek Kayıt Yap</Text>
        </Button>
      </Form>
    </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      
      backgroundColor: '#FCD4CB',
      padding:5,
      
    },
    labelStyle:{
      color :'gray',
    }
  });