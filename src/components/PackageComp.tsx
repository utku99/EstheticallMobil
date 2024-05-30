import {View, Text, TouchableOpacity, Image, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import WebClient from '../utility/WebClient';
import {SIZES, viewedType} from '../constants/constants';
import CustomInputs from './CustomInputs';
import LikeIcon from '../assets/svg/common/LikeIcon';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import RenderHTML from 'react-native-render-html';
import CustomButtons from './CustomButtons';
import LikeUnlikeComp from './LikeUnlikeComp';
import {useFormik} from 'formik';
import CommunicationModal from './CommunicationModal';
import IntLabel from './IntLabel';
import BlueTick from '../assets/svg/common/BlueTick';
import CompanyHeaderComp from './CompanyHeaderComp';
import DoctorHeaderComp from './DoctorHeaderComp';

const PackageComp = ({item, setClicked}: {item: any; setClicked: any}) => {
  const [seeAll, setSeeAll] = useState(false);
  const [index, setIndex] = useState<any>(0);
  const isCarousel = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const {Post, loading} = WebClient();
  const {user, language} = useSelector((state: any) => state.user);
  const [translatedText, setTranslatedText] = useState(null);

  console.log(item);

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white overflow-hidden`}
      style={{width: SIZES.width * 0.95}}>
      <CompanyHeaderComp
        item={item?.headerModel ?? item}
        setClicked={setClicked}
        rating={
          parseFloat(item?.headerModel?.commentPoint ?? item?.companyPoint) / 20
        }
        companyId={item?.companyID ?? item?.headerModel?.companyID}
        officeId={item?.companyOfficeID ?? item?.headerModel?.companyOfficeID}
        isFavorite={item?.isFavorite ?? item?.headerModel?.isFavorite}
        isApproved={
          item?.isApprovedAccount ?? item?.headerModel?.isApprovementAccount
        }
        style={{padding: 10}}
      />

      {/* carousel */}
      <View className="w-full aspect-[1.5]">
        <Carousel
          ref={isCarousel}
          data={(item?.sliders ?? item?.images)?.map((img: any) => ({
            imgUrl: img.image ?? img,
            title: '',
          }))}
          renderItem={({item}: any) => (
            <Image
              source={{uri: item?.imgUrl}}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          sliderWidth={SIZES.width * 0.95}
          itemWidth={SIZES.width * 0.95}
          loop={true}
          enableSnap={true}
          onSnapToItem={i => setIndex(i)}
        />
        <Pagination
          dotsLength={item?.images?.length ?? item?.sliders?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'white',
          }}
          tappableDots={true}
          dotColor="#FF8170"
          inactiveDotColor="transparent"
          inactiveDotScale={1}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}
        />
      </View>

      <Text
        numberOfLines={seeAll ? 20 : 1}
        className="text-customGray text-xs font-poppinsRegular p-[10px]">
        <Text className="font-bold">{IntLabel('packet_name')}: </Text>
        {item?.footerModel?.packageName ?? item?.packageName}
      </Text>

      <Text
        numberOfLines={seeAll ? 20 : 2}
        className="text-customGray text-xs font-poppinsRegular px-[10px] pb-[10px]">
        {translatedText ?? item?.footerModel?.subject ?? item?.subject}
      </Text>

      <Text
        onPress={() => {
          if (translatedText) {
            setTranslatedText(null);
          } else {
            Post('/api/Common/TranslateText', {
              text: item?.footerModel?.subject ?? item?.subject,
              targetLanguage: language?.language_code,
            }).then(res => {
              setTranslatedText(res.data.trans);
            });
          }
        }}
        className="self-end text-xs text-blue-400 px-[10px] pb-[10px]">
        {translatedText
          ? IntLabel('see_original')
          : loading
          ? IntLabel('loading')
          : IntLabel('see_translate')}
      </Text>

      {seeAll && (
        <>
          {(item?.doctorBranch ?? item?.doctor?.doctorBranch) && (
            <>
              <View className="px-[10px] space-y-3 flex-row">
                <Text className="font-poppinsMedium text-sm text-customGray">
                  {IntLabel('related_doctor')}{' '}
                </Text>
                <View className="h-[0.5px] bg-black/[.5] flex-1"></View>
              </View>
              <DoctorHeaderComp
                item={item}
                rating={
                  parseFloat(
                    item?.doctorCommentPoint ?? item?.doctor?.commentPoint,
                  ) / 20
                }
                companyId={item?.companyID ?? item?.headerModel?.companyID}
                officeId={
                  item?.companyOfficeID ?? item?.headerModel?.companyOfficeID
                }
                doctorId={
                  item?.doctor?.companyDoctorId ?? item?.companyDoctorsId
                }
                isFavorite={item?.doctorIsFavorite ?? item?.doctor?.isFavorite}
                setClicked={setClicked}
                isApproved={false}
                style={{padding: 10}}
              />
            </>
          )}

          <View className="px-[10px] space-y-3 flex-row">
            <Text className="font-poppinsMedium text-sm text-customGray">
              {IntLabel('packet_content')}{' '}
            </Text>
            <View className="h-[0.5px] bg-black/[.5] flex-1"></View>
          </View>
          <Text className="text-customGray font-poppinsRegular p-[10]">
            {item?.footerModel?.content ?? item?.content}
          </Text>
          <View className="pb-[30px]">
            <CustomButtons
              onPress={() => setVisible(true)}
              type="solid"
              label={IntLabel('contact')}
              style={{alignSelf: 'center'}}
              icon="question"
              theme="middle"
            />
          </View>
        </>
      )}

      {/* bottom */}
      <Pressable
        onPress={() => {
          Post('/api/Common/InsertView', {
            id: item?.packageID,
            isActive: true,
            typeID: viewedType.package,
            userID: user?.id ?? 0,
          }).then(res => {});
          setSeeAll(!seeAll);
        }}
        className="bg-customBrown w-full h-[35px] rounded-b-lg flex items-center justify-center">
        {/* <Text
          numberOfLines={1}
          className="font-poppinsRegular  text-xs text-white flex-1 ">
          {IntLabel('packet_price')}: {item?.footerModel?.price ?? item?.price}₺
        </Text> */}
        {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
      </Pressable>

      {/* modal */}
      <CommunicationModal
        visible={visible}
        setVisible={setVisible}
        item={item}
        title={IntLabel('contact_us_about_packet')}
        type="package"
      />
    </View>
  );
};

export default PackageComp;
