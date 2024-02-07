import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import HeaderBackIcon from '../assets/svg/homepages/HeaderBackIcon'
import EstheticLogo from '../assets/svg/common/EstheticLogo'
import HeaderMenuIcon from '../assets/svg/homepages/HeaderMenuIcon'
import { useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native-paper'

const Header = () => {
    const navigation = useNavigation()
    return (
        <View className='bg-white flex-row items-center justify-between w-[95%] self-center h-[38px] '>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <HeaderBackIcon />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("sharings")}>
                <EstheticLogo width={133} height={38} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ""}>
                <HeaderMenuIcon />
            </TouchableOpacity>

        </View>
    )
}

export default Header