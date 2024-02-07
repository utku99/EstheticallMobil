import { View, Text } from 'react-native'
import React from 'react'
import UserWrapper from './UserWrapper'
import NotificationComp from '../../components/NotificationComp'

const UserNotification = () => {
    return (
        <UserWrapper title='Bildirimler'>
            <NotificationComp />
            <NotificationComp />
        </UserWrapper>
    )
}

export default UserNotification