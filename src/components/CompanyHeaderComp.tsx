import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import LikeUnlikeComp from './LikeUnlikeComp';
import IntLabel from './IntLabel';
import {useNavigation} from '@react-navigation/native';
import BlueTick from '../assets/svg/common/BlueTick';
import CustomInputs from './CustomInputs';

interface props {
  item?: any;
  style?: any;
  companyId: number;
  officeId: number;
  isFavorite: boolean;
  isApproved: boolean;
  rating: any;
  setClicked?: any;
}

const CompanyHeaderComp: React.FC<props> = ({
  item,
  style,
  companyId,
  officeId,
  isApproved,
  isFavorite,
  rating,
  setClicked,
}) => {
  const navigation = useNavigation();

  const handleTableId = () => {
    if (officeId == 0) {
      return companyId;
    } else {
      return officeId;
    }
  };

  const handleTypeId = () => {
    if (officeId == 0) {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <View
      style={style}
      className={` bg-white flex-row items-center justify-between `}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('firmprofile', {
            companyId: companyId,
            companyOfficeId: officeId,
          })
        }
        className="flex-row items-center space-x-2 w-[65%] ">
        <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{
              uri:
                item?.logo ??
                item?.image ??
                item?.companyLogo ??
                item?.doctorLogo ??
                item?.picture,
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
              {item?.companyName ??
                item?.name ??
                item?.nameWithTitle ??
                item?.doctorName ??
                item?.fullNameWithTitle}
            </Text>
            {isApproved && <BlueTick />}
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
            {item?.location ?? item?.companyLocation ?? item?.doctorLocation}
          </Text>
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

      <LikeUnlikeComp
        setClicked={setClicked}
        isFavorite={isFavorite}
        tableId={handleTableId()}
        typeId={handleTypeId()}
      />
    </View>
  );
};

export default CompanyHeaderComp;
