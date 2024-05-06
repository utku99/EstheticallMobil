import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const SpinnerComp = () => {
  return (
    <LottieView
      source={require('../assets/lottie/deneme2.json')}
      style={{
        width: '100%',
        height: '100%',
      }}
      autoPlay
      loop
    />
  );
};

export default SpinnerComp;
