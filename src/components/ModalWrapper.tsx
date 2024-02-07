import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'

interface props {
    visible: boolean
    setVisible: any
    children?: React.ReactNode
    title?: string
}

const ModalWrapper: React.FC<props> = ({ visible, setVisible, children, title }) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={() => setVisible(false)}
                contentContainerStyle={{ backgroundColor: "white", marginHorizontal: 20, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 15, maxHeight: "90%" }}>
                <ScrollView className={` `} >
                    {title && <Text className='text-base font-bold text-customGray font-poppins mb-5 text-center'>{title}</Text>}
                    {children}
                </ScrollView>
            </Modal>
        </Portal>
    )
}

export default ModalWrapper