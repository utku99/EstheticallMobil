import { View, Text, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import CustomInputs from './CustomInputs';
import LikeIcon from '../assets/svg/common/LikeIcon';
import ShareIcon from '../assets/svg/homepages/ShareIcon';
import LinearGradient from 'react-native-linear-gradient';
import SeeAllArrow from '../assets/svg/homepages/SeeAllArrow';
import { SIZES } from '../constants/constants';
import TrashIcon from '../assets/svg/userMenu/TrashIcon';
import EditUserCommentIcon from '../assets/svg/userMenu/EditUserCommentIcon';
import WebClient from '../utility/WebClient';
import ModalWrapper from './ModalWrapper';
import CustomButtons from './CustomButtons';
import LikeUnlikeComp from './LikeUnlikeComp';
import { useFormik } from 'formik';
import IntLabel from './IntLabel';
import CompanyHeaderComp from './CompanyHeaderComp';
import DoctorHeaderComp from './DoctorHeaderComp';

const UserCommentComp = ({ item, setClicked }: any) => {
  const { Post } = WebClient();
  const [seeAll, setSeeAll] = useState(false);
  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState(item?.point / 20);

  const formik = useFormik({
    initialValues: {
      title: item?.subject,
      content: item?.comment,
      rating: rating,
    },
    onSubmit: values => {
      Post('/api/Company/EditUserComment', {
        commentID: item?.commentID,
        subject: values.title,
        content: values.content,
        point: values.rating * 20,
      }).then(res => {
        if (res.data.code === '100') {
          setVisible(false);
          setClicked(true);
        }
      });
    },
  });

  return (
    <View
      className={` border border-customLightGray rounded-xl bg-white p-[10px] space-y-4`}
      style={{ width: SIZES.width * 0.95 }}>
      {/* header */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center space-x-2  w-[70%]">
          <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{ uri: item?.userLogo }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-shrink">
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsSemiBold text-xs ">
              {item?.userName}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xs">
              {item?.userLocation}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xs">
              {IntLabel('operation')}: {item?.serviceName}
            </Text>
          </View>
        </View>

        <View className="space-y-2">
          <View className="flex-row items-center justify-evenly mb-2">
            {!item?.isConfirmed && (
              <Pressable onPress={() => setVisible(true)}>
                <EditUserCommentIcon />
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                Post('/api/Company/RemoveUserComment', {
                  commentID: item?.commentID,
                }).then(res => {
                  if (res.data.code === '100') {
                    setClicked(true);
                  }
                });
              }}>
              <TrashIcon />
            </Pressable>
          </View>
          <CustomInputs type="rating" value={Number(item?.point) / 20} />
          <Text className="text-customGray font-poppinsRegular text-xs text-center">
            {item?.date}
          </Text>
        </View>
      </View>

      <Text className="text-sm font-poppinsMedium  text-customGray">
        {item?.subject}
      </Text>

      <View>
        <Text
          className={`text-xs font-poppinsRegular text-customGray ${seeAll
            ? 'h-fit'
            : item?.comment?.length > 400
              ? 'h-[130px]'
              : 'h-fit'
            }`}>
          {item?.comment}
        </Text>
        {!seeAll && item?.comment?.length > 400 && (
          <LinearGradient
            colors={['rgba(255, 255, 255,  0.44)', 'rgba(255, 255, 255,1)']}
            className=" h-[50px] absolute w-full bottom-0 items-center justify-center">
            <Pressable onPress={() => setSeeAll(true)}>
              <SeeAllArrow />
            </Pressable>
          </LinearGradient>
        )}
      </View>

      {/* doctor */}
      <View className="">
        <Text className="text-sm font-poppinsRegular text-customGray mb-2">
          {IntLabel('performing_the_operation')}
        </Text>
        {(item?.companyDoctorId) == 0 ? (
          <CompanyHeaderComp
            item={item}
            setClicked={setClicked}
            rating={parseFloat(item?.doctor?.doctorCommentPoint) / 20}
            companyId={item?.companyId}
            officeId={item?.companyOfficeId}
            isFavorite={item?.doctor?.isDoctorFavorite}
            isApproved={item?.isConfirmed}
            showShareIcon
          />
        ) : (
          <DoctorHeaderComp
            item={item}
            setClicked={setClicked}
            rating={parseFloat(item?.doctor?.doctorCommentPoint) / 20}
            companyId={item?.companyId}
            officeId={item?.companyOfficeId}
            isFavorite={item?.doctor?.isDoctorFavorite}
            isApproved={false}
            showShareIcon
            doctorId={item?.companyDoctorId}
          />
        )}
      </View>

      <ModalWrapper visible={visible} setVisible={setVisible}>
        <View className="max-h-[90%]">
          <Text className="font-poppinsSemiBold text-customGray text-base text-center mb-3">
            {IntLabel('edit_comment')}
          </Text>

          <CustomInputs
            type="textareasmall"
            value={formik.values.title}
            onChangeText={formik.handleChange('title')}
          />

          <CustomInputs
            type="textareabig"
            title={IntLabel('question_text')}
            value={formik.values.content}
            onChangeText={formik.handleChange('content')}
          />

          <View className="my-3">
            <Text className="font-poppinsMedium text-customGray text-base  mb-3">
              {IntLabel('give_point')}
            </Text>
            <View className="items-start">
              <CustomInputs
                type="rating"
                value={formik.values.rating}
                onChange={(e: any) => setRating(e)}
                readonly={false}
              />
            </View>
          </View>

          <View className="flex-row items-center justify-center space-x-2">
            <CustomButtons
              type="outlined"
              label={IntLabel('cancel')}
              onPress={() => setVisible(false)}
            />
            <CustomButtons
              type="solid"
              label={IntLabel('ok')}
              onPress={formik.handleSubmit}
            />
          </View>
        </View>
      </ModalWrapper>
    </View>
  );
};

export default UserCommentComp;
