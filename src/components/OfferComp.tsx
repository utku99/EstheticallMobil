import { View, Text, Image, Pressable } from 'react-native';
import React, { useRef, useState } from 'react';
import { SIZES } from '../constants/constants';
import DoctorArrowUpIcon from '../assets/svg/firm/DoctorArrowUpIcon';
import DoctorArrowDownIcon from '../assets/svg/firm/DoctorArrowDownIcon';
import CustomButtons from './CustomButtons';
import LikeIcon from '../assets/svg/common/LikeIcon';
import CustomInputs from './CustomInputs';
import LikeUnlikeComp from './LikeUnlikeComp';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import WebClient from '../utility/WebClient';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import ModalWrapper from './ModalWrapper';
import CommunicationModal from './CommunicationModal';
import IntLabel from './IntLabel';
import CompanyHeaderComp from './CompanyHeaderComp';
import DoctorHeaderComp from './DoctorHeaderComp';

const OfferComp = ({
  item,
  completed = false,
  setClicked,
}: {
  item?: any;
  completed?: boolean;
  setClicked: any;
}) => {
  const [seeAll, setSeeAll] = useState(false);
  const isCarousel = useRef(null);
  const [index, setIndex] = useState<any>(0);
  const [visible, setVisible] = useState(false);

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white `}
      style={{ width: SIZES.width * 0.95 }}>
      {/* header */}
      <View className="p-[10px] space-y-1">
        <Text className="text-customGray font-poppinsRegular text-xs">
          {item?.offerInfoCreatedDate}
        </Text>
        <CompanyHeaderComp
          item={item}
          setClicked={setClicked}
          rating={parseFloat(item?.commentsPoint) / 20}
          companyId={item?.companyID ?? item?.companyId}
          officeId={item?.companyOfficeID ?? item?.companyOfficeId}
          isFavorite={item?.isFavorite}
          isApproved={item?.isApprovedAccount}
        />
      </View>

      {seeAll && (
        <View className="space-y-3">
          {/* carousel */}
          <View className="w-full aspect-[1.5]">
            <Carousel
              ref={isCarousel}
              data={(item?.image ?? item?.images)?.map((img: any) => ({
                imgUrl: img,
                title: '',
              }))}
              renderItem={({ item }: any) => (
                <Image
                  source={{ uri: item?.imgUrl }}
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

            <View className="flex-1">
              <Text className="text-customGray font-poppinsMedium text-sm ">
                {IntLabel('location')}:{' '}
              </Text>
              <Text className="text-customGray font-poppinsRegular text-sm ">
                {item?.location}
              </Text>
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

            {item?.doctorBranch && (
              <>
                <View className="flex-row mb-1">
                  <Text className=" font-poppinsMedium text-sm text-customGray">
                    {IntLabel('related_doctor')}:{' '}
                  </Text>
                  <View className="h-[0.5px] bg-black/[.5] w-full self-center"></View>
                </View>

                <DoctorHeaderComp
                  item={item}
                  setClicked={setClicked}
                  rating={parseFloat(item?.doctorCommentPoint) / 20}
                  companyId={item?.companyID}
                  officeId={item?.companyOfficeID}
                  doctorId={item?.companyDoctorId}
                  isFavorite={item?.isDoctorFavorite}
                  isApproved={false}
                />
              </>
            )}

            {!completed && (
              <CustomButtons
                type="solid"
                label={IntLabel('contact')}
                icon="question"
                style={{ alignSelf: 'center' }}
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
        {/* {!seeAll && (
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
        )} */}
        {!seeAll && <View className="flex-1"></View>}
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
