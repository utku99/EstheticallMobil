import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/constants'
import CustomInputs from './CustomInputs'
import LikeIcon from '../assets/svg/common/LikeIcon'
import StepIndicator from 'react-native-step-indicator';
import CustomButtons from './CustomButtons'

const AppointmentComp = () => {



    return (
        <View className={` border border-customLightGray rounded-xl bg-white `} style={{ width: SIZES.width * 0.95 }}>


            <View className='p-[10px] space-y-2'>
                <Text className='text-customGray font-poppins text-xs '>04.03.2021</Text>

                {/* header */}
                <View className='flex-row justify-between items-center '>
                    <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={require("../assets/images/authBg/auth.jpg")} className='w-full h-full' resizeMode='cover' />
                    </View>
                    <View className=' w-[40%]'>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-sm font-bold'>Esteworld</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs '>TR, İstanbul, Ataşehir</Text>
                    </View>
                    <View className='items-center'>
                        <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                        <CustomInputs type='rating' value={100 / 20} />
                    </View>
                    <LikeIcon />
                </View>

                <View className=''>
                    <Text className='text-customGray font-poppins text-sm font-medium '>Kategori: </Text>
                    <Text className='text-customGray font-poppins text-sm '>Hastane</Text>
                </View>

                <View >
                    <Text className='text-customGray font-poppins text-sm font-medium  '>Operasyonlar: </Text>
                    <Text className='text-customGray font-poppins text-sm '>Deviasyon (Septum Eğriliği) Ameliyatı, Revizyon Burun Cerrahisi.</Text>
                </View>

                <View >
                    <Text className='text-customOrange font-poppins text-sm font-medium '>Teklif Tarih Aralığı: </Text>
                    <Text className='text-customOrange font-poppins text-sm '>15 Şubat 2024 - 15 Nisan 2024</Text>
                </View>
            </View>

            <StepIndicator
                customStyles={{
                    stepIndicatorSize: 36,
                    currentStepIndicatorSize: 36,
                    stepStrokeWidth: 0,

                    labelSize: 14,
                    labelColor: "#A6A6A6",
                    currentStepLabelColor: "#4D4A48",

                    stepIndicatorLabelFontSize: 16,
                    stepIndicatorLabelFinishedColor: "white",
                    stepIndicatorLabelCurrentColor: "#4D4A48",

                    stepStrokeCurrentColor: "#FF8170",
                    stepIndicatorCurrentColor: "white",
                    stepIndicatorFinishedColor: "#FF8170",
                    separatorStrokeWidth: 1,
                    currentStepStrokeWidth: 2,
                    separatorFinishedColor: "#FF8170",
                    separatorUnFinishedColor: "#CECECE",
                    stepIndicatorUnFinishedColor: "#FF8170",
                }}
                currentPosition={2}
                labels={["Onay Bekliyor", "Onaylandı", "Tamamlandı"]}
                stepCount={3}
            />

            <CustomButtons type='solid' label='Soru Sor' style={{ width: 100, alignSelf: "center", marginVertical: 20 }} />

            <Pressable className='bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between'>

            </Pressable>
        </View >
    )
}

export default AppointmentComp