import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import NotificationComp from '../../components/NotificationComp';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';

const UserNotification = () => {
  const {user} = useSelector((state: any) => state.user);
  const {Post, loading} = WebClient();
  const [notifications, setNotifications] = useState<any>();
  const [clicked, setClicked] = useState<any>(false);

  useEffect(() => {
    Post('/api/Notification/GetNotificationsByUserID', {
      userID: user?.id,
      languageId: 1,
    }).then(res => {
      setNotifications(res.data.object);
    });

    setClicked(false);
  }, [clicked]);

  return (
    <UserWrapper title="Bildirimler" showBellIcon>
      <HandleData
        data={notifications}
        title={'Bildiriminiz Bulunmamaktadır'}
        loading={loading}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15}}
          data={notifications}
          renderItem={({item}) => (
            <NotificationComp item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserNotification;
