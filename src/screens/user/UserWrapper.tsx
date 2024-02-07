import { View, Text, ScrollView } from 'react-native'
import React from 'react'

interface props {
    children?: React.ReactNode,
    title?: string
}

const UserWrapper = ({ children, title }: props) => {
    return (
        <ScrollView className='bg-[#FAFAFA] ' contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }}>

            <View className=' items-center  h-full'>
                {title && <Text className='font-medium font-poppins text-customGray text-base text-center mb-[20px] '>{title}</Text>}
                {children}
            </View>

        </ScrollView>

    )
}

export default UserWrapper