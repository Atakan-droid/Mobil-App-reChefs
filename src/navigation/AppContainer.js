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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Ana Sayfa" component={MainScreen} />
        <Stack.Screen name="Add Meal" component ={AddMealScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;