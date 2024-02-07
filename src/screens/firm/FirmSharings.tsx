import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import HandleData from '../../components/HandleData'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import { FlatList } from 'react-native-gesture-handler'
import SharingComp from '../../components/SharingComp'

interface props {
    route?: any
}


const FirmSharings = ({ route }: props) => {

    const { Post, loading } = WebClient()
    const [sharings, setSharings] = useState<any>([])
    const { user } = useSelector((state: any) => state.user)


    useEffect(() => {
        Post("/api/Shared/GetCompanySharedDetail", {
            "companyID": route.params.companyId,
            "companyOfficeID": route.params.companyOfficeId,
            "page": 1,
            "pageSize": 5,
            "userId": user?.id ?? 0
        }).then(res => {
            setSharings(res.data)
        })
    }, [])

    return (
        <FirmWrapper>

            <HandleData data={sharings} loading={loading} title={"Firmanın Paylaşımı Bulunamadı"}>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={sharings}
                    renderItem={({ item }) =>
                        <SharingComp key={item.sharedID} item={item} />
                    }
                />


            </HandleData>


        </FirmWrapper>
    )
}

export default FirmSharings