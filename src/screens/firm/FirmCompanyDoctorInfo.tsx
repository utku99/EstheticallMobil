import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {SIZES} from '../../constants/constants';
import IntLabel from '../../components/IntLabel';

interface props {
  route?: any;
}

const FirmCompanyDoctorInfo = ({route}: props) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [info, setInfo] = useState<any>({});
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/CompanyDoctor/WebCompanyDoctorInfo', {
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
      userId: user?.id ?? 0,
    }).then(res => {
      setInfo(res.data.object);
    });
  }, [language]);

  console.log(info);

  return (
    <FirmWrapper>
      <View
        className={` border border-customLightGray rounded-xl bg-white `}
        style={{width: SIZES.width * 0.95}}>
        <View className="p-[10px] space-y-3">
          <View className="flex-row flex-wrap">
            <Text className="text-sm font-poppinsSemiBold text-customGray">
              {IntLabel('operations')}:{' '}
            </Text>
            {info?.services?.map((item: any) => (
              <Text
                numberOfLines={4}
                className="text-sm font-poppinsRegular text-customGray">
                {item.serviceName},{' '}
              </Text>
            ))}
          </View>

          <View className="space-y-3">
            <Text className="text-customGray font-poppinsRegular">
              {info?.info?.description}
            </Text>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('expertise')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {info?.info?.expertises}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('education')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {info?.info?.education}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('certificates')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {info?.info?.certificates}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('awards')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {info?.info?.awards}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('memberships')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {info?.info?.memberships}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('workplace')}:
              </Text>
              <Text className="font-poppins text-sm font-normal text-customGray">
                {info?.info?.companyName}
              </Text>
            </View>
          </View>
        </View>

        {/* bottom */}
        <View className="bg-customBrown w-full h-[35px] rounded-b-lg items-center justify-center"></View>
      </View>
    </FirmWrapper>
  );
};

export default FirmCompanyDoctorInfo;
