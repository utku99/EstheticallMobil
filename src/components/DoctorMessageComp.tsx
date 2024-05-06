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
          className={`flex-col items-end self-end max-w-[70%] w-fit space-y-1`}>
          <View className="space-y-1">
            {item?.image0 &&
              item?.image0 != 'NoImage' &&
              !item?.image0.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image0}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image1 &&
              item?.image1 != 'NoImage' &&
              !item?.image1.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image1}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image2 &&
              item?.image2 != 'NoImage' &&
              !item?.image2.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image2}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image3 &&
              item?.image3 != 'NoImage' &&
              !item?.image3.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image3}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image4 &&
              item?.image4 != 'NoImage' &&
              !item?.image4.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image4}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
          </View>

          {item?.message != '' && (
            <Text className="text-customGray font-poppinsRegular text-xs break-all border border-customLightGray bg-white rounded-lg rounded-tr-none  py-2 px-4 ">
              {item?.message}
            </Text>
          )}
          <Text className="text-customGray font-poppinsRegular text-xxs self-end">
            {item?.createdDate}
          </Text>
        </View>
      ) : (
        <View
          className={`flex-col items-end self-start max-w-[70%] w-fit space-y-1`}>
          <View className="space-y-1">
            {item?.image0 &&
              item?.image0 != 'NoImage' &&
              !item?.image0.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image0}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image1 &&
              item?.image1 != 'NoImage' &&
              !item?.image1.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image1}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image2 &&
              item?.image2 != 'NoImage' &&
              !item?.image2.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image2}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image3 &&
              item?.image3 != 'NoImage' &&
              !item?.image3.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image3}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
            {item?.image4 &&
              item?.image4 != 'NoImage' &&
              !item?.image4.includes('trno') && (
                <View className="w-[100px] h-[100px] self-end">
                  <Image
                    source={{uri: item?.image4}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
              )}
          </View>

          {item?.message != '' && (
            <Text className="text-customGray font-poppinsRegular text-xs self-start break-all border border-customLightGray bg-white rounded-lg rounded-tr-none  py-2 px-4 ">
              {item?.message}
            </Text>
          )}

          <Text className="text-customGray font-poppinsRegular text-xxs ">
            {item?.createdDate}
          </Text>
        </View>
      )}
    </>
  );
};

export default DoctorMessageComp;
