import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const SpinnerComp = () => {
  return (
    <View className="w-full h-full items-center justify-center ">
      <View className="w-[80px] h-[80px] items-center justify-center">
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
    </View>
  );
};

export default SpinnerComp;
