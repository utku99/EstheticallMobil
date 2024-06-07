import React, { useEffect, useState } from 'react';
import FirmWrapper from './FirmWrapper';
import HandleData from '../../components/HandleData';
import WebClient, { toast } from '../../utility/WebClient';
import { Text, TextInput, View } from 'react-native';
import { SIZES } from '../../constants/constants';
import CustomInputs from '../../components/CustomInputs';
import CustomButtons from '../../components/CustomButtons';
import AddPhotoComp from '../../components/AddPhotoComp';
import LegalTextComp from '../../components/LegalTextComp';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import IntLabel from '../../components/IntLabel';
import * as Yup from 'yup';
import { messageEnum, messageTypeEnum } from '../../constants/enum';

interface props {
  route?: any;
}

const FirmCommunicationQuestion = ({ route }: props) => {
  const { Post, loading } = WebClient();
  const [services, setServices] = useState([]);
  const [company, setCompany] = useState<any>(null);
  const { user } = useSelector((state: any) => state.user);

  let warning = IntLabel('message_created_warning');

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: false,
    initialValues: {
      operation: '',
      content: '',
      checked: false,
      images: [],
    } as any,
    validationSchema: Yup.object().shape({
      operation: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      content: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      // images: Yup.array().min(1, IntLabel('photo_required')),
      checked: Yup.bool()
        .oneOf([true], IntLabel('accept_text_warning'))
        .required(IntLabel('accept_text_warning')),
    }),
    onSubmit: (values, { resetForm }) => {
      Post('/api/Chatting/FirstMessage', {
        senderId: user?.id,
        senderType: messageTypeEnum.user,
        message: values.content,
        images: values.images,
        receiverId: company.officeID == 0 ? company.value : company.officeID,
        receiverType:
          company.officeID == 0
            ? messageTypeEnum.company
            : messageTypeEnum.office,
        messageType: messageEnum.general,
        serviceId: formik.values.operation.value ?? 0,
      }).then(res => {
        if (res.data.code == '100') {
          toast(warning, 5);
          resetForm();
        } else {
          toast(res.data.message);
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/CompanyServices/WebListCompanyServices', {
      companyId: route.params?.companyId,
      companyOfficeId: route.params?.companyOfficeId,
    }).then((res: any) => {
      const newServices = res.data.object.map((item: any) => ({
        value: item.serviceId,
        label: item.serviceName,
        companyServiceID: item.companyServiceID,
      }));
      setServices(newServices);
    });

    Post('/api/Company/GetCompanyAsync', {
      companyId: route.params?.companyId,
      companyOfficeId: route.params?.companyOfficeId,
    }).then((res: any) => {
      setCompany(res.data);
    });
  }, []);

  return (
    <FirmWrapper>
      <View className=" h-full w-full" style={{ width: SIZES.width * 0.95 }}>
        <Text className="font-medium text-customGray text-base font-poppins mb-3">
          {IntLabel('contact')}
        </Text>

        <CustomInputs
          type="dropdown"
          value={company}
          dropdownData={[company]}
          style={{ width: '75%', height: 32 }}
          disable
        />

        <CustomInputs
          type="dropdown"
          dropdownData={services}
          value={formik.values.operation}
          onChange={(e: any) => formik.setFieldValue('operation', e)}
          placeholder={IntLabel('select_operation')}
          style={{ width: '75%', height: 32 }}
          error={formik.errors.operation}
        />

        <CustomInputs
          type="textareabig"
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          title={IntLabel('question_text')}
          error={formik.errors.content}
        />

        <AddPhotoComp
          value={formik.values.images}
          onChange={(e: any) => formik.setFieldValue('images', e)}
          error={formik.errors.images}
        />

        <LegalTextComp
          value={formik.values.checked}
          onChange={() =>
            formik.setFieldValue('checked', !formik.values.checked)
          }
          type="question"
          error={formik.errors.checked}
        />

        <CustomButtons
          type="iconsolid"
          label={IntLabel('send')}
          icon="send"
          theme="big"
          onPress={formik.handleSubmit}
          style={{ alignSelf: 'center' }}
        />
      </View>
    </FirmWrapper>
  );
};

export default FirmCommunicationQuestion;
