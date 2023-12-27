import React,{useState,useEffect} from 'react';
import * as Animatable from 'react-native-animatable';
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
import quizData from '../utils/data';
import { FlatList } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';


const startScreen=(props)=>{
    const [currentQues,setCurrentQues]=useState(1)
    const [index1,setIndex]=useState(0)
    const [score,setScore]=useState(0)
    const [selected,setSelected]=useState(null)
    const [arr,setArr]=useState([])
    const [timer,setTimer]=useState(60)
    const [quesTimer,setQuesTimer]=useState(0)
    const [time,setTime]=useState([])
    
    
    useEffect(() => {
        const timerInterval = setInterval(() => {
          if (timer > 0) {
            setTimer(timer - 1);
            setQuesTimer(quesTimer+1)
            
            
          } else {
            props.navigation.navigate('EndScreen', { myScore: score,times:time});
            clearInterval(timerInterval);
          }
        }, 1000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(timerInterval);
      }, [quesTimer,timer,props.navigation]);
return(
    <View style={styles.container}>
        <LottieView style={styles.leaves}
        autoPlay={true}
        loop={true}
        source={require("../assets/animations/Animation - 1702979659811.json")}
        />
        <View style={styles.header}>
        <Text style={styles.quesIndicator}>({currentQues}/{quizData.length})</Text>
        <View style={styles.timerView}>
        <LottieView style={styles.clock}
        autoPlay={true}
        loop={true}
        source={require("../assets/animations/Animation - 1703056326134.json")}
        />
        <Text style={styles.timerIndicator}>{timer}s</Text>
        </View>
        </View>
        <Text style={styles.question}>Q:{quizData[index1]?.question}</Text>
        <FlatList
        contentContainerStyle={styles.flastlist}
        ItemSeparatorComponent={<View style={{height:50}}/>}
        data={quizData[index1].allAnswers}
        renderItem={({item,index})=>{
            return(
                <TouchableOpacity 
                onPress={()=>{
                    if(item==quizData[index1].correctAnswer){
                        if (!arr.includes(index1)) {
                            setScore(score + 1);
                            setArr([...arr, index1]); 
                           
                          }
                         
                    }
                    else if(arr.includes(index1)){
                        setScore(score - 1);
                        const newArr = [...arr];
                        newArr.splice(arr.indexOf(index1),1); 
                        setArr(newArr); 
                      }
                   
                    setSelected(index)
                    
                }}
                style={[styles.options,{backgroundColor:selected==index?"green":"#d6ff32"}]}>
                    
             {/* <Text style={[styles.optionstxt,{right:'200%',color:selected==index?"#d6ff32":"green"}]}>({index+1})</Text> */}
             <Text style={[styles.optionstxt,{color:selected==index?"#d6ff32":"green"}]}>{item}</Text>
             </TouchableOpacity>
             )
            }}
        />
        <View style={styles.btnContainer}>
            <TouchableOpacity 
            onPress={()=>{
                if(index1>0){
                    setIndex(index1-1)
                    setCurrentQues(currentQues-1)
                    setSelected(null)
                    
                }
            }}
            style={styles.prevBtn}><Text style={styles.btntxt}>Prev</Text></TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
                if(index1<(quizData.length-1)){
                    setIndex(index1+1)
                    setCurrentQues(currentQues+1)
                    setSelected(null)
                    setTime([...time,quesTimer])
                    setQuesTimer(0)
                    
                    
                    
                }
                if(currentQues==quizData.length){
                    setTimer(0)
                    setTime([...time,quesTimer])
                    props.navigation.navigate('EndScreen',{myScore:score,times:time})

                }
            }}
            style={styles.nextBtn}><Text style={styles.btntxt}>Next</Text></TouchableOpacity>
            
        </View>

    </View>
    
)
}
const styles=StyleSheet.create({
    timerIndicator: {
        fontFamily: 'arial',
        color: '#d6ff32',
        fontWeight: 'bold',
        fontSize: 17,
        
      },
      timerView:{
        marginTop:'10%',
        width:'17%',
        height:'50%',
        alignItems:'center',
        justifyContent:'space-between',
        borderRadius:10,
        flexDirection:'row'
        

      },
      clock:{
        width:'40%',
        height:'100%'

      },
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#846fa4'
    },
    leaves:{
        width:'50%',
        height:'25%',
        alignSelf:'center',
        position:'absolute'
    },
    header:{
        flexDirection:'row',
        width:'90%',
        justifyContent:'space-between',
        alignSelf:'center'
    },
    quesIndicator:{
        color:'#d6ff32',
        fontFamily:'arial',
        fontSize:20,
        fontWeight:'bold',
        marginTop:'10%',
        
    },
    scoreIndicator:{
      fontFamily:'arial',
      color:'#d6ff32',
      fontWeight:'bold',
      marginTop:'10%',
      fontSize:20
    },
    question:{
        fontWeight:'bold',
        fontFamily:'arial',
        color:'#d6ff32',
        fontSize:40,
        marginTop:'10%',
        marginLeft:'5%'
    },
    flastlist:{
       
        marginTop:'20%',
        
    },
    options:{
        alignSelf:'center',
      alignItems:'center',
      backgroundColor:'blue',
      width:'70%',
      borderRadius:20,
      justifyContent:'center',
      flexDirection:'row',
      
      
    },
    optionstxt:{
        color:'white',
        fontSize:20,
        fontFamily:'arial'

    },
    btnContainer:{
      width:'80%',
      marginBottom:'20%',
      alignSelf:'center',
      flexDirection:'row',
      justifyContent:'space-around',
      height:'6%'
    },
    nextBtn:{
        width:'30%',
        height:'100%',
        backgroundColor:'#d6ff32',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'

    },
    prevBtn:{
        width:'30%',
        height:'100%',
        backgroundColor:'#d6ff32',
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center'

    },
    btntxt:{
        color:'green',
        fontFamily:'arial',
        fontWeight:'bold',
        fontSize:15


    }
})
export default startScreen