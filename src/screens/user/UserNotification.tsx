import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import NotificationComp from '../../components/NotificationComp';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import IntLabel from '../../components/IntLabel';

const UserNotification = () => {
  const {user, language} = useSelector((state: any) => state.user);
  const {Post, loading} = WebClient();
  const [notifications, setNotifications] = useState<any>();
  const [clicked, setClicked] = useState<any>(false);

  useEffect(() => {
    Post('/api/Notification/GetNotificationsByUserID', {
      userID: user?.id,
      languageId: language?.type ?? 1,
    }).then(res => {
      setNotifications(res.data.object);
    });

    setClicked(false);
  }, [clicked, language]);

  return (
    <UserWrapper title={IntLabel('notifications')} showBellIcon>
      <HandleData
        data={notifications}
        title={IntLabel('warning_no_active_record')}
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
