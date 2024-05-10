import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebClient, {toast} from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import BlueTick from '../../assets/svg/common/BlueTick';
import CommunicationItem from '../../assets/svg/firm/CommunicationItem';
import ShareIcon from '../../assets/svg/firm/ShareIcon';
import UnLikeIcon from '../../assets/svg/common/UnLikeIcon';
import CustomButtons from '../../components/CustomButtons';
import {SIZES, viewedType} from '../../constants/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import ModalWrapper from '../../components/ModalWrapper';
import HandleData from '../../components/HandleData';
import CustomInputs from '../../components/CustomInputs';
import LikeUnlikeComp from '../../components/LikeUnlikeComp';
import {setSelectedService} from '../../redux/slices/common';
import IntLabel from '../../components/IntLabel';
import Clipboard from '@react-native-clipboard/clipboard';
import {useIntl} from 'react-intl';

interface props {
  children?: React.ReactNode;
}

const FirmWrapper: React.FC<props> = ({children}) => {
  const {Post, loading} = WebClient();
  const dispatch = useDispatch();
  const intl = useIntl();
  const {user, language} = useSelector((state: any) => state.user);
  const {selectedService} = useSelector((state: any) => state.common);
  const [firmLeftInfo, setFirmLeftInfo] = useState<any>();
  const route = useRoute<any>();
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [services, setServices] = useState();

  const buttonData = [
    {id: 1, label: IntLabel('profile'), name: 'firmprofile'},
    {id: 2, label: IntLabel('sharings'), name: 'firmsharings'},
    {id: 3, label: IntLabel('comments'), name: 'firmcomments'},
    {id: 4, label: IntLabel('operations'), name: 'firmservices'},
    {id: 5, label: IntLabel('doctors'), name: 'firmdoctors'},
    {id: 6, label: IntLabel('take_appointment'), name: 'firmappointment'},
    {id: 7, label: IntLabel('take_offer'), name: 'firmoffer'},
    {id: 8, label: IntLabel('packages'), name: 'firmpackages'},
  ];

  console.log(firmLeftInfo);

  useEffect(() => {
    Post('/api/Company/GetCompanyInfoWeb', {
      companyId: route.params?.companyId ?? 42,
      companyOfficeId: route.params?.companyOfficeId ?? 0,
      userId: user?.id ?? 0,
    }).then(res => {
      if (res.data.code === '100') {
        setFirmLeftInfo(res.data.object);

        Post('/api/Common/InsertView', {
          id:
            res.data.object.companyOfficeID == 0
              ? res.data.object.companyID
              : res.data.object.companyOfficeID,
          isActive: true,
          typeID:
            res.data.object.companyOfficeID == 0
              ? viewedType.company
              : viewedType.office,
          userID: user?.id ?? 0,
        }).then(res => {});
      }
    });

    Post('/api/CompanyServices/WebListCompanyServices', {
      companyId: route.params?.companyId ?? 42,
      companyOfficeId: route.params?.companyOfficeId ?? 0,
    }).then((res: any) => {
      const newServices = res.data.object.map((item: any) => ({
        value: item.serviceId,
        label: item.serviceName,
        ...item,
      }));
      setServices(newServices);
    });
  }, [clicked]);

  return (
    <ScrollView
      className="bg-[#FAFAFA] "
      contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
      <HandleData loading={loading}>
        {/* banner */}
        <View className="w-full h-[230px] relative">
          <Image
            source={{uri: firmLeftInfo?.coverPhoto}}
            className="w-full h-full"
            resizeMode="cover"
          />

          <View className="bg-white absolute p-3 rounded-lg space-y-3 left-[4%] top-[20%]">
            <Pressable
              onPress={() =>
                navigation.navigate('firmcommunication', {
                  companyId: route.params.companyId,
                  companyOfficeId: route.params.companyOfficeId,
                })
              }>
              <CommunicationItem />
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setString(
                  `https://dev.estheticall.com/firma/profil?id=${firmLeftInfo?.companyID}&officeId=${firmLeftInfo?.companyOfficeID}`,
                );
                toast(
                  intl.formatMessage({
                    id: 'copied_clipboard',
                    defaultMessage: 'copied_clipboard',
                  }),
                );
              }}>
              <ShareIcon />
            </TouchableOpacity>
            <View>
              <LikeUnlikeComp
                isFavorite={firmLeftInfo?.isFavorite}
                item={firmLeftInfo}
                setClicked={setClicked}
              />
            </View>
          </View>
        </View>

        <View className="-mt-[40px]">
          <View
            className="bg-white h-[80px] rounded-lg px-[20px] self-center flex-row items-center justify-between"
            style={{width: SIZES.width * 0.95}}>
            <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: firmLeftInfo?.logo}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="space-y-1 w-[50%]">
              <View className="flex-row items-center space-x-1">
                <Text
                  numberOfLines={1}
                  className="text-customGray text-sm font-poppinsSemiBold">
                  {firmLeftInfo?.name}
                </Text>
                {firmLeftInfo?.isApprovementCompany && <BlueTick />}
              </View>
              {(firmLeftInfo?.companyBranch ?? firmLeftInfo?.doctorBranch) && (
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-xs">
                  {firmLeftInfo?.companyBranch ?? firmLeftInfo?.doctorBranch}
                </Text>
              )}
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-xs">
                {firmLeftInfo?.location}
              </Text>
            </View>
            <View className="items-center ">
              <Text className="text-customGray font-poppinsRegular text-xs">
                {IntLabel('comments')}
              </Text>
              {/* <CustomInputs type='rating' value={firmLeftInfo?.commentsPoint / 20} /> */}
              <CustomInputs type="rating" value={3} />
            </View>
          </View>

          {/* tabs */}
          <FlatList
            className="my-4"
            data={
              firmLeftInfo?.companyTypeID == 4
                ? buttonData.filter((tab: any) => tab.id != 5)
                : buttonData
            }
            renderItem={({item}) => (
              <CustomButtons
                type={route.name == item.name ? 'brownsolid' : 'brownoutlined'}
                label={item.label}
                onPress={() => {
                  item.id == 4
                    ? setVisible(true)
                    : navigation.navigate(item.name, {
                        companyId: route.params.companyId,
                        companyOfficeId: route.params.companyOfficeId,
                      });
                }}
              />
            )}
            horizontal
            contentContainerStyle={{
              flexDirection: 'row',
              gap: 8,
              paddingHorizontal: '2%',
            }}
          />
        </View>

        <View className="self-center flex-1">{children}</View>
      </HandleData>

      <ModalWrapper visible={visible} setVisible={setVisible}>
        <View className="py-5 space-y-2 ">
          <Text className="font-poppinsSemiBold text-customGray text-base">
            {IntLabel('our_esthetic_operations')}
          </Text>
          <FlatList
            data={services}
            renderItem={({item}) =>
              item.serviceTypeId === 4 && (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('firmservices', {
                      serviceId: item.value,
                      serviceName: item.label,
                      type: item.serviceTypeId,
                      companyId: route.params.companyId,
                      companyOfficeId: route.params.companyOfficeId,
                    });
                    dispatch(setSelectedService(item));
                  }}>
                  <Text
                    className={`font-poppinsRegular  ${
                      selectedService?.value == item.value
                        ? 'text-customOrange'
                        : 'text-customGray'
                    } `}>
                    {item.label}
                  </Text>
                </Pressable>
              )
            }
            contentContainerStyle={{gap: 5}}
          />
          <Text className="font-poppinsSemiBold text-customGray text-base">
            {IntLabel('our_beauty_operations')}
          </Text>
          <FlatList
            data={services}
            renderItem={({item}) =>
              item.serviceTypeId === 6 && (
                <Pressable
                  key={item.value}
                  onPress={() => {
                    setVisible(false);
                    navigation.navigate('firmservices', {
                      serviceId: item.value,
                      serviceName: item.label,
                      type: item.serviceTypeId,
                      companyId: route.params.companyId,
                      companyOfficeId: route.params.companyOfficeId,
                    });
                    dispatch(setSelectedService(item));
                  }}>
                  <Text
                    className={`font-poppinsRegular  ${
                      selectedService?.value == item.value
                        ? 'text-customOrange'
                        : 'text-customGray'
                    } `}>
                    {item.label}
                  </Text>
                </Pressable>
              )
            }
            contentContainerStyle={{gap: 5}}
          />
        </View>
      </ModalWrapper>

      {/* item.serviceTypeId === 4? */}
    </ScrollView>
  );
};

export default FirmWrapper;
