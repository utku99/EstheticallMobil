import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  KeyboardAvoidingView,
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
import IntLabel from '../../components/IntLabel';

interface props {
  children?: React.ReactNode;
  title: string;
  onPress?: any;
}

const AuthWrapper: React.FC<props> = ({children, title, onPress}) => {
  const [visible, setVisible] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const route = useRoute();

  return (
    <ImageBackground
      className="flex-1 justify-center"
      source={require('../../assets/images/authBg/auth2.jpg')}
      resizeMode="cover">
      <KeyboardAvoidingView className="flex-1">
        <SafeAreaView className="flex-1">
          <ScrollView
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
                <EstheticLogo width={165} height={47} />
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
                <Text className="text-customOrange font-poppinsMedium text-sm ">
                  {IntLabel('continue_without_membership')}
                </Text>
              </Pressable>
              {route.name == 'login' ? (
                <>
                  <CustomButtons
                    type="solid"
                    label={IntLabel('login')}
                    onPress={onPress}
                    theme="big"
                  />
                  <CustomButtons
                    type="outlined"
                    label={IntLabel('register')}
                    onPress={() => setVisible(true)}
                    theme="big"
                  />
                </>
              ) : (
                <>
                  <CustomButtons
                    type="solid"
                    label={IntLabel('register')}
                    onPress={onPress}
                    theme="big"
                  />
                  <CustomButtons
                    type="outlined"
                    label={IntLabel('login')}
                    onPress={() => navigation.navigate('login')}
                    theme="big"
                  />
                </>
              )}
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

      <ModalWrapper visible={visible} setVisible={setVisible}>
        <Text className="text-xl text-customGray font-poppinsMedium text-center mb-6">
          {IntLabel('new_user')}
        </Text>
        <CustomButtons
          type="solid"
          label={IntLabel('individual_register')}
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
              {IntLabel('company_register')}
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
                  {IntLabel('doctor')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 3});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg text-center ">
                  {IntLabel('clinic')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 1});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg text-center ">
                  {IntLabel('hospital')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                  setDropdown(false);
                  navigation.navigate('firmregister', {type: 2});
                }}>
                <Text className="font-poppinsMedium text-white  text-lg  text-center ">
                  {IntLabel('beauty_center')}
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
