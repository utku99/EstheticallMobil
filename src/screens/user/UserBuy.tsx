import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserWrapper from './UserWrapper'
import HandleData from '../../components/HandleData'
import PackageComp from '../../components/PackageComp'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'

const UserBuy = () => {
    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const [packages, setPackages] = useState<any>([])

    useEffect(() => {
        const fetch = async () => {
            await Post("/api/Package/GetPackagesWeb", {
                "companyID": 42,
                "companyOfficeID": 0,
                "userId": user?.id ?? 0
            }).then(res => {
                setPackages(res.data.object)
            })
        }
        fetch()
    }, [])


    return (
        <UserWrapper title='Aldıklarım'>

            <HandleData title={"Aldığınız Paket Bulunmamaktadır"} loading={false}>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={packages}
                    renderItem={({ item, index }) =>
                        <PackageComp key={index} item={item} />
                    }
                />

            </HandleData>

        </UserWrapper>
    )
}

export default UserBuy