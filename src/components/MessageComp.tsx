import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES} from '../constants/constants';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import {useNavigation} from '@react-navigation/native';
import BlueTick from '../assets/svg/common/BlueTick';
import {useSelector} from 'react-redux';
import IntLabel from './IntLabel';

const MessageComp = ({item}: any) => {
  const navigation = useNavigation<any>();
  const {connection} = useSelector((state: any) => state.hub);
  const {user} = useSelector((state: any) => state.user);

  const messagesType: any = [
    {value: 1, label: IntLabel('question')},
    {value: 2, label: IntLabel('offer')},
    {value: 3, label: IntLabel('packet')},
    {value: 4, label: IntLabel('general_question')},
  ];

  return (
    <TouchableOpacity
      onPress={() => {
        connection.invoke('LeaveRoom');
        connection.invoke('JoinRoom', {
          RoomID: item.roomID,
          sender_id: user?.id,
          sender_type: 1,
          receiver_id: item.correspondentID,
          receiver_type: item.correspondentType,
        });
        navigation.navigate('usermessage', {selectedUser: item});
      }}
      className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3 `}
      style={{width: SIZES.width * 0.95}}>
      <View className="relative">
        <Image
          source={{uri: item?.correspondentLogo ?? ''}}
          className=" w-[80px] h-[80px] rounded-full border-[0.6px] border-customGray"
          resizeMode="cover"
        />
        {/* <View className="absolute right-0 bg-white rounded-full">
          <BlueTick width={20} height={20} />
        </View> */}
      </View>
      <View className="flex-1">
        <Text className="text-customGray font-poppinsSemiBold text-sm ">
          {item?.correspondentName}
        </Text>
        <Text
          numberOfLines={1}
          className="text-customGray font-poppinsSemiBold text-sm ">
          {IntLabel('message_type')}:{' '}
          <Text className="font-poppinsMedium">
            {
              messagesType.find((type: any) => type.value == item.messagesType)
                .label
            }
          </Text>
        </Text>
        <Text
          numberOfLines={1}
          className="text-customGray font-poppinsRegular text-sm">
          {item?.message}
        </Text>
      </View>
      <Text className="text-customGray font-medium text-sm ">
        {item?.createdDate}
      </Text>
      {/* <NotificationIcon /> */}
    </TouchableOpacity>
  );
};

export default MessageComp;
