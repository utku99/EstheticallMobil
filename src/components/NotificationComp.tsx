import {View, Text, Image} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import TrashIcon from '../assets/svg/userMenu/TrashIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';

interface props {
  item?: any;
}

const NotificationComp: React.FC<props> = ({item}) => {
  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-3`}
      style={{width: SIZES.width * 0.95}}>
      <View className="flex-row items-center space-x-3">
        <View className=" flex-row items-center space-x-2 w-[60%]">
          <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{
                uri: 'data:image/jpeg;base64,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',
              }}
              className="w-full h-full object-cover"
            />
          </View>
          <View className="flex-shrink">
            <Text
              numberOfLines={1}
              className="text-customGray text-xs font-poppinsSemiBold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae, incidunt.
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsRegular">
              Lorem, ipsum.
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsRegular">
              Lorem, ipsum.
            </Text>
          </View>
        </View>

        <View className="items-center flex-1">
          <Text className="text-customGray font-poppinsRegular text-xs">
            4.8/5
          </Text>
          <Text className="text-customGray font-poppinsRegular text-xs">
            Yorumlar
          </Text>
        </View>
        <View className="items-center space-y-1">
          <ShareIcon />
          <LikeIcon />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-customGray font-poppinsRegular text-sm">
          Erkan Vural size yeni bir mesaj gönderdi.
        </Text>
        <TrashIcon />
      </View>
    </View>
  );
};

export default NotificationComp;
