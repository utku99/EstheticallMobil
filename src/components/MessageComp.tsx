import { View, Text, Image, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/constants'
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon'
import { useNavigation } from '@react-navigation/native'

const MessageComp = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate("usermessage")} className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3`} style={{ width: SIZES.width * 0.95 }}>
            <View className='w-[80px] h-[80px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                <Image source={require("../assets/images/authBg/auth.jpg")} className='w-full h-full' resizeMode='cover' />
            </View>
            <View className='flex-1'>
                <Text className='text-customGray font-poppins text-sm font-bold'>Prof. Dr. Erkan Vural</Text>
                <Text className='text-customGray font-poppins text-sm'>Plastik Cerrah</Text>
                <Text className='text-customGray font-poppins text-sm'>TR, İstanbul, Ataşehir</Text>
            </View>
            <NotificationIcon />
        </TouchableOpacity >
    )
}

export default MessageComp