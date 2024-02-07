import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import ProfileIcon from '../assets/svg/userMenu/ProfileIcon'
import OfferIcon from '../assets/svg/userMenu/OfferIcon'
import AppointmentIcon from '../assets/svg/userMenu/AppointmentIcon'
import BuyIcon from '../assets/svg/userMenu/BuyIcon'
import MessageIcon from '../assets/svg/userMenu/MessageIcon'
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon'
import CommentIcon from '../assets/svg/userMenu/CommentIcon'
import FavoriteIcon from '../assets/svg/userMenu/FavoriteIcon'
import SavedIcon from '../assets/svg/userMenu/SavedIcon'
import SettingsIcon from '../assets/svg/userMenu/SettingsIcon'
import LogOutIcon from '../assets/svg/userMenu/LogOutIcon'

export class DrawerBar extends Component {
    render() {

        const { navigation }: any = this.props

        return (
            <DrawerContentScrollView {...this.props} >
                <DrawerItem label="Profilim" onPress={() => navigation.navigate("userprofile")} icon={() => <ProfileIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Tekliflerim" onPress={() => navigation.navigate("useroffer")} icon={() => <OfferIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Randevularım" onPress={() => navigation.navigate("userappointment")} icon={() => <AppointmentIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Aldıklarım" onPress={() => navigation.navigate("userbuy")} icon={() => <BuyIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Mesajlar" onPress={() => navigation.navigate("usermessage")} icon={() => <MessageIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Bildirimler" onPress={() => navigation.navigate("usernotification")} icon={() => <NotificationIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Yorumlarım" onPress={() => navigation.navigate("usercomment")} icon={() => <CommentIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Favoriler" onPress={() => navigation.navigate("userfavorite")} icon={() => <FavoriteIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Kaydedilenler" onPress={() => navigation.navigate("usersaved")} icon={() => <SavedIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Ayarlar" onPress={() => navigation.navigate("usersettings")} icon={() => <SettingsIcon />} activeTintColor='red' pressColor='blue' />
                <DrawerItem label="Çıkış Yap" onPress={() => navigation.navigate("userlogout")} icon={() => <LogOutIcon />} activeTintColor='red' pressColor='blue' />
            </DrawerContentScrollView>
        )
    }
}

export default DrawerBar