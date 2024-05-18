import { StyleSheet, Text, View , Button} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation();
  const handleGetStarted = () =>{
    navigation.navigate('BottomTab')

  }
  return (
     <View style={styles.container}>
      <View style={styles.welcome}>
      <LottieView
      style={{flex:1}}
      source={require('../../Assest/Animation/animation.json')}
      autoPlay
      loop/>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>Empower Your Finances, Achieve Financial Freedom. For Free!</Text>
      </View>
      <View style={styles.containerButton}>
        <Button color={'#49A078'} title='Get Started' onPress={handleGetStarted}></Button>
      </View>
     </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  welcome:{
    height:300,
    aspectRatio:1
  },
  content:{
    marginHorizontal:5,
    marginTop:60
  },
  contentText:{
    color:'#49A078',
    textAlign:'center',
    fontSize: 30
  },
  containerButton : {
    width: '50%',
    marginHorizontal:100,
    marginTop:150,
    borderRadius:10,
    overflow:'hidden'
  }

})