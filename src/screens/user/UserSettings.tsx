import {View, Text, Switch, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import DocumentIcon from '../../assets/svg/userMenu/DocumentIcon';
import HelpIcon from '../../assets/svg/userMenu/HelpIcon';
import SecurityIcon from '../../assets/svg/userMenu/SecurityIcon';
import AboutIcon from '../../assets/svg/userMenu/AboutIcon';
import LangChoiceComp from '../../components/LangChoiceComp';
import IntLabel from '../../components/IntLabel';
import {useNavigation} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';

const UserSettings = () => {
  const {user} = useSelector((state: any) => state.user);
  const {Post, loading} = WebClient();
  const [settings, setSettings] = useState<any>();
  const navigation = useNavigation<any>();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/User/UserNotificationsSettings', {
      userId: user?.id,
    }).then((res: any) => {
      setSettings(res.data.object);
    });

    setClicked(false);
  }, [clicked]);

  return (
    <UserWrapper title={IntLabel('settings')}>
      <View className="space-y-8  w-[75%]">
        <Text className="font-poppinsMedium  text-center text-base text-customGray">
          {IntLabel('notifications')}
        </Text>

        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray">
            {IntLabel('messages')}
          </Text>
          <Switch
            thumbColor={'#FF8170'}
            value={settings?.notificationMessage}
            onChange={() => {
              if (user) {
                Post('/api/User/ChangeNotificationSettings', {
                  userId: user?.id,
                  notificationOffer: settings?.notificationOffer,
                  notificationMessage: !settings?.notificationMessage,
                  notificationAppointment: settings?.notificationAppointment,
                  notificationFavorites: settings?.notificationFavorites,
                }).then(res => {
                  setClicked(true);
                });
              }
            }}
          />
        </View>

        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('offers')}
          </Text>
          <Switch
            thumbColor={'#FF8170'}
            value={settings?.notificationOffer}
            onChange={() => {
              if (user) {
                Post('/api/User/ChangeNotificationSettings', {
                  userId: user?.id,
                  notificationOffer: !settings?.notificationOffer,
                  notificationMessage: settings?.notificationMessage,
                  notificationAppointment: settings?.notificationAppointment,
                  notificationFavorites: settings?.notificationFavorites,
                }).then(res => {
                  setClicked(true);
                });
              }
            }}
          />
        </View>

        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('appointments')}
          </Text>
          <Switch
            thumbColor={'#FF8170'}
            value={settings?.notificationAppointment}
            onChange={() => {
              if (user) {
                Post('/api/User/ChangeNotificationSettings', {
                  userId: user?.id,
                  notificationOffer: settings?.notificationOffer,
                  notificationMessage: settings?.notificationMessage,
                  notificationAppointment: !settings?.notificationAppointment,
                  notificationFavorites: settings?.notificationFavorites,
                }).then(res => {
                  setClicked(true);
                });
              }
            }}
          />
        </View>

        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('favorites')}
          </Text>
          <Switch
            thumbColor={'#FF8170'}
            value={settings?.notificationFavorites}
            onChange={() => {
              if (user) {
                Post('/api/User/ChangeNotificationSettings', {
                  userId: user?.id,
                  notificationOffer: settings?.notificationOffer,
                  notificationMessage: settings?.notificationMessage,
                  notificationAppointment: settings?.notificationAppointment,
                  notificationFavorites: !settings?.notificationFavorites,
                }).then(res => {
                  setClicked(true);
                });
              }
            }}
          />
        </View>

        <View className="flex-row items-center justify-between ">
          <Text className="font-poppinsMedium text-base text-customGray ">
            {IntLabel('lang_selection')}
          </Text>
          <LangChoiceComp />
        </View>
      </View>

      <View className="flex-row items-center space-x-4 mt-8 ">
        <View className="space-y-4">
          <Pressable
            onPress={() => navigation.navigate('termsofuse')}
            className="flex-row items-center space-x-2">
            <DocumentIcon />
            <Text className=" text-base text-customGray font-sans ">
              {IntLabel('terms_of_use')}{' '}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('privacypolicy')}
            className="flex-row items-center space-x-2">
            <SecurityIcon />
            <Text className=" text-base text-customGray font-sans">
              {IntLabel('privacy_policy')}{' '}
            </Text>
          </Pressable>
        </View>

        <View className="space-y-4">
          <Pressable
            onPress={() => navigation.navigate('help')}
            className="flex-row items-center space-x-2">
            <HelpIcon />
            <Text className=" text-base text-customGray font-sans">
              {IntLabel('help')}{' '}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('aboutus')}
            className="flex-row items-center space-x-2">
            <AboutIcon />
            <Text className=" text-base text-customGray font-sans">
              {IntLabel('about_us')}{' '}
            </Text>
          </Pressable>
        </View>
      </View>
    </UserWrapper>
  );
};

export default UserSettings;
