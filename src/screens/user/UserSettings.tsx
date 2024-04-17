import {View, Text, Switch} from 'react-native';
import React from 'react';
import UserWrapper from './UserWrapper';
import DocumentIcon from '../../assets/svg/userMenu/DocumentIcon';
import HelpIcon from '../../assets/svg/userMenu/HelpIcon';
import SecurityIcon from '../../assets/svg/userMenu/SecurityIcon';
import AboutIcon from '../../assets/svg/userMenu/AboutIcon';
import LangChoiceComp from '../../components/LangChoiceComp';
import IntLabel from '../../components/IntLabel';

const UserSettings = () => {
  return (
    <UserWrapper title="Ayarlar">
      <View className="space-y-8  w-[75%]">
        <Text className="font-poppinsMedium  text-center text-base text-customGray">
          {IntLabel('notifications')}
        </Text>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray">
            {IntLabel('messages')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('offers')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('appointments')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('favorites')}
          </Text>
          <Switch thumbColor={'#FF8170'} value={false} onChange={() => ''} />
        </View>
        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('lang_selection')}
          </Text>
          <LangChoiceComp />
        </View>
      </View>

      <View className="flex-row items-center space-x-4 mt-8 ">
        <View className="space-y-4">
          <View className="flex-row items-center space-x-2">
            <DocumentIcon />
            <Text className=" text-base text-customGray font-sans ">
              {IntLabel('terms_of_use')}{' '}
            </Text>
          </View>

          <View className="flex-row items-center space-x-2">
            <SecurityIcon />
            <Text className=" text-base text-customGray font-sans">
              {IntLabel('privacy_policy')}{' '}
            </Text>
          </View>
        </View>

        <View className="space-y-4">
          <View className="flex-row items-center space-x-2">
            <HelpIcon />
            <Text className=" text-base text-customGray font-sans">
              {IntLabel('help')}{' '}
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <AboutIcon />
            <Text className=" text-base text-customGray font-sans">
              {IntLabel('about_us')}{' '}
            </Text>
          </View>
        </View>
      </View>
    </UserWrapper>
  );
};

export default UserSettings;
