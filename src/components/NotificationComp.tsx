import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES, viewedType} from '../constants/constants';
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

interface props {
  item?: any;
  setClicked?: any;
}

const NotificationComp: React.FC<props> = ({item, setClicked}) => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);

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
          className={` border ${
            item?.isRead ? 'border-customLightGray' : 'border-customOrange'
          }  rounded-xl bg-white p-[10px] space-y-3 `}
          style={{width: SIZES.width * 0.95}}>
          <CompanyHeaderComp
            item={item}
            rating={parseFloat(item?.companyPoint) / 20}
            companyId={item?.companyID}
            officeId={item?.companyOfficeID}
            isFavorite={item?.isCompanyFavorite}
            setClicked={setClicked}
            isApproved={item?.isApprovedAccount}
          />

          <View className="flex-row items-center justify-between">
            <Text
              onPress={() => {
                Post('/api/Common/InsertView', {
                  id: item?.userPushNotificationId,
                  isActive: true,
                  typeID: viewedType.notification,
                  userID: user?.id ?? 0,
                }).then(() => {
                  setClicked(true);
                });
              }}
              className="text-customGray font-poppins text-sm  flex-1">
              {item?.content}
            </Text>
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
