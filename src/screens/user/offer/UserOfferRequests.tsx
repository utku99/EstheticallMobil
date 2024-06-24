import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import UserWrapper from '../UserWrapper';
import CustomButtons from '../../../components/CustomButtons';
import IntLabel from '../../../components/IntLabel';
import {useNavigation, useRoute} from '@react-navigation/native';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../../components/HandleData';
import OfferRequestComp from '../../../components/OfferRequestComp';

const UserOfferRequests = () => {
  const navigation = useNavigation<any>();
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const flatlistRef = useRef<any>();
  const route = useRoute<any>();

  const [offerRequests, setOfferRequests] = useState<any>([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/Offers/CurrentOffers', {
      userID: user?.id,
    }).then(res => {
      if (res.data.code === '100') {
        setOfferRequests(res.data.object);
      }
    });

    if (clicked) {
      setClicked(false);
    }
  }, [clicked]);

  useEffect(() => {
    if (route.params?.id && offerRequests.length > 0) {
      let index = offerRequests.findIndex(
        (item: any) => item.offerID == route.params?.id,
      );

      if (index !== -1 && index < offerRequests?.length) {
        setTimeout(() => {
          flatlistRef.current.scrollToIndex({
            animated: true,
            index: index,
          });
        }, 100);
      }
    }
  }, [offerRequests]);

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
        data={offerRequests}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          ref={flatlistRef}
          contentContainerStyle={{
            display: 'flex',
            gap: 15,
            paddingBottom: 20,
          }}
          data={offerRequests}
          renderItem={({item, index}) => (
            <OfferRequestComp
              key={index}
              item={item}
              setClicked={setClicked}
              id={route.params?.id ?? 0}
            />
          )}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              flatlistRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserOfferRequests;
