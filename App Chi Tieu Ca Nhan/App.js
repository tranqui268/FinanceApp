import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { useMMKVBoolean } from 'react-native-mmkv';
import HomeScreen from './src/Screen/HomeScreen';
import BottomTab from './src/Screen/BottomTab';
import LoginScreen from './src/Screen/Login';

const Stack = createStackNavigator();

export default function App() {
  const [isLogin, setisLogin] = useMMKVBoolean('isLogin')
  return (
    <NavigationContainer>
     <Stack.Navigator screenOptions={{headerShown:false}}>
      { !isLogin ? (
         <Stack.Screen name='Login' component={LoginScreen}/>
      ) : (   
          <Stack.Group>
            <Stack.Screen name='Home' component={HomeScreen}/>
            <Stack.Screen name='BottomTab' component={BottomTab}/>
          </Stack.Group>
          
      )

      }
   
     
     </Stack.Navigator>

    </NavigationContainer>

  )
}

const styles = StyleSheet.create({})