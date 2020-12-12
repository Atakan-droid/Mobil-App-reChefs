import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import apiKeys from './apiKeys/key';
import AppContainer from './src/navigation/AppContainer';

if (!firebase.apps.length) {
  firebase.initializeApp(apiKeys.firebaseConfig);
}
export default class App extends React.Component {
render(){
return (

    <AppContainer/>
);
}
};
