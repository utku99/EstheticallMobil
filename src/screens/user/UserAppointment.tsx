import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import HandleData from '../../components/HandleData';
import CustomButtons from '../../components/CustomButtons';
import AppointmentComp from '../../components/AppointmentComp';
import {useNavigation} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import IntLabel from '../../components/IntLabel';

const UserAppointment = () => {
  const navigation = useNavigation<any>();
  const {Post} = WebClient();
  const [userAppointments, setUserAppointments] = useState<any>([]);
  const {user} = useSelector((state: any) => state.user);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Post('/api/Appointments/MyAppointments', {
      userID: user?.id,
    })
      .then(res => {
        setUserAppointments(res.data.object);
      })
      .finally(() => {
        setLoading(false);
        setClicked(false);
      });
  }, [clicked]);

  return (
    <UserWrapper>
      <View className="flex-row items-center mb-4 space-x-3">
        <CustomButtons type="brownsolid" label={IntLabel('my_appointments')} />
        <CustomButtons
          type="brownoutlined"
          label={IntLabel('new_appointment')}
          onPress={() => navigation.navigate('appointment')}
        />
      </View>

      <HandleData
        data={userAppointments}
        title={IntLabel('warning_no_active_record')}
        loading={loading}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={userAppointments}
          renderItem={({item}) => (
            <AppointmentComp item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserAppointment;
