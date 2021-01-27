import React from 'react';
import {Text, View,Dimensions} from 'react-native';
import {Card, Divider} from 'react-native-elements';
import {Container,Button} from 'native-base';

const {width, height} = Dimensions.get('window');

export default class showMeal extends React.Component {

    constructor(porps){
        super(porps) 
      }


    render(){
        const { navigation } = this.props

        const {MealName,MealPhoto,MealRecipe} = this.props.route.params;

    return (

    
        <View style={{flex:1}}>
        <View style={{height: height,width:width,paddingTop:20, backgroundColor:'#FCD4CB'}}>
        <Divider style ={{padding:5, backgroundColor:'#FCD4CB'}}/>
        <View style={{padding:10, backgroundColor:'#FCD4CB'}}>
          <Card.Image source={{uri:MealPhoto}} />
        </View>
        <View style={{padding:20}}>
        <Card.Title >{MealName} Tarifi</Card.Title>
        </View>
        <View style={{backgroundColor:'white',borderRadius:5,padding:10}}>
        <Text >{MealRecipe}</Text>
          </View>
        </View>
        </View>

    );
    }
    };

