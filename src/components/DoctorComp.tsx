import { View, Text, Image } from 'react-native'
import React from 'react'
import LikeIcon from '../assets/svg/common/LikeIcon'
import { SIZES } from '../constants/constants'

interface props {
    item?: any
}

const DoctorComp: React.FC<props> = ({ item }) => {



    return (
        <View className={` border border-customLightGray rounded-xl bg-white p-[10px] flex-row items-center justify-between`} style={{ width: SIZES.width * 0.95 }}>
            <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                <Image source={{ uri: item?.logo }} className='w-full h-full' resizeMode='cover' />
            </View>
            <View className='w-[40%] '>
                <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.nameWithTitle}</Text>
                <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.doctorBranch}</Text>
                <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{item?.doctorLocation}</Text>
            </View>
            <View className='items-center '>
                <Text className='text-customGray font-poppins text-xs'>{item?.commentsPoint.split("/")[0] / 20}/5</Text>
                <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
            </View>
            <LikeIcon />
        </View >
    )
}

export default DoctorComp 