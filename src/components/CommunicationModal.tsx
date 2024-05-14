import {View, Text} from 'react-native';
import React from 'react';
import ModalWrapper from './ModalWrapper';
import CustomInputs from './CustomInputs';
import CustomButtons from './CustomButtons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import WebClient, {toast} from '../utility/WebClient';
import {useSelector} from 'react-redux';
import {messageEnum, messageTypeEnum} from '../constants/enum';
import IntLabel from './IntLabel';
import {useIntl} from 'react-intl';

interface props {
  item?: any;
  title: string;
  type: 'package' | 'offer' | 'appointment';
  visible: boolean;
  setVisible: any;
}

const CommunicationModal = ({
  visible,
  setVisible,
  item,
  title,
  type,
}: props) => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const intl = useIntl();

  console.log(item, '--');

  const handleMessageType = () => {
    if (type == 'package') return messageEnum.package;
    else if (type == 'offer') return messageEnum.offer;
    else if (type == 'appointment') return messageEnum.appointment;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: Yup.object().shape({
      // title: Yup.string().required("başlık alanı gereklidir"),
      content: Yup.string().required('lütfen mesaj girin'),
    }),
    onSubmit: values => {
      Post('/api/Chatting/FirstMessage', {
        senderId: user?.id,
        senderType: messageTypeEnum.user,
        message: values.content,
        receiverId:
          (item?.companyOfficeID ??
            item?.companyModel?.companyOfficeID ??
            item?.headerModel?.companyOfficeID) == 0
            ? item?.companyID ??
              item?.companyModel?.companyID ??
              item?.headerModel?.companyID
            : item?.companyOfficeID ??
              item?.companyModel?.companyOfficeID ??
              item?.headerModel?.companyOfficeID,
        receiverType:
          (item?.companyOfficeID ??
            item?.companyModel?.companyOfficeID ??
            item?.headerModel?.companyOfficeID) == 0
            ? messageTypeEnum.company
            : messageTypeEnum.office,
        messageType: handleMessageType(),
        serviceId: 0,
      }).then(res => {
        if (res.data.code == '100') {
          toast(
            intl.formatMessage({
              id: 'message_created_warning',
              defaultMessage: 'message_created_warning',
            }),
            5,
          );
          formik.resetForm();
          setVisible(false);
        } else {
          toast(res.data.message);
        }
      });
    },
  });

  return (
    <ModalWrapper visible={visible} setVisible={setVisible}>
      <View className="max-h-[90%]">
        <Text className="font-poppinsMedium text-customGray text-base font-poppins mb-3">
          {title}
        </Text>

        {type == 'package' && (
          <Text className="font-poppinsMedium text-customGray text-base font-poppins mb-3">
            {IntLabel('packet_name')}:{' '}
            <Text className="font-poppinsRegular">
              {item?.packageName ?? item?.footerModel?.packageName}
            </Text>
          </Text>
        )}

        {/* <CustomInputs
          type="textareasmall"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
        /> */}

        <CustomInputs
          type="textareabig"
          title={IntLabel('message_text')}
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
        />

        <View className="flex-row items-center justify-center space-x-2">
          <CustomButtons
            type="outlined"
            label={IntLabel('give_up')}
            onPress={() => setVisible(false)}
          />
          <CustomButtons
            type="solid"
            label={IntLabel('send')}
            onPress={formik.handleSubmit}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};

export default CommunicationModal;
