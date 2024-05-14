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

const PackageComp = ({
  item,
  onClickable = false,
  setClicked,
  companyID,
  companyOfficeID,
}: {
  item: any;
  onClickable?: boolean;
  setClicked?: any;
  companyID?: number;
  companyOfficeID?: number;
}) => {
  const [seeAll, setSeeAll] = useState(false);
  const [index, setIndex] = useState<any>(0);
  const isCarousel = useRef(null);
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const handlePoint = () => {
    if (item?.companyPoint) {
      return item?.companyPoint?.split('/')[0] / 20;
    } else {
      return (item?.doctor?.commentPoint ?? item?.doctorCommentPoint) / 20;
    }
  };

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="flex-row justify-between items-center p-[10px]">
        <TouchableOpacity
          onPress={() =>
            onClickable &&
            navigation.navigate('firmprofile', {
              companyId: item?.companyId ?? item?.companyID,
              companyOfficeId: item?.companyOfficeId ?? item?.companyOfficeID,
            })
          }
          className="flex-row items-center w-[60%] ">
          <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{uri: item?.headerModel?.logo ?? item?.logo}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="pl-2 flex-shrink">
            <View className="flex-row items-center space-x-1">
              <Text
                numberOfLines={1}
                className="text-customGray text-xs font-poppinsSemiBold">
                {item?.headerModel?.companyName ?? item?.companyName}
              </Text>
              {(item?.isApprovedAccount ??
                item?.headerModel?.isApprovementAccount) && <BlueTick />}
            </View>

            {(item?.companyBranch ??
              item?.doctorBranch ??
              item?.headerModel?.companyBranch) && (
              <Text
                numberOfLines={1}
                className="text-customGray  text-xs font-poppinsRegular">
                {item?.companyBranch ??
                  item?.doctorBranch ??
                  item.headerModel.companyBranch}
              </Text>
            )}
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsRegular">
              {item?.headerModel?.location ?? item?.location}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-customGray font-poppinsRegular text-xxs">
            {IntLabel('comments')}
          </Text>
          <CustomInputs
            type="rating"
            value={
              Number(item?.headerModel?.commentPoint ?? item?.companyPoint) / 20
            }
          />
        </View>
        <LikeUnlikeComp
          item={item}
          setClicked={setClicked}
          isFavorite={item?.doctorIsFavorite}
        />
      </View>

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
        {IntLabel('packet_name')}:{' '}
        {item?.footerModel?.packageName ?? item?.packageName}
      </Text>

      <Text
        numberOfLines={seeAll ? 20 : 2}
        className="text-customGray text-xs font-poppinsRegular px-[10px] pb-[10px]">
        {item?.footerModel?.subject ?? item?.subject}
      </Text>

      {seeAll && (
        <>
          {item?.doctorBranch && (
            <>
              <View className="px-[10px] space-y-3 flex-row">
                <Text className="font-poppinsMedium text-sm text-customGray">
                  {IntLabel('related_doctor')}{' '}
                </Text>
                <View className="h-[0.5px] bg-black/[.5] flex-1"></View>
              </View>
              <View className="flex-row items-center p-[10px] justify-between">
                <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
                  <Image
                    source={{uri: item?.doctor?.logo ?? item?.doctorLogo}}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                </View>
                <View className=" w-[40%]">
                  <Text
                    numberOfLines={1}
                    className="text-customGray  text-xs font-poppinsSemiBold">
                    {item?.doctor?.doctorName ?? item?.doctorName}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-customGray  text-xs font-poppinsRegular">
                    {item?.doctorBranch}
                  </Text>
                  <Text
                    numberOfLines={1}
                    className="text-customGray  text-xs font-poppinsRegular">
                    {item?.doctor?.location ?? item?.doctorLocation}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-customGray font-poppinsRegular text-xs">
                    {handlePoint()}/5
                  </Text>
                  <Text className="text-customGray font-poppinsRegular text-xs">
                    {IntLabel('comments')}
                  </Text>
                </View>
                <View className="items-center space-y-2">
                  <ShareIcon />
                  <View>
                    <LikeUnlikeComp
                      item={item}
                      readOnly
                      isFavorite={
                        item?.doctor?.isFavorite ?? item?.doctorIsFavorite
                      }
                    />
                  </View>
                </View>
              </View>
            </>
          )}

          <View className="px-[10px] space-y-3 flex-row">
            <Text className="font-poppinsMedium text-sm text-customGray">
              {IntLabel('packet_content')}{' '}
            </Text>
            <View className="h-[0.5px] bg-black/[.5] flex-1"></View>
          </View>
          <RenderHTML
            source={{html: item?.footerModel?.content ?? item?.content}}
            contentWidth={SIZES.width}
          />
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
