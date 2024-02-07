import React, { useEffect, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import HandleData from '../../components/HandleData'
import WebClient from '../../utility/WebClient'
import { Text, TextInput, View } from 'react-native'
import { SIZES } from '../../constants/constants'
import CustomInputs from '../../components/CustomInputs'
import { Controller, useForm } from 'react-hook-form'
import CustomButtons from '../../components/CustomButtons'
import AddPhotoComp from '../../components/AddPhotoComp'
import LegalTextComp from '../../components/LegalTextComp'
import { useNavigation } from '@react-navigation/native'

interface props {
    route?: any
}


const FirmCommunicationQuestion = ({ route }: props) => {
    const { Post, loading } = WebClient()
    const [services, setServices] = useState([])
    const [company, setCompany] = useState<any>(null)

    const navigation = useNavigation()

    useEffect(() => {
        Post("/api/CompanyServices/WebListCompanyServices", {
            "companyId": route.params?.companyId ?? 42,
            "companyOfficeId": route.params?.companyOfficeId ?? 0,
        }).then((res: any) => {
            const newServices = res.data.object.map((item: any) => ({
                value: item.serviceId,
                label: item.serviceName,
                companyServiceID: item.companyServiceID
            }))
            setServices(newServices)
        })

        Post("/api/Company/GetCompanyAsync", {
            "companyId": route.params?.companyId ?? 42,
            "companyOfficeId": route.params?.companyOfficeId ?? 0,
        }).then((res: any) => {
            setCompany(res.data)
        })

    }, [])


    const { control, handleSubmit, getValues, setValue } = useForm({
        defaultValues: {
            service: "",
            title: "",
            content: "",
            images: [],
            check: false
        }
    });

    const onSubmit = (data: any) => {
        Post("/api/Company/AddCompanyQuestionWeb", {
            "companyID": company.value,
            "officeID": company.officeID,
            "companyServicesId": data.service.value,
            "userId": 157,
            "title": data.title,
            "content": data.content,
            "images": data.images
        },).then(res => {
            console.log(res.data);

        })
    }



    return (
        <FirmWrapper>

            <View className=' h-full w-full' style={{ width: SIZES.width * 0.95 }}>

                <Text className='font-medium text-customGray text-base font-poppins mb-3'>İletişime Geç</Text>

                <CustomInputs type='dropdown' value={company} dropdownData={[company]} style={{ width: "75%", height: 32 }} disable />

                <Controller
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <CustomInputs type='dropdown' value={value} onChange={onChange} dropdownData={services} placeholder='Operasyon Seç' style={{ width: "50%", height: 32 }} error={error} />
                    )}
                    name='service'
                    rules={{ required: { value: true, message: "operasyon alanı gereklidir" }, }}
                />

                <Controller
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <CustomInputs type='textareasmall' value={value} onChange={onChange} error={error} />
                    )}
                    name='title'
                    rules={{ required: { value: true, message: "başlık alanı gereklidir" }, }}
                />

                <Controller
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <CustomInputs type='textareabig' title='Soru Metni' value={value} onChange={onChange} error={error} />
                    )}
                    name='content'
                    rules={{ required: { value: true, message: "metin alanı gereklidir" }, }}
                />

                <Controller
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <AddPhotoComp value={value} onChange={onChange} error={error} />
                    )}
                    name='images'
                    rules={{ required: { value: true, message: "resim alanı gereklidir" }, }}
                />

                <Controller
                    control={control}
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <LegalTextComp value={value} onChange={() => onChange(!value)} type='question' error={error} />
                    )}
                    name='check'
                    rules={{ required: { value: true, message: "metin onayı gereklidir" }, }}
                />

                <CustomButtons type='iconsolid' label='Soru Gönder' icon='send' theme='big' style={{ width: 180, alignSelf: "center" }} onPress={handleSubmit(onSubmit)} />

            </View>


        </FirmWrapper>
    )
}

export default FirmCommunicationQuestion