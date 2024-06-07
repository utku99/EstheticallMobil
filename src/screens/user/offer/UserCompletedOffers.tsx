import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import UserWrapper from '../UserWrapper';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButtons from '../../../components/CustomButtons';
import IntLabel from '../../../components/IntLabel';
import WebClient from '../../../utility/WebClient';
import { useSelector } from 'react-redux';
import HandleData from '../../../components/HandleData';
import OfferComp from '../../../components/OfferComp';

const UserCompletedOffers = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { Post, } = WebClient();
  const { user } = useSelector((state: any) => state.user);
  const [completedOffers, setCompletedOffers] = useState<any>([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    Post('/api/Offers/CompletedOffersWeb', {
      userID: user?.id,
    }).then(res => {
      if (res.data.code === '100') {
        setCompletedOffers(res.data.object);
      }
    }).finally(() => {
      setLoading(false)
      setClicked(false);
    })

  }, [clicked]);

  return (
    <UserWrapper>
      <View className="flex-row items-center mb-3 space-x-3">
        <CustomButtons
          type={
            route.name == 'userofferrequests' ? 'brownsolid' : 'brownoutlined'
          }
          label={IntLabel('my_offer_requests')}
          onPress={() => navigation.navigate('userofferrequests')}
        />
        <CustomButtons
          type={
            route.name == 'usercompletedoffers' ? 'brownsolid' : 'brownoutlined'
          }
          label={IntLabel('my_completed_offers')}
          onPress={() => navigation.navigate('usercompletedoffers')}
        />
      </View>

      <HandleData
        data={completedOffers}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{
            display: 'flex',
            gap: 15,
            paddingBottom: 20,
          }}
          data={completedOffers}
          renderItem={({ item, index }) => (
            <OfferComp
              key={index}
              item={item}
              completed
              setClicked={setClicked}
            />
          )}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserCompletedOffers;
