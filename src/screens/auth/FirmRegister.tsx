import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AuthWrapper from './AuthWrapper'
import CustomInputs from '../../components/CustomInputs'
import { useForm } from 'react-hook-form'
import WebClient from '../../utility/WebClient'
import LegalTextComp from '../../components/LegalTextComp'

const FirmRegister = ({ route }: any) => {

    const { Post } = WebClient()

    const [doctorTitles, setDoctorTitles] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [towns, setTowns] = useState([]);
    const [districts, setDistricts] = useState([]);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            name: "",
            surname: "",
            nickname: "",
            birthdate: "",
            gender: "",
            country: "",
            city: "",
            email: "",
            password: "",
            repassword: ""
        }
    })

    const onSubmit = (data: any) => {
        console.log(data);
    }


    useEffect(() => {
        Post("/api/CompanyDoctor/ListTitles", {}).then(res => {
            if (res.data.code === "100") {
                const titles = res.data.object.map((item: any) => ({
                    value: item.titleId,
                    label: item.titleName
                }));
                setDoctorTitles(titles);
            }
        })

        Post("/api/Common/GetCountriesAsync", {}).then(res => {
            const countries = res.data.map((item: any) => ({
                value: item.countryID,
                label: item.countryName
            }));
            setCountries(countries);
        }).finally(() => {
            getCities()
        })

        const getCities = () => {
            Post("/api/Common/GetCitiesAsync", {
                "countryID": 212
            }).then(res => {
                const cities = res.data.map((item: any) => ({
                    value: item.cityID,
                    label: item.name
                }));
                setCities(cities);
            }).finally(() => {
                getTown()
            })
        }

        const getTown = () => {
            Post("/api/Common/GetTownsAsync", {
                "cityID": 1
            }).then(res => {
                const towns = res.data.map((item: any) => ({
                    value: item.townID,
                    label: item.name
                }));
                setTowns(towns);
            }).finally(() => {
                getDistrict()
            })
        }

        const getDistrict = () => {
            Post("/api/Common/GetDistinctsAsync", {
                "townID": 1
            }).then(res => {
                const districts = res.data.map((item: any) => ({
                    value: item.districtID,
                    label: item.name
                }));
                setDistricts(districts);
            })
        }

    }, [])


    return (
        <AuthWrapper title={`Yeni Üyelik - ${route.params.type == 1 ? "Hastane" : route.params.type == 2 ? "Güzellik Merkezi" : route.params.type == 3 ? "Klinik" : route.params.type == 4 ? "Doktor" : ""}`}>


            <CustomInputs type='text' placeholder='Adınız' />
            <CustomInputs type='text' placeholder='Soyadınız' />

            {
                route.params.type == 4
                    ?
                    <CustomInputs type='dropdown' placeholder='Ünvan' value={""} dropdownData={doctorTitles} />
                    :
                    <CustomInputs type='text' placeholder='Kurum Adı' />

            }
            <CustomInputs type='text' placeholder='Telefon' />
            <View className='flex-row items-center justify-between'>
                <CustomInputs type='dropdown' placeholder='Ülke' value={""} dropdownData={countries} dropdownContainerStyle={{ width: "45%" }} isSearchable />
                <CustomInputs type='dropdown' placeholder='Şehir' value={""} dropdownData={cities} dropdownContainerStyle={{ width: "45%" }} isSearchable />
            </View>
            <View className='flex-row items-center justify-between'>
                <CustomInputs type='dropdown' placeholder='İlçe' value={""} dropdownData={towns} dropdownContainerStyle={{ width: "45%" }} isSearchable />
                <CustomInputs type='dropdown' placeholder='Mahalle' value={""} dropdownData={districts} dropdownContainerStyle={{ width: "45%" }} isSearchable />
            </View>
            <CustomInputs type='text' placeholder='E-Posta' />
            <CustomInputs type='text' placeholder='Şifre' secureTextEntry />
            <CustomInputs type='text' placeholder='Şifre Tekrar' secureTextEntry />

            <LegalTextComp value={true} onChange={() => ""} type='auth' />



        </AuthWrapper>
    )
}

export default FirmRegister