import { View, Text, Switch } from 'react-native'
import React from 'react'
import UserWrapper from './UserWrapper'
import DocumentIcon from '../../assets/svg/userMenu/DocumentIcon'
import HelpIcon from '../../assets/svg/userMenu/HelpIcon'
import SecurityIcon from '../../assets/svg/userMenu/SecurityIcon'
import AboutIcon from '../../assets/svg/userMenu/AboutIcon'

const UserSettings = () => {
    return (
        <UserWrapper title='Ayarlar'>

            <View className=' w-[60%] space-y-8'>
                <View className='flex-row items-center justify-between '>
                    <Text className='font-medium text-base text-customGray font-poppins'>Mesaj Bildirimleri</Text>
                    <Switch
                        thumbColor={"#FF8170"}
                        value={false}
                        onChange={() => ""}
                    />
                </View>
                <View className='flex-row items-center justify-between '>
                    <Text className='font-medium text-base text-customGray font-poppins'>Teklif Bildirimleri</Text>
                    <Switch
                        thumbColor={"#FF8170"}
                        value={false}
                        onChange={() => ""}
                    />
                </View>
                <View className='flex-row items-center justify-between '>
                    <Text className='font-medium text-base text-customGray font-poppins'>Randevu Bildirimleri</Text>
                    <Switch
                        thumbColor={"#FF8170"}
                        value={false}
                        onChange={() => ""}
                    />
                </View>
                <View className='flex-row items-center justify-between'>
                    <Text className='font-medium text-base text-customGray font-poppins'>Satın Alma Bildirimleri</Text>
                    <Switch
                        thumbColor={"#FF8170"}
                        value={false}
                        onChange={() => ""}
                    />
                </View>
                <View className='flex-row items-center justify-between '>
                    <Text className='font-medium text-base text-customGray font-poppins'>Favori Bildirimleri</Text>
                    <Switch
                        thumbColor={"#FF8170"}
                        value={false}
                        onChange={() => ""}
                    />
                </View>
                <View className='flex-row items-center justify-between '>
                    <Text className='font-medium text-base text-customGray font-poppins'>Dil Seçimi</Text>

                </View>
            </View>

            <View className='flex-row items-center space-x-4 mt-8'>
                <View className='space-y-4'>
                    <View className='flex-row items-center space-x-2'>
                        <DocumentIcon />
                        <Text className=' text-base text-customGray font-sans'>Kullanım Koşulları </Text>
                    </View>

                    <View className='flex-row items-center space-x-2'>
                        <SecurityIcon />
                        <Text className=' text-base text-customGray font-sans'>Gizlilik Politikası</Text>
                    </View>
                </View>

                <View className='space-y-4'>
                    <View className='flex-row items-center space-x-2'>
                        <HelpIcon />
                        <Text className=' text-base text-customGray font-sans'>Yardım</Text>
                    </View>
                    <View className='flex-row items-center space-x-2'>
                        <AboutIcon />
                        <Text className=' text-base text-customGray font-sans'>Hakkımızda</Text>
                    </View>
                </View>
            </View>




        </UserWrapper>
    )
}

export default UserSettings