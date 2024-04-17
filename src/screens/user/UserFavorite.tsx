import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import DoctorComp from '../../components/DoctorComp';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import {FlatList} from 'react-native';
import IntLabel from '../../components/IntLabel';

const UserFavorite = () => {
  const [userFavorites, setUserFavorites] = useState<any>([]);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/User/UserMyFavorites', {
      userID: user?.id,
    }).then(res => {
      setUserFavorites(res.data.object);
    });
  }, []);

  return (
    <UserWrapper title="Favoriler">
      <HandleData
        data={userFavorites}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={userFavorites}
          renderItem={({item}) => <DoctorComp item={item} readOnly />}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserFavorite;
