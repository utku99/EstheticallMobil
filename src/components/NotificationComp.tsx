import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React, {useRef} from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import TrashIcon from '../assets/svg/userMenu/TrashIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import WebClient, {toast} from '../utility/WebClient';
import {useSelector} from 'react-redux';
import moment from 'moment';
import IntLabel from './IntLabel';
import UnLikeIcon from '../assets/svg/common/UnLikeIcon';
import CustomInputs from './CustomInputs';
import CompanyHeaderComp from './CompanyHeaderComp';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import NotificationIcon2 from '../assets/svg/userMenu/NotificationIcon2';
import IsReadNotificationIcon from '../assets/svg/userMenu/IsReadNotificationIcon';
import BlueTick from '../assets/svg/common/BlueTick';
import {NotificationsEnum, viewedType} from '../constants/enum';
import {useNavigation} from '@react-navigation/native';

interface props {
  item?: any;
  setClicked?: any;
}

const NotificationComp: React.FC<props> = ({item, setClicked}) => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation<any>();

  const handleClick = () => {
    if (item?.typeID == NotificationsEnum.UserMessage) {
      navigation.navigate('userincomingmessage', {id: item?.messageID});
    } else if (item?.typeID == NotificationsEnum.UserAppointment) {
      navigation.navigate('userappointment', {id: 1061});
    } else if (item?.typeID == NotificationsEnum.UserOffer) {
      navigation.navigate('userofferrequests', {id: item?.offerID});
    } else if (item?.typeID == NotificationsEnum.UserFavorites) {
      navigation.navigate('sharing', {id: item?.sharedID});
    }
  };

  return (
    <>
      {item?.companyID == 0 ? (
        <View
          className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center justify-between space-x-4`}
          style={{width: SIZES.width * 0.95}}>
          <View className=" flex-1 flex items-center flex-row  space-x-2">
            <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{
                  uri: item?.companyLogo,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-customGray font-poppins text-sm flex-shrink">
              {item?.content}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Post('/api/Notification/RemoveUserPushMessage', {
                userID: user?.id,
                userPushNotificationID: item?.userPushNotificationId,
              }).then(res => {
                if (res.data.resultCode == '100') {
                  toast(res.data.resultMessage);
                  setClicked(true);
                } else {
                  toast(res.data.resultMessage);
                }
              });
            }}>
            <TrashIcon />
          </TouchableOpacity>
        </View>
      ) : (
        <View
          className={`flex-row border ${'border-customLightGray'} rounded-xl bg-white p-[10px] space-x-3`}
          style={{width: SIZES.width * 0.95}}>
          <TouchableOpacity
            onPress={() => handleClick()}
            className="flex-1 flex-row items-center justify-between">
            {/* image */}
            <View className="relative w-[60px] h-[60px]">
              <View className="overflow-hidden rounded-full border-[0.6px] border-customGray ">
                <Image
                  source={{
                    uri: item?.companyLogo,
                  }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="absolute right-0 bg-white rounded-full">
                {item?.isApprovedAccount && <BlueTick />}
              </View>
            </View>

            {/* company info */}
            <View className="w-[37%] ">
              <Text
                numberOfLines={1}
                className="text-customGray text-xs font-poppinsSemiBold ">
                {item?.companyName}
              </Text>
              {item?.branch && (
                <Text
                  numberOfLines={1}
                  className="text-customGray  text-xs font-poppinsRegular">
                  {item?.branch}
                </Text>
              )}
              <Text
                numberOfLines={1}
                className="text-customGray  text-xs font-poppinsRegular">
                {item?.location}
              </Text>
            </View>

            {/* contents */}
            <View className="w-[37%] ">
              <Text
                numberOfLines={1}
                className="text-customGray text-xs font-poppinsSemiBold ">
                {item?.title}:
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray  text-xs font-poppinsRegular">
                {item?.content}
              </Text>
            </View>
          </TouchableOpacity>

          <View className="items-center space-y-2">
            <TouchableOpacity
              onPress={() => {
                Post('/api/Common/InsertView', {
                  id: item?.userPushNotificationId,
                  isActive: true,
                  typeID: viewedType.notification,
                  userID: user?.id,
                }).then(() => {
                  setClicked(true);
                });
              }}>
              <IsReadNotificationIcon
                fill={item?.isRead ? '#4D4A48' : '#FF8270'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Post('/api/Notification/RemoveUserPushMessage', {
                  userID: user?.id,
                  userPushNotificationID: item?.userPushNotificationId,
                }).then(res => {
                  if (res.data.resultCode == '100') {
                    toast(res.data.resultMessage);
                    setClicked(true);
                  } else {
                    toast(res.data.resultMessage);
                  }
                });
              }}>
              <TrashIcon />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default NotificationComp;
