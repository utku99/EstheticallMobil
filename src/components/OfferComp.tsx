import {View, Text, Image, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';
import {SIZES} from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import LikeIcon from '../assets/svg/common/LikeIcon';
import CustomInputs from './CustomInputs';
import LikeUnlikeComp from './LikeUnlikeComp';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import WebClient from '../utility/WebClient';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import ModalWrapper from './ModalWrapper';
import CommunicationModal from './CommunicationModal';
import IntLabel from './IntLabel';

const OfferComp = ({
  item,
  offerID,
  completed = false,
}: {
  item?: any;
  offerID?: number;
  completed?: boolean;
}) => {
  const [seeAll, setSeeAll] = useState(false);
  const isCarousel = useRef(null);
  const [index, setIndex] = useState<any>(0);
  const [visible, setVisible] = useState(false);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    onSubmit: values => {
      Post(
        '/api/Offers/AskQuestionOffer',
        {
          userID: user?.id,
          offerID: offerID,
          offerInfoID: item?.offerInfoID,
          title: values.title,
          content: values.content,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code == '100') {
          setVisible(false);
        }
      });
    },
  });

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="p-[10px] space-y-1">
        <Text className="text-customGray font-poppinsRegular text-xs">
          {item?.offerInfoCreatedDate}
        </Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center space-x-2  w-[60%]">
            <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: item?.logo}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-shrink">
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsSemiBold text-xs ">
                {item?.name}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-xs ">
                {item?.location}
              </Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-customGray font-poppinsRegular text-xs">
              {IntLabel('comments')}
            </Text>
            <CustomInputs type="rating" value={item?.commentsPoint / 20} />
          </View>
          <LikeUnlikeComp item={item} readOnly isFavorite={item?.isFavorite} />
        </View>
      </View>

      {seeAll && (
        <View className="space-y-3">
          {/* carousel */}
          <View className="w-full aspect-[1.5]">
            <Carousel
              ref={isCarousel}
              data={item?.images?.map((img: any) => ({imgUrl: img, title: ''}))}
              renderItem={({item}: any) => (
                <Image
                  source={{uri: item?.imgUrl}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              )}
              sliderWidth={SIZES.width}
              itemWidth={SIZES.width}
              loop={true}
              enableSnap={true}
              onSnapToItem={i => setIndex(i)}
            />
            <Pagination
              dotsLength={item?.imagesList?.length ?? item?.files?.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 8,
                height: 8,
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

          <View className="px-[10px] pb-[20px] space-y-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm ">
                  {IntLabel('offer_id')}:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm ">
                  {item?.offerInfoID}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm ">
                  {IntLabel('date')}:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm ">
                  {item?.offerInfoCreatedDate}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm ">
                  {IntLabel('location')}:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm ">
                  {item?.location}
                </Text>
              </View>
              <View className="flex-1">
                <Text className="text-customGray font-poppinsMedium text-sm ">
                  {IntLabel('category')}:{' '}
                </Text>
                <Text className="text-customGray font-poppinsRegular text-sm ">
                  Hastane,klinik (sabit??)
                </Text>
              </View>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm ">
                {IntLabel('operations')}:{' '}
              </Text>
              <Text className="text-customGray font-poppinsRegular text-sm ">
                {item?.serviceName}
              </Text>
            </View>

            <View>
              <Text className="text-customGray font-poppinsMedium text-sm ">
                {IntLabel('company_desc')}:{' '}
              </Text>
              <Text className="text-customGray font-poppinsRegular text-sm ">
                {item?.description}
              </Text>
            </View>

            <View>
              <Text className="text-customOrange font-poppinsMedium text-sm ">
                {IntLabel('offer_date_range')}:{' '}
              </Text>
              <Text className="text-customOrange font-poppinsRegular text-sm ">
                {item?.offerInfoDate}
              </Text>
            </View>

            <View>
              <Text className=" font-poppinsMedium text-sm text-customGray">
                {IntLabel('special_services')}:{' '}
              </Text>
              <View className="flex-row items-center justify-between ">
                <CustomInputs
                  type="checkbox"
                  title={IntLabel('transport')}
                  value={item?.extraServices?.some(
                    (item: number) => item === 1,
                  )}
                />
                <CustomInputs
                  type="checkbox"
                  title={IntLabel('accomodation')}
                  value={item?.extraServices?.some(
                    (item: number) => item === 2,
                  )}
                />
                <CustomInputs
                  type="checkbox"
                  title={IntLabel('companion')}
                  value={item?.extraServices?.some(
                    (item: number) => item === 3,
                  )}
                />
              </View>
            </View>
            <View className="flex-row">
              <Text className=" font-poppinsMedium text-sm text-customGray">
                {IntLabel('related_doctor')}:{' '}
              </Text>
              <View className="h-[0.5px] bg-black/[.5] w-full self-center"></View>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
                <Image
                  source={{uri: item?.doctorLogo}}
                  className="w-full h-full object-cover"
                />
              </View>
              <View className="w-[40%] ">
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsSemiBold text-xs ">
                  {item?.doctorName}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-xs">
                  {item?.doctorBranch}
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-customGray font-poppinsRegular text-xs">
                  {item?.location}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-customGray font-poppinsRegular text-xs">
                  {item?.doctorCommentPoint / 20}/5
                </Text>
                <Text className="text-customGray font-poppinsRegular text-xs">
                  {IntLabel('comments')}
                </Text>
              </View>
              <LikeUnlikeComp
                item={item}
                readOnly
                isFavorite={item?.isDoctorFavorite}
              />
            </View>

            <Text className="text-customOrange font-poppinsSemiBold text-base text-center mb-3">
              {IntLabel('offer_price')}: {item?.price}{' '}
              {item?.currencyType === 1
                ? '₺'
                : item?.currencyType === 2
                ? '$'
                : '€'}
            </Text>

            {!completed && (
              <CustomButtons
                type="solid"
                label={IntLabel('contact')}
                icon="question"
                style={{alignSelf: 'center'}}
                onPress={() => setVisible(true)}
              />
            )}
          </View>
        </View>
      )}

      {/* bottom */}
      <Pressable
        onPress={() => setSeeAll(!seeAll)}
        className="bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between px-[10px]">
        {!seeAll && (
          <Text
            numberOfLines={1}
            className="font-poppinsRegular text-xs text-white flex-1">
            {IntLabel('offer_price')}: {item?.price}
            {item?.currencyType === 1
              ? '₺'
              : item?.currencyType === 2
              ? '$'
              : '€'}
          </Text>
        )}
        <View className="flex-1 items-center ">
          {seeAll ? <DoctorArrowUpIcon /> : <DoctorArrowDownIcon />}
        </View>
        {!seeAll && (
          <Text className="font-poppinsBold  text-sm text-white flex-1 text-right">
            {IntLabel('see_details')}
          </Text>
        )}
      </Pressable>

      {/* modal */}
      <CommunicationModal
        visible={visible}
        setVisible={setVisible}
        item={item}
        title={IntLabel('contact_about_offer')}
        type="offer"
      />
    </View>
  );
};

export default OfferComp;
