import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import UserWrapper from './UserWrapper';
import CustomButtons from '../../components/CustomButtons';
import {useDispatch} from 'react-redux';
import {setGuest, setLoggedIn, setUser} from '../../redux/slices/user';
import IntLabel from '../../components/IntLabel';

const UserLogOut = ({navigation}: any) => {
  const dispatch = useDispatch();

  return (
    <UserWrapper title={IntLabel('exit')}>
      <View className=" justify-center px-[20px] space-y-4 h-full">
        <Text className="font-medium font-poppins text-customGray text-base text-center">
          {IntLabel('logout_browser')}
        </Text>
        <View className="flex-row items-center justify-evenly">
          <CustomButtons
            type="outlined"
            label={IntLabel('give_up')}
            theme="big"
            onPress={() => navigation.goBack()}
          />
          <CustomButtons
            type="solid"
            label={IntLabel('ok')}
            theme="big"
            onPress={() => {
              dispatch(setUser(null));
              dispatch(setLoggedIn(false));
              dispatch(setGuest(false));
            }}
            style={{width: 80}}
          />
        </View>
      </View>
    </UserWrapper>
  );
};

export default UserLogOut;
