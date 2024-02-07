import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserWrapper from './UserWrapper'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import CustomButtons from '../../components/CustomButtons'
import HandleData from '../../components/HandleData'
import UserCommentComp from '../../components/UserCommentComp'
import OfferRequestComp from '../../components/OfferRequestComp'
import OfferComp from '../../components/OfferComp'
import BackIcon from '../../assets/svg/userMenu/BackIcon'

const UserOffer = () => {

    const [activeTab, setActiveTab] = useState(1)

    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const [activeComments, setActiveComments] = useState([])
    const [selectedRequest, setSelectedRequest] = useState<any>(null)
    const [myOffers, setMyOffers] = useState<any>([])

    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        Post("/api/Offers/CurrentOffers", {
            "userID": user?.id ?? 157
        }).then(res => {
            if (res.data.code === "100") {
                setMyOffers(res.data.object)
            }
        })

        setClicked(false)

    }, [clicked])




    return (
        <UserWrapper >

            <View className='flex-row items-center mb-3 space-x-3'>
                <CustomButtons type={activeTab == 1 ? "brownsolid" : "brownoutlined"} label='Gelen Teklifler' onPress={() => setActiveTab(1)} />
                <CustomButtons type={activeTab == 2 ? "brownsolid" : "brownoutlined"} label='Kabul Edilen Teklifler' onPress={() => setActiveTab(2)} />
            </View>

            {selectedRequest &&
                <View className='flex-row items-center justify-between w-[80%] mb-3'>
                    <Text className='font-poppins text-sm font-medium text-customGray'>Teklif ID: <Text className='font-normal'>{selectedRequest?.offerID}</Text> </Text>
                    <Text className='font-poppins text-sm font-medium text-customGray'>Tarih: <Text className='font-normal'>{selectedRequest?.createdDate}</Text> </Text>
                    <Pressable onPress={() => setSelectedRequest(null)}>
                        <BackIcon />
                    </Pressable>
                </View>
            }


            {
                !selectedRequest && activeTab == 1 && (
                    <HandleData data={myOffers} loading={loading} title={"Talebiniz Bulunmamaktadır"}>
                        <FlatList
                            contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                            data={myOffers}
                            renderItem={({ item, index }) => (
                                <OfferRequestComp key={index} item={item} setClicked={setClicked} setSelectedRequest={setSelectedRequest} />
                            )
                            }
                        />
                    </HandleData>
                )
            }
            {
                selectedRequest && activeTab == 1 && (
                    <HandleData data={selectedRequest?.incomingOffers} loading={loading} title={"Talebinize Gelen Teklif Bulunamadı"}>
                        <FlatList
                            contentContainerStyle={{ display: "flex", gap: 15, paddingBottom: 20 }}
                            data={selectedRequest?.incomingOffers}
                            renderItem={({ item, index }) => (
                                <OfferComp key={index} item={item} />
                            )
                            }
                        />
                    </HandleData>
                )
            }



        </UserWrapper>
    )
}

export default UserOffer