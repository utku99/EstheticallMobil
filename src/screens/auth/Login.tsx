import { Alert, Text, View } from 'react-native'
import React, { useState } from 'react'
import AuthWrapper from './AuthWrapper'
import CustomInputs from '../../components/CustomInputs'

import { useTranslation } from 'react-i18next'

import { Control, Controller, useForm } from "react-hook-form"
import CustomButtons from '../../components/CustomButtons'
import ModalWrapper from '../../components/ModalWrapper'
import { useNavigation } from '@react-navigation/native'
import WebClient from '../../utility/WebClient'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setUser } from '../../redux/slices/user'

const Login = () => {
    const { t } = useTranslation()
    const { Post, loading } = WebClient()
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const { control, handleSubmit, } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (values: any) => {
        Post("/api/Auth/Login", {
            username: values.email,
            password: values.password,
        }, true, true)
            .then((res) => {
                if (res.data.code === "100" && res.data.object.userRoleId === 3) {
                    dispatch(setUser(res.data.object));
                    dispatch(setLoggedIn(true))
                }
            })
    }


    return (
        <AuthWrapper title="Üye Girişi" onPress={handleSubmit(onSubmit)}>

            <View className=''>
                <Controller
                    control={control}
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <CustomInputs type='text' placeholder='E-Posta' value={value} onBlur={onBlur} onChangeText={onChange} error={error} />
                    )}
                    name='email'
                    rules={{ required: { value: true, message: "email gereklidir" }, }}
                />

                <Controller
                    control={control}
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <CustomInputs type='text' placeholder='Şifre' value={value} onBlur={onBlur} onChangeText={onChange} error={error} secureTextEntry />
                    )}
                    name='password'
                    rules={{ required: { value: true, message: "şifre gereklidir" }, }}
                />
                <Text className='font-medium text-sm font-poppins text-customOrange self-end'>{t("forgot-password")}</Text>
            </View>



        </AuthWrapper>
    )
}

export default Login