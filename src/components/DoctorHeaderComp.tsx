import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import LikeUnlikeComp from './LikeUnlikeComp';
import IntLabel from './IntLabel';
import {useNavigation} from '@react-navigation/native';
import BlueTick from '../assets/svg/common/BlueTick';
import CustomInputs from './CustomInputs';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import Share from 'react-native-share';
import FastImage from 'react-native-fast-image';

interface props {
  item?: any;
  style?: any;
  companyId: number;
  officeId: number;
  doctorId: number;
  isFavorite: boolean;
  isApproved: boolean;
  rating: any;
  setClicked?: any;
  showShareIcon?: boolean;
}

const DoctorHeaderComp: React.FC<props> = ({
  item,
  style,
  companyId,
  officeId,
  doctorId,
  isApproved,
  isFavorite,
  rating,
  setClicked,
  showShareIcon = false,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View
      style={style}
      className={` bg-white flex-row items-center justify-between`}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('firmdoctors', {
            companyId: companyId,
            companyOfficeId: officeId,
            doctorId: doctorId,
          });
        }}
        className="flex-row items-center space-x-2 w-[65%] ">
        <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <FastImage
            source={{
              uri:
                item?.doctorLogo ??
                item?.doctor?.logo ??
                item?.logo ??
                item?.image ??
                item?.picture ??
                item?.headerModel?.picture ??
                item?.doctor?.doctorLogo,
            }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="space-y-1  flex-shrink">
          <View className="flex-row items-center space-x-1">
            <Text
              numberOfLines={1}
              className="text-customGray text-xs font-poppinsSemiBold ">
              {item?.doctor?.doctorName ??
                item?.doctorName ??
                item?.name ??
                item?.nameWithTitle ??
                item?.fullNameWithTitle ??
                item.headerModel?.fullNameWithTitle ??
                item?.doctor?.doctorNameWithTitle}
            </Text>
            {isApproved && <BlueTick />}
          </View>
          <Text
            numberOfLines={1}
            className="text-customGray text-xs font-poppinsRegular">
            {item?.doctorBranch ??
              item.headerModel?.doctorBranch ??
              item?.doctor?.doctorBranch}
          </Text>
          {(item?.location ??
            item?.doctor?.location ??
            item?.doctorLocation ??
            item?.doctor?.doctorLocation) && (
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsRegular">
              {item?.location ??
                item?.doctorLocation ??
                item?.doctor?.location ??
                item?.doctor?.doctorLocation}
            </Text>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('firmcomments', {
            companyId: companyId,
            companyOfficeId: officeId,
          });
        }}
        className="items-center">
        <Text className="text-customGray font-poppinsRegular text-xs mb-1">
          {IntLabel('comments')}
        </Text>
        <CustomInputs type="rating" value={rating} readonly />
      </TouchableOpacity>

      <View>
        {showShareIcon && (
          <TouchableOpacity
            onPress={() => {
              Share.open({
                url: `https://dev.estheticall.com/yorum/${item?.commentID}`,
              });
            }}
            className="mb-2">
            <ShareIcon />
          </TouchableOpacity>
        )}
        <LikeUnlikeComp
          isFavorite={isFavorite}
          tableId={doctorId}
          typeId={1}
          setClicked={setClicked}
        />
      </View>
    </View>
  );
};

export default DoctorHeaderComp;
