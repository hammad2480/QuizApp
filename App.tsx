import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import quizScreen from './src/screens/quizScreen';
import startScreen from './src/screens/startScreen';
import EndScreen from './src/screens/endScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack=createStackNavigator()

const App=()=>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Quiz" screenOptions={{headerShown:false}}>
        <Stack.Screen name='Quiz' component={quizScreen}/>
        <Stack.Screen name='startScreen' component={startScreen}/>
        <Stack.Screen name='EndScreen' component={EndScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
  
}



export default App;
