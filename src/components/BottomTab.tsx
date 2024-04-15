import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {Component} from 'react';
import HomeIcon from '../assets/svg/bottomTab/HomeIcon';
import QuestionIcon from '../assets/svg/bottomTab/QuestionIcon';
import AppointmentIcon from '../assets/svg/bottomTab/AppointmentIcon';
import BuyIcon from '../assets/svg/bottomTab/BuyIcon';
import OfferIcon from '../assets/svg/bottomTab/OfferIcon';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IntLabel from './IntLabel';

const BottomTab = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-[#F9F9F9]/[.94]   flex-row items-center justify-between px-[3%] border-t border-customGray/[.3] "
      style={{paddingBottom: insets.bottom, height: 70 + insets.bottom}}>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('sharing')}>
        <HomeIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('home_page')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('question')}>
        <QuestionIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('ask_question')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('offer')}>
        <OfferIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('take_offer')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('package')}>
        <BuyIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('packages')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('appointment')}>
        <AppointmentIcon />
        <Text className="font-poppinsMedium text-xxs text-customGray">
          {IntLabel('appointment')}
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomTab;
