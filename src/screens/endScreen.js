import React, { useState, useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Share  from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import quizData from '../utils/data';

const EndScreen = ({ route }) => {
  const myParams = route.params;
  const [state, setState] = useState(1);
  const viewShotRef = useRef();




  var sum = 0;
  for (let i = 0; i < myParams.times.length; i++) {
    sum += myParams.times[i];
  }

  const shareResult = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const result = `I scored ${myParams.myScore}/${quizData.length} in the quiz in ${sum}s! 🚀`;
      const shareOptions = {
        title: 'Quiz Result',
        message: result,
        url: uri,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing result', error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Animatable.Text style={styles.heading} delay={400} animation="fadeInLeft">
        Your
      </Animatable.Text>
      <Animatable.Text style={styles.heading} delay={1200} animation="fadeInLeft">
        Score
      </Animatable.Text>
      <Animatable.Text style={styles.heading} delay={2000} animation="fadeInLeft">
        Is
      </Animatable.Text>
      <ViewShot ref={viewShotRef} style={styles.headingView} options={{ format: 'png', quality: 0.9 }}>
        <Animatable.Text style={styles.score} delay={2000} animation="bounceIn">
          {myParams.myScore} / {quizData.length}
        </Animatable.Text>
        <Text style={styles.sum}>in {sum}s</Text>
      </ViewShot>
      <FlatList
        contentContainerStyle={{ marginTop: '30%', paddingBottom: '20%' }}
        data={myParams.times}
        renderItem={({ item, index }) => {
          return <Text style={styles.quesTime}>Question {index + 1} time: {item}s</Text>;
        }}
      />
      <TouchableOpacity onPress={()=>{shareResult()}} style={styles.shareButton}>
        <Text style={styles.shareButtonText}>Share on Social Media</Text>
      </TouchableOpacity>

      <LottieView
        style={styles.loading}
        autoPlay={true}
        loop={false}
        source={require('../assets/animations/Animation - 1702985301773.json')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#846fa4',
    width: '100%',
    height: '100%',
  },
  sum: {
    marginLeft: '42.5%',
    fontFamily: 'arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d6ff32',
    marginTop: '3%',
  },
  quesTime: {
    alignSelf: 'center',
    fontFamily: 'arial',
    fontSize: 17,
    fontWeight: 'bold',
    color: '#d6ff32',
    marginTop: '0.5%',
  },
  score: {
    marginTop: '27%',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'arial',
    fontSize: 40,
    color: '#d6ff32',
    fontStyle: 'italic',
  },
  loading: {
    position: 'absolute',
    top: '32%',
    width: '50%',
    height: '25%',
    alignSelf: 'center',
  },
  headingView: {
    marginTop: '20%',
  },
  heading: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontFamily: 'arial',
    fontSize: 50,
    color: '#d6ff32',
    fontStyle: 'italic',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EndScreen;
