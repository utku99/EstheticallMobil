import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import CustomButtons from '../../components/CustomButtons';
import UserCommentComp from '../../components/UserCommentComp';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import IntLabel from '../../components/IntLabel';

const UserComment = () => {
  const [activeTab, setActiveTab] = useState(1);

  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [activeComments, setActiveComments] = useState([]);
  const [waitingComments, setWaitingComments] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/Company/UserMyComments', {
      userID: user?.id ?? 157,
    }).then(res => {
      let waiting = res.data.object.filter(
        (item: any) => item.isConfirmed === false,
      );
      let active = res.data.object.filter(
        (item: any) => item.isConfirmed === true,
      );
      setWaitingComments(waiting);
      setActiveComments(active);
    });

    setClicked(false);
  }, [clicked]);

  return (
    <UserWrapper>
      <View className="flex-row items-center mb-4 space-x-3">
        <CustomButtons
          type={activeTab == 1 ? 'brownsolid' : 'brownoutlined'}
          label={IntLabel('waiting_approvals')}
          style={{marginRight: 2}}
          onPress={() => setActiveTab(1)}
        />
        <CustomButtons
          type={activeTab == 2 ? 'brownsolid' : 'brownoutlined'}
          label={IntLabel('accepted')}
          onPress={() => setActiveTab(2)}
        />
      </View>

      {waitingComments && activeTab == 1 && (
        <HandleData
          data={waitingComments}
          loading={loading}
          title={'Onay Bekleyen Yorumunuz Bulunamadı'}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={waitingComments}
            renderItem={({item, index}) => (
              <UserCommentComp
                key={index}
                item={item}
                setClicked={setClicked}
              />
            )}
          />
        </HandleData>
      )}
      {activeComments && activeTab == 2 && (
        <HandleData
          data={activeComments}
          loading={loading}
          title={'Onaylanan Yorumunuz Bulunamadı'}>
          <FlatList
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={activeComments}
            renderItem={({item, index}) => (
              <UserCommentComp
                key={index}
                item={item}
                setClicked={setClicked}
              />
            )}
          />
        </HandleData>
      )}
    </UserWrapper>
  );
};

export default UserComment;
