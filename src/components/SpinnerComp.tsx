import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const SpinnerComp = ({
  width = 80,
  height = 80,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <View className="items-center justify-center" style={{width, height}}>
      <LottieView
        source={require('../assets/lottie/data2.json')}
        style={{
          width: '100%',
          height: '100%',
        }}
        autoPlay
        loop
      />
    </View>
  );
};

export default SpinnerComp;
