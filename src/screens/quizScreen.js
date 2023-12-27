import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';

const quizScreen=(props)=>{
    return(
    <View style={styles.container}>
        <LottieView
        style={styles.welcomeAnim}
        source={require('../assets/animations/Animation - 1702971947504.json')}
        autoPlay={true}
        loop={true}
      />
        <TouchableOpacity
        onPress={()=>props.navigation.navigate('startScreen')}
         style={styles.startBtn}>
              <LottieView
        style={styles.startAnim}
        source={require('../assets/animations/Animation - 1702972878124.json')}
        autoPlay={true}
        loop={true}
      />
        </TouchableOpacity>
    </View>
    )

}

const styles=StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#d6ff32',
       
        alignItems:'center'
    },
    startBtn:{
        
        width:'80%',
        height:'20%',
        alignItems:'center',
        justifyContent:'flex-end',
        marginTop:'10%'

    },
    startAnim:{
        width:'100%',
        height:'70%'

    },
    welcomeAnim:{
        width:'100%',
        height:'35%'

    }
})

export default quizScreen