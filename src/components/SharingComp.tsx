import { View, Text, Image, Pressable, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import CustomInputs from './CustomInputs'
import LikeIcon from '../assets/svg/common/LikeIcon'
import SharingMessageIcon from '../assets/svg/homepages/SharingMessageIcon'
import SharingSaveIcon from '../assets/svg/homepages/SharingSaveIcon'
import SharingShareIcon from '../assets/svg/homepages/SharingShareIcon'
import SharingSendMessageIcon from '../assets/svg/homepages/SharingSendMessageIcon'

import Carousel, { Pagination } from 'react-native-snap-carousel';
import WebClient from '../utility/WebClient'
import { SIZES } from '../constants/constants'
import HandleData from './HandleData'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'


const CommentComp = ({ item }: any) => {

    return (
        <View className='space-y-2 '>
            <View className='flex-row items-center space-x-3'>
                <View className='w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                    <Image source={{ uri: item?.image }} className='w-full h-full' resizeMode='cover' />
                </View>
                <View>
                    <Text className='text-customGray font-poppins text-xs font-bold'>{item?.fullName}</Text>
                    <Text className='text-customGray font-poppins text-xs'>{item?.location}</Text>
                </View>
            </View>
            <Text className='text-xs text-customGray font-poppins'>{item?.comment}</Text>
            <Text className='text-xxs text-customGray font-poppins'>{item?.createdDate}</Text>
        </View>
    )
}


const SharingComp = ({ item, onClickable = false }: { item: any, onClickable?: boolean }) => {
    const [seeComments, setSeeComments] = useState(false)
    const [sharedDetail, setSharedDetail] = useState<any>(null)
    const [index, setIndex] = useState<any>(0)
    const { Post, loading } = WebClient()
    const isCarousel = useRef(null);
    const navigation = useNavigation()
    const { user } = useSelector((state: any) => state.user)


    useEffect(() => {
        Post("/api/Shared/GetSharedDetailAsync", {
            "sharedId": item?.sharedID,
            "userID": user?.id ?? 0
        }).then(res => {
            setSharedDetail(res.data)
        })

    }, [])


    return (
        <View className={`h-fit border border-customLightGray rounded-xl bg-white `} style={{ width: SIZES.width * 0.95 }}>

            {/* header */}
            <View className='flex-row justify-between items-center p-[10px]'>
                <TouchableOpacity onPress={() => onClickable && navigation.navigate("firmprofile", { companyId: item?.companyId, companyOfficeId: item?.companyOfficeId })} className='flex-row items-center w-[60%] '>
                    <View className='w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                        <Image source={{ uri: item?.logo ?? item?.parentModel?.logo }} className='w-full h-full' resizeMode='cover' />
                    </View>
                    <View className='pl-2 flex-shrink'>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs font-bold'>{item?.name ?? item?.parentModel?.name}</Text>
                        <Text numberOfLines={1} className='text-customGray font-poppins text-xs '>{item?.location ?? item?.parentModel?.location}</Text>
                    </View>
                </TouchableOpacity>
                <View className='items-center'>
                    <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                    <CustomInputs type='rating' value={Number(item?.companyPoint ?? "") / 20} />
                </View>
                <LikeIcon />
            </View>

            {/* carousel */}
            <View className='w-full aspect-[1.5]'>
                <Carousel
                    ref={isCarousel}
                    data={(item?.imagesList ?? item?.files)?.map((img: any) => ({ imgUrl: img, title: "" }))}
                    renderItem={({ item }: any) => (
                        <Image source={{ uri: item?.imgUrl }} className='w-full h-full' resizeMode='cover' />
                    )}
                    sliderWidth={SIZES.width * 0.95}
                    itemWidth={SIZES.width * 0.95}
                    loop={true}
                    enableSnap={true}
                    onSnapToItem={(i) => setIndex(i)}
                />
                <Pagination
                    dotsLength={item?.imagesList?.length ?? item?.files?.length}
                    activeDotIndex={index}
                    carouselRef={isCarousel}
                    dotStyle={{
                        width: 8,
                        height: 8,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "white"
                    }}
                    tappableDots={true}
                    dotColor='#FF8170'
                    inactiveDotColor='transparent'
                    inactiveDotScale={1}
                    containerStyle={{ position: "absolute", bottom: 0, alignSelf: "center" }}
                />
            </View>

            {/* description */}
            <View className='px-[10px] py-3 space-y-1'>
                <Text numberOfLines={2} className='text-customGray text-xs font-poppins'>{item?.description}</Text>
                <Text className='text-customGray text-xxs font-poppins'>{item?.date}</Text>
            </View>

            {/* bottom */}
            <View className={`bg-customBrown w-full h-[35px] px-[10px] rounded-b-xl flex-row items-center`}>
                <Text onPress={() => setSeeComments(!seeComments)} className='text-white text-xs font-poppins flex-1'>{seeComments ? "Yorumları Gizle" : "Yorumları Gör"}</Text>
                <View className='flex-row space-x-3 '>
                    <Pressable onPress={() => setSeeComments(!seeComments)}>
                        <SharingMessageIcon />
                    </Pressable>
                    <SharingSaveIcon />
                    <SharingShareIcon />
                </View>
            </View>

            {seeComments && (
                <View className='px-[10px] py-[16px] space-y-3 '>

                    <HandleData data={sharedDetail} loading={loading} title='Aranan Kategoride Paylaşım Yorumu Bulunamadı'>
                        <FlatList
                            data={sharedDetail}
                            renderItem={({ item }) => <CommentComp key={item.commentID} item={item} />}
                        />
                    </HandleData>


                    <View className='rounded-xl border border-customLightGray h-[40px] overflow-hidden flex-row items-center'>
                        <TextInput
                            className='placeholder flex-1'
                            placeholder='Yorumunuzu Yazın...'
                            placeholderTextColor={"#4D4A48"}
                        />
                        <SharingSendMessageIcon />
                    </View>
                </View>
            )}

        </View>
    )
}

export default SharingComp