import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import loader from '../assets/lottie/data.json';

const SpinnerComp = () => {
  return (
    <LottieView
      source={require('../assets/lottie/data.json')}
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
