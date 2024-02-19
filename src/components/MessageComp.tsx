import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES} from '../constants/constants';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import {useNavigation} from '@react-navigation/native';
import BlueTick from '../assets/svg/common/BlueTick';

const MessageComp = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('usermessage')}
      className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3 `}
      style={{width: SIZES.width * 0.95}}>
      <View className="relative">
        <Image
          source={require('../assets/images/authBg/auth.jpg')}
          className=" w-[80px] h-[80px] rounded-full border-[0.6px] border-customGray"
          resizeMode="cover"
        />
        <View className="absolute right-0 bg-white rounded-full">
          <BlueTick width={20} height={20} />
        </View>
      </View>
      <View className="flex-1">
        <Text className="text-customGray font-poppinsSemiBold text-sm ">
          Prof. Dr. Erkan Vural
        </Text>
        <Text className="text-customGray font-poppinsRegular text-sm">
          TR, İstanbul, Ataşehir
        </Text>
      </View>
      <NotificationIcon />
    </TouchableOpacity>
  );
};

export default MessageComp;
