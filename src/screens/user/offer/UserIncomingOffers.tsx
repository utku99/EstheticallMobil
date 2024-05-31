import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import IntLabel from '../../../components/IntLabel';
import HandleData from '../../../components/HandleData';
import OfferComp from '../../../components/OfferComp';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import BackIcon from '../../../assets/svg/userMenu/BackIcon';
import {useNavigation} from '@react-navigation/native';

const UserIncomingOffers = ({route}: any) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [incomingOffers, setIncomingOffers] = useState<any>(null);
  const [clicked, setClicked] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    Post('/api/Offers/CurrentOffers', {
      userID: user?.id,
    }).then(res => {
      if (res.data.code === '100') {
        let temp = res.data.object.find(
          (item: any) => item.offerID == route.params.offerID,
        )?.incomingOffers;
        setIncomingOffers(temp);
      }
    });

    if (clicked) {
      setClicked(false);
    }
  }, [clicked]);

  return (
    <UserWrapper>
      <View className="flex-row items-center justify-between w-[80%] mb-3">
        <Text className="text-sm font-poppinsMedium text-customGray">
          {IntLabel('offer_id')}:{' '}
          <Text className="font-poppinsRegular">{route.params.offerID}</Text>{' '}
        </Text>
        <Text className="text-sm font-poppinsMedium text-customGray">
          {IntLabel('date')}:{' '}
          <Text className="font-poppinsRegular">
            {route.params?.createdDate}
          </Text>{' '}
        </Text>
        <Pressable onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>
      </View>

      <HandleData
        data={incomingOffers}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{
            display: 'flex',
            gap: 15,
            paddingBottom: 20,
          }}
          data={incomingOffers}
          renderItem={({item, index}) => (
            <OfferComp key={index} item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserIncomingOffers;
