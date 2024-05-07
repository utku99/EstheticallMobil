import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import LikeUnlikeComp from './LikeUnlikeComp';
import IntLabel from './IntLabel';
import {useNavigation} from '@react-navigation/native';
import BlueTick from '../assets/svg/common/BlueTick';

interface props {
  item?: any;
  setClicked?: any;
  readOnly?: boolean;
}

const DoctorComp: React.FC<props> = ({item, setClicked, readOnly}) => {
  const navigation = useNavigation();

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center justify-between`}
      style={{width: SIZES.width * 0.95}}>
      <Pressable
        onPress={() =>
          navigation.navigate('firmprofile', {
            companyId: item?.companyID,
            companyOfficeId: item?.companyOfficeID,
          })
        }
        className="flex-row items-center space-x-2 w-[65%] ">
        <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.logo}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="space-y-1  flex-shrink">
          <View className="flex-row items-center space-x-1">
            <Text
              numberOfLines={1}
              className="text-customGray text-xs font-poppinsSemiBold ">
              {item?.nameWithTitle ?? item?.name}
            </Text>
            {item?.isApprovedAccount && <BlueTick />}
          </View>
          {(item?.companyBranch ?? item?.doctorBranch) && (
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsRegular">
              {item?.companyBranch ?? item?.doctorBranch}
            </Text>
          )}
          <Text
            numberOfLines={1}
            className="text-customGray  text-xs font-poppinsRegular">
            {item?.location ?? item?.companyLocation}
          </Text>
        </View>
      </Pressable>

      <View className="items-center ">
        <Text className="text-customGray font-poppinsRegular text-xs">
          {(item?.point?.split('/')[0] ?? item?.companyPoint) / 20}/5
        </Text>
        <Text className="text-customGray font-poppinsRegular text-xs">
          {IntLabel('comments')}
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
