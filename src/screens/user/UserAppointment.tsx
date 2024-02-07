import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserWrapper from './UserWrapper'
import HandleData from '../../components/HandleData'
import CustomButtons from '../../components/CustomButtons'
import AppointmentComp from '../../components/AppointmentComp'
import { useNavigation } from '@react-navigation/native'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'

const UserAppointment = () => {
    const navigation = useNavigation()
    const { Post, loading } = WebClient()
    const [userAppointments, setUserAppointments] = useState<any>([])
    const { user } = useSelector((state: any) => state.user)

    useEffect(() => {
        Post("/api/Appointments/MyAppointments", {
            "userID": user?.id
        }).then(res => {
            setUserAppointments(res.data.object)
        })
    }, [])


    return (
        <UserWrapper>

            <View className='flex-row items-center mb-4 space-x-3'>
                <CustomButtons type="brownsolid" label='Randevularım' style={{ width: 130, }} />
                <CustomButtons type="brownoutlined" label='Yeni Randevu' style={{ width: 130 }} onPress={() => navigation.navigate("appointment")} />
            </View>

            <HandleData data={userAppointments} title={"Randevunuz Bulunmamaktadır"} loading={false}>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={userAppointments}
                    renderItem={({ item }) => <AppointmentComp item={item} />}

                />

            </HandleData>

        </UserWrapper>
    )
}

export default UserAppointment