import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import HandleData from '../../components/HandleData'
import PackageComp from '../../components/PackageComp'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'


interface props {
    route?: any
}



const FirmPackages = ({ route }: props) => {
    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const [packages, setPackages] = useState<any>([])

    useEffect(() => {
        const fetch = async () => {
            await Post("/api/Package/GetPackagesWeb", {
                "companyID": route.params.companyId,
                "companyOfficeID": route.params.companyOfficeId,
                "userId": user?.id ?? 0
            }).then(res => {
                setPackages(res.data.object)
            })
        }
        fetch()
    }, [])



    return (
        <FirmWrapper>

            <HandleData data={packages} loading={loading} title={"Firmanın Yorumu Bulunamadı"}>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={packages}
                    renderItem={({ item, index }) =>
                        <PackageComp key={index} item={item} />
                    }
                />

            </HandleData>


        </FirmWrapper>
    )
}

export default FirmPackages