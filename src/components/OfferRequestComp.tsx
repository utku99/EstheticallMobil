import { View, Text } from 'react-native'
import React from 'react'
import CustomButtons from './CustomButtons'
import { SIZES } from '../constants/constants'
import NotificationIcon from '../assets/svg/userMenu/NotificationIcon'
import CustomInputs from './CustomInputs'
import WebClient from '../utility/WebClient'

const OfferRequestComp = ({ item, setClicked, setSelectedRequest }: any) => {

    const { Post } = WebClient()


    return (
        <View className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-2`} style={{ width: SIZES.width * 0.95 }}>



            <View className='flex-row items-center justify-between'>
                <View className=''>
                    <Text className='text-customGray font-poppins text-sm font-medium '>Teklif ID: </Text>
                    <Text className='text-customGray font-poppins text-sm '>{item?.offerID}</Text>
                </View>
                <NotificationIcon />
                <View className=''>
                    <Text className='text-customGray font-poppins text-sm font-medium '>Tarih: </Text>
                    <Text className='text-customGray font-poppins text-sm '>{item?.createdDate}</Text>
                </View>
            </View>


            <View className=''>
                <Text className='text-customGray font-poppins text-sm font-medium '>Konum: </Text>
                <Text className='text-customGray font-poppins text-sm '>{item?.location}</Text>
            </View>

            <View >
                <Text className='text-customGray font-poppins text-sm font-medium  '>Operasyonlar: </Text>
                <Text className='text-customGray font-poppins text-sm '>{item?.serviceName}</Text>
            </View>

            <View >
                <Text className='text-customGray font-poppins text-sm font-medium '>Teklif Tarih Aralığı: </Text>
                <Text className='text-customGray font-poppins text-sm '>{item?.dateInterval}</Text>
            </View>

            <View >
                <Text className='text-customGray font-poppins text-sm font-medium '>Özel Servisler: </Text>
                <View className='flex-row items-center justify-between '>
                    <CustomInputs type='checkbox' title='Ulaşım' readOnly value={item?.extraServices.some((item: number) => item === 1)} />
                    <CustomInputs type='checkbox' title='Konaklama' readOnly value={item?.extraServices.some((item: number) => item === 2)} />
                    <CustomInputs type='checkbox' title='Refakatçi' readOnly value={item?.extraServices.some((item: number) => item === 3)} />
                </View>
            </View>

            <View style={{ width: SIZES.width }} className='h-[1px] bg-customLightGray self-center'></View>

            <Text className='text-customGray font-poppins text-lg text-center mb-3'>Gelen Teklif: <Text className='font-bold'>{item?.incomingOffersCount?.split("-")[0]} -</Text><Text className='font-bold text-customOrange'>{item?.incomingOffersCount?.split("-")[1]}</Text></Text>

            <View className='flex-row items-center justify-center mb-3 space-x-3'>
                <CustomButtons type='outlined' label='Teklif Talebini Sil'
                    onPress={() => {
                        Post("/api/Offers/DeleteRequestedOffer", {
                            "offerID": item?.offerID
                        }).then((res: any) => {
                            if (res.data.code === "100") {
                                setClicked(true)
                            }
                        })
                    }} />
                <CustomButtons type='solid' label='Teklifleri İncele' onPress={() => setSelectedRequest(item)} />
            </View>

        </View >
    )
}

export default OfferRequestComp