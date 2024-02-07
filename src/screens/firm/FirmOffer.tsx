import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import CustomInputs from '../../components/CustomInputs'
import WebClient from '../../utility/WebClient'
import { SIZES } from '../../constants/constants'
import { Controller, useForm } from 'react-hook-form'
import CustomButtons from '../../components/CustomButtons'
import HandleData from '../../components/HandleData'
import AddPhotoComp from '../../components/AddPhotoComp'


interface props {
    route?: any
}


const FirmOffer = ({ route }: props) => {

    const { Post, loading } = WebClient()

    const [services, setServices] = useState([])
    const [subServices, setSubServices] = useState([])

    const [company, setCompany] = useState<any>(null)

    const { control, handleSubmit, getValues } = useForm({
        defaultValues: {
            service: "",
            subservice: "",
            title: "",
            content: "",
            transport: false,
            accomodation: false,
            escort: false,
            images: [],
            startDate: "",
            endDate: "",
        }
    });

    const onSubmit = (data: any) => {
        console.log(data);
    }


    useEffect(() => {
        Post("/api/Common/CompanyServicesFilters", {
            "companyID": route.params.companyId,
            "companyOfficeID": route.params.companyOfficeId,
        }).then((res) => {
            setServices(res.data)
        }).finally(() => {
            Post("/api/Common/CompanySubServicesFilters", {
                "companyID": route.params.companyId,
                "companyOfficeID": route.params.companyOfficeId,
                "serviceID": 16
            }).then((res) => {
                setSubServices(res.data)
            })
        })

        Post("/api/Company/GetCompanyAsync", {
            "companyId": route.params.companyId,
            "companyOfficeId": route.params.companyOfficeId,
        }).then((res: any) => {
            setCompany(res.data)
        })
    }, [getValues().service])



    return (
        <FirmWrapper>

            <View className=' h-full w-full' style={{ width: SIZES.width * 0.95 }}>

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Kurum Seçili' style={{ width: "75%", height: 32 }} />

                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Operasyon Seç' style={{ width: "50%", height: 32 }} />
                <CustomInputs type='dropdown' dropdownData={[]} placeholder='Alt Operasyon Seç' style={{ width: "50%", height: 32 }} />

                <CustomInputs type='textareasmall' />

                <CustomInputs type='textareabig' title='Teklif Metni' />

                <View className='my-3'>
                    <Text className='font-medium text-customGray text-base font-poppins mb-3'>Özel Servisler</Text>
                    <View className='flex-row flex-wrap justify-between'>
                        <CustomInputs type='checkbox' title='Ulaşım' value={true} onChange={() => ""} />
                        <CustomInputs type='checkbox' title='Konaklama' value={false} onChange={() => ""} />
                        <CustomInputs type='checkbox' title='Refakatçi' value={false} onChange={() => ""} />
                    </View>
                </View>

                <View className='my-3'>
                    <Text className='font-medium text-customGray text-base font-poppins mb-3'>Uygun Tarih Aralığını Seçin</Text>
                    <View className='flex-row flex-wrap justify-between'>
                        <CustomInputs type='date' placeholder="Başlangıç Tarihi" value={new Date()} style={{ width: "75%" }} />
                        <CustomInputs type='date' placeholder="Bitiş Tarihi" value={new Date()} style={{ width: "75%" }} />
                    </View>
                </View>

                <AddPhotoComp />

                <CustomButtons type='iconsolid' label='Talep Gönder' icon='send' theme='big' style={{ width: 180, alignSelf: "center" }} />

            </View>




        </FirmWrapper>
    )
}

export default FirmOffer