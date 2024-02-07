import { View, Text, FlatList } from 'react-native'
import React, { useState } from 'react'
import UserWrapper from './UserWrapper'
import HandleData from '../../components/HandleData'
import CustomButtons from '../../components/CustomButtons'
import AppointmentComp from '../../components/AppointmentComp'

const UserAppointment = () => {
    const [activeTab, setActiveTab] = useState(1)
    return (
        <UserWrapper>

            <View className='flex-row items-center mb-4 space-x-3'>
                <CustomButtons type={activeTab == 1 ? "brownsolid" : "brownoutlined"} label='Randevularım' width={"w-[130px] mr-4"} onPress={() => setActiveTab(1)} />
                <CustomButtons type={activeTab == 2 ? "brownsolid" : "brownoutlined"} label='Yeni Randevu' width={"w-[130px]"} onPress={() => setActiveTab(2)} />
            </View>

            <HandleData title={"Randevunuz Bulunmamaktadır"} loading={false}>

                <AppointmentComp />

            </HandleData>

        </UserWrapper>
    )
}

export default UserAppointment