
import React from 'react';
import { StyleSheet, Text, View ,SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import {Container,Content,Header,Form,Input,Item,Label,Button, Image, Thumbnail} from 'native-base';
import * as firebase from 'firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginPage extends React.Component {

  constructor(porps){
    super(porps)
   

    this.state = {
        email: '',
        password : '',
        
    }
  }
    logininUser =() =>{

      const {navigation} = this.props;

      try{
 
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password).then(() =>{

          navigation.navigate("Ana Sayfa")

        })

      }catch(error){
        Alert.alert(
          'Oops',
          'Giris Yapılmadı',
          [
            {text :'Tamam'}
          ]
        )
      }

    };
    goSignUp =() => {

      const {navigation} = this.props;

      navigation.navigate("Kayıt Ol")

    }
 
render (){
  
  
  return(
 
  <Container style = {styles.container}> 
     <View>
      <Form>
        <View style={{alignItems:'center'}}>
          <Thumbnail style={{width:100 ,height:100}} source={require('../img/200x200.png')}/>
          <Text style ={{padding:5 }}>reChefs</Text>
        </View>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Email</Label>
          <Input 
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(email)=>this.setState({email})}/>
        </Item>
        <Item floatingLabel>
          <Label style={styles.labelStyle}>Şifre</Label>
          <Input 
          secureTextEntry={true}
          autoCorrect ={false}
          autoCapitalize="none"
          onChangeText={(password)=>this.setState({password})}/>
        </Item>
        <TouchableOpacity onPress={() => this.logininUser()} >
        <Button style={{marginTop:10 ,backgroundColor : '#fea73a'}}
        full
        rounded>
         <Text style={{color:'white'}}>Giriş Yap</Text>
        </Button> 
        </TouchableOpacity>
        <TouchableOpacity style ={{alignItems:'center'}} onPress={()=> this.goSignUp()}>
          <Text style={styles.labelStyle}>Hesabınız Yok mu?</Text>
          <Text style ={{fontWeight:'bold'}}>Kayıt Olun !</Text>
        </TouchableOpacity>
      </Form>
      </View>
      </Container>
  );
  }
};
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
