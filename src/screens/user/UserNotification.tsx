import {View, Text, FlatList} from 'react-native';
import React from 'react';
import UserWrapper from './UserWrapper';
import NotificationComp from '../../components/NotificationComp';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';

const UserNotification = () => {
  const {Post, loading} = WebClient();
  return (
    <UserWrapper title="Bildirimler" showBellIcon>
      <HandleData
        data={['', '', '']}
        loading={loading}
        title="Bildirim Bulunamadı">
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={['', '']}
          renderItem={({item}) => <NotificationComp />}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserNotification;
