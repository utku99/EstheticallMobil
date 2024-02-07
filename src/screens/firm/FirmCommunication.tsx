import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import HandleData from '../../components/HandleData'
import WebClient from '../../utility/WebClient'
import CommunicationComp from '../../components/CommunicationComp'



interface props {
    route?: any
}


const FirmCommunication = ({ route }: props) => {

    const { Post, loading } = WebClient()
    const [firmOffices, setFirmOffices] = useState<any>([])

    useEffect(() => {
        Post("/api/CompanyOffices/GetOffices", {
            "companyID": route.params.companyId,
        }).then(res => {
            setFirmOffices(res.data.object)
        })
    }, [])



    return (
        <FirmWrapper>

            <HandleData loading={loading} >

                <FlatList
                    contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                    data={firmOffices}
                    renderItem={({ item, index }) =>
                        <CommunicationComp key={index} item={item} />
                    }
                />


            </HandleData>


        </FirmWrapper>
    )
}

export default FirmCommunication