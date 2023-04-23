import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

// Get the device's width and height
const {width, height} = Dimensions.get('window');

// Calculate the width of the circle to be a quarter of the device's width
const circleWidth = width /4;


export default function App() {
  return (

    // Displays 8 circles 
    <View style={styles.container}>
      
      {[0,1,2,3,4,5,6,7].map((item) => (
      <View
        key={item}
        style={{
        opacity: 0.1,
        backgroundColor: "purple", 
       width: circleWidth, 
       height: circleWidth,
       borderRadius: circleWidth / 2,
       //stack circles ontop of each other
       ...StyleSheet.absoluteFill,
     }}
      ></View>
      ))}
    </View>
  );
      }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
