import React, { useEffect, useRef, useState } from 'react';
import UserWrapper from './UserWrapper';
import SharingComp from '../../components/SharingComp';
import WebClient from '../../utility/WebClient';
import { useSelector } from 'react-redux';
import HandleData from '../../components/HandleData';
import { FlatList } from 'react-native';
import IntLabel from '../../components/IntLabel';
import { useIsFocused } from '@react-navigation/native';

const UserSaved = () => {
  const [userSaved, setUserSaved] = useState<any>([]);
  const { Post, } = WebClient();
  const { user } = useSelector((state: any) => state.user);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Post('/api/User/UserMySavedShareds', {
      userID: user?.id,
    }).then(res => {
      setUserSaved(res.data);
    }).finally(() => {
      setLoading(false)
      setClicked(false);
    })

  }, [clicked]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewCallBack = React.useCallback((viewableItems: any) => {
    setCurrentIndex(viewableItems?.viewableItems[0]?.index);
  }, []);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  const screenIsFocused = useIsFocused();

  return (
    <UserWrapper title="Kaydedilenler">
      <HandleData
        data={userSaved}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ display: 'flex', gap: 15, paddingBottom: 20 }}
          data={userSaved}
          onViewableItemsChanged={onViewCallBack}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item, index }) => (
            <SharingComp
              item={item}
              setClicked={setClicked}
              isFocus={index === currentIndex && screenIsFocused}
            />
          )}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserSaved;
