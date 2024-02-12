import { View, Text, TextInput } from 'react-native'
import React from 'react'
import UserWrapper from '../user/UserWrapper'
import CustomInputs from '../../components/CustomInputs'
import { SIZES } from '../../constants/constants'
import AddPhotoComp from '../../components/AddPhotoComp'
import LegalTextComp from '../../components/LegalTextComp'
import CustomButtons from '../../components/CustomButtons'

const Question = () => {
    return (
        <UserWrapper>

            <View className=' h-full w-full' style={{ width: SIZES.width * 0.95 }}>

                <Text className='font-medium text-customGray text-base font-poppins mb-3'>Soru Sor</Text>

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Kurum Seç' style={{ width: "75%", height: 32 }} />

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Operasyon Seç' style={{ width: "50%", height: 32 }} />

                <CustomInputs type='textareasmall' />

                <CustomInputs type='textareabig' title='Soru Metni' />

                <AddPhotoComp />

                <View className='flex-1 justify-end '>
                    <LegalTextComp value={false} onChange={() => ""} type='question' />

                    <CustomButtons type='iconsolid' label='Soru Gönder' icon='send' theme='big' style={{ width: 180, alignSelf: "center" }} />
                </View>


            </View>

        </UserWrapper>
    )
}

export default Question