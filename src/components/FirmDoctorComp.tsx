import { View, Text, Image, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import LikeIcon from '../assets/svg/common/LikeIcon'
import { SIZES } from '../constants/constants'
import ShareIcon from '../assets/svg/homepages/ShareIcon'
import DoctorIcon from '../assets/svg/firm/DoctorIcon'
import CertificateIcon from '../assets/svg/firm/CertificateIcon'
import PhotosIcon from '../assets/svg/firm/PhotosIcon'
import ArrowDownIcon from '../assets/svg/auth/ArrowDownIcon'
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon'
import RenderHTML from 'react-native-render-html'
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon'

interface props {
    item: any
}

const FirmDoctorComp = ({ item }: props) => {

    const [seeAll, setSeeAll] = useState(false)



    return (
        <View className={` border border-customLightGray rounded-xl bg-white `} style={{ width: SIZES.width * 0.95 }}>

            <View className='p-[10px] space-y-3'>

                {/* header */}
                <View className='flex-row items-center justify-between'>
                    <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={{ uri: item?.headerModel?.picture }} className='w-full h-full' resizeMode='cover' />
                    </View>
                    <View className='w-[44%]'>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item.headerModel.fullNameWithTitle}</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item.headerModel.branch}</Text>
                    </View>
                    <View className='items-center '>
                        <Text className='text-customGray font-poppins text-xs'>{parseInt(item?.headerModel?.commentPoint) / 20}/5</Text>
                        <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                    </View>
                    <View className='items-center space-y-2'>
                        <ShareIcon />
                        <LikeIcon />
                    </View>
                </View>

                <View className='h-[1px] bg-customLightGray '></View>

                <View className='flex-row flex-wrap'>
                    <Text className='font-poppins text-sm font-bold text-customGray'>Operasyonlar: </Text>
                    {/* <FlatList
                        data={item.services}
                        renderItem={({ item }) =>
                            <Text numberOfLines={4} className='font-poppins text-sm font-normal text-customGray'>{item.serviceName}, </Text>
                        }
                    /> */}
                    {item.services.map((item: any) => (
                        <Text numberOfLines={4} className='font-poppins text-sm font-normal text-customGray'>{item.serviceName}, </Text>
                    ))}
                </View>

                {seeAll && (
                    <View className='space-y-3'>
                        <RenderHTML contentWidth={SIZES.width} source={{ html: item.doctorInfo.description }} />
                        <View >
                            <Text className='font-poppins text-sm font-bold text-customGray'>Doğum Yeri, Tarihi: </Text>
                            <RenderHTML contentWidth={SIZES.width} source={{ html: item?.doctorInfo?.birthPlaceAndYear }} />
                        </View>
                        <View>
                            <Text className='font-poppins text-sm font-bold text-customGray'>Uzmanlık:</Text>
                            <RenderHTML contentWidth={SIZES.width} source={{ html: item.doctorInfo.expertises }} />
                        </View>
                        <View>
                            <Text className='font-poppins text-sm font-bold text-customGray'>Eğitim:</Text>
                            <RenderHTML contentWidth={SIZES.width} source={{ html: item.doctorInfo.education }} />
                        </View>
                        <View>
                            <Text className='font-poppins text-sm font-bold text-customGray'>Sertifikalar:</Text>
                            <RenderHTML contentWidth={SIZES.width} source={{ html: item.doctorInfo.certificates }} />
                        </View>
                        <View>
                            <Text className='font-poppins text-sm font-bold text-customGray'>Ödüller:</Text>
                            <RenderHTML contentWidth={SIZES.width} source={{ html: item.doctorInfo.awards }} />
                        </View>
                        <View>
                            <Text className='font-poppins text-sm font-bold text-customGray'>Üyelikler:</Text>
                            <RenderHTML contentWidth={SIZES.width} source={{ html: item.doctorInfo.memberships }} />
                        </View>
                        <View>
                            <Text className='font-poppins text-sm font-bold text-customGray'>Çalıştığı Kurum:</Text>
                            <Text className='font-poppins text-sm font-normal text-customGray'>{item.doctorInfo.companyName}</Text>
                        </View>
                    </View>

                )}


            </View>



            {/* bottom */}
            <View className=''>
                <View className='h-[35px] border-t border-customLightGray flex-row '>
                    <View className='h-full flex-1 flex-row items-center justify-evenly'>
                        <DoctorIcon />
                        <Text className='font-poppins text-xs font-normal text-customGray'>16 Yıl Deneyim</Text>
                    </View>
                    <View className='border-x border-customLightGray h-full flex-1 flex-row items-center justify-evenly'>
                        <CertificateIcon />
                        <Text className='font-poppins text-xs font-normal text-customGray '>2 Sertifika</Text>
                    </View>
                    <View className='flex-1 flex-row items-center justify-evenly'>
                        <PhotosIcon />
                        <Text className='font-poppins text-xs font-normal text-customGray'>21 Fotoğraf</Text>
                    </View>
                </View>
                <Pressable onPress={() => setSeeAll(!seeAll)} className='bg-customBrown w-full h-[35px] rounded-b-lg items-center justify-center'>
                    {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
                </Pressable>
            </View>

        </View >
    )
}

export default FirmDoctorComp