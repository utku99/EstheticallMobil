import {View, Text, Image} from 'react-native';
import React from 'react';
import {SIZES} from '../constants/constants';
import {useSelector} from 'react-redux';

const DoctorMessageComp = ({item}: any) => {
  const {user} = useSelector((state: any) => state.user);

  return (
    <>
      {item.senderId == user.id ? (
        <View
          className={`${
            item?.imageUrl && item.imageUrl != 'NoImage'
              ? 'border-none'
              : 'border bg-white'
          }   border-customLightGray rounded-xl rounded-tr-none  p-[10px] flex-row items-center self-end max-w-[70%]`}>
          {/* <View className="w-[40px] h-[40px] overflow-hidden rounded-full border-[0.6px] border-customGray self-start">
            <Image
              source={require('../assets/images/authBg/auth.jpg')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View> */}
          <View className="space-y-1">
            {item?.imageUrl && item.imageUrl != 'NoImage' ? (
              <View className="w-[100px] h-[100px] self-end">
                <Image
                  source={{uri: item?.imageUrl ?? item}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <Text className="text-customGray font-poppinsRegular text-xs">
                {item?.message}
              </Text>
            )}
            <Text className="text-customGray font-poppinsRegular text-xxs self-end">
              {item?.createdDate}
            </Text>
          </View>
        </View>
      ) : (
        <View
          className={`${
            item?.imageUrl && item.imageUrl != 'NoImage'
              ? 'border-none'
              : 'border bg-white'
          }    border-customLightGray rounded-xl rounded-tl-none  p-[10px] flex-row items-center self-start max-w-[70%]`}>
          {/* <View className="w-[40px] h-[40px] overflow-hidden rounded-full border-[0.6px] border-customGray self-start">
          <Image
            source={require('../assets/images/authBg/auth.jpg')}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View> */}
          <View className="space-y-1">
            {item?.imageUrl && item.imageUrl != 'NoImage' ? (
              <View className="w-[100px] h-[100px] ">
                <Image
                  source={{uri: item?.imageUrl ?? item}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <Text className="text-customGray font-poppinsRegular text-xs">
                {item?.message}
              </Text>
            )}
            <Text className="text-customGray font-poppinsRegular text-xxs ">
              {item?.createdDate}
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

export default DoctorMessageComp;
