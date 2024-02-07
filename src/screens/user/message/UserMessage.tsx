import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import UserWrapper from '../UserWrapper'
import HandleData from '../../../components/HandleData'
import MessageComp from '../../../components/MessageComp'
import DoctorMessageComp from '../../../components/DoctorMessageComp'
import UserMessageComp from '../../../components/UserMessageComp'
import SharingSendMessageIcon from '../../../assets/svg/homepages/SharingSendMessageIcon'
import AddPhotoIcon from '../../../assets/svg/userMenu/AddPhotoIcon'
import { SIZES } from '../../../constants/constants'
import { openPicker } from 'react-native-image-crop-picker'
import TrashIcon from '../../../assets/svg/firm/TrashIcon'




const UserMessage = () => {
    const [images, setImages] = useState<any>([])

    const openGalery = () => {
        openPicker({
            cropping: false,
            includeBase64: true,
            multiple: true
        }).then((image: any) => {
            let temp = image.map((img: any) => img.data)
            setImages(temp)
        });
    }

    return (
        <UserWrapper title='Mesajlar'>

            <HandleData title={"Mesajınız Bulunmamaktadır"} loading={false}>

                <View className='flex-1'>

                    <FlatList
                        className='mb-5 '
                        contentContainerStyle={{ gap: 15, }}
                        data={["", "", "", "", ""]}
                        renderItem={({ item }) => <DoctorMessageComp />}
                    />



                    <View className='space-y-1'>
                        {
                            images?.length !== 0 && (
                                <View>
                                    <FlatList
                                        horizontal
                                        data={images}
                                        contentContainerStyle={{ gap: 10 }}
                                        renderItem={({ item, index }) => (
                                            <View className='relative'>
                                                <View className='w-[60px] h-[60px] rounded-lg border border-customLightGray overflow-hidden'>
                                                    <Image source={{ uri: `data:image/jpg;base64,` + item }} className='w-full h-full' />
                                                </View>
                                                <Pressable onPress={() => {
                                                    const updatedImages = images.filter((_: any, i: number) => i !== index);
                                                    setImages(updatedImages);
                                                }}
                                                    className='absolute bottom-1 right-1 bg-customOrange rounded-md w-[24px] h-[24px] items-center justify-center'>
                                                    <TrashIcon width={14} height={17} />
                                                </Pressable>
                                            </View>
                                        )}
                                    />
                                </View>
                            )
                        }

                        <View className='flex-row gap-3  relative'>
                            <TouchableOpacity onPress={() => openGalery()}>
                                <AddPhotoIcon />
                            </TouchableOpacity>

                            <View className='rounded-xl border border-customLightGray bg-white h-[40px] overflow-hidden flex-row items-center flex-1'>
                                <TextInput
                                    className='placeholder flex-1 pl-2 '
                                    placeholder='Yorumunuzu Yazın...'
                                    placeholderTextColor={"#4D4A48"}
                                />
                                <TouchableOpacity>
                                    <SharingSendMessageIcon />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                </View>

            </HandleData>

        </UserWrapper>
    )
}

export default UserMessage