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
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'

interface props {
    route?: any
}


const FirmCommunicationQuestion = ({ route }: props) => {
    const { Post, loading } = WebClient()
    const [services, setServices] = useState([])
    const [company, setCompany] = useState<any>(null)
    const { user } = useSelector((state: any) => state.user)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            operation: "",
            title: "",
            content: "",
            checked: false,
            images: [],
        } as {
            operation: any
            title: any
            content: any
            checked: boolean
            images: any
        },
        // validationSchema: Yup.object().shape({
        //     operation: Yup.object().required("operasyon alanı gereklidir"),
        //     title: Yup.string().required("başlık alanı gereklidir"),
        //     content: Yup.string().required("soru metni alanı gereklidir"),
        //     checked: Yup.boolean().oneOf([true], 'metni onaylamanız gerekmektedir'),
        // }),
        onSubmit: (values) => {
            Post("/api/Company/AddCompanyQuestionWeb", {
                "companyID": route.params?.companyId,
                "officeID": route.params?.companyOfficeId,
                "companyServicesId": values.operation.companyServiceID,
                "userId": user?.id,
                "title": values.title,
                "content": values.content,
                "images": values.images
            }, true, true).then(res => {
                if (res.data.code === "100") {
                    formik.resetForm()
                }
            })

        }
    })


    useEffect(() => {
        Post("/api/CompanyServices/WebListCompanyServices", {
            "companyId": route.params?.companyId,
            "companyOfficeId": route.params?.companyOfficeId,
        }).then((res: any) => {
            const newServices = res.data.object.map((item: any) => ({
                value: item.serviceId,
                label: item.serviceName,
                companyServiceID: item.companyServiceID
            }))
            setServices(newServices)
        })

        Post("/api/Company/GetCompanyAsync", {
            "companyId": route.params?.companyId,
            "companyOfficeId": route.params?.companyOfficeId,
        }).then((res: any) => {
            setCompany(res.data)
        })

    }, [])


    return (
        <FirmWrapper>

            <View className=' h-full w-full' style={{ width: SIZES.width * 0.95 }}>

                <Text className='font-medium text-customGray text-base font-poppins mb-3'>İletişime Geç</Text>

                <CustomInputs
                    type='dropdown'
                    value={company}
                    dropdownData={[company]}
                    style={{ width: "75%", height: 32 }}
                    disable />


                <CustomInputs
                    type='dropdown'
                    dropdownData={services}
                    value={formik.values.operation}
                    onChange={(e: any) => formik.setFieldValue("operation", e)}
                    placeholder='Operasyon Seç'
                    style={{ width: "75%", height: 32 }}
                />

                <CustomInputs
                    type='textareasmall'
                    value={formik.values.title}
                    onChangeText={formik.handleChange("title")}
                />

                <CustomInputs
                    type='textareabig'
                    value={formik.values.content}
                    onChangeText={formik.handleChange("content")}
                    title='Soru Metni'
                />

                <AddPhotoComp
                    value={formik.values.images}
                    onChange={(e: any) => formik.setFieldValue("images", e)}
                />



                <LegalTextComp
                    value={formik.values.checked}
                    onChange={() => formik.setFieldValue("checked", !formik.values.checked)}
                    type='question'
                />

                <CustomButtons
                    type='iconsolid'
                    label='Soru Gönder'
                    icon='send'
                    theme='big'
                    onPress={formik.handleSubmit}
                    style={{ alignSelf: "center" }}
                />


            </View>


        </FirmWrapper>
    )
}

export default FirmCommunicationQuestion