import { StyleSheet, Text, View, Image,Dimensions, FlatList, Alert, RefreshControl, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react';
import FinanceItem from '../../Items/FinanceItem';
import {useMMKVString } from 'react-native-mmkv';

const {width,height} = Dimensions.get('window')
const FINANCE_DATA = require('../../Data/data.json');

export default function FavoriteFinance() {
    const [data, setdata] = useState([]);
    const [storeList,setstoreList] = useMMKVString('love')
    const flag = 'favorite';
  
    const onRefresh = () =>{
      let newData = JSON.parse(storeList)
      setdata(newData)

    }

    useEffect(() => {
      if(!storeList) return
      let newData = JSON.parse(storeList)
      setdata(newData)
  
    }, [setstoreList])
    

    const deleteItem = index =>{
      let tnpData = JSON.parse(storeList)
      tnpData.splice(index,1)
      setstoreList(JSON.stringify(tnpData))
      setdata(JSON.parse(storeList))
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInfor}>
            <Image style={{height:60,width:60,paddingVertical:5,marginLeft:5}} 
            source={require('../../Assest/Icon/user.png')}>
            </Image>
            <View style={{marginTop:10}}>
                <Text style={{fontWeight:'bold'}}>SHAHZAIB</Text>
                <Text>Hello</Text>
            </View>
        </View>
      </View>

      <View style={styles.containerList}>
        <FlatList
        data={data}
        keyExtractor={(item)=>{
            return item.id
        }}
        renderItem={({item,index})=>{
            return <FinanceItem data={item} flag={flag} onPressDelete={()=>deleteItem(index)}></FinanceItem>
        }}

        refreshControl={<RefreshControl
            onRefresh={onRefresh}
            refreshing={false}></RefreshControl>}

        ItemSeparatorComponent={()=>{return <View style={{margin:5}}></View>}}
        >
        </FlatList>

      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#F5F5F5'
    },
    header:{
        flexDirection:'row',
        width:width,
        height:70,
        backgroundColor:'white'
    },
    headerInfor:{
        flexDirection:'row',
        width:200,
        height:100,
       
    },
    containerList:{
        paddingHorizontal:20,
        marginTop:20,
        flex:1
    }
})