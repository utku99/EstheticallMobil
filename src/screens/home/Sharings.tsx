import React, {useEffect, useState} from 'react';
import HomeWrapper from './HomeWrapper';
import SharingComp from '../../components/SharingComp';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {setListFilters} from '../../redux/slices/filter';
import HandleData from '../../components/HandleData';
import {OneSignal} from 'react-native-onesignal';
import IntLabel from '../../components/IntLabel';
import AdvertisementSharing from '../../components/AdvertisementSharing';

const Sharings = () => {
  const {Post, loading} = WebClient();
  const dispatch = useDispatch();
  const {user, language} = useSelector((state: any) => state.user);
  const {connection, connectionId} = useSelector((state: any) => state.hub);
  const [clicked, setClicked] = useState(false);

  const {
    country,
    city,
    town,
    institution,
    operation,
    suboperation,
    listFilters,
  } = useSelector((state: any) => state.filter);

  const [shareds, SetShareds] = useState<any>([]);

  OneSignal.initialize('36ba4e67-6a5f-4bae-9269-4ccdededab2d');

  OneSignal.Notifications.requestPermission(true);

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  useEffect(() => {
    Post('/api/Shared/GetSharedLists', {
      countryId: country?.value ?? 0,
      cityId: city?.value ?? 0,
      townId: town?.value ?? 0,
      companyType: institution?.value ?? 0,
      serviceId: operation?.value ?? 0,
      serviceSubId: suboperation?.value ?? 0,
      userId: user?.id ?? 0,
    }).then((res: any) => {
      SetShareds(res.data);
    });

    if (OneSignal.User.pushSubscription.getPushSubscriptionId()) {
      Post('/api/Notification/SendOneSignalID', {
        oneSignalID: OneSignal.User.pushSubscription.getPushSubscriptionId(),
        userID: user?.id,
        languageId: language?.type,
        companyID: 0,
        companyOfficeID: 0,
      }).then(res => {
        if (res.data.resultCode == '100') {
          console.log('player id sended');
        } else {
          console.log('no player id');
        }
      });
    }

    if (user && connection) {
      connection.invoke('LoginMessageHub', {UserID: user?.id, TypeID: 1});
    }

    dispatch(setListFilters(false));
    setClicked(false);
  }, [
    listFilters,
    clicked,
    OneSignal.User.pushSubscription.getPushSubscriptionId(),
    language,
  ]);

  return (
    <HomeWrapper>
      <HandleData
        data={shareds}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={shareds}
          initialNumToRender={3}
          renderItem={({item}) => (
            <SharingComp
              key={item.sharedID}
              item={item}
              onClickable
              setClicked={setClicked}
            />
            // <AdvertisementSharing />
          )}
        />
      </HandleData>
    </HomeWrapper>
  );
};

export default Sharings;
