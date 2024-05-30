import {View, Text, Image, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomInputs from './CustomInputs';
import LikeIcon from '../assets/svg/common/LikeIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import LinearGradient from 'react-native-linear-gradient';
import SeeAllArrow from '../assets/svg/homepages/SeeAllArrow';
import {SIZES} from '../constants/constants';
import LikeUnlikeComp from './LikeUnlikeComp';
import IntLabel from './IntLabel';
import {useNavigation} from '@react-navigation/native';
import DoctorHeaderComp from './DoctorHeaderComp';
import CompanyHeaderComp from './CompanyHeaderComp';
import WebClient from '../utility/WebClient';
import {useSelector} from 'react-redux';

const CommentToCompanyComp = ({
  item,
  setClicked,
}: {
  item: any;
  setClicked: any;
}) => {
  const [seeAll, setSeeAll] = useState(false);
  const navigation = useNavigation();
  const [translatedText, setTranslatedText] = useState(null);
  const {Post, loading} = WebClient();
  const {language} = useSelector((state: any) => state.user);

  console.log(item);

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-4`}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="flex-row items-center space-x-3">
        <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.userLogo}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        <View className="space-y-2  flex-1">
          <View className="flex-row items-center justify-between ">
            <View className=" ">
              <Text
                numberOfLines={1}
                className="text-customGray  text-xs font-poppinsSemiBold">
                {item?.userFullName}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-xs">
                {item?.userLocation}
              </Text>
            </View>
            <View className="flex-col items-center">
              <Text className="text-xs font-poppinsRegular font-normal text-customGray mb-1">
                {IntLabel('given_point')}
              </Text>
              <CustomInputs
                type="rating"
                value={parseFloat(item?.commentPoint) / 20}
              />
            </View>
          </View>

          <View className="flex-row items-center justify-between ">
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xxs w-[30%] ">
              {item?.date}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xxs  flex-1   pl-3">
              {IntLabel('operation')}: {item?.serviceName}
            </Text>
          </View>
        </View>
      </View>

      <Text className="text-xs font-poppinsSemiBold  text-customGray">
        {item?.subject}
      </Text>

      <View>
        <Text
          className={`text-xs font-poppinsRegular text-customGray ${
            seeAll
              ? 'h-fit'
              : item?.content?.length > 400
              ? 'h-[130px]'
              : 'h-fit'
          }`}>
          {translatedText ?? item?.content}
        </Text>
        {!seeAll && item?.content?.length > 400 && (
          <LinearGradient
            colors={['rgba(255, 255, 255,  0.44)', 'rgba(255, 255, 255,1)']}
            className=" h-[50px] absolute w-full bottom-0 items-center justify-center">
            <Pressable onPress={() => setSeeAll(true)}>
              <SeeAllArrow />
            </Pressable>
          </LinearGradient>
        )}
      </View>

      <Text
        onPress={() => {
          if (translatedText) {
            setTranslatedText(null);
          } else {
            Post('/api/Common/TranslateText', {
              text: item?.content,
              targetLanguage: language?.language_code,
            }).then(res => {
              setTranslatedText(res.data.trans);
            });
          }
        }}
        className="self-end text-xs text-blue-400">
        {translatedText
          ? IntLabel('see_original')
          : loading
          ? IntLabel('loading')
          : IntLabel('see_translate')}
      </Text>

      {/* doctor */}
      <View className="">
        <Text className="text-sm font-poppinsRegular text-customGray mb-2">
          {IntLabel('performing_the_operation')}
        </Text>
        {(item?.companyDoctorsId ?? item?.companyDoctorId) == 0 ? (
          <CompanyHeaderComp
            item={item}
            setClicked={setClicked}
            rating={parseFloat(item.doctorPoint) / 20}
            companyId={item?.companyID ?? item?.companyId}
            officeId={item?.companyOfficeID}
            isFavorite={item?.isFavorite ?? item?.doctor?.isDoctorFavorite}
            isApproved={item?.isAprrovedAccount}
            showShareIcon
          />
        ) : (
          <DoctorHeaderComp
            item={item}
            setClicked={setClicked}
            rating={parseFloat(item.doctorPoint) / 20}
            companyId={item?.companyID ?? item?.companyId}
            officeId={item?.companyOfficeID}
            doctorId={item?.companyDoctorsId ?? item?.companyDoctorId}
            isFavorite={item?.isFavorite ?? item?.doctor?.isDoctorFavorite}
            isApproved={item?.isAprrovedAccount}
            showShareIcon
          />
        )}
      </View>
    </View>
  );
};

export default CommentToCompanyComp;
