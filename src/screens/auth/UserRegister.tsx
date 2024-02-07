import { View, Text } from 'react-native'
import React, { useState } from 'react'
import AuthWrapper from './AuthWrapper'
import CustomInputs from '../../components/CustomInputs'
import { useForm } from 'react-hook-form'
import LegalTextComp from '../../components/LegalTextComp'

const UserRegister = ({ }) => {

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            nickname: "",
            birthdate: "",
            gender: "",
            country: "",
            city: "",
            email: "",
            password: "",
            repassword: ""
        }
    })

    const onSubmit = (data: any) => {
        console.log(data);
    }

    return (
        <AuthWrapper title='Yeni Üyelik'>


            <CustomInputs type='text' placeholder='Adınız' />
            <CustomInputs type='text' placeholder='Soyadınız' />
            <CustomInputs type='text' placeholder='Kullanııcı Adı' />
            <CustomInputs type='date' placeholder='Doğum Tarihi' />
            <CustomInputs type='dropdown' placeholder='Cinsiyet' value={""} dropdownData={[{ label: "erkek", value: 1 }, { label: "kadın", value: 2 }]} />
            <View className='flex-row items-center justify-between'>
                <CustomInputs type='dropdown' placeholder='Ülke' value={""} dropdownData={[{ label: "erkek", value: 1 }, { label: "kadın", value: 2 }]} dropdownContainerStyle={{ width: "45%" }} />
                <CustomInputs type='dropdown' placeholder='Şehir' value={""} dropdownData={[{ label: "erkek", value: 1 }, { label: "kadın", value: 2 }]} dropdownContainerStyle={{ width: "45%" }} />
            </View>
            <CustomInputs type='text' placeholder='E-Posta' />
            <CustomInputs type='text' placeholder='Şifre' secureTextEntry />
            <CustomInputs type='text' placeholder='Şifre Tekrar' secureTextEntry />

            <LegalTextComp value={true} onChange={() => ""} type='auth' />




        </AuthWrapper>
    )
}

export default UserRegister