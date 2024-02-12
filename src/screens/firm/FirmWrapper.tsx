import { View, Text, Image, ScrollView, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import WebClient from '../../utility/WebClient'
import { useSelector } from 'react-redux'
import BlueTick from '../../assets/svg/common/BlueTick'
import CommunicationItem from '../../assets/svg/firm/CommunicationItem'
import ShareIcon from '../../assets/svg/firm/ShareIcon'
import UnLikeIcon from '../../assets/svg/common/UnLikeIcon'
import CustomButtons from '../../components/CustomButtons'
import { SIZES } from '../../constants/constants'
import { useNavigation, useRoute } from '@react-navigation/native'
import ModalWrapper from '../../components/ModalWrapper'
import HandleData from '../../components/HandleData'
import CustomInputs from '../../components/CustomInputs'
import LikeUnlikeComp from '../../components/LikeUnlikeComp'



interface props {
    children?: React.ReactNode
}


const buttonData = [
    { id: 1, label: "Profil", name: "firmprofile" },
    { id: 2, label: "Paylaşımlar", name: "firmsharings" },
    { id: 3, label: "Yorumlar", name: "firmcomments" },
    { id: 4, label: "Hizmetler", name: "firmservices" },
    { id: 5, label: "Doktorlar", name: "firmdoctors" },
    { id: 6, label: "Randevu Al", name: "firmappointment" },
    { id: 7, label: "Teklif Al", name: "firmoffer" },
    { id: 8, label: "Paketler", name: "firmpackages" },
]

const FirmWrapper: React.FC<props> = ({ children }) => {
    const { Post, loading } = WebClient()
    const { user } = useSelector((state: any) => state.user)
    const [firmLeftInfo, setFirmLeftInfo] = useState<any>()
    const route = useRoute<any>()
    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [services, setServices] = useState()


    useEffect(() => {
        Post("/api/Company/GetCompanyInfoWeb", {
            "companyId": route.params?.companyId ?? 42,
            "companyOfficeId": route.params?.companyOfficeId ?? 0,
            "userId": user?.id ?? 0,
        }).then(res => {
            setFirmLeftInfo(res.data.object)
        })

        Post("/api/CompanyServices/WebListCompanyServices", {
            "companyId": route.params?.companyId ?? 42,
            "companyOfficeId": route.params?.companyOfficeId ?? 0,
        }).then((res: any) => {
            const newServices = res.data.object.map((item: any) => (
                {
                    value: item.serviceId,
                    label: item.serviceName,
                    ...item,
                }
            ))
            setServices(newServices)
        })
    }, [clicked])


    return (
        <ScrollView className='bg-[#FAFAFA] ' contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>

            <HandleData loading={loading} >

                {/* banner */}
                <View className='w-full h-[230px] relative'>
                    <Image source={{ uri: firmLeftInfo?.coverPhoto }} className='w-full h-full' resizeMode='cover' />

                    <View className='bg-white absolute p-3 rounded-lg space-y-3 left-[4%] top-[20%]'>
                        <Pressable onPress={() => navigation.navigate("firmcommunication", { companyId: route.params.companyId, companyOfficeId: route.params.companyOfficeId })}>
                            <CommunicationItem />
                        </Pressable>
                        <ShareIcon />
                        <View>
                            <LikeUnlikeComp isFavorite={firmLeftInfo?.isFavorite} item={firmLeftInfo} setClicked={setClicked} />
                        </View>
                    </View>
                </View>


                <View className='-mt-[40px]' >

                    <View className='bg-white h-[80px] rounded-lg px-[20px] self-center flex-row items-center justify-between' style={{ width: SIZES.width * 0.95 }}>
                        <View className='w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray'>
                            <Image source={{ uri: firmLeftInfo?.logo }} className='w-full h-full' resizeMode='cover' />
                        </View>
                        <View className='space-y-1 w-[50%]'>
                            <View className='flex-row items-center space-x-1'>
                                <Text numberOfLines={1} className='text-customGray font-poppins text-sm font-bold'>{firmLeftInfo?.name}</Text>
                                <BlueTick />
                            </View>
                            <Text numberOfLines={1} className='text-customGray font-poppins text-xs'>{firmLeftInfo?.location}</Text>
                        </View>
                        <View className='items-center '>
                            <Text className='text-customGray font-poppins text-xs'>Yorumlar</Text>
                            {/* <CustomInputs type='rating' value={firmLeftInfo?.commentsPoint / 20} /> */}
                            <CustomInputs type='rating' value={3} />
                        </View>
                    </View>

                    {/* tabs */}
                    <FlatList
                        className='my-4'
                        data={buttonData}
                        renderItem={({ item }) => (
                            <CustomButtons
                                type={route.name == item.name ? "brownsolid" : "brownoutlined"}
                                label={item.label}
                                onPress={() => {
                                    item.id == 4 ? setVisible(true) : navigation.navigate(item.name, { companyId: route.params.companyId, companyOfficeId: route.params.companyOfficeId, })
                                }}
                            />
                        )}
                        horizontal
                        contentContainerStyle={{ flexDirection: "row", gap: 8, paddingLeft: "2%" }}
                    />
                </View>

                <View className='self-center flex-1' >
                    {children}
                </View>

            </HandleData>







            <ModalWrapper visible={visible} setVisible={setVisible}>
                <View className='py-5 space-y-2 '>
                    <Text className='font-poppins font-bold text-base'>Ameliyatsız Operasyonlarımız</Text>
                    <FlatList
                        data={services}
                        renderItem={({ item }) => item.serviceTypeId === 4 && (
                            <Pressable key={item.value} onPress={() => { setVisible(false); navigation.navigate("firmservices", { serviceId: item.value, serviceName: item.label, type: item.serviceTypeId, companyId: route.params.companyId, companyOfficeId: route.params.companyOfficeId }) }}>
                                <Text>{item.label}</Text>
                            </Pressable>
                        )
                        }
                        contentContainerStyle={{ gap: 5 }}
                    />
                    <Text className='font-poppins font-bold text-base'>Ameliyatlı Operasyonlarımız</Text>
                    <FlatList
                        data={services}
                        renderItem={({ item }) => item.serviceTypeId === 6 && (
                            <Pressable key={item.value} onPress={() => { setVisible(false); navigation.navigate("firmservices", { serviceId: item.value, serviceName: item.label, type: item.serviceTypeId, companyId: route.params.companyId, companyOfficeId: route.params.companyOfficeId }) }}>
                                <Text>{item.label}</Text>
                            </Pressable>
                        )
                        }
                        contentContainerStyle={{ gap: 5 }}
                    />
                </View>
            </ModalWrapper>


            {/* item.serviceTypeId === 4? */}

        </ScrollView>
    )
}

export default FirmWrapper