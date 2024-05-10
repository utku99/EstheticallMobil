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
import IntLabel from '../../components/IntLabel';
import {useIntl} from 'react-intl';

const WelcomePage = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState<any>(0);
  const flatListRef = useRef<any>(null);
  const intl = useIntl();

  const handleNextPage = () => {
    if (currentPage < data.length - 1) {
      setCurrentPage(currentPage + 1);
      flatListRef.current.scrollToIndex({index: currentPage + 1});
    } else {
      navigation.navigate('login');
    }
  };

  const data = [
    {
      key: 1,
      image: require('../../assets/images/authBg/auth2.jpg'),
      text: IntLabel('welcome_title_0'),
    },
    {
      key: 2,
      image: require('../../assets/images/authBg/image1.jpg'),
      text: IntLabel('welcome_title_1'),
      text2: IntLabel('welcome_title_2'),
    },
    {
      key: 3,
      image: require('../../assets/images/authBg/image2.jpg'),
      text: IntLabel('welcome_title_3'),
      text2: IntLabel('welcome_title_4'),
    },
    {
      key: 4,
      image: require('../../assets/images/authBg/image3.jpg'),
      text: IntLabel('welcome_title_5'),
      text2: IntLabel('welcome_title_6'),
    },
  ];

  return (
    <View className="flex-1 relative">
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={({viewableItems}) => {
          if (viewableItems.length > 0) {
            setCurrentPage(viewableItems[0].index || 0);
          }
        }}
        renderItem={({item}) => (
          <ImageBackground source={item.image} style={{width: SIZES.width}}>
            <SafeAreaView className="flex-1 items-center justify-between z-50 py-4">
              <View className="">
                <EstheticLogo width={165} height={47} />
              </View>
              <View className="w-[85%]">
                {item.key == 1 ? (
                  <Text className="font-poppinsSemiBold text-4xl text-customGray mb-[60px] px-4">
                    {item.text}
                  </Text>
                ) : (
                  <Text className="font-poppinsBold text-4xl text-white mb-[20px]">
                    {item.text}
                  </Text>
                )}

                {item?.text2 && (
                  <Text className="font-poppinsMedium text-base text-white mb-[20px]">
                    {item.text2}
                  </Text>
                )}

                <View className="justify-center flex-row mb-[30px] space-x-3">
                  {data.map(dataItem => (
                    <Pressable
                      onPress={handleNextPage}
                      key={dataItem.key}
                      className={`w-[13px] h-[13px] ${
                        currentPage === dataItem.key - 1
                          ? 'bg-customOrange'
                          : ''
                      } border border-white rounded-full`}
                    />
                  ))}
                </View>
                <CustomButtons
                  type="solid"
                  label={intl.formatMessage({
                    id: 'continue',
                    defaultMessage: 'continue',
                  })}
                  style={{marginBottom: 20}}
                  onPress={handleNextPage}
                  theme="big"
                />
                <CustomButtons
                  type="outlined"
                  label={intl.formatMessage({
                    id: 'skip',
                    defaultMessage: 'skip',
                  })}
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
