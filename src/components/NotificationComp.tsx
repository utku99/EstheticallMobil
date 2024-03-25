import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import TrashIcon from '../assets/svg/userMenu/TrashIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import WebClient, {toast} from '../utility/WebClient';
import {useSelector} from 'react-redux';
import moment from 'moment';

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
          <View className=" flex-1">
            <View className="flex-row justify-between items-center">
              <Text
                numberOfLines={1}
                className="text-customGray font-poppins text-sm font-bold flex-shrink">
                {item?.title}
              </Text>
              <Text className="text-customGray font-poppins text-xs">
                {moment(item?.createdDate, 'DD.MM.YYYY hh:mm:ss').format(
                  'DD.MM.YYYY hh:mm',
                )}
              </Text>
            </View>
            <Text className="text-customGray font-poppins text-sm">
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
          className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-3`}
          style={{width: SIZES.width * 0.95}}>
          <View className="flex-row items-center space-x-3">
            <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: item?.logo}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View>
              <Text className="text-customGray font-poppins text-xs font-bold">
                {item?.nameWithTitle}
              </Text>
              <Text className="text-customGray font-poppins text-xs">
                {item?.doctorBranch}
              </Text>
              <Text className="text-customGray font-poppins text-xs">
                {item?.doctorLocation}
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-customGray font-poppins text-xs">
                {/* {item?.commentsPoint.split('/')[0] / 20}/5 */}
              </Text>
              <Text className="text-customGray font-poppins text-xs">
                Yorumlar
              </Text>
            </View>
            <View className="items-center space-y-1">
              <ShareIcon />
              <LikeIcon />
            </View>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-customGray font-poppins text-sm">
              Erkan Vural size yeni bir mesaj gönderdi.
            </Text>
            <TrashIcon />
          </View>
        </View>
      )}
    </>
  );
};

export default NotificationComp;
