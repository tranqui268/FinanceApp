import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChiTieuScreen from '../ChiTieuScreen';
import SettingPage from '../SettingPage';
import FavoriteFinance from '../FavoriteFinance';

const Tab = createBottomTabNavigator();
export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor:'#49A078',headerShown:false}}>
        <Tab.Screen 
        options={{
            title:'Home',
            tabBarIcon : () => <Image
            style={{height:20,width:20}}
            source={require('../../Assest/Icon/home.png')}>
            </Image>
        }}
        name='HomePage' component={ChiTieuScreen}/>
        <Tab.Screen
         options={{
            title:'Important',
            tabBarIcon : () => <Image
            style={{height:20,width:20}}
            source={require('../../Assest/Icon/wish-list.png')}>
            </Image>
        }}
         name='Favorite' component={FavoriteFinance}/>
        <Tab.Screen 
         options={{
            title:'Setting',
            tabBarIcon : () => <Image
            style={{height:20,width:20}}
            source={require('../../Assest/Icon/setting.png')}>
            </Image>
        }}
        name='Setting' component={SettingPage}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})