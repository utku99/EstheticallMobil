import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import EstheticLogo from '../../assets/svg/common/EstheticLogo';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    key: 1,
    image: require('../../assets/images/authBg/image1.jpg'),
    text: 'Kullanıcı yorumlarını inceleyin, en uygun çözümlere ulaşın.',
  },
  {
    key: 2,
    image: require('../../assets/images/authBg/image2.jpg'),
    text: 'Konaklama, ulaşım gibi seçeneklere sahip hazır paketler ile yenilenme sürecinizi kolayca planlayın.',
  },
  {
    key: 3,
    image: require('../../assets/images/authBg/image3.jpg'),
    text: 'Profesyonellerle iletişim kurun, tüm sorularınıza cevap bulun.',
  },
];

const WelcomePage = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<any>(0);
  const flatListRef = useRef<any>(null);

  const handleNextPage = () => {
    if (currentPage < data.length - 1) {
      setCurrentPage(currentPage + 1);
      flatListRef.current.scrollToIndex({index: currentPage + 1});
    } else {
      navigation.navigate('login');
    }
  };

  return (
    <View className="flex-1 relative">
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        onViewableItemsChanged={({viewableItems}) => {
          if (viewableItems.length > 0) {
            setCurrentPage(viewableItems[0].index || 0);
          }
        }}
        renderItem={({item}) => (
          <ImageBackground
            source={item.image}
            imageStyle={{opacity: 0.5}}
            style={{width: SIZES.width}}>
            <SafeAreaView className="flex-1 items-center justify-between z-50">
              <View className="">
                <EstheticLogo />
              </View>
              <View className="">
                <Text className="text-center font-poppinsMedium  text-xl text-customGray">
                  {item.text}
                </Text>
              </View>
              <View className=" w-[85%] ">
                <View className=" justify-center flex-row mb-[30px] space-x-3">
                  {data.map(dataItem => (
                    <Pressable
                      onPress={handleNextPage}
                      key={dataItem.key}
                      className={`w-[13px] h-[13px] ${
                        currentPage === dataItem.key - 1
                          ? 'bg-customOrange'
                          : ''
                      } border border-customGray rounded-full`}
                    />
                  ))}
                </View>
                <CustomButtons
                  type="solid"
                  label="Devam"
                  style={{marginBottom: 20}}
                  onPress={handleNextPage}
                  theme="big"
                />
                <CustomButtons
                  type="outlined"
                  label="Atla"
                  onPress={() => navigation.navigate('login')}
                  theme="big"
                />
              </View>
            </SafeAreaView>
          </ImageBackground>
        )}
      />
    </View>
  );
};

export default WelcomePage;
