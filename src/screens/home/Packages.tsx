import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HandleData from '../../components/HandleData'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import PackageComp from '../../components/PackageComp'



const Packages = () => {

    const { Post, loading } = WebClient()
    const [packages, setPackages] = useState<any>([])
    const { user } = useSelector((state: any) => state.user)
    const { country, city, town, institution, operation, suboperation, listFilters } = useSelector(state => state.filter)

    useEffect(() => {
        Post("/api/Package/GetPackagesListAsync", {
            "countryId": country?.value ?? 0,
            "cityId": city?.value ?? 0,
            "townId": town?.value ?? 0,
            "companyType": institution?.value ?? 0,
            "serviceId": operation?.value ?? 0,
            "serviceSubId": suboperation?.value ?? 0,
            "languageID": 1,
            "userID": user?.id ?? 0
        }).then((res: any) => {
            let temp = res.data.map((item: any) => ({ images: item.images.unshift(item.packageDisplayImage), ...item }));
            setPackages(temp)
        })
    }, [])


    return (
        <View className='bg-[#FAFAFA] flex-1'>
            <HandleData data={packages} loading={loading} title='Aranan Kategoride Paket Bulunamadı'>

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20, alignItems: "center" }}
                    data={packages}
                    renderItem={({ item }) =>
                        <PackageComp key={item.packageID} item={item} onClickable />
                    }
                />

            </HandleData>
        </View>
    )
}

export default Packages