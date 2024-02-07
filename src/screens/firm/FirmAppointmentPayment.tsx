import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import CustomInputs from '../../components/CustomInputs'
import LikeIcon from '../../assets/svg/common/LikeIcon'
import CustomButtons from '../../components/CustomButtons'

const FirmAppointmentPayment = () => {
    return (
        <View className='flex-1 bg-[#FAFAFA]'>
            <ScrollView contentContainerStyle={{ flexDirection: "column", gap: 20, paddingVertical: 20, paddingHorizontal: "5%" }}>

                <Text className='text-base font-poppins font-medium text-customGray text-center'>Ödeme Yap</Text>

                {/* header */}
                <View className='flex-row justify-between items-center '>
                    <View className='w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={require("../../assets/images/authBg/auth.jpg")} className='w-full h-full' resizeMode='cover' />
                    </View>
                    <View className='w-[40%]'>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>Esteworld</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs '>TR,İstanbul,Ataşehir</Text>
                    </View>
                    <View className='items-center'>
                        <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                        <CustomInputs type='rating' value={3} />
                    </View>
                    <LikeIcon />
                </View>

                <View className=''>
                    <Text className='text-customGray font-poppins text-sm font-medium '>Kategori: </Text>
                    <Text className='text-customGray font-poppins text-sm '>Hastane,klinik</Text>
                </View>

                <View >
                    <Text className='text-customGray font-poppins text-sm font-medium  '>Operasyonlar: </Text>
                    <Text className='text-customGray font-poppins text-sm '>Deviasyon (Septum Eğriliği) Ameliyatı, Revizyon Burun Cerrahisi.</Text>
                </View>

                <View >
                    <Text className='text-customOrange font-poppins text-sm font-medium '>Teklif Tarih Aralığı: </Text>
                    <Text className='text-customOrange font-poppins text-sm '>15 Şubat 2024 - 15 Nisan 2024</Text>
                </View>

                <View>
                    <Text className='text-base font-poppins font-medium text-customGray text-center'>Randevu Talebi</Text>
                    <Text className='text-base font-poppins font-medium text-customGray text-center'>Ödenecek Tutar: 250₺</Text>
                </View>


                <CustomInputs type='text' title='Ad Soyad' />
                <CustomInputs type='text' title='Kart Numarası' />
                <CustomInputs type='dropdown' title='Son Kullanma Tarihi' />
                <CustomInputs type='text' title='CVV Kodu' />

                <CustomButtons type='iconsolid' label='Talep Gönder' icon='send' theme='big' style={{ width: 170, alignSelf: "center" }} />

            </ScrollView>
        </View>
    )
}

export default FirmAppointmentPayment