import React, { useEffect, useState } from 'react'
import HomeWrapper from './HomeWrapper'
import DoctorComp from '../../components/DoctorComp'
import { FlatList } from 'react-native'
import WebClient from '../../utility/WebClient'
import { useDispatch, useSelector } from 'react-redux'
import { setListFilters } from '../../redux/slices/filter'
import HandleData from '../../components/HandleData'





const List = () => {
    const { Post, loading } = WebClient()
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.user)
    const { country, city, town, institution, operation, suboperation, listFilters } = useSelector(state => state.filter)

    const [doctors, setDoctors] = useState<any>([])

    useEffect(() => {
        Post("/api/CompanyDoctor/GetDoctorListAsync", {
            "countryId": country?.value ?? 0,
            "cityId": city?.value ?? 0,
            "townId": town?.value ?? 0,
            "companyType": institution?.value ?? 0,
            "serviceId": operation?.value ?? 0,
            "serviceSubId": suboperation?.value ?? 0,
            "languageID": 1,
            "userId": user?.id ?? 0
        }).then((res: any) => {
            setDoctors(res.data)
        })

        dispatch(setListFilters(false))

    }, [listFilters])


    return (
        <HomeWrapper>

            <HandleData data={doctors} loading={loading} title='Aranan Kategoride Doktor Bulunamadı'>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={doctors}
                    renderItem={({ item }) => <DoctorComp item={item} />}
                />
            </HandleData>

        </HomeWrapper>
    )
}

export default List