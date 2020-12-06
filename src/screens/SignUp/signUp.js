import React from 'react';
import { StyleSheet, Text, View ,SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import {Container,Content,Header,Form,Input,Item,Label,Button ,Thumbnail} from 'native-base';
import * as firebase from 'firebase';

export default class SignUpPage extends React.Component {


    constructor(porps){
      super(porps)
     
  
      this.state = {
          email: '',
          name : '',
          password : '',
          loading : true ,
      }
  }

  signUpUser=() => {

    const {navigation} = this.props;

    try{
    
        if(this.state.password.length<6){
            alert("Please enter at least 6 char")
            return;
    
        }
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then((auth)=>{

          let uid = auth.user.uid ;
          this.createUser(uid)

        });

        navigation.navigate("Login");

    
    }
    catch(error){
      Alert.alert(
        'Oops',
        'Kayıt Yapılmadı',
        [
          {text :'Tamam'}
        ]
      )
    }
    
    }
    createUser =(uid) => {

      firebase.database().ref('users').child(uid).set({

        email : this.state.email,
        uid: uid,
        name:this.state.name,

      });
    }


  render(){
      return (

    <Container style = {styles.container}>
      <Form>
      <View style={{alignItems:'center'}}>
          <Thumbnail style={{width:100 ,height:100}} source={require('../img/200x200.png')}/>
       </View>
      <Item floatingLabel>
          <Label style={styles.labelStyle}>Adınız</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(name)=>this.setState({name :name})}/>

        </Item>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Email</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(email)=>this.setState({email :email})}/>

        </Item>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Password</Label>
          <Input 
          secureTextEntry={true}
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(password)=>this.setState({password :password})}/>

        </Item>
        <Button style={{marginTop:10, backgroundColor : '#fea73a'}}
        full
        rounded
        onPress={() => this.signUpUser()}>
         <Text style={{color:'white'}}>Sign Up</Text>
        </Button>
      </Form>
    </Container>

      )
  }

}
const styles = StyleSheet.create({
    container: {
      flex :1,
      backgroundColor: '#FCD4CB',
      padding:10,
      justifyContent :'center'
    },
    labelStyle:{
      color :'gray',
    }
  });