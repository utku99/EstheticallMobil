import { View, Text } from 'react-native'
import React from 'react'
import UserWrapper from './UserWrapper'
import HandleData from '../../components/HandleData'
import MessageComp from '../../components/MessageComp'
import DoctorMessageComp from '../../components/DoctorMessageComp'
import UserMessageComp from '../../components/UserMessageComp'



const UserMessage = () => {
    return (
        <UserWrapper title='Mesajlar'>

            <HandleData title={"Mesajınız Bulunmamaktadır"} loading={false}>
                {/* <MessageComp /> */}

                <DoctorMessageComp />
                <UserMessageComp />
            </HandleData>

        </UserWrapper>
    )
}

export default UserMessage