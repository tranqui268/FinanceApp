import { Image, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { storage } from '../untils/store';

export default function FinanceItem({data,onPressDelete,flag,onPressEdit}) {
  const TYPE = data.transactions_type;
  const backgroundColor = 
    TYPE ===  'expense' ?
    '#49A078':
    '#94D1BE'
  const [love, setlove] = useState(false)
  const onPressLove = () =>{
    let obj = {
      ...data
    }
    if(love==false){
      let saveData = storage.getString('love')
      if(saveData===undefined){
        let loveArray = [];
        loveArray.push(obj)
        storage.set('love',JSON.stringify(loveArray))
        Alert.alert("thong bao",'Luu thanh cong')
        setlove(true)
      }else{
        let data = storage.getString('love');
        let loveArray = JSON.parse(data)
        let isExist = loveArray.some(item => item.id===obj.id)
        if (isExist) {
          Alert.alert("Thông báo","Đã tồn tại trong danh sách yêu thích")
        } else {
          loveArray.push(obj);
          storage.set('love',JSON.stringify(loveArray));
          Alert.alert("thong bao",'Luu thanh cong')
          setlove(true)
        }   
      }
    }else{
      Alert.alert("Thông báo","Đã tồn tại trong danh sách yêu thích")
    }

  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPressEdit}>
      <View style={[styles.imgItem,{backgroundColor}]}>
        <Image
        source={
            TYPE === 'expense' ?
            require('../Assest/Icon/up-right-arrow.png') :
            require('../Assest/Icon/down-left-arrow.png')  
        }></Image>
      </View>
      <View style={styles.infor}>
        <Text style={styles.textTitle}>{data.category}</Text>
        <Text>{data.date}</Text>
      </View>
      <View style={styles.money}>
        <Text style={styles.textMoney}>{
          TYPE === 'expense' ?
          '-$'+data.amount :
          '+$'+data.amount
        }
        </Text>
      </View>
      {
        flag === 'home' ?  <TouchableOpacity style={styles.containerSave}
        onPress={onPressLove}>
          <Image
          source={require('../Assest/Icon/save-instagram.png')}></Image>
        </TouchableOpacity> 
        : <View></View>
      }
      <TouchableOpacity style={styles.containerDel}
      onPress={onPressDelete}>
        <Text>X</Text>
      </TouchableOpacity>
      
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
    flex:1
  },
  imgItem:{
    height:50,
    width:50,
    borderRadius:50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#49A078'
  },
  infor:{
    justifyContent:'center',
    marginLeft:10,
    width:150
  },
  textTitle:{
    color:'black',
    fontSize:18
  },
  containerSave:{
    width:50,
    height:50,
    position:'absolute',
    right:5,
    justifyContent:'center'
  },
  money:{
    justifyContent:'center',
    marginLeft:15
  },
  textMoney:{
    color:'black',
    fontSize:15
  },
  containerDel:{
    position:'absolute',
    top:0,
    right:0

  }

 
})