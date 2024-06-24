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
import {SIZES} from '../../constants/constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import ModalWrapper from '../../components/ModalWrapper';
import HandleData from '../../components/HandleData';
import CustomInputs from '../../components/CustomInputs';
import LikeUnlikeComp from '../../components/LikeUnlikeComp';
import {setSelectedService} from '../../redux/slices/common';
import IntLabel from '../../components/IntLabel';
import {useIntl} from 'react-intl';
import Share from 'react-native-share';
import {viewedType} from '../../constants/enum';

interface props {
  children?: React.ReactNode;
}

const FirmWrapper: React.FC<props> = ({children}) => {
  const {Post} = WebClient();
  const dispatch = useDispatch();
  const intl = useIntl();
  const {user, isGuest, isLoggedIn} = useSelector((state: any) => state.user);
  const {selectedService} = useSelector((state: any) => state.common);
  const [firmLeftInfo, setFirmLeftInfo] = useState<any>();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [services, setServices] = useState<any>();
  const [loading, setLoading] = useState(true);

  const buttonData = [
    {id: 1, label: IntLabel('profile'), name: 'firmprofile'},
    {id: 2, label: IntLabel('sharings'), name: 'firmsharings'},
    {id: 3, label: IntLabel('comments'), name: 'firmcomments'},
    {id: 4, label: IntLabel('services'), name: 'firmservices'},
    {id: 5, label: IntLabel('doctors'), name: 'firmdoctors'},
    {id: 6, label: IntLabel('take_appointment'), name: 'firmappointment'},
    {id: 7, label: IntLabel('take_offer'), name: 'firmoffer'},
    {id: 8, label: IntLabel('packages'), name: 'firmpackages'},
  ];

  const buttonDataCompanyDoctor = [
    {id: 1, label: IntLabel('profile'), name: 'firmprofile'},
    {id: 2, label: IntLabel('sharings'), name: 'firmsharings'},
    {id: 3, label: IntLabel('comments'), name: 'firmcomments'},
    {id: 4, label: IntLabel('services'), name: 'firmservices'},
    {id: 5, label: IntLabel('my_informations'), name: 'firmcompanydoctorinfo'},
    {id: 6, label: IntLabel('take_appointment'), name: 'firmappointment'},
    {id: 7, label: IntLabel('take_offer'), name: 'firmoffer'},
    {id: 8, label: IntLabel('packages'), name: 'firmpackages'},
  ];

  useEffect(() => {
    Post('/api/Company/GetCompanyInfoWeb', {
      companyId: route.params?.companyId,
      companyOfficeId: route.params?.companyOfficeId,
      userId: user?.id ?? 0,
    })
      .then(res => {
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
      })
      .finally(() => {
        setLoading(false);
        setClicked(false);
      });

    Post('/api/CompanyServices/WebListCompanyServices', {
      companyId: route.params?.companyId,
      companyOfficeId: route.params?.companyOfficeId,
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
      nestedScrollEnabled
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
                // toast(
                //   intl.formatMessage({
                //     id: 'copied_clipboard',
                //     defaultMessage: 'copied_clipboard',
                //   }),
                // );
                Share.open({
                  url: `https://dev.estheticall.com/firma/profil?id=${firmLeftInfo?.companyID}&officeId=${firmLeftInfo?.companyOfficeID}`,
                });
              }}>
              <ShareIcon />
            </TouchableOpacity>
            <View>
              <LikeUnlikeComp
                isFavorite={firmLeftInfo?.isFavorite}
                tableId={
                  firmLeftInfo?.companyOfficeID == 0
                    ? firmLeftInfo?.companyID
                    : firmLeftInfo?.companyOfficeID
                }
                typeId={firmLeftInfo?.companyOfficeID == 0 ? 2 : 3}
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
                ? buttonDataCompanyDoctor
                : buttonData
            }
            renderItem={({item}) => (
              <CustomButtons
                type={route.name == item.name ? 'brownsolid' : 'brownoutlined'}
                label={item.label}
                onPress={() => {
                  const navigateTo = () =>
                    navigation.navigate(item.name, {
                      companyId: route.params.companyId,
                      companyOfficeId: route.params.companyOfficeId,
                    });

                  if (item.id == 4) {
                    setVisible(true);
                  } else if (isLoggedIn && !isGuest) {
                    navigateTo();
                  } else if (item.id == 6 || item.id == 7) {
                    toast(
                      intl.formatMessage({
                        id: 'login_required_warning',
                        defaultMessage: 'login_required_warning',
                      }),
                    );
                  } else {
                    navigateTo();
                  }
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
          <View>
            {services?.filter((item: any) => item.serviceTypeId === 4)
              ?.length == 0 ? (
              <Text className="font-poppinsRegular text-customGray text-sm">
                {IntLabel('firm_doesnt_have_esthetic_operation')}
              </Text>
            ) : (
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
                keyExtractor={item => item.value.toString()}
                contentContainerStyle={{gap: 5}}
              />
            )}
          </View>
          <Text className="font-poppinsSemiBold text-customGray text-base">
            {IntLabel('our_beauty_operations')}
          </Text>
          <View>
            {services?.filter((item: any) => item.serviceTypeId === 6)
              ?.length == 0 ? (
              <Text className="font-poppinsRegular text-customGray text-sm">
                {IntLabel('firm_doesnt_have_beauty_operation')}
              </Text>
            ) : (
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
            )}
          </View>
        </View>
      </ModalWrapper>
    </ScrollView>
  );
};

export default FirmWrapper;
