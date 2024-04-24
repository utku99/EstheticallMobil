import {View, Text, ImageBackground, SafeAreaView} from 'react-native';
import React from 'react';
import AuthWrapper from './AuthWrapper';
import LangChoiceComp from '../../components/LangChoiceComp';
import EstheticLogo from '../../assets/svg/common/EstheticLogo';
import IntLabel from '../../components/IntLabel';
import CustomButtons from '../../components/CustomButtons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import WebClient, {toast} from '../../utility/WebClient';
import CustomInputs from '../../components/CustomInputs';

const ForgetPassword = () => {
  const {Post} = WebClient();
  const warning = IntLabel('change_pass_mail_info');

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(IntLabel('invalid_email'))
        .required(IntLabel('validation_message_this_field_is_required')),
    }),
    onSubmit: (values, {resetForm}) => {
      Post(
        '/api/User/ChangeUserPasswordMail',
        {
          mail: values.email,
        },
        false,
        true,
      ).then(res => {
        if (res.data.code == '100') {
          resetForm();
          toast(warning);
        }
      });
    },
  });

  return (
    <ImageBackground
      className="flex-1 "
      source={require('../../assets/images/authBg/auth1.jpg')}
      resizeMode="cover">
      <SafeAreaView className="flex-1 justify-between p-[20px]">
        {/* top cont */}
        <View className="relative  w-full items-center">
          <View className="absolute right-0 -top-5 ">
            <LangChoiceComp />
          </View>
          <View className="">
            <EstheticLogo />
          </View>
        </View>

        <CustomInputs
          type="text"
          value={formik.values.email}
          error={formik.errors.email}
          touched={formik.touched.email}
          onChangeText={formik.handleChange('email')}
          placeholder={IntLabel('email')}
        />

        <CustomButtons
          type="iconsolid"
          icon="send"
          label={IntLabel('send')}
          onPress={formik.handleSubmit}
          theme="big"
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgetPassword;
