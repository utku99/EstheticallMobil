import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthWrapper from './AuthWrapper';
import CustomInputs from '../../components/CustomInputs';
import LegalTextComp from '../../components/LegalTextComp';
import IntLabel from '../../components/IntLabel';
import WebClient, {toast} from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useIntl} from 'react-intl';
import {genderData} from '../../constants/enum';
import {useNavigation} from '@react-navigation/native';

const UserRegister = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const {language} = useSelector((state: any) => state.user);
  const {Post} = WebClient();
  const intl = useIntl();
  const navigation = useNavigation();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      name: '',
      surname: '',
      password: '',
      passwordAgain: '',
      email: '',
      nickname: '',
      date: '',
      gender: '',
      country: '',
      city: '',
      checked: false,
    } as any,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(
        intl.formatMessage({
          id: 'name_required',
          defaultMessage: 'isim gereklidir',
        }),
      ),
      surname: Yup.string().required(
        intl.formatMessage({
          id: 'surname_required',
          defaultMessage: 'soyad gereklidir',
        }),
      ),
      password: Yup.string()
        .min(
          3,
          intl.formatMessage({
            id: 'pass_min',
            defaultMessage: 'şifre 3 karakterden büyük olmalı',
          }),
        )
        .required(
          intl.formatMessage({
            id: 'pass_required',
            defaultMessage: 'şifre gereklidir',
          }),
        ),
      passwordAgain: Yup.string()
        .min(3, '')
        .oneOf(
          [Yup.ref('password')],
          intl.formatMessage({
            id: 'pass_match',
            defaultMessage: 'şifreler eşleşmiyor',
          }),
        )
        .required(
          intl.formatMessage({
            id: 'repass_required',
            defaultMessage: 'şifre tekrarı gereklidir',
          }),
        ),
      email: Yup.string()
        .email(
          intl.formatMessage({
            id: 'invalid_email',
            defaultMessage: 'geçersiz email',
          }),
        )
        .required(
          intl.formatMessage({
            id: 'email_required',
            defaultMessage: 'email gereklidir',
          }),
        ),
      nickname: Yup.string().required(
        intl.formatMessage({
          id: 'nickname_required',
          defaultMessage: 'kullanıcı adı gereklidir',
        }),
      ),
      date: Yup.date().required(
        intl.formatMessage({
          id: 'nickname_required',
          defaultMessage: 'doğum tarihi gereklidir',
        }),
      ),
      gender: Yup.object().required(
        intl.formatMessage({
          id: 'gender_required',
          defaultMessage: 'cinsiyet gereklidir',
        }),
      ),
      country: Yup.object().required(
        intl.formatMessage({
          id: 'country_required',
          defaultMessage: 'ülke gereklidir',
        }),
      ),
      city: Yup.object().required(
        intl.formatMessage({
          id: 'city_required',
          defaultMessage: 'şehir gereklidir',
        }),
      ),
      checked: Yup.bool()
        .oneOf([true], IntLabel('accept_text_warning'))
        .required(IntLabel('accept_text_warning')),
    }),
    onSubmit: (values, {resetForm}) => {
      Post('/api/Auth/Register', {
        userName: values.email,
        password: values.password,
        mail: values.email,
        firstName: values.name,
        lastName: values.surname,
        gender: values.gender.value,
        birthday: values.date,
        countryId: values.country.value,
        cityId: values.city.value,
        userRoleId: 3,
        companyTypeId: 0,
        LanguageId: language?.type ?? 1,
      }).then((res: any) => {
        if (res.data.result.code == '100') {
          toast(res.data.result.message);
          resetForm();
          navigation.navigate('login');
        } else {
          toast(res.data.result.message);
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/Common/GetCountriesAsync', {})
      .then(res => {
        const countries = res.data.map((item: any) => ({
          value: item.countryID,
          label: item.countryName,
        }));
        setCountries(countries);
      })
      .finally(() => {
        getCities();
      });

    const getCities = () => {
      Post('/api/Common/GetCitiesAsync', {
        countryID: formik.values.country.value,
      }).then(res => {
        const cities = res.data.map((item: any) => ({
          value: item.cityID,
          label: item.name,
        }));
        setCities(cities);
      });
    };
  }, [formik.values.country]);

  return (
    <AuthWrapper title={IntLabel('new_user')} onPress={formik.handleSubmit}>
      <CustomInputs
        type="text"
        placeholder={IntLabel('name')}
        onChangeText={formik.handleChange('name')}
        value={formik.values.name}
        onBlur={formik.handleBlur('name')}
        error={formik.errors.name}
        touched={formik.touched.name}
      />
      <CustomInputs
        type="text"
        placeholder={IntLabel('surname')}
        onChangeText={formik.handleChange('surname')}
        value={formik.values.surname}
        error={formik.errors.surname}
        touched={formik.touched.surname}
        onBlur={formik.handleBlur('surname')}
      />
      <CustomInputs
        type="text"
        placeholder={IntLabel('nickname')}
        onChangeText={formik.handleChange('nickname')}
        value={formik.values.nickname}
        error={formik.errors.nickname}
        touched={formik.touched.nickname}
        onBlur={formik.handleBlur('nickname')}
      />
      <CustomInputs
        type="date"
        placeholder={IntLabel('birthday')}
        value={formik.values.date}
        onChange={(e: any) => formik.setFieldValue('date', e)}
        error={formik.errors.date}
      />
      <CustomInputs
        type="dropdown"
        placeholder={IntLabel('gender')}
        value={formik.values.gender}
        dropdownData={genderData}
        onChange={(e: any) => formik.setFieldValue('gender', e)}
        error={formik.errors.gender}
      />
      <View className="flex-row items-center justify-between">
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('country')}
          value={formik.values.country}
          dropdownData={countries}
          isSearchable
          dropdownContainerStyle={{width: '45%'}}
          onChange={(e: any) => formik.setFieldValue('country', e)}
          error={formik.errors.country}
        />
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('city')}
          value={formik.values.city}
          dropdownData={cities}
          isSearchable
          dropdownContainerStyle={{width: '45%'}}
          onChange={(e: any) => formik.setFieldValue('city', e)}
          error={formik.errors.city}
        />
      </View>
      <CustomInputs
        type="text"
        placeholder={IntLabel('email')}
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        error={formik.errors.email}
        touched={formik.touched.email}
        onBlur={formik.handleBlur('email')}
      />
      <CustomInputs
        type="text"
        placeholder={IntLabel('password')}
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        error={formik.errors.password}
        touched={formik.touched.password}
        onBlur={formik.handleBlur('password')}
      />
      <CustomInputs
        type="text"
        placeholder={IntLabel('re_password')}
        secureTextEntry
        value={formik.values.passwordAgain}
        onChangeText={formik.handleChange('passwordAgain')}
        error={formik.errors.passwordAgain}
        touched={formik.touched.passwordAgain}
        onBlur={formik.handleBlur('passwordAgain')}
      />

      <LegalTextComp
        value={formik.values.checked}
        onChange={() => formik.setFieldValue('checked', !formik.values.checked)}
        type="auth"
        error={formik.errors.checked}
      />
    </AuthWrapper>
  );
};

export default UserRegister;
