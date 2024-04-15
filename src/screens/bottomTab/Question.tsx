import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../user/UserWrapper';
import CustomInputs from '../../components/CustomInputs';
import {SIZES} from '../../constants/constants';
import AddPhotoComp from '../../components/AddPhotoComp';
import LegalTextComp from '../../components/LegalTextComp';
import CustomButtons from '../../components/CustomButtons';
import {useFormik} from 'formik';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import {legalTextType} from '../../constants/enum';
import IntLabel from '../../components/IntLabel';

const Question = () => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [services, setServices] = useState([]);
  const [allCompanies, setAllCompanies] = useState(null);
  const [legalText, setLegalText] = useState('');

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      institution: {},
      operation: '',
      title: '',
      content: '',
      checked: false,
      images: [],
    } as {
      institution: any;
      operation: any;
      title: any;
      content: any;
      checked: boolean;
      images: any;
    },
    // validationSchema: Yup.object().shape({
    //     institution: Yup.object().required("kurum alanı gereklidir"),
    //     operation: Yup.object().required("operasyon alanı gereklidir"),
    //     title: Yup.string().required("başlık alanı gereklidir"),
    //     content: Yup.string().required("soru metni alanı gereklidir"),
    //     checked: Yup.boolean().oneOf([true], 'metni onaylamanız gerekmektedir'),
    // }),
    onSubmit: values => {
      Post(
        '/api/Company/AddCompanyQuestionWeb',
        {
          companyID: values.institution.value,
          officeID: values.institution.officeID,
          companyServicesId: values.operation.companyServiceID,
          userId: user?.id,
          title: values.title,
          content: values.content,
          images: values.images,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100') {
          formik.resetForm();
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
          onChange={(e: any) => formik.setFieldValue('institution', e)}
          placeholder={IntLabel('select_institution')}
          style={{width: '75%', height: 32}}
          isSearchable
        />

        <CustomInputs
          type="dropdown"
          dropdownData={services}
          value={formik.values.operation}
          onChange={(e: any) => formik.setFieldValue('operation', e)}
          placeholder={IntLabel('select_operation')}
          style={{width: '75%', height: 32}}
        />

        {/* <CustomInputs
          type="textareasmall"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
        /> */}

        <CustomInputs
          type="textareabig"
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          title={IntLabel('question_text')}
        />

        <AddPhotoComp
          value={formik.values.images}
          onChange={(e: any) => formik.setFieldValue('images', e)}
        />

        <LegalTextComp
          value={formik.values.checked}
          onChange={() =>
            formik.setFieldValue('checked', !formik.values.checked)
          }
          type="question"
        />

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
