import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

//Get dimensions of window so the app can work on multiple devices
const {width, height} = Dimensions.get('window');

//set variable to the size of half the width
const circleWidth = width /4;


export default function App() {
  return (
    <View style={styles.container}>
      {[0,1,2,3,4,5,6,7].map((item) => (
      <View
       style={{
      opacity: 0.1,
      backgroundColor: "purple", 
     width: circleWidth, 
     height: circleWidth,
     borderRadius: circleWidth / 2
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
