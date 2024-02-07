import { View, Text, ImageBackground, TouchableOpacity, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import EstheticLogo from '../../assets/svg/common/EstheticLogo'


import ArrowDownIcon from '../../assets/svg/auth/ArrowDownIcon'
import i18next, { languageResources } from '../../locales/i18next'
import languageList from "../../locales/languageList.json"
import CustomButtons from '../../components/CustomButtons'
import ModalWrapper from '../../components/ModalWrapper'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { setGuest, setUser } from '../../redux/slices/user'
import ArrowUpWhiteIcon from '../../assets/svg/auth/ArrowUpWhiteIcon'
import ArrowDownWhiteIcon from '../../assets/svg/auth/ArrowDownWhiteIcon'
import { useRoute } from '@react-navigation/native';

interface props {
    children?: React.ReactNode
    title: string
    onPress?: any
}

const AuthWrapper: React.FC<props> = ({ children, title, onPress }) => {
    const [open, setOpen] = useState(false)
    const [visible, setVisible] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute();

    console.log(route.name);


    return (
        <ImageBackground className='flex-1 justify-center' source={require("../../assets/images/authBg/auth.jpg")} resizeMode='cover'>

            <ScrollView className='' contentContainerStyle={{ alignItems: "center", paddingHorizontal: 30, flexGrow: 1, paddingVertical: 20, justifyContent: "space-between" }}>

                {/* lang choice */}
                <View className=''>
                    <View className='self-end -mr-[10%] relative'>
                        <Pressable className='flex-row items-center gap-2 ' onPress={() => setOpen(!open)}>
                            <Text className='font-medium text-xl text-customGray font-poppins'>{i18next.language.toLocaleUpperCase()}</Text>
                            <ArrowDownIcon />
                        </Pressable>
                        {
                            open &&
                            <View className='bg-white absolute w-[100px] py-3 top-[35px] justify-between -right-5 z-50 rounded-lg border-[0.5px] border-customGray'>
                                <FlatList
                                    data={Object.keys(languageResources)}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity onPress={() => { i18next.changeLanguage(item); setOpen(false) }} className='items-center justify-center'>
                                            <Text className='text-lg text-customGray'>{languageList[item]?.nativeName}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        }
                    </View>
                    <View className='-z-10'>
                        <EstheticLogo />
                    </View>
                </View>



                <View className='w-full '>
                    <Text className='text-customGray font-medium text-xl font-poppins self-center mb-6'>{title}</Text>
                    {children}
                </View>


                <View className='w-full h-[150px] justify-between'>
                    <Pressable onPress={() => dispatch(setGuest(true))} className='flex-row items-center space-x-6 justify-center'>
                        <Text className='text-customGray font-medium text-sm font-poppins'>Üye olmadan </Text>
                        <Text className='text-customOrange font-medium text-sm font-poppins'>Devam et</Text>
                    </Pressable>
                    {
                        route.name == "login" ? (
                            <>
                                <CustomButtons type='solid' label='Giriş Yap' onPress={onPress} theme='big' />
                                <CustomButtons type='outlined' label='Üye Ol' onPress={() => setVisible(true)} theme='big' />
                            </>
                        ) : (
                            <>
                                <CustomButtons type='solid' label='Üye Ol' onPress={() => ""} theme='big' />
                                <CustomButtons type='outlined' label='Giriş Yap' onPress={() => navigation.navigate("login")} theme='big' />
                            </>
                        )
                    }

                </View>

            </ScrollView>


            <ModalWrapper visible={visible} setVisible={setVisible}>
                <Text className='text-xl text-customGray font-medium font-poppins text-center mb-6'>Yeni Üyelik</Text>
                <CustomButtons type='solid' label='Bireysel Üye Ol' theme='big' style={{ marginBottom: 24 }} onPress={() => { setVisible(false); navigation.navigate("userregister") }} />
                <View className='bg-customOrange rounded-lg '>
                    <Pressable
                        onPress={() => setDropdown(!dropdown)}
                        className='items-center justify-between px-4 h-[46px] flex-row '>
                        <View className='w-[20px]'></View>
                        <Text className={`font-medium text-white  text-lg font-poppins text-center `}>Kurumsal Üye Ol</Text>
                        <View className=''>
                            {dropdown ? <ArrowUpWhiteIcon /> : <ArrowDownWhiteIcon />}
                        </View>
                    </Pressable>
                    {dropdown && (
                        <View className='items-center'>
                            <TouchableOpacity onPress={() => { setVisible(false); setDropdown(false); navigation.navigate("firmregister", { type: 4 }) }}>
                                <Text className='font-semibold text-white  text-lg font-poppins text-center '>Doktor</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setVisible(false); setDropdown(false); navigation.navigate("firmregister", { type: 3 }) }}>
                                <Text className='font-semibold text-white  text-lg font-poppins text-center '>Klinik</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setVisible(false); setDropdown(false); navigation.navigate("firmregister", { type: 1 }) }}>
                                <Text className='font-semibold text-white  text-lg font-poppins text-center '>Hastane</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setVisible(false); setDropdown(false); navigation.navigate("firmregister", { type: 2 }) }}>
                                <Text className='font-semibold text-white  text-lg font-poppins text-center '>Güzellik Merkezi</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ModalWrapper>

        </ImageBackground>
    )
}

export default AuthWrapper