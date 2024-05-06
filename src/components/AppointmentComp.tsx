import {View, Text, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import {SIZES} from '../constants/constants';
import CustomInputs from './CustomInputs';
import LikeIcon from '../assets/svg/common/LikeIcon';
import StepIndicator from 'react-native-step-indicator';
import CustomButtons from './CustomButtons';
import LikeUnlikeComp from './LikeUnlikeComp';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import WebClient from '../utility/WebClient';
import ModalWrapper from './ModalWrapper';
import CommunicationModal from './CommunicationModal';
import IntLabel from './IntLabel';

const AppointmentComp = ({item}: {item: any}) => {
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
        '/api/Appointments/AskQuestionAppointment',
        {
          userID: user?.id,
          appointmentID: item?.appointmentID,
          companyID: item?.companyModel?.companyID,
          companyOfficeID: item?.companyModel?.companyOfficeID,
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
      className={` border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      <View className="p-[10px] space-y-2">
        <Text className="text-customGray font-poppinsRegular text-xs ">
          {item?.createdDate}
        </Text>

        {/* header */}
        <View className="flex-row justify-between items-center ">
          <View className="flex-row items-center space-x-2  w-[60%]">
            <View className="w-[60px] h-[60px] overflow-hidden rounded-full border-[0.6px] border-customGray">
              <Image
                source={{uri: item?.companyModel?.companyLogo}}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-shrink">
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsSemiBold text-sm ">
                {item?.companyModel?.companyName}
              </Text>
              <Text
                numberOfLines={1}
                className="text-customGray font-poppinsRegular text-xs ">
                {item?.companyModel?.location}
              </Text>
            </View>
          </View>
          <View className="items-center">
            <Text className="text-customGray font-poppinsRegular text-xs">
              {IntLabel('comments')}
            </Text>
            <CustomInputs
              type="rating"
              value={Number(item?.companyModel?.companyPoint) / 20}
            />
          </View>
          <LikeUnlikeComp
            item={item}
            isFavorite={item?.companyModel?.isCompanyFavorite}
            readOnly
          />
        </View>

        <View>
          <Text className="text-customGray text-sm font-poppinsMedium ">
            {IntLabel('operations')}:{' '}
          </Text>
          <Text className="text-customGray  text-sm font-poppinsRegular">
            {item?.serviceName}
          </Text>
        </View>

        <View>
          <Text className="text-customGray text-sm font-poppinsMedium ">
            {IntLabel('company_desc')}:{' '}
          </Text>
          <Text
            numberOfLines={3}
            className="text-customGray  text-sm font-poppinsRegular">
            {item?.description ? item?.description : 'Açıklama yapılmadı'}
          </Text>
        </View>

        {item?.operationState == 0 ? (
          <View>
            <Text className="text-customOrange text-sm font-poppinsMedium ">
              {IntLabel('offer_date_range')}:{' '}
            </Text>
            <Text className="text-customOrange  text-sm font-poppinsRegular">
              {item?.startDate} - {item?.endDate}
            </Text>
          </View>
        ) : (
          <View>
            <Text className="text-customOrange text-sm font-poppinsMedium ">
              {IntLabel('offer_date')}:{' '}
            </Text>
            <Text className="text-customOrange  text-sm font-poppinsRegular">
              {item?.startDate} - {item?.endDate}
            </Text>
          </View>
        )}
      </View>

      {/* <StepIndicator
        customStyles={{
          stepIndicatorSize: 36,
          currentStepIndicatorSize: 36,
          stepStrokeWidth: 0,

          labelSize: 14,
          labelColor: '#A6A6A6',
          currentStepLabelColor: '#4D4A48',

          stepIndicatorLabelFontSize: 16,
          stepIndicatorLabelFinishedColor: 'white',
          stepIndicatorLabelCurrentColor: '#4D4A48',

          stepStrokeCurrentColor: '#FF8170',
          stepIndicatorCurrentColor: 'white',
          stepIndicatorFinishedColor: '#FF8170',
          separatorStrokeWidth: 1,
          currentStepStrokeWidth: 2,
          separatorFinishedColor: '#FF8170',
          separatorUnFinishedColor: '#CECECE',
          stepIndicatorUnFinishedColor: '#FF8170',
        }}
        currentPosition={item?.operationState} // 0 1 2
        labels={['Onay Bekliyor', 'Onaylandı', 'Tamamlandı']}
        stepCount={3}
      /> */}

      <CustomButtons
        onPress={() => setVisible(true)}
        type="solid"
        label={IntLabel('contact')}
        style={{alignSelf: 'center', marginVertical: 20}}
      />

      <View className="bg-customBrown w-full h-[35px] rounded-b-lg flex-row items-center justify-between"></View>

      {/* modal */}
      <CommunicationModal
        visible={visible}
        setVisible={setVisible}
        title={IntLabel('contact_about_appointment')}
        type="appointment"
        item={item}
      />
    </View>
  );
};

export default AppointmentComp;
