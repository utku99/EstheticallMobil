import { View, Text } from 'react-native'
import React from 'react'
import FirmWrapper from './FirmWrapper'
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'
import { SIZES } from '../../constants/constants'
import { useNavigation } from '@react-navigation/native'

const FirmAppointment = () => {
    const navigation = useNavigation()


    return (
        <FirmWrapper>

            <View className=' h-full w-full' style={{ width: SIZES.width * 0.95 }}>

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Kurum Seçili' style={{ width: "75%", height: 32 }} />

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Operasyon Seç' style={{ width: "50%", height: 32 }} />
                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Alt Operasyon Seç' style={{ width: "50%", height: 32 }} />

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Doktor Seç' style={{ width: "50%", height: 32 }} />

                <CustomInputs type='textareasmall' />

                <CustomInputs type='textareabig' title='Randevu Metni' />

                <View className='my-3'>
                    <Text className='font-medium text-customGray text-base font-poppins mb-3'>Uygun Tarih Aralığını Seçin</Text>
                    <View className='flex-row flex-wrap justify-between'>
                        <CustomInputs type='date' placeholder="Başlangıç Tarihi" value={new Date()} style={{ width: "75%" }} />
                        <CustomInputs type='date' placeholder="Bitiş Tarihi" value={new Date()} style={{ width: "75%" }} />
                    </View>
                </View>


                <CustomButtons type='iconsolid' label='Talep Gönder' icon='send' theme='big' style={{ width: 180, alignSelf: "center" }} onPress={() => navigation.navigate("firmappointmentpayment")} />

            </View>


        </FirmWrapper>
    )
}

export default FirmAppointment