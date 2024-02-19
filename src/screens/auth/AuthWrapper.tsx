import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import EstheticLogo from '../../assets/svg/common/EstheticLogo';
import CustomButtons from '../../components/CustomButtons';
import ModalWrapper from '../../components/ModalWrapper';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setGuest} from '../../redux/slices/user';
import ArrowUpWhiteIcon from '../../assets/svg/auth/ArrowUpWhiteIcon';
import ArrowDownWhiteIcon from '../../assets/svg/auth/ArrowDownWhiteIcon';
import {useRoute} from '@react-navigation/native';
import LangChoiceComp from '../../components/LangChoiceComp';

interface props {
  children?: React.ReactNode;
  title: string;
  onPress?: any;
}

const AuthWrapper: React.FC<props> = ({children, title, onPress}) => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  return (
    <ImageBackground
      className="flex-1 justify-center"
      source={require('../../assets/images/authBg/auth.jpg')}
      resizeMode="cover">
      <SafeAreaView className="flex-1">
        <ScrollView
          className=""
          contentContainerStyle={{
            alignItems: 'center',
            paddingHorizontal: 30,
            flexGrow: 1,
            paddingVertical: 20,
            justifyContent: 'space-between',
          }}>
          {/* top cont */}
          <View className="relative  w-full items-center">
            <View className="absolute right-0 -top-5 ">
              <LangChoiceComp />
            </View>
            <View className="">
              <EstheticLogo />
            </View>
          </View>

          <View className="w-full ">
            <Text className="text-customGray font-poppinsMedium text-xl self-center mb-6">
              {title}
            </Text>
            {children}
          </View>

          <View className="w-full h-[150px] justify-between">
            <Pressable
              onPress={() => dispatch(setGuest(true))}
              className="flex-row items-center space-x-6 justify-center">
              <Text className="text-customGray font-poppinsMedium text-sm ">
                Üye olmadan{' '}
              </Text>
              <Text className="text-customOrange font-poppinsMedium  text-sm ">
                Devam et
              </Text>
            </Pressable>
            {route.name == 'login' ? (
              <>
                <CustomButtons
                  type="solid"
                  label="Giriş Yap"
                  onPress={onPress}
                  theme="big"
                />
                <CustomButtons
                  type="outlined"
                  label="Üye Ol"
                  onPress={() => setVisible(true)}
                  theme="big"
                />
              </>
            ) : (
              <>
                <CustomButtons
                  type="solid"
                  label="Üye Ol"
                  onPress={() => ''}
                  theme="big"
                />
                <CustomButtons
                  type="outlined"
                  label="Giriş Yap"
                  onPress={() => navigation.navigate('login')}
                  theme="big"
                />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      <ModalWrapper visible={visible} setVisible={setVisible}>
        <Text className="text-xl text-customGray font-poppinsMedium text-center mb-6">
          Yeni Üyelik
        </Text>
        <CustomButtons
          type="solid"
          label="Bireysel Üye Ol"
          theme="big"
          style={{marginBottom: 24}}
          onPress={() => {
            setVisible(false);
            navigation.navigate('userregister');
          }}
        />
        <View className="bg-customOrange rounded-lg ">
          <Pressable
            onPress={() => setDropdown(!dropdown)}
            className="items-center justify-between px-4 h-[46px] flex-row ">
            <View className="w-[20px]"></View>
            <Text
              className={`font-poppinsMedium text-white  text-xl  text-center `}>
              Kurumsal Üye Ol
            </Text>
            <View className="">
              {dropdown ? <ArrowUpWhiteIcon /> : <ArrowDownWhiteIcon />}
            </View>
          </Pressable>
          {dropdown && (
            <View className="items-center">
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 4});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg  text-center ">
                  Doktor
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 3});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg text-center ">
                  Klinik
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 1});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg text-center ">
                  Hastane
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 2});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg  text-center ">
                  Güzellik Merkezi
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ModalWrapper>
    </ImageBackground>
  );
};

export default AuthWrapper;
