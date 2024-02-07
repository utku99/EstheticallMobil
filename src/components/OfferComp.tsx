import { View, Text, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SIZES } from '../constants/constants'
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon'
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon'
import CustomButtons from './CustomButtons'
import LikeIcon from '../assets/svg/common/LikeIcon'
import CustomInputs from './CustomInputs'

const OfferComp = ({ item }: any) => {

    const [seeAll, setSeeAll] = useState(false)


    return (
        <View className={`h-fit border border-customLightGray rounded-xl bg-white `} style={{ width: SIZES.width * 0.95 }}>



            {/* header */}
            <View className='p-[10px] space-y-1'>
                <Text className='text-customGray font-poppins text-xs'>{item?.offerInfoCreatedDate}</Text>
                <View className='flex-row justify-between items-center'>
                    <View className='flex-row items-center space-x-2  w-[60%]'>
                        <View className='w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                            <Image source={{ uri: item?.logo }} className='w-full h-full' resizeMode='cover' />
                        </View>
                        <View>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.name}</Text>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs '>{item?.location}</Text>
                        </View>
                    </View>
                    <View className='items-center'>
                        <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                        <CustomInputs type='rating' value={item?.commentsPoint / 20} />
                    </View>
                    <LikeIcon />
                </View>
            </View>



            {seeAll && (
                <View className='p-[10px] space-y-3'>

                    <View className='flex-row items-center justify-between'>
                        <View className='flex-1'>
                            <Text className='text-customGray font-poppins text-sm font-medium '>Teklif ID: </Text>
                            <Text className='text-customGray font-poppins text-sm '>{item?.offerInfoID}</Text>
                        </View>
                        <View className='flex-1'>
                            <Text className='text-customGray font-poppins text-sm font-medium '>Tarih: </Text>
                            <Text className='text-customGray font-poppins text-sm '>{item?.offerInfoCreatedDate}</Text>
                        </View>
                    </View>

                    <View className='flex-row items-center justify-between'>
                        <View className='flex-1'>
                            <Text className='text-customGray font-poppins text-sm font-medium '>Konum: </Text>
                            <Text className='text-customGray font-poppins text-sm '>{item?.location}</Text>
                        </View>
                        <View className='flex-1'>
                            <Text className='text-customGray font-poppins text-sm font-medium '>Kategori: </Text>
                            <Text className='text-customGray font-poppins text-sm '>Hastane,klinik</Text>
                        </View>
                    </View>

                    <View >
                        <Text className='text-customGray font-poppins text-sm font-medium  '>Operasyonlar: </Text>
                        <Text className='text-customGray font-poppins text-sm '>{item?.serviceName}</Text>
                    </View>

                    <View >
                        <Text className='text-customOrange font-poppins text-sm font-medium '>Teklif Tarih Aralığı: </Text>
                        <Text className='text-customOrange font-poppins text-sm '>{item?.offerInfoDate}</Text>
                    </View>

                    <View >
                        <Text className='text-customGray font-poppins text-sm font-medium '>Özel Servisler: </Text>
                        <View className='flex-row items-center justify-between '>
                            <CustomInputs type='checkbox' title='Ulaşım' readOnly value={item?.extraServices?.some((item: number) => item === 1)} />
                            <CustomInputs type='checkbox' title='Konaklama' readOnly value={item?.extraServices?.some((item: number) => item === 2)} />
                            <CustomInputs type='checkbox' title='Refakatçi' readOnly value={item?.extraServices?.some((item: number) => item === 3)} />
                        </View>
                    </View>
                    <View className='flex-row'>
                        <Text className='font-poppins font-medium text-sm text-customGray'>İlgili Doktor: </Text>
                        <View className='h-[0.5px] bg-black/[.5] w-full self-center'></View>
                    </View>

                    <View className='flex-row items-center justify-between'>
                        <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                            <Image source={{ uri: item?.doctorLogo }} className='w-full h-full' resizeMode='cover' />
                        </View>
                        <View className='w-[40%] '>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.nameWithTitle}</Text>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.doctorBranch}</Text>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.location}</Text>
                        </View>
                        <View className='items-center'>
                            <Text className='text-customGray font-poppins text-xs'>{item?.doctorCommentPoint / 20}/5</Text>
                            <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                        </View>
                        <LikeIcon />
                    </View>

                    <Text className='text-customOrange font-poppins text-base font-semibold text-center mb-3'>Teklif Fiyatı: {item?.price} {item?.currencyType === 1 ? "₺" : item?.currencyType === 2 ? "$" : "€"}</Text>

                    <CustomButtons type='solid' label='Soru Sor' icon='question' style={{ width: 100, alignSelf: "center" }} />
                </View>
            )}


            {/* bottom */}
            <Pressable onPress={() => setSeeAll(!seeAll)} className='bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]'>
                {!seeAll && <Text numberOfLines={1} className='font-poppins font-normal text-xs text-white flex-1'>Teklif Fiyatı:{item?.price}{item?.currencyType === 1 ? "₺" : item?.currencyType === 2 ? "$" : "€"}</Text>}
                <View className='flex-1 items-center '>
                    {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
                </View>
                {!seeAll && <Text className='font-poppins font-bold text-sm text-white flex-1 text-right'>Detayları Gör</Text>}
            </Pressable>

        </View>
    )
}

export default OfferComp