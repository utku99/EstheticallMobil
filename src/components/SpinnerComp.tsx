import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {SIZES} from '../constants/constants';

const SpinnerComp = ({loading = false}: {loading: boolean}) => {
  return (
    <>
      {loading && (
        <View className="items-center justify-center bg-black/50 absolute w-full h-full z-[99999]">
          <LottieView
            source={require('../assets/lottie/data2.json')}
            style={{
              width: 70,
              height: 70,
            }}
            autoPlay
            loop
          />
        </View>
      )}
    </>
  );
};

export default SpinnerComp;
