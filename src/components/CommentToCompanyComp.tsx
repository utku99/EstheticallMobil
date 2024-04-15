import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import CustomInputs from './CustomInputs';
import LikeIcon from '../assets/svg/common/LikeIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import LinearGradient from 'react-native-linear-gradient';
import SeeAllArrow from '../assets/svg/homepages/SeeAllArrow';
import {SIZES} from '../constants/constants';
import LikeUnlikeComp from './LikeUnlikeComp';
import IntLabel from './IntLabel';

const CommentToCompanyComp = ({item}: any) => {
  const [seeAll, setSeeAll] = useState(false);

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-4`}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="flex-row items-center space-x-3">
        <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.userLogo}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="space-y-2  flex-1">
          <View className="flex-row items-center justify-between ">
            <View className=" ">
              <Text
                numberOfLines={1}
                className="text-customGray  text-xs font-poppinsSemiBold">
                {item?.userFullName}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-xs">
                {item?.userLocation}
              </Text>
            </View>
            <View className="">
              <CustomInputs
                type="rating"
                value={Number(item?.commentPoint) / 20}
              />
            </View>
          </View>

          <View className="flex-row items-center justify-between ">
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xxs w-[30%] ">
              {item?.date}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xxs  flex-1   pl-3">
              {IntLabel('operation')}: {item?.serviceName}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-xs font-poppinsSemiBold  text-customGray">
        {item?.subject}
      </Text>

      <View>
        <Text
          className={`text-xs font-poppinsRegular text-customGray ${
            seeAll
              ? 'h-fit'
              : item?.content?.length > 400
              ? 'h-[130px]'
              : 'h-fit'
          }`}>
          {item?.content}
        </Text>
        {!seeAll && item?.content?.length > 400 && (
          <LinearGradient
            colors={['rgba(255, 255, 255,  0.44)', 'rgba(255, 255, 255,1)']}
            className=" h-[50px] absolute w-full bottom-0 items-center justify-center">
            <Pressable onPress={() => setSeeAll(true)}>
              <SeeAllArrow />
            </Pressable>
          </LinearGradient>
        )}
      </View>

      {/* doctor */}
      <View className="space-y-2">
        <Text className="text-base font-poppinsRegular text-customGray">
          {IntLabel('performing_the_operation')}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{uri: item?.doctorLogo}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="w-[40%]">
            <Text
              numberOfLines={1}
              className="text-customGray font-poppins text-xs font-poppinsSemiBold">
              {item?.nameWithTitle}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xs">
              {item?.doctorBranch}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xs">
              {item?.doctorLocation}
            </Text>
          </View>
          <View className="items-center ">
            <Text className="text-customGray font-poppinsRegular text-xs">
              {item?.doctorPoint.split('.')[0] / 20}/5
            </Text>
            <Text className="text-customGray font-poppinsRegular text-xs">
              {IntLabel('comments')}
            </Text>
          </View>
          <View className="items-center space-y-2">
            <ShareIcon />
            <View>
              <LikeUnlikeComp
                item={item}
                readOnly
                isFavorite={item?.isFavorite}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentToCompanyComp;
