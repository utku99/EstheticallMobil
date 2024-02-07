import { View, Text, FlatList } from 'react-native'
import React from 'react'
import UserWrapper from '../UserWrapper'
import HandleData from '../../../components/HandleData'
import MessageComp from '../../../components/MessageComp'

const UserIncomingMessage = () => {
    return (
        <UserWrapper title='Mesajlar'>

            <HandleData data={[""]} title={"Mesajınız Bulunmamaktadır"} loading={false}>


                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, }}
                    data={["", "",]}
                    renderItem={({ item }) => <MessageComp />}
                />


            </HandleData>

        </UserWrapper>
    )
}

export default UserIncomingMessage