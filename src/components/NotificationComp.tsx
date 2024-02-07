import { View, Text, Image } from 'react-native'
import React from 'react'
import LikeIcon from '../assets/svg/common/LikeIcon'
import { SIZES } from '../constants/constants'
import TrashIcon from '../assets/svg/userMenu/TrashIcon'
import ShareIcon from '../assets/svg/homepages/ShareIcon'

interface props {
    item?: any
}

const NotificationComp: React.FC<props> = ({ item }) => {



    return (
        <View className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-3`} style={{ width: SIZES.width * 0.95 }}>
            <View className='flex-row items-center space-x-3'>
                <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                    <Image source={{ uri: item?.logo }} className='w-full h-full' resizeMode='cover' />
                </View>
                <View>
                    <Text className='text-customGray font-poppins text-xs font-bold'>{item?.nameWithTitle}</Text>
                    <Text className='text-customGray font-poppins text-xs'>{item?.doctorBranch}</Text>
                    <Text className='text-customGray font-poppins text-xs'>{item?.doctorLocation}</Text>
                </View>
                <View className='items-center flex-1'>
                    <Text className='text-customGray font-poppins text-xs'>{item?.commentsPoint.split("/")[0] / 20}/5</Text>
                    <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                </View>
                <View className='items-center space-y-1'>
                    <ShareIcon />
                    <LikeIcon />
                </View>
            </View>
            <View className='flex-row items-center justify-between'>
                <Text className='text-customGray font-poppins text-sm'>Erkan Vural size yeni bir mesaj gönderdi.</Text>
                <TrashIcon />
            </View>
        </View >
    )
}

export default NotificationComp