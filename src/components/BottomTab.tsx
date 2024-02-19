import {Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {Component} from 'react';
import HomeIcon from '../assets/svg/bottomTab/HomeIcon';
import QuestionIcon from '../assets/svg/bottomTab/QuestionIcon';
import AppointmentIcon from '../assets/svg/bottomTab/AppointmentIcon';
import BuyIcon from '../assets/svg/bottomTab/BuyIcon';
import OfferIcon from '../assets/svg/bottomTab/OfferIcon';

export class BottomTab extends Component {
  render() {
    const {navigation, insets}: any = this.props;

    return (
      <View
        className={`bg-[#F9F9F9]/[.94]  h-[${
          70 + insets.bottom
        }] flex-row items-center justify-between px-[3%] border-t border-customGray/[.3] pb-[${
          insets.bottom
        }px]`}>
        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('sharing')}>
          <HomeIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Ana Sayfa
          </Text>
        </Pressable>

        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('question')}>
          <QuestionIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Soru Sor
          </Text>
        </Pressable>

        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('offer')}>
          <OfferIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Tekfil Al
          </Text>
        </Pressable>

        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('package')}>
          <BuyIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Paketler
          </Text>
        </Pressable>

        <Pressable
          className="items-center space-y-1"
          onPress={() => navigation.navigate('appointment')}>
          <AppointmentIcon />
          <Text className="font-poppinsMedium text-xxs text-customGray">
            Randevu
          </Text>
        </Pressable>
      </View>
    );
  }
}

export default BottomTab;
