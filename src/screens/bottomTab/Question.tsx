import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../user/UserWrapper';
import CustomInputs from '../../components/CustomInputs';
import {SIZES} from '../../constants/constants';
import AddPhotoComp from '../../components/AddPhotoComp';
import LegalTextComp from '../../components/LegalTextComp';
import CustomButtons from '../../components/CustomButtons';
import {useFormik} from 'formik';
import WebClient, {toast} from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import IntLabel from '../../components/IntLabel';
import {messageEnum, messageTypeEnum} from '../../constants/enum';

const Question = () => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [services, setServices] = useState([]);
  const [allCompanies, setAllCompanies] = useState(null);

  let warning = IntLabel('message_created_warning');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      institution: '',
      operation: '',
      title: '',
      content: '',
      checked: false,
      images: [],
    } as any,
    validationSchema: Yup.object().shape({
      institution: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
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
    onSubmit: (values, {resetForm}) => {
      Post('/api/Chatting/FirstMessage', {
        senderId: user?.id,
        senderType: messageTypeEnum.user,
        message: values.content,
        images: values.images,
        receiverId:
          values.institution.officeID == 0
            ? values.institution.value
            : values.institution.officeID,
        receiverType:
          values.institution.officeID == 0
            ? messageTypeEnum.company
            : messageTypeEnum.office,
        messageType: messageEnum.general,
        serviceId: formik.values.operation.value ?? 0,
      }).then(res => {
        if (res.data.code == '100') {
          toast(res.data.message);
          resetForm();
          toast(warning, 5);
        } else {
          toast(res.data.message);
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/CompanyServices/WebListCompanyServices', {
      companyId: formik.values.institution.value,
      companyOfficeId: formik.values.institution.officeID,
    }).then((res: any) => {
      if (res.data.code === '100') {
        const newServices = res.data.object.map((item: any) => ({
          value: item.serviceId,
          label: item.serviceName,
          companyServiceID: item.companyServiceID,
        }));
        setServices(newServices);
      }
    });

    Post('/api/Common/GetAllCompanies', {}).then((res: any) => {
      setAllCompanies(res.data);
    });
  }, [formik.values.institution.value]);

  return (
    <UserWrapper>
      <View className=" h-full w-full" style={{width: SIZES.width * 0.95}}>
        <Text className="font-poppinsMedium text-customGray text-base  mb-3">
          {IntLabel('ask_question')}
        </Text>

        <CustomInputs
          type="dropdown"
          dropdownData={allCompanies}
          value={formik.values.institution}
          onChange={(e: any) => {
            formik.setFieldValue('institution', e);
            formik.setFieldValue('operation', '');
          }}
          placeholder={IntLabel('select_institution')}
          style={{width: '75%', height: 32}}
          isSearchable
          error={formik.errors.institution}
        />

        <CustomInputs
          type="dropdown"
          dropdownData={services}
          value={formik.values.operation}
          onChange={(e: any) => formik.setFieldValue('operation', e)}
          placeholder={IntLabel('select_operation')}
          style={{width: '75%', height: 32}}
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
        <View className="flex-1"></View>
        <CustomButtons
          type="iconsolid"
          label={IntLabel('send')}
          icon="send"
          theme="big"
          onPress={formik.handleSubmit}
          style={{alignSelf: 'center'}}
        />
      </View>
    </UserWrapper>
  );
};

export default Question;
