import {View, Text, FlatList, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import CustomButtons from '../../components/CustomButtons';
import HandleData from '../../components/HandleData';
import UserCommentComp from '../../components/UserCommentComp';
import OfferRequestComp from '../../components/OfferRequestComp';
import OfferComp from '../../components/OfferComp';
import BackIcon from '../../assets/svg/userMenu/BackIcon';
import IntLabel from '../../components/IntLabel';

const UserOffer = () => {
  const [activeTab, setActiveTab] = useState(1);

  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [myOffers, setMyOffers] = useState<any>([]);
  const [completedOffers, setCompletedOffers] = useState<any>([]);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/Offers/CurrentOffers', {
      userID: user?.id,
    }).then(res => {
      if (res.data.code === '100') {
        setMyOffers(res.data.object);
      }
    });

    Post('/api/Offers/CompletedOffersWeb', {
      userID: user?.id,
    }).then(res => {
      if (res.data.code === '100') {
        setCompletedOffers(res.data.object);
      }
    });

    setClicked(false);
  }, [clicked]);

  return (
    <UserWrapper>
      <View className="flex-row items-center mb-3 space-x-3">
        <CustomButtons
          type={activeTab == 1 ? 'brownsolid' : 'brownoutlined'}
          label={IntLabel('incoming_offers')}
          onPress={() => setActiveTab(1)}
        />
        <CustomButtons
          type={activeTab == 2 ? 'brownsolid' : 'brownoutlined'}
          label={IntLabel('my_completed_offers')}
          onPress={() => setActiveTab(2)}
        />
      </View>

      {selectedRequest && (
        <View className="flex-row items-center justify-between w-[80%] mb-3">
          <Text className="text-sm font-poppinsMedium text-customGray">
            {IntLabel('offer_id')}:{' '}
            <Text className="font-poppinsRegular">
              {selectedRequest?.offerID}
            </Text>{' '}
          </Text>
          <Text className="text-sm font-poppinsMedium text-customGray">
            {IntLabel('date')}:{' '}
            <Text className="font-poppinsRegular">
              {selectedRequest?.createdDate}
            </Text>{' '}
          </Text>
          {activeTab == 1 && (
            <Pressable onPress={() => setSelectedRequest(null)}>
              <BackIcon />
            </Pressable>
          )}
        </View>
      )}

      {!selectedRequest && activeTab == 1 && (
        <HandleData
          data={myOffers}
          loading={loading}
          title={'Talebiniz Bulunmamaktadır'}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={myOffers}
            renderItem={({item, index}) => (
              <OfferRequestComp
                key={index}
                item={item}
                setClicked={setClicked}
                setSelectedRequest={setSelectedRequest}
              />
            )}
          />
        </HandleData>
      )}
      {selectedRequest && activeTab == 1 && (
        <HandleData
          data={selectedRequest?.incomingOffers}
          loading={loading}
          title={'Talebinize Gelen Teklif Bulunamadı'}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={selectedRequest?.incomingOffers}
            renderItem={({item, index}) => (
              <OfferComp
                key={index}
                item={item}
                offerID={selectedRequest?.offerID}
              />
            )}
          />
        </HandleData>
      )}
      {activeTab == 2 && (
        <HandleData
          data={completedOffers}
          loading={loading}
          title={'Kabul Edilen Teklifiniz Bulunamadı'}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={completedOffers}
            renderItem={({item, index}) => (
              <OfferComp key={index} item={item} completed />
            )}
          />
        </HandleData>
      )}
    </UserWrapper>
  );
};

export default UserOffer;
