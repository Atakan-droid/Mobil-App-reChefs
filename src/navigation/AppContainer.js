import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginPage';
import SignUpScreen from '../screens/SignUp/signUp'
import MainScreen from '../screens/MainPage/mainPage';
import AddMealScreen from '../screens/AddMeal/addMealPage';

const Stack = createStackNavigator();


const AppNavigationContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Giriş Yap">
        <Stack.Screen options={{headerStyle:{backgroundColor:'#FCD4CB'}}} name="Kayıt Ol" component={SignUpScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#FCD4CB'}}} name="Giriş Yap" component={LoginScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#FCD4CB'}}} name="Ana Sayfa" component={MainScreen} />
        <Stack.Screen options={{headerStyle:{backgroundColor:'#FCD4CB'}}} name="Yemek Ekle" component ={AddMealScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;