import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useMMKVBoolean, useMMKVString } from 'react-native-mmkv'
import { storage } from '../../untils/store'

export default function SettingPage() {
  const navigation = useNavigation()
  const [isLogin, setisLogin] = useMMKVBoolean('isLogin')
  const [name, setname] = useMMKVString('name')
  const [phone, setphone] = useMMKVString('phone')
  const [address, setaddress] = useMMKVString('address')
  const handleLogout = () =>{
    navigation.navigate('Login')
    setisLogin(false)
    storage.clearAll();

  }
  return (
    <View style={styles.container}>
      <View style={styles.containerImgInfo}>
        <Image style={{width:300,height:300}}
        source={require('../../Assest/Image/830.png')}></Image>
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout}>
          <Image source={require('../../Assest/Icon/logout.png')}></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.containerInfor}>
        <Text style={styles.textTitle}>Infor</Text>
        <Text>Name:</Text>
        <View style={styles.containerName}>
          <Text>{name}</Text>
        </View>
        <Text>Phone Number:</Text>
        <View style={styles.containerName}>
          <Text>{phone}</Text>
        </View>
        <Text>Address:</Text>
        <View style={styles.containerName}>
          <Text>{address}</Text>
        </View>

        <Text style={[styles.textTitle,{marginTop:10}]}>Setting</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  containerImgInfo:{
    width:400,
    height:300,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10
  },
  containerInfor:{
    justifyContent:'flex-start',
    paddingHorizontal:20
  },
  containerName:{
    borderColor:'#49A078',
    borderWidth:1,
    marginVertical:10,
  },
  textTitle:{
    color:'black',
    fontSize:25
  },
  btnLogout:{
    position:'absolute',
    right:5,
    top:5,
    height:50,
    width:50,
    borderRadius:50
  }
})