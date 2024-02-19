import {View, Text, Image} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import LikeUnlikeComp from './LikeUnlikeComp';

interface props {
  item?: any;
  setClicked?: any;
  readOnly?: boolean;
}

const DoctorComp: React.FC<props> = ({item, setClicked, readOnly}) => {
  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center justify-between`}
      style={{width: SIZES.width * 0.95}}>
      <View className="flex-row items-center space-x-2 w-[65%] ">
        <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.logo}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="space-y-1  flex-shrink">
          <Text
            numberOfLines={1}
            className="text-customGray text-xs font-poppinsSemiBold ">
            {item?.nameWithTitle ?? item?.name}
          </Text>
          {(item?.doctorBranch ?? item?.branch) && (
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsRegular">
              {item?.doctorBranch ?? item?.branch}
            </Text>
          )}
          <Text
            numberOfLines={1}
            className="text-customGray  text-xs font-poppinsRegular">
            {item?.doctorLocation ?? item?.location}
          </Text>
        </View>
      </View>

      <View className="items-center ">
        <Text className="text-customGray font-poppinsRegular text-xs">
          {(item?.commentsPoint?.split('/')[0] ?? item?.point) / 20}/5
        </Text>
        <Text className="text-customGray font-poppinsRegular text-xs">
          Yorumlar
        </Text>
      </View>
      <LikeUnlikeComp
        item={item}
        setClicked={setClicked}
        readOnly={readOnly}
        isFavorite={item?.isFavorite}
      />
    </View>
  );
};

export default DoctorComp;
