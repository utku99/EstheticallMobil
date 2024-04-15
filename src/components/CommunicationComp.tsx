import {View, Text, Image} from 'react-native';
import React from 'react';
import {SIZES} from '../constants/constants';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import CustomButtons from './CustomButtons';
import FirmInfoLocationIcon from '../assets/svg/homepages/FirmInfoLocationIcon';
import PhoneIcon from '../assets/svg/homepages/PhoneIcon';
import {useNavigation} from '@react-navigation/native';
import IntLabel from './IntLabel';

interface props {
  item: any;
}

const CommunicationComp = ({item}: props) => {
  const navigation = useNavigation();

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="flex-row  items-center p-[10px] space-x-2">
        <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.logo}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View>
          <Text
            numberOfLines={1}
            className="text-customGray text-xs font-poppinsSemiBold">
            {item?.name}
          </Text>
          <Text
            numberOfLines={1}
            className="text-customGray text-xs font-poppinsRegular">
            {item?.address}
          </Text>
        </View>
      </View>

      {/* map */}
      <View className="w-full h-[230px]">
        <MapView
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: Number(item.latitude),
            longitude: Number(item.longitude),
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
          className="w-full h-full">
          <Marker
            coordinate={{
              latitude: Number(item.latitude),
              longitude: Number(item.longitude),
            }}
          />
        </MapView>
      </View>

      <View className="p-[10px]">
        <View className="flex-row items-center space-x-2">
          <FirmInfoLocationIcon />
          <Text
            numberOfLines={2}
            className="text-customGray font-poppinsRegular text-xs ">
            {item?.address}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <PhoneIcon />
          <Text className="text-customGray font-poppinsRegular text-xs ">
            {item?.phoneNumber}
          </Text>
        </View>
      </View>

      <CustomButtons
        type="iconsolid"
        label={IntLabel('ask_question')}
        icon="question"
        style={{width: 130, alignSelf: 'center', marginBottom: 20}}
        onPress={() =>
          navigation.navigate('firmcommunicationquestion', {
            companyId: item.companyId,
            companyOfficeId: item.officeId,
          })
        }
      />
    </View>
  );
};

export default CommunicationComp;
