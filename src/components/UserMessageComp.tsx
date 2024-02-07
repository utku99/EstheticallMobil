import { View, Text, Image } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/constants'

const UserMessageComp = () => {
    return (
        <View className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center space-x-3`} style={{ width: SIZES.width * 0.95 }}>
            <View className='flex-1 space-y-1'>
                <Text className='text-customGray font-poppins text-xs'>I had a smile with 24 veneers. Four days later Dr Ebru prepared my teeth and she put the veneers on. Now it looks amazing, I have a beautiful smile to go with my new look.</Text>
                <Text className='text-customGray font-poppins text-xs '>04.03.2021 - 15:00</Text>
            </View>
            <View className='w-[40px] h-[40px] overflow-hidden rounded-full border-[0.6px] border-customGray self-start'>
                <Image source={require("../assets/images/authBg/auth.jpg")} className='w-full h-full' resizeMode='cover' />
            </View>
        </View >
    )
}

export default UserMessageComp