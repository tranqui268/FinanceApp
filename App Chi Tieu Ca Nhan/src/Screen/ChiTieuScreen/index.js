import { StyleSheet, Text, View, Image,Dimensions, FlatList, Alert, RefreshControl, ScrollView, TextInput, TouchableOpacity} from 'react-native'
import React, { useState } from 'react';
import FinanceItem from '../../Items/FinanceItem';
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box';


const {width,height} = Dimensions.get('window')
const FINANCE_DATA = require('../../Data/data.json');

export default function ChiTieuScreen() {
    const [data, setdata] = useState(FINANCE_DATA.transactions);
    const [isShowModal, setisShowModal] = useState(false);
    const [isShowModal2, setisShowModal2] = useState(false);
    const [totalMoney, settotalMoney] = useState(FINANCE_DATA.total_expenses)
    const [checked, setchecked] = useState(false)
    const [checked1, setchecked1] = useState(false)
    const [category, setcategory] = useState('')
    const [amount, setamount] = useState(0)
    const [note, setnote] = useState('')
    const [date, setdate] = useState('')
    const [selected, setselected] = useState(null)
    const flag = 'home'

    const onRefresh = () =>{
        setdata(FINANCE_DATA.transactions)
        settotalMoney(FINANCE_DATA.total_expenses)
    }


    const handleAddFinance = () =>{
        if (checked==false && checked1==false) {
            Alert.alert("Lỗi","Vui lòng chọn loại chi tiêu")
            return
        } else {
            if(!category || !amount || !note || !date){
                Alert.alert("Lỗi","Thông tin không đầy đủ")
                return
            }
            let TmpData = [...data]
            let lastObj = TmpData[TmpData.length-1]
            let dataObj = {
                id:lastObj.id+1,
                transactions_type: checked === true ? "expense" : "income",
                category: category,
                amount: amount,
                date: date,
                note: note
            }
            TmpData.push(dataObj)
            if(checked===true){
                settotalMoney(Number(totalMoney)+Number(amount))
            }
            setdata(TmpData)
            setcategory('')
            setchecked(false)
            setchecked1(false)
            setamount(0)
            setnote('')   
            Alert.alert("Thông báo","Thêm thành công chi tiêu mới")
            setisShowModal(false)  
            
        }
    }

    const deleteItem = (index,item) =>{
        let tmpData = [...data]
        if (item.transactions_type==='expense') {
            settotalMoney(Number(totalMoney)-Number(item.amount))
        }
        tmpData.splice(index,1)
        setdata(tmpData)
    }

    const editItem = (index,item) =>{
        setselected(index)
        setisShowModal2(true)
        item.transactions_type === 'expense' ? setchecked(true) : setchecked1(true)
        setcategory(item.category)
        setamount(item.amount.toString())
        setdate(item.date)
        setnote(item.note)
    }

    const handleEditFinance = () =>{
        if (checked==false && checked1==false) {
            Alert.alert("Lỗi","Vui lòng chọn loại chi tiêu")
            return
        } else {
            if(!category || !amount || !note || !date){
                Alert.alert("Lỗi","Thông tin không đầy đủ")
                return
            }
            let TmpData = [...data]
            let typeEqual = TmpData[selected].transactions_type
            TmpData[selected] = {
                ...TmpData[selected],
                transactions_type : checked === true ? 'expense' : 'income',
                category: category,
                amount: amount,
                date: date,
                note: note
            }
            
            if(!(typeEqual===TmpData[selected].transactions_type)){
                if (checked===true) {
                    settotalMoney(Number(totalMoney)+Number(amount))
                } else {
                    settotalMoney(Number(totalMoney)-Number(amount))
                }
                
            }else{
                if (checked===true) {
                    settotalMoney(Number(totalMoney)+Number(amount))
                }
            }
            setselected(null)
            setdata(TmpData)
            setcategory('')
            setchecked(false)
            setchecked1(false)
            setamount(0)
            setnote('')
            setdate('')   
            Alert.alert("Thông báo","Sửa thành công chi tiêu")
            setisShowModal2(false)  
            
        }

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
        <TouchableOpacity style={styles.containerAdd}
        onPress={()=>{setisShowModal(true)}}>
            <Text style={{color:'#49A078',fontSize:20}}>+ Add</Text>

        </TouchableOpacity>
      </View>

      <View style={styles.containerTotal}>
        <View style={styles.title}>
            <Text>Your Total Balance</Text>
        </View>
        <View style={styles.totalMoney}>
            <Text style={styles.textMoney}>{totalMoney+'$'}</Text>
        </View>
      </View>

     
      <View style={styles.containerCatelogy}>
      <ScrollView horizontal={true}>
        <View style={[styles.catelogyItem,{backgroundColor:'#49A078'}]}>
            <Image style={styles.catelogyIcon} source={require('../../Assest/Icon/send.png')}></Image>
            <Text style={{color:'white',marginLeft:10,fontSize:15}}>Send</Text>
        </View>
        <View style={[styles.catelogyItem,{backgroundColor:'#94D1BE', marginLeft:10}]}>
            <Image style={styles.catelogyIcon} source={require('../../Assest/Icon/dollar.png')}></Image>
            <Text style={{color:'white',marginLeft:10,fontSize:15}}>Receive</Text>
        </View>
        <View style={[styles.catelogyItem,{backgroundColor:'#998FC7', marginLeft:10}]}>
            <Image style={styles.catelogyIcon} source={require('../../Assest/Icon/swap.png')}></Image>
            <Text style={{color:'white',marginLeft:10,fontSize:15}}>Swap</Text>
        </View>
        <View style={[styles.catelogyItem,{backgroundColor:'#000000', marginLeft:10}]}>
            <Image style={styles.catelogyIcon} source={require('../../Assest/Icon/add.png')}></Image>
            <Text style={{color:'white',marginLeft:10,fontSize:15}}>Deposit</Text>
        </View>    
        </ScrollView>   
      </View>

      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Recent Transaction</Text>
      </View>
      <View style={styles.containerList}>
        <FlatList
        data={data}
        keyExtractor={(item)=>{
            return item.id
        }}
        renderItem={({item,index})=>{
            return <FinanceItem data={item} flag={flag} onPressDelete={()=>deleteItem(index,item)}
            onPressEdit={()=>editItem(index,item)}></FinanceItem>
        }}

        refreshControl={<RefreshControl
            onRefresh={onRefresh}
            refreshing={false}></RefreshControl>}

        ItemSeparatorComponent={()=>{return <View style={{margin:5}}></View>}}
        >
        </FlatList>

      </View>
      <Modal
      isOpen={isShowModal}
      position='center'
      onClosed={()=>{
        setisShowModal(false)
        setchecked(false)
        setchecked1(false)
      }}
      style={styles.ModalStyle}
      >
        <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>New cost</Text>
        </View>
        <View style={styles.typeGroup}>
            <View>
                <Text style={{color:'back',fontSize:15}}>Type:</Text>
            </View>
            <CheckBox
            style={{marginTop:10,marginLeft:5}}
            onClick={()=>{
               setchecked(!checked)
               if(checked1===true){
                setchecked1(false)
               }
            }}
            isChecked={checked}
            rightText='expense'>
            </CheckBox>
            <CheckBox
            style={{marginTop:10,marginLeft:5}}
            onClick={()=>{
               setchecked1(!checked1)
               if(checked===true){
                setchecked(false)
               }
            }}
            isChecked={checked1}
            rightText='income'>
            </CheckBox>
            <View>
                <TextInput
                value={category}
                onChangeText={(txt)=>{setcategory(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='category'></TextInput>

                <TextInput
                value={amount}
                onChangeText={(txt)=>{setamount(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='amount'></TextInput>

                <TextInput
                value={date}
                onChangeText={(txt)=>{setdate(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='2024-01-01'></TextInput>

                <TextInput
                value={note}
                onChangeText={(txt)=>{setnote(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='note'></TextInput>
            </View>
            <TouchableOpacity 
            style={styles.ModalFABStyle}
            onPress={handleAddFinance}>
              <Text style={{color:'#fff'}}>Submit</Text>
            </TouchableOpacity>
        </View>

      </Modal>

      <Modal
      isOpen={isShowModal2}
      position='center'
      onClosed={()=>{
        setisShowModal2(false)
        setchecked(false)
        setchecked1(false)
      }}
      style={styles.ModalStyle}
      >
        <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Edit cost</Text>
        </View>
        <View style={styles.typeGroup}>
            <View>
                <Text style={{color:'back',fontSize:15}}>Type:</Text>
            </View>
            <CheckBox
            style={{marginTop:10,marginLeft:5}}
            onClick={()=>{
               setchecked(!checked)
               if(checked1===true){
                setchecked1(false)
               }
            }}
            isChecked={checked}
            rightText='expense'>
            </CheckBox>
            <CheckBox
            style={{marginTop:10,marginLeft:5}}
            onClick={()=>{
               setchecked1(!checked1)
               if(checked===true){
                setchecked(false)
               }
            }}
            isChecked={checked1}
            rightText='income'>
            </CheckBox>
            <View>
                <TextInput
                value={category}
                onChangeText={(txt)=>{setcategory(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='category'></TextInput>

                <TextInput
                value={amount}
                onChangeText={(txt)=>{setamount(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='amount'></TextInput>

                <TextInput
                value={date}
                onChangeText={(txt)=>{setdate(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='2024-01-01'></TextInput>

                <TextInput
                value={note}
                onChangeText={(txt)=>{setnote(txt)}}
                style={[styles.ModalTextInputStyle]}
                placeholder='note'></TextInput>
            </View>
            <TouchableOpacity 
            style={styles.ModalFABStyle}
            onPress={handleEditFinance}>
              <Text style={{color:'#fff'}}>Submit</Text>
            </TouchableOpacity>
        </View>

      </Modal>
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
    containerAdd:{
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:80,
        right:5,
        borderRadius:30,
        borderWidth:1,
        borderColor:'#49A078',
        top:5
    },
    containerTotal:{
        width:250,
        height:250,
        justifyContent:'center',
        borderRadius:99999,
        borderColor:'#49A078',
        borderWidth:1,
        marginHorizontal:70,
        overflow:'hidden',
        marginTop:20
    },
    title:{
        paddingHorizontal:65

    },
    totalMoney:{
        paddingHorizontal:56

    },
    textMoney:{
        color:'#49A078',
        fontSize:30,
        textAlign:'center'
    },
    containerCatelogy:{
        flexDirection:'row',
        width:width,
        height:50,
        justifyContent:'center',
        marginTop:30,
        paddingHorizontal:20
    },
    catelogyItem:{
        flexDirection:'row',
        width:100,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    catelogyIcon:{
        width:30,
        height:30
    },
    containerTitle:{
        paddingHorizontal:20,
        marginTop:20
    },
    textTitle:{
        color:'black',
        fontWeight:'bold',
        fontSize:25
    },
    containerList:{
        paddingHorizontal:20,
        marginTop:20,
        flex:1
    },
    ModalStyle:{
        borderRadius:15,
        height:600,
        width:width,
        marginLeft:10,
        marginRight:10,
        overflow:'hidden'
    },
    modalTitle:{
        color:'#49A078',
        fontWeight:'bold',
        fontSize:30
    },
    modalTitleContainer:{
        flex:1,
        marginLeft:20,
        height:50
    },
    typeGroup:{
        marginBottom:500,
        height:50,
        marginHorizontal:20
    },
    ModalTextInputStyle:{
        width:300,
        height:50,
        marginHorizontal:10,
        borderColor:'#49A078',
        borderWidth:2,
        marginVertical:20
    
    },
    ModalFABStyle:{
        height:50,
        width:100,
        backgroundColor:'green',
        borderRadius:15,
        marginHorizontal:120,
        justifyContent:'center',
        alignItems:'center'
    }
})