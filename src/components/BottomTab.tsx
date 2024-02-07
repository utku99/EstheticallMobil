import { Pressable, Text, View } from 'react-native'
import React, { Component } from 'react'
import HomeIcon from '../assets/svg/bottomTab/HomeIcon'
import QuestionIcon from '../assets/svg/bottomTab/QuestionIcon'
import AppointmentIcon from '../assets/svg/bottomTab/AppointmentIcon'
import BuyIcon from '../assets/svg/bottomTab/BuyIcon'
import OfferIcon from '../assets/svg/bottomTab/OfferIcon'



export class BottomTab extends Component {
    render() {

        const { navigation }: any = this.props

        return (
            <View className='bg-[#F9F9F9]/[.94] h-[70px] flex-row items-center justify-between px-[3%] border-t border-customGray/[.3]'>
                <Pressable className='items-center space-y-1' onPress={() => navigation.navigate("sharing")}>
                    <HomeIcon />
                    <Text className='font-medium text-xxs text-customGray'>Ana Sayfa</Text>
                </Pressable>

                <Pressable className='items-center space-y-1' onPress={() => navigation.navigate("question")}>
                    <QuestionIcon />
                    <Text className='font-medium text-xxs text-customGray'>Soru Sor</Text>
                </Pressable>

                <Pressable className='items-center space-y-1' onPress={() => navigation.navigate("offer")}>
                    <OfferIcon />
                    <Text className='font-medium text-xxs text-customGray'>Tekfil Al</Text>
                </Pressable>

                <Pressable className='items-center space-y-1' onPress={() => navigation.navigate("package")}>
                    <BuyIcon />
                    <Text className='font-medium text-xxs text-customGray'>Paketler</Text>
                </Pressable>

                <Pressable className='items-center space-y-1' onPress={() => navigation.navigate("appointment")}>
                    <AppointmentIcon />
                    <Text className='font-medium text-xxs text-customGray'>Randevu</Text>
                </Pressable>
            </View>
        )
    }
}

export default BottomTab


