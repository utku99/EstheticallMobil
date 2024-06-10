import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import HomeIcon from '../assets/svg/bottomTab/HomeIcon';
import QuestionIcon from '../assets/svg/bottomTab/QuestionIcon';
import AppointmentIcon from '../assets/svg/bottomTab/AppointmentIcon';
import BuyIcon from '../assets/svg/bottomTab/BuyIcon';
import OfferIcon from '../assets/svg/bottomTab/OfferIcon';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IntLabel from './IntLabel';
import {useSelector} from 'react-redux';
import {toast} from '../utility/WebClient';
import {useIntl} from 'react-intl';

const BottomTab = ({props}: any) => {
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const {isGuest, isLoggedIn} = useSelector((state: any) => state.user);
  const intl = useIntl();

  let routeName =
    props?.state?.routes[0]?.state?.routes[
      props.state.routes[0].state.routes.length - 1
    ]?.name ?? 'sharing';

  return (
    <View
      className="bg-[#F9F9F9]/[.94]   flex-row items-center justify-between px-[3%] border-t border-customGray/[.3] "
      style={{paddingBottom: insets.bottom, height: 70 + insets.bottom}}>
      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('sharing')}>
        <HomeIcon fill={routeName == 'sharing' ? '#FF8170' : '#4D4A48'} />
        <Text
          className={`${
            routeName == 'sharing' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('home_page')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => {
          if (isLoggedIn && !isGuest) {
            navigation.navigate('question');
          } else {
            toast(
              intl.formatMessage({
                id: 'login_required_warning',
                defaultMessage: 'login_required_warning',
              }),
            );
          }
        }}>
        <QuestionIcon fill={routeName == 'question' ? '#FF8170' : '#4D4A48'} />
        <Text
          className={`${
            routeName == 'question' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('ask_question')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => {
          if (isLoggedIn && !isGuest) {
            navigation.navigate('offer');
          } else {
            toast(
              intl.formatMessage({
                id: 'login_required_warning',
                defaultMessage: 'login_required_warning',
              }),
            );
          }
        }}>
        <OfferIcon fill={routeName == 'offer' ? '#FF8170' : '#4D4A48'} />
        <Text
          className={`${
            routeName == 'offer' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('take_offer')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => navigation.navigate('package')}>
        <BuyIcon fill={routeName == 'package' ? '#FF8170' : '#4D4A48'} />
        <Text
          className={`${
            routeName == 'package' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('packages')}
        </Text>
      </Pressable>

      <Pressable
        className="items-center space-y-1"
        onPress={() => {
          if (isLoggedIn && !isGuest) {
            navigation.navigate('appointment');
          } else {
            toast(
              intl.formatMessage({
                id: 'login_required_warning',
                defaultMessage: 'login_required_warning',
              }),
            );
          }
        }}>
        <AppointmentIcon
          fill={routeName == 'appointment' ? '#FF8170' : '#4D4A48'}
        />
        <Text
          className={`${
            routeName == 'appointment' ? 'text-customOrange' : 'text-customGray'
          } font-poppinsMedium text-xxs `}>
          {IntLabel('appointment')}
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomTab;
