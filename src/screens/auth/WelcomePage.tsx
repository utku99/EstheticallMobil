import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { SIZES } from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import EstheticLogo from '../../assets/svg/common/EstheticLogo';
import { useNavigation } from '@react-navigation/native';


const WelcomePage = () => {

    const navigation = useNavigation()

    const isCarousel = useRef(null);
    const [index, setIndex] = useState<any>(0)
    const images = ["", "", ""]

    const icon = index == 0 ? require("../../assets/images/authBg/image1.jpg") : index == 1 ? require("../../assets/images/authBg/image2.jpg") : require("../../assets/images/authBg/image3.jpg")

    return (
        <View className='flex-1 relative' >

            <View className='absolute w-full h-full -z-50 left-0 top-0 ' >
                <Carousel
                    ref={isCarousel}
                    data={images}
                    renderItem={({ item }: any) => (
                        <Image source={icon} className='w-full h-full opacity-30' resizeMode='cover' />
                    )}
                    sliderWidth={SIZES.width}
                    itemWidth={SIZES.width}
                    loop={true}
                    enableSnap={true}
                    onSnapToItem={(i) => setIndex(i)}
                />
            </View>

            <View className='flex-1 items-center justify-between px-[10%] py-[5%] z-50'>
                <View className=''>
                    <EstheticLogo />
                </View>


                <Text className='text-center font-medium font-poppins text-xl text-customGray'>
                    {index == 0 ? "Kullanıcı yorumlarını inceleyin, en uygun çözümlere ulaşın." : index == 1 ? "Konaklama, ulaşım gibi seçeneklere sahip hazır paketler ile yenilenme sürecinizi kolayca planlayın." : "Profesyönellerle iletişim kurun, tüm sorularınıza cevap bulun."}
                </Text>


                <View className='w-full '>
                    <Pagination
                        dotsLength={images.length}
                        activeDotIndex={index}
                        carouselRef={isCarousel}
                        dotStyle={{
                            width: 13,
                            height: 13,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#4D4A48"
                        }}
                        tappableDots={true}
                        dotColor='#FF8170'
                        inactiveDotColor='#FFF'
                        inactiveDotScale={1}
                    />
                    <CustomButtons type='solid' label='Devam' style={{ marginBottom: 20 }}
                        onPress={() => {
                            if (index == images.length - 1) {
                                setIndex(0)
                            } else {
                                setIndex(index + 1)
                            }
                        }} theme='big' />
                    <CustomButtons type='outlined' label='Atla' onPress={() => navigation.navigate("login")} theme='big' />
                </View>

            </View>


        </View>
    )
}

export default WelcomePage