import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/constants'
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon'

const MessageComp = ({ onPress }: any) => {
    return (
        <Pressable onPress={onPress} className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3`} style={{ width: SIZES.width * 0.95 }}>
            <View className='w-[80px] h-[80px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                <Image source={require("../assets/images/authBg/auth.jpg")} className='w-full h-full' resizeMode='cover' />
            </View>
            <View className='flex-1'>
                <Text className='text-customGray font-poppins text-sm font-bold'>asd</Text>
                <Text className='text-customGray font-poppins text-sm'>asd</Text>
                <Text className='text-customGray font-poppins text-sm'>asd</Text>
            </View>
            <NotificationIcon />
        </Pressable >
    )
}

export default MessageComp