import { View, Text, ScrollView, Modal, Pressable, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import React from 'react'
import { SIZES } from '../constants/constants'

interface props {
    visible: boolean
    setVisible: any
    children?: React.ReactNode
    title?: string
}

const ModalWrapper: React.FC<props> = ({ visible, setVisible, children, title }) => {
    return (
        <Modal
            visible={visible}
            onRequestClose={() => setVisible(false)}
            transparent
            className='bg-black'
            animationType='none'
        >
            <Pressable className='bg-black/50 w-full h-full justify-center ' onPress={() => setVisible(false)}>
                <Pressable className='bg-white rounded-lg p-4  max-h-[70%] w-[90%] self-center' onPress={(e) => e.stopPropagation()} >
                    <ScrollView >
                        {title && <Text className='text-base font-bold text-customGray font-poppins mb-5 text-center'>{title}</Text>}
                        {children}
                    </ScrollView>
                </Pressable>
            </Pressable>
        </Modal>
    )
}

export default ModalWrapper