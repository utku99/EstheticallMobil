import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeWrapper from './HomeWrapper';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import WebClient from '../../utility/WebClient';
import HospitalIcon from '../../assets/svg/homepages/HospitalIcon';
import BeautyCenter from '../../assets/svg/homepages/BeautyCenter';
import ClinicIcon from '../../assets/svg/homepages/ClinicIcon';
import DoctorIcon from '../../assets/svg/homepages/DoctorIcon';
import FirmInfoLocationIcon from '../../assets/svg/homepages/FirmInfoLocationIcon';
import PhoneIcon from '../../assets/svg/homepages/PhoneIcon';
import {useDispatch, useSelector} from 'react-redux';
import {setListFilters} from '../../redux/slices/filter';
import {useNavigation} from '@react-navigation/native';

const Map = () => {
  const {Post} = WebClient();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    country,
    city,
    town,
    institution,
    operation,
    suboperation,
    listFilters,
  } = useSelector((state: any) => state.filter);

  const [companies, setCompanies] = useState<any>([]);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  useEffect(() => {
    Post('/api/Company/CompanyMapsListAsync', {
      countryId: country?.value ?? 0,
      cityId: city?.value ?? 0,
      townId: town?.value ?? 0,
      companyType: institution?.value ?? 0,
      serviceId: operation?.value ?? 0,
      serviceSubId: suboperation?.value ?? 0,
      languageID: 1,
    }).then((res: any) => {
      setCompanies(res.data);
    });

    dispatch(setListFilters(false));
  }, [listFilters]);

  const handleIcon = (id: number) => {
    if (id == 1) return <HospitalIcon />; //hospital
    else if (id == 2) return <BeautyCenter />; //beauty center
    else if (id == 3) return <ClinicIcon />; //clinic
    else if (id == 4) return <DoctorIcon />; // doctor
    else return 'https://cdn-icons-png.flaticon.com/128/684/684908.png';
  };

  return (
    <HomeWrapper>
      <ScrollView className="w-full ">
        <View className="w-full h-[400px] rounded-xl overflow-hidden">
          <MapView
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: 41.015137,
              longitude: 28.97953,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            onRegionChange={() => ''}
            className="w-full h-full">
            {companies?.map((item: any, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: Number(item.latitude),
                  longitude: Number(item.longitude),
                }}
                onPress={() => setSelectedCompany(item)}>
                {handleIcon(item.companyTypeID)}
              </Marker>
            ))}
          </MapView>
        </View>

        {selectedCompany && (
          <View className="rounded-lg bg-white border border-customLightGray w-[85%] self-center my-8 p-2 space-y-3">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('firmprofile', {
                  companyId: selectedCompany?.companyID,
                  companyOfficeId: selectedCompany?.companyOfficeID,
                })
              }
              className="flex-row items-center space-x-3">
              <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
                <Image
                  source={{uri: selectedCompany?.logo}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text className="text-customGray  text-xs font-poppinsSemiBold">
                  {selectedCompany?.name}
                </Text>
                <Text className="text-customGray  text-xs font-poppinsRegular">
                  {selectedCompany?.address}
                </Text>
              </View>
            </TouchableOpacity>
            <View className="flex-row items-center space-x-3 text">
              <FirmInfoLocationIcon />
              <Text
                className="text-customGray  text-xs font-poppinsRegular flex-shrink"
                numberOfLines={2}>
                {selectedCompany?.address}
              </Text>
            </View>
            <View className="flex-row items-center space-x-3 text">
              <PhoneIcon />
              <Text
                className="text-customGray  text-xs font-poppinsRegular"
                numberOfLines={1}>
                {selectedCompany?.phoneNumber}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </HomeWrapper>
  );
};

export default Map;
