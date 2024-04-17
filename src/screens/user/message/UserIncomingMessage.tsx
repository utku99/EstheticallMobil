import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import HandleData from '../../../components/HandleData';
import MessageComp from '../../../components/MessageComp';
import {useSelector} from 'react-redux';
import WebClient from '../../../utility/WebClient';
import {useNavigation} from '@react-navigation/native';
import IntLabel from '../../../components/IntLabel';

const UserIncomingMessage = () => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const {connection, message, connectionId, totalUsers} = useSelector(
    (state: any) => state.hub,
  );

  useEffect(() => {
    if (connectionId) {
      Post('/api/Chatting/GetUserMessageSenders', {
        roomID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        companyID: 0,
        companyOfficeID: 0,
        userID: user?.id,
      }).then(res => setUsers(res.data.object));

      connection.invoke('LoginMessageHub', {UserID: user?.id, TypeID: 1});
    } else {
      navigation.navigate('sharing');
    }

    return () => {
      connection.invoke('LeaveRoom');
    };
  }, []);

  return (
    <UserWrapper title={IntLabel('messages')}>
      <HandleData
        data={users}
        title={IntLabel('warning_no_active_record')}
        loading={loading}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15}}
          data={users}
          renderItem={({item}) => <MessageComp item={item} />}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserIncomingMessage;
