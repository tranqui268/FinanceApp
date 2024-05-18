import { Button, Image, StyleSheet, Text, View,Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { storage } from '../../untils/store';

const {width, height} = Dimensions.get('window');
const USER = require('../../Data/user.json')
export default function LoginScreen() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isShowPassword, setisShowPassword] = useState(false);
  const [listUser, setlistUser] = useState(USER.account);
  const info = USER.infor;

  const handleShowPassword = () =>{
    setisShowPassword(!isShowPassword)

  }

  const handleLogin = () =>{
    // validate
    let obj = {...listUser}
    if (username===obj.username&&password===obj.password) {
      storage.set('isLogin',true)
      storage.set('name',info.name)
      storage.set('phone',info.phone)
      storage.set('address',info.address)    
    }else{
      Alert.alert("Thông báo","Tên đăng nhập hoặc mật khẩu không đúng")
    }
   

  }
  return (
  <View style={styles.container}>
      <Image source={require('../../Assest/Image/logo.png')}
      style={styles.imgLogo}>
      </Image>
      <View style={styles.input}>
        <TextInput 
        placeholder='username@gmail.com'
        value={username}
        onChangeText={setusername}/>
      </View>
      <View style={[styles.input,styles.passwordInputContainer]}>
        <TextInput 
        secureTextEntry={isShowPassword}
        placeholder='password'
        value={password}
        onChangeText={setpassword}/>
        <TouchableOpacity onPress={handleShowPassword}>
          <Image
          style={{height:30,width:30}}
          source={
            isShowPassword 
            ? require('../../Assest/Image/show.png')
            : require('../../Assest/Image/hide.png')
          }
          ></Image>
          </TouchableOpacity>
      </View>
      <View style={styles.btnLogin}>
      <Button color={'#49A078'} title='login' onPress={handleLogin}></Button>
      </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  imgLogo:{
    height: 300, 
    width: width, 
    marginBottom: 30,
    marginTop: 10
  },
  input: {
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#49A078',
    borderRadius: 5,
    marginHorizontal:40
  },
  passwordInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnLogin:{
    width: '50%',
    marginHorizontal:100,
    marginTop:40
  }
})