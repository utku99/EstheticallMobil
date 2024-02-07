import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FirmWrapper from './FirmWrapper'
import { SIZES } from '../../constants/constants'
import InstutituonIcon from '../../assets/svg/firm/InstutituonIcon'
import WebClient from '../../utility/WebClient'
import HandleData from '../../components/HandleData'
import Carousel from 'react-native-snap-carousel'
import RenderHTML from 'react-native-render-html'

interface props {
    route?: any
}

const FirmProfile = ({ route }: props) => {
    const { Post, loading } = WebClient()
    const [info, setInfo] = useState<any>()
    const isCarousel = useRef(null);

    useEffect(() => {
        Post("/api/Company/GetCompanyProfileWeb", {
            "companyId": route.params.companyId,
            "companyOfficeId": route.params.companyOfficeId,
            "companyTypeId": route.params.companyOfficeId == 0 ? 0 : 1 // şube 1 kurum 0
        }).then(res => {
            setInfo(res.data.object)
        })
    }, [])



    return (
        <FirmWrapper>

            <HandleData data={info} loading={loading} title={"Firmanın Açıklaması Bulunamadı"}>

                <View className='border border-customLightGray rounded-lg p-2 mb-3' style={{ width: SIZES.width * 0.95 }}>
                    <View className='flex-row items-center space-x-3'>
                        <InstutituonIcon />
                        <Text className='font-poppins font-medium text-sm text-customGray'>Kurumsal</Text>
                        <View className='border-b h-1 flex-1'></View>
                    </View>
                    <RenderHTML contentWidth={SIZES.width} source={{ html: info?.description }} />

                </View>

                {/* carousel */}
                <View className='h-[160px]'>
                    <Carousel
                        ref={isCarousel}
                        data={info?.images?.map((img: any) => ({ imgUrl: img, title: "" }))}
                        renderItem={({ item }: any) => (
                            <Image source={{ uri: item?.imgUrl }} className='w-full h-full' resizeMode='cover' />
                        )}
                        sliderWidth={SIZES.width * 0.95}
                        itemWidth={SIZES.width * 0.7}
                        loop={true}
                        enableSnap={true}
                        autoplay={true}
                    />
                </View>

            </HandleData>







        </FirmWrapper>
    )
}

export default FirmProfile