import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import CustomInputs from '../../components/CustomInputs'
import CustomButtons from '../../components/CustomButtons'
import { SIZES } from '../../constants/constants'
import { useNavigation } from '@react-navigation/native'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import WebClient from '../../utility/WebClient'


interface props {
    route?: any
}


const FirmAppointment = ({ route }: props) => {
    const navigation = useNavigation()
    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)

    const [services, setServices] = useState([])
    const [subServices, setSubServices] = useState([])

    const [company, setCompany] = useState<any>(null)
    const [doctors, setDoctors] = useState<any>(null)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            operation: "",
            suboperation: "",
            doctor: "",
            title: "",
            content: "",
            startDate: "",
            endDate: "",
        } as {
            operation: any
            suboperation: any
            title: any
            content: any
            doctor: any
            startDate: any
            endDate: any
        },
        // validationSchema: Yup.object().shape({
        //     operation: Yup.object().required("operasyon alanı gereklidir"),
        //     title: Yup.string().required("başlık alanı gereklidir"),
        //     content: Yup.string().required("soru metni alanı gereklidir"),
        //     checked: Yup.boolean().oneOf([true], 'metni onaylamanız gerekmektedir'),
        // }),
        onSubmit: (values) => {


        }
    })

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
                "serviceID": formik.values.operation.value
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

        Post("/api/CompanyDoctor/CompanyDoctorList", {
            "companyId": route.params.companyId,
            "companyOfficeId": route.params.companyOfficeId,
        }).then((res) => {
            let temp = res.data.object.map((item: any) => (
                {
                    value: item.companyDoctorId,
                    label: item.doctorName
                }
            ))
            setDoctors(temp)
        })
    }, [formik.values.operation.value])

    console.log(doctors);


    return (
        <FirmWrapper>

            <View className=' h-full w-full' style={{ width: SIZES.width * 0.95 }}>

                <CustomInputs
                    type='dropdown'
                    value={company}
                    dropdownData={[company]}
                    style={{ width: "75%", height: 32 }}
                    disable />

                {
                    !formik.values.operation.value &&
                    <CustomInputs
                        type='dropdown'
                        dropdownData={services}
                        value={formik.values.operation}
                        onChange={(e: any) => formik.setFieldValue("operation", e)}
                        placeholder='Operasyon Seç'
                        style={{ width: "75%", height: 32 }}
                    />
                }

                {
                    formik.values.operation.value &&
                    <CustomInputs
                        type='dropdown'
                        dropdownData={subServices}
                        value={formik.values.suboperation}
                        onChange={(e: any) => formik.setFieldValue("suboperation", e)}
                        placeholder='Alt Operasyon Seç'
                        style={{ width: "75%", height: 32 }}
                    />
                }

                <CustomInputs
                    type='dropdown'
                    dropdownData={doctors}
                    value={formik.values.doctor}
                    onChange={(e: any) => formik.setFieldValue("doctor", e)}
                    placeholder='Doktor Seç'
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
                    title='Randevu Metni'
                />

                <View className='my-3'>
                    <Text className='font-medium text-customGray text-base font-poppins mb-3'>Uygun Tarih Aralığını Seçin</Text>
                    <View className='flex-row flex-wrap justify-between'>
                        <CustomInputs
                            type='date'
                            placeholder="Başlangıç Tarihi"
                            value={formik.values.startDate}
                            style={{ width: "75%" }}
                        />
                        <CustomInputs
                            type='date'
                            placeholder="Bitiş Tarihi"
                            value={formik.values.endDate}
                            style={{ width: "75%" }}
                        />
                    </View>
                </View>


                <CustomButtons
                    type='iconsolid'
                    label='Talep Gönder'
                    icon='send'
                    theme='big'
                    style={{ width: 180, alignSelf: "center" }}
                    onPress={formik.handleSubmit}
                />

            </View>


        </FirmWrapper>
    )
}

export default FirmAppointment