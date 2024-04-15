import {View, Text} from 'react-native';
import React from 'react';
import CustomButtons from './CustomButtons';
import {SIZES} from '../constants/constants';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import CustomInputs from './CustomInputs';
import WebClient from '../utility/WebClient';
import IntLabel from './IntLabel';

const OfferRequestComp = ({item, setClicked, setSelectedRequest}: any) => {
  const {Post} = WebClient();

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-3`}
      style={{width: SIZES.width * 0.95}}>
      <View className="flex-row items-center justify-between">
        <View className="">
          <Text className="text-customGray  text-sm font-poppinsMedium ">
            {IntLabel('offer_id')}:{' '}
          </Text>
          <Text className="text-customGray text-sm font-poppinsRegular">
            {item?.offerID}
          </Text>
        </View>
        <NotificationIcon />
        <View className="">
          <Text className="text-customGray  text-sm font-poppinsMedium ">
            {IntLabel('date')}:{' '}
          </Text>
          <Text className="text-customGray text-sm font-poppinsRegular">
            {item?.createdDate}
          </Text>
        </View>
      </View>

      <View className="">
        <Text className="text-customGray  text-sm font-poppinsMedium ">
          {IntLabel('location')}:{' '}
        </Text>
        <Text className="text-customGray text-sm font-poppinsRegular">
          {item?.location}
        </Text>
      </View>

      <View>
        <Text className="text-customGray  text-sm font-poppinsMedium ">
          {IntLabel('operations')}:{' '}
        </Text>
        <Text className="text-customGray text-sm font-poppinsRegular">
          {item?.serviceName}
        </Text>
      </View>

      <View>
        <Text className="text-customGray  text-sm font-poppinsMedium ">
          {IntLabel('offer_date_range')}:{' '}
        </Text>
        <Text className="text-customGray text-sm font-poppinsRegular">
          {item?.dateInterval}
        </Text>
      </View>

      <View>
        <Text className="text-customGray  text-sm font-poppinsMedium ">
          {IntLabel('special_services')}:{' '}
        </Text>
        <View className="flex-row items-center justify-between ">
          <CustomInputs
            type="checkbox"
            title={IntLabel('transport')}
            value={item?.extraServices.some((item: number) => item === 1)}
          />
          <CustomInputs
            type="checkbox"
            title={IntLabel('accomodation')}
            value={item?.extraServices.some((item: number) => item === 2)}
          />
          <CustomInputs
            type="checkbox"
            title={IntLabel('companion')}
            value={item?.extraServices.some((item: number) => item === 3)}
          />
        </View>
      </View>

      <View
        style={{width: SIZES.width}}
        className="h-[1px] bg-customLightGray self-center"></View>

      <Text className="text-customGray font-poppinsRegular text-lg text-center mb-3">
        {IntLabel('incoming_offer')}:{' '}
        <Text className="font-poppinsSemiBold text-customGray">
          {item?.incomingOffersCount?.split('-')[0]} -
        </Text>
        <Text className="font-poppinsSemiBold text-customOrange">
          {item?.incomingOffersCount?.split('-')[1]}
        </Text>
      </Text>

      <View className="flex-row items-center justify-center mb-3 space-x-3">
        <CustomButtons
          type="outlined"
          label={IntLabel('delete')}
          onPress={() => {
            Post('/api/Offers/DeleteRequestedOffer', {
              offerID: item?.offerID,
            }).then((res: any) => {
              if (res.data.code === '100') {
                setClicked(true);
              }
            });
          }}
        />
        <CustomButtons
          type="solid"
          label={IntLabel('review_offers')}
          onPress={() => setSelectedRequest(item)}
        />
      </View>
    </View>
  );
};

export default OfferRequestComp;
