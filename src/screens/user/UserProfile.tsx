import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserWrapper from './UserWrapper'
import { useSelector } from 'react-redux';
import WebClient from '../../utility/WebClient';
import EditIcon from '../../assets/svg/userMenu/EditIcon';
import { openPicker } from 'react-native-image-crop-picker';
import { Controller, useForm } from 'react-hook-form';
import CustomInputs from '../../components/CustomInputs';
import CustomButtons from '../../components/CustomButtons';
import HandleData from '../../components/HandleData';
import { user } from '../model/user';

const genderData = [{ value: 0, label: "Erkek" }, { value: 1, label: "Kadın" }];


const UserProfile = () => {
    const { user } = useSelector((state: any) => state.user);
    const { Post, loading } = WebClient()

    // const [userInfo, setUserInfo] = useState<any>(null)
    const [selectedImage, setSelectedImage] = useState<any>(null)
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);


    const { control, reset, handleSubmit, getValues, clearErrors, setValue, formState } = useForm<user>({
        resetOptions: { keepDirtyValues: true },
        mode: "onSubmit",
        defaultValues: async () => {
            const userInfo = await Post("/api/User/WebGetUser", { "userId": user?.id }).then(res => res.data.object)

            const countries = await Post("/api/Common/GetCountries", {}).then(res => (
                res.data.object.map((item: any) => ({
                    value: item.countryID,
                    label: item.countryName
                }))
            ))

            const cities = await Post("/api/Common/GetCities", {
                "countryID": 212
            }).then(res => (
                res.data.object.map((item: any) => ({
                    value: item.cityID,
                    label: item.name
                }))
            ))

            return {
                logo: userInfo.logo,
                name: userInfo.name,
                surname: userInfo.surname,
                email: userInfo.mail,
                nickname: userInfo.userName,
                date: userInfo.birthDate,
                gender: genderData.find(item => item.value === userInfo.gender),
                country: countries.find((item: any) => item.value === userInfo.countryId),
                city: cities.find((item: any) => item.value === userInfo.cityId),
            }
        }
    })

    const onSubmit = (values: user) => {


        // Post("/api/User/WebEditUser", {
        //     "userId": user.id,
        //     "logo": selectedImage ?? values.logo,
        //     "name": values.name,
        //     "surname": values.surname,
        //     "userName": values.nickname,
        //     "mail": values.email,
        //     "birthDate": values.date,
        //     "gender": values.gender?.value,
        //     "countryId": values.country?.value,
        //     "cityId": values.city?.value,
        // }, false, false).then(res => {
        //     console.log(res);

        //     if (res.data.code === "100") {
        //         console.log("başarılı");

        //     }
        // })
        console.log(values);

    }

    const openGalery = () => {
        openPicker({
            cropping: false,
            includeBase64: true,
            multiple: false
        }).then((image: any) => {
            setSelectedImage(image.data)
        });
    }



    return (
        <UserWrapper>

            <HandleData loading={loading}>

                <View className='items-center px-[5%] flex-1'>

                    {/* image */}
                    <View className='flex-row space-x-1 mb-6'>
                        <View className='w-[80px] h-[80px] overflow-hidden rounded-full '>
                            <Image source={{ uri: selectedImage ? `data:img/jpeg;base64,` + selectedImage?.data : getValues("logo") }} className='w-full h-full' resizeMode='cover' />
                        </View>
                        <Pressable onPress={() => openGalery()} className='self-end'>
                            <EditIcon />
                        </Pressable>
                    </View>


                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                            <CustomInputs type='text' defaultValue={value} onChangeText={onChange} placeholder='Ad' onBlur={onBlur} error={error} />
                        )}
                        name='name'
                        rules={{ required: { value: true, message: "isim alanı gereklidir" } }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                            <CustomInputs type='text' defaultValue={value} onChangeText={onChange} placeholder='Soyad' onBlur={onBlur} error={error} />

                        )}
                        name='surname'
                        rules={{ required: { value: true, message: "soyad alanı gereklidir" } }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                            <CustomInputs type='text' defaultValue={value} onChangeText={onChange} placeholder='E-Posta' onBlur={onBlur} error={error} />
                        )}
                        name='email'
                        rules={{ required: { value: true, message: "email alanı gereklidir" } }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                            <CustomInputs type='text' defaultValue={value} onChangeText={onChange} placeholder='Kullanıcı Adı' onBlur={onBlur} error={error} />
                        )}
                        name='nickname'
                        rules={{ required: { value: true, message: "kullanıcı adı alanı gereklidir" } }}
                    />
                    <Controller
                        control={control}
                        render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                            <CustomInputs type='date' value={value} onChange={onChange} placeholder='Doğum Tarihi' onBlur={onBlur} error={error} />
                        )}
                        name='date'
                        rules={{ required: { value: true, message: "tarih alanı gereklidir" } }}
                    />

                    <View className='w-full'>
                        <Controller
                            control={control}
                            render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                                <CustomInputs type='dropdown' dropdownData={genderData} value={value} onChange={onChange} placeholder='Cinsiyet' onBlur={onBlur} error={error} />

                            )}
                            name='gender'
                            rules={{ required: { value: true, message: "cinsiyet alanı gereklidir" } }}
                        />
                    </View>



                    <View className='flex-row justify-between w-full'>
                        <View className=' w-[45%]'>
                            <Controller
                                control={control}
                                render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                                    <CustomInputs type='dropdown' dropdownData={countries} value={value} onChange={onChange} placeholder='Ülke' onBlur={onBlur} error={error} isSearchable />
                                )}
                                name='country'
                                rules={{ required: { value: true, message: "ülke alanı gereklidir" } }}
                            />
                        </View>
                        <View className=' w-[45%]'>
                            <Controller
                                control={control}
                                render={({ field: { onBlur, onChange, value, }, fieldState: { error } }) => (
                                    <CustomInputs type='dropdown' dropdownData={cities} value={value} onChange={onChange} placeholder='Şehir' onBlur={onBlur} error={error} isSearchable />
                                )}
                                name='city'
                                rules={{ required: { value: true, message: "şehir alanı gereklidir" } }}
                            />
                        </View>
                    </View>

                    <View className='my-6 space-y-3'>
                        <CustomButtons type='iconsolid' label='Değişiklikleri Kaydet' icon='send' theme='big' onPress={handleSubmit(onSubmit)} />
                        <CustomButtons type='iconoutlined' label='Vazgeç' icon='send' theme='big' onPress={() => reset()} />
                    </View>


                </View>

            </HandleData>

        </UserWrapper>
    )
}

export default UserProfile