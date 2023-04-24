// Import necessary components from React Native
import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Animated, TouchableOpacity } from 'react-native';
import BackgroundImg from './components/background.js';
// import StopWatch from './components/StopWatch.js';




// Get the device's width and height
const {width, height} = Dimensions.get('window');

// Calculate the width of the circle to be a quarter of the device's width
const circleWidth = width / 4;

// Define the main component of the app
export default function App() {
  

  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);


    // Function to start the stopwatch timer
    const startTimer = () => {
      if (intervalRef.current === null) {
        intervalRef.current = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1); // Increment by 1 second
        }, 1000); // Update interval to 1 second
      }
    };
    
  
    // Function to stop the stopwatch timer
    const stopTimer = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    
    
    // Function to reset the stopwatch timer
    const resetTimer = () => {
      stopTimer();
      setTimer(0);
    };
  

  // Create Animated values using refs for move and textOpacity
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  // Create a state variable called isAnimating and set its initial value to false
  const [isAnimating, setIsAnimating] = useState(false);

  // Define an Animated sequence called loopedAnimation that alternates between 
  // two parallel Animated sequences (one for inhale, and one for exhale)
  const loopedAnimation = Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          delay: 100,
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          delay: 1000,
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        })
      ])
    ])
  );
  
  // Define a function called startAnimation that sets isAnimating to true and 
  // starts the loopedAnimation
  const startAnimation = () => {
    setIsAnimating(true);
    resetTimer();
    startTimer();
    return loopedAnimation.start(() => setIsAnimating(false));
  }
  
  // Define a function called stopAnimation that sets isAnimating to false and 
  // stops the loopedAnimation
  const stopAnimation = () => {
    setIsAnimating(false);
    stopTimer();
    loopedAnimation.stop();
  }

  // Define an interpolate function called translate that maps move values 
  // from 0 to 1 to corresponding translation values from 0 to circleWidth / 6
  const translate = move.interpolate({
    inputRange: [0,1],
    outputRange: [0, circleWidth / 6]
  });

  // Define an interpolate function called exhale that maps textOpacity values 
  // from 0 to 1 to corresponding opacity values from 1 to 0
  const exhale = textOpacity.interpolate({
    inputRange: [0,1],
    outputRange:  [1,0],
  })



  

  // Return the main view with a TouchableOpacity component that toggles between 
  // startAnimation and stopAnimation when pressed
  // Render three Animated Views: one for inhale text, one for exhale text, and 
  // one for eight purple circles that are arranged in a circular pattern
  return (
    
    <View style={styles.container}>
            <BackgroundImg/>
            {/* <StopWatch/> */}

       {/* Start/Stop button */}
       <TouchableOpacity onPress={isAnimating ? stopAnimation : startAnimation} style={styles.button}>
        <Text style={styles.buttontext}>{isAnimating ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      {/* Timer */}
     
      <Text style={styles.timer}>{String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2,'0')}</Text>



      <TouchableOpacity style={styles.colourButton}>
        <Text style={styles.buttontext}>Colour</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.timer}>
        <Text style={styles.buttontext}>00:30</Text>
      </TouchableOpacity> */}

      <Animated.View style={{
        width: circleWidth,
        height: circleWidth,
        ...StyleSheet.absoluteFill,
        position: 'absolute',  top: 450,
        left: 812,
        right: 0,
        bottom: 0,
        opacity: textOpacity,
        zIndex: 1
      }}>

        <Text style={styles.text}>Inhale</Text>
      </Animated.View>
      <Animated.View style={{
        width: circleWidth,
        height: circleWidth,
        ...StyleSheet.absoluteFill,
        position: 'absolute',  top: 450,
        left: 812,
        right: 0,
        bottom: 0,
        opacity: textOpacity,
        
        opacity: exhale,
        zIndex: 1
      }}>
        <Text style={styles.text}>Exhale</Text>
      </Animated.View>
      {[0,1,2,3,4,5,6,7].map((item) => {
        const rotation = move.interpolate({
          inputRange: [0,1],
          outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
        });
        
        return (
          <Animated.View 
            key={item}
            style={{
              opacity: 0.5,
              backgroundColor: "#FF6347", 
              width: circleWidth, 
              height: circleWidth,
              borderRadius: circleWidth / 2,
              position: 'absolute',  top: 250,
              left: 670,
              right: 0,
              bottom: 0,
             

               ...StyleSheet,
              transform: [
                { rotateZ: rotation },
                { translateX: translate },
                { translateY: translate }     
              ]
            }}
          ></Animated.View>
        );
      })}
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'green',
    // alignItems: 'centre',
    // justifyContent: 'centre',
  },
  text: {
    fontSize: 50,
    fontFamily: 'Tahoma',
      position: 'centre'
      
    
  },
  button: {
    position: 'absolute',
    bottom: 140,
    left: 952,
    backgroundColor: '#B5B3CD',
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 10,
    zIndex:2
    
  },
  buttontext: {
    fontSize: 30,
    fontFamily: 'Tahoma',
      position: 'centre'
      
  },
  colourButton:{
    position: 'absolute',
    bottom: 140,
    left: 650,
    backgroundColor: '#B5B3CD',
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 10
  },
  timer:{
    position: 'absolute',
    top: 60,
    left: 815,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
    padding: 10,
    fontSize: 30,
    color: 'black',
    fontFamily: 'Tahoma',

  }
  
});
