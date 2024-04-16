import React, {Component} from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import ProfileIcon from '../assets/svg/userMenu/ProfileIcon';
import OfferIcon from '../assets/svg/userMenu/OfferIcon';
import AppointmentIcon from '../assets/svg/userMenu/AppointmentIcon';
import MessageIcon from '../assets/svg/userMenu/MessageIcon';
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon';
import CommentIcon from '../assets/svg/userMenu/CommentIcon';
import FavoriteIcon from '../assets/svg/userMenu/FavoriteIcon';
import SavedIcon from '../assets/svg/userMenu/SavedIcon';
import SettingsIcon from '../assets/svg/userMenu/SettingsIcon';
import LogOutIcon from '../assets/svg/userMenu/LogOutIcon';
import {useNavigation} from '@react-navigation/native';
import IntLabel from './IntLabel';

const DrawerBar = () => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={IntLabel('my_profile')}
        onPress={() => navigation.navigate('userprofile')}
        icon={() => <ProfileIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('my_offers')}
        onPress={() => navigation.navigate('useroffer')}
        icon={() => <OfferIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('my_appointments')}
        onPress={() => navigation.navigate('userappointment')}
        icon={() => <AppointmentIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('messages')}
        onPress={() => navigation.navigate('userincomingmessage')}
        icon={() => <MessageIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('notifications')}
        onPress={() => navigation.navigate('usernotification')}
        icon={() => <NotificationIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('comments')}
        onPress={() => navigation.navigate('usercomment')}
        icon={() => <CommentIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('favorites')}
        onPress={() => navigation.navigate('userfavorite')}
        icon={() => <FavoriteIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('saved')}
        onPress={() => navigation.navigate('usersaved')}
        icon={() => <SavedIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('settings')}
        onPress={() => navigation.navigate('usersettings')}
        icon={() => <SettingsIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
      <DrawerItem
        label={IntLabel('exit')}
        onPress={() => navigation.navigate('userlogout')}
        icon={() => <LogOutIcon />}
        activeTintColor="red"
        pressColor="blue"
        labelStyle={{
          fontSize: 14,
          color: '#4D4A48',
          fontFamily: 'Poppins-SemiBold',
        }}
      />
    </DrawerContentScrollView>
  );
};

export default DrawerBar;
