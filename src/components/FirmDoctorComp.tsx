import {View, Text, Image, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
import LikeIcon from '../assets/svg/common/LikeIcon';
import {SIZES} from '../constants/constants';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import DoctorIcon from '../assets/svg/firm/DoctorIcon';
import CertificateIcon from '../assets/svg/firm/CertificateIcon';
import PhotosIcon from '../assets/svg/firm/PhotosIcon';
import ArrowDownIcon from '../assets/svg/auth/ArrowDownIcon';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import RenderHTML from 'react-native-render-html';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import IntLabel from './IntLabel';
import DoctorHeaderComp from './DoctorHeaderComp';

interface props {
  item: any;
  setClicked: any;
}

const FirmDoctorComp = ({item, setClicked}: props) => {
  const [seeAll, setSeeAll] = useState(false);

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      <View className="p-[10px] space-y-3">
        <DoctorHeaderComp
          companyId={item?.headerModel?.companyId}
          doctorId={item?.headerModel?.companyDoctorId}
          isFavorite={item?.headerModel?.isFavorite}
          officeId={item?.headerModel?.companyOfficeId}
          rating={parseFloat(item?.headerModel?.commentPoint) / 20}
          setClicked={setClicked}
          item={item}
          isApproved={item?.isApprovedAccount}
        />

        <View className="h-[1px] bg-customLightGray "></View>

        <View className="flex-row flex-wrap">
          <Text className="text-sm font-poppinsSemiBold text-customGray">
            {IntLabel('operations')}:{' '}
          </Text>
          {/* <FlatList
                        data={item.services}
                        renderItem={({ item }) =>
                            <Text numberOfLines={4} className='font-poppins text-sm font-normal text-customGray'>{item.serviceName}, </Text>
                        }
                    /> */}
          {item.services.map((item: any) => (
            <Text
              numberOfLines={4}
              className="text-sm font-poppinsRegular text-customGray">
              {item.serviceName},{' '}
            </Text>
          ))}
        </View>

        {seeAll && (
          <View className="space-y-3">
            <Text className="text-customGray font-poppinsRegular">
              {item.doctorInfo.description}
            </Text>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('birthplace_date')}:{' '}
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {item.doctorInfo.birthPlaceAndYear}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('expertise')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {item.doctorInfo.expertises}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('education')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {item.doctorInfo.education}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('certificates')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {item.doctorInfo.certificates}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('awards')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {item.doctorInfo.awards}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('memberships')}:
              </Text>
              <Text className="text-customGray font-poppinsRegular">
                {item.doctorInfo.memberships}
              </Text>
            </View>
            <View>
              <Text className="text-sm font-poppinsSemiBold text-customGray">
                {IntLabel('workplace')}:
              </Text>
              <Text className="font-poppins text-sm font-normal text-customGray">
                {item.doctorInfo.companyName}
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* bottom */}
      <View className="">
        {/* <View className="h-[35px] border-t border-customLightGray flex-row ">
          <View className="h-full flex-1 flex-row items-center justify-evenly">
            <DoctorIcon />
            <Text className="font-poppinsRegular text-xs text-customGray">
              16 Yıl Deneyim
            </Text>
          </View>
          <View className="border-x border-customLightGray h-full flex-1 flex-row items-center justify-evenly">
            <CertificateIcon />
            <Text className="font-poppinsRegular text-xs text-customGray">
              2 Sertifika
            </Text>
          </View>
          <View className="flex-1 flex-row items-center justify-evenly">
            <PhotosIcon />
            <Text className="font-poppinsRegular text-xs text-customGray">
              21 Fotoğraf
            </Text>
          </View>
        </View> */}
        <Pressable
          onPress={() => setSeeAll(!seeAll)}
          className="bg-customBrown w-full h-[35px] rounded-b-lg items-center justify-center">
          {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
        </Pressable>
      </View>
    </View>
  );
};

export default FirmDoctorComp;
