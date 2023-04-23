import React from 'react';
import { Text, View, TextInput, ImageBackground, 
    StyleSheet, Dimensions } from 'react-native';
  
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
  
const BackgroundImg = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode="cover"
        style={styles.img}>
      </ImageBackground>
    </View>
  );
};
export default BackgroundImg;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    display: 'flex'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
  },
});
