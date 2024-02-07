import { View, Text, Pressable, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import AddPhotoIcon from '../assets/svg/firm/AddPhotoIcon'
import { openPicker } from 'react-native-image-crop-picker';

import TrashIcon from '../assets/svg/firm/TrashIcon'



const AddPhotoComp = ({ value, onChange, error }: any) => {

    const openGalery = () => {
        openPicker({
            cropping: false,
            includeBase64: true,
            multiple: true
        }).then((image: any) => {
            let temp = image.map((img: any) => img.data)
            onChange(temp)
        });
    }


    return (
        <View className='space-y-5 mb-3'>
            {
                value?.length < 5 && (
                    <View>
                        <Pressable onPress={() => openGalery()}>
                            <AddPhotoIcon />
                        </Pressable>
                        {error && <Text className='text-red-400 text-xs '> {error?.message}</Text>}
                    </View>
                )
            }
            <View>
                <FlatList
                    horizontal
                    data={value}
                    contentContainerStyle={{ gap: 15 }}
                    renderItem={({ item, index }) => (
                        <View className='relative'>
                            <View className='w-[130px] h-[130px] rounded-lg border border-customLightGray overflow-hidden'>
                                <Image source={{ uri: `data:image/jpg;base64,` + item }} className='w-full h-full' />
                            </View>
                            <Pressable onPress={() => {
                                const updatedImages = value.filter((_: any, i: number) => i !== index);
                                onChange(updatedImages);
                            }}
                                className='absolute bottom-2 right-2 bg-customOrange rounded-md w-[30px] h-[30px] items-center justify-center'>
                                <TrashIcon />
                            </Pressable>
                        </View>
                    )}
                />
            </View>
        </View>
    )
}

export default AddPhotoComp