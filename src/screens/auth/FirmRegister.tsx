import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthWrapper from './AuthWrapper';
import CustomInputs from '../../components/CustomInputs';
import WebClient from '../../utility/WebClient';
import LegalTextComp from '../../components/LegalTextComp';
import IntLabel from '../../components/IntLabel';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useIntl} from 'react-intl';

const FirmRegister = ({route}: any) => {
  const {Post} = WebClient();
  const intl = useIntl();

  const [doctorTitles, setDoctorTitles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [districts, setDistricts] = useState([]);

  const formik = useFormik({
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
      passwordAgain: '',
      branch: '',
      title: '',
      companyName: '',
      country: '',
      city: '',
      town: '',
      district: '',
      checked: false,
    } as any,
    validationSchema:
      route.params.type == 4
        ? Yup.object().shape({
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
            phone: Yup.string()
              .required(
                intl.formatMessage({
                  id: 'phone_required',
                  defaultMessage: 'telefon gereklidir',
                }),
              )
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                intl.formatMessage({
                  id: 'invalid_phone',
                  defaultMessage: 'telefon numarası geçerli değil',
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
            title: Yup.object().required(
              intl.formatMessage({
                id: 'title_required',
                defaultMessage: 'ünvan gereklidir',
              }),
            ),
            branch: Yup.string().required(
              intl.formatMessage({
                id: 'doctor_branch_required',
                defaultMessage: 'uzmanlık alanı gereklidir',
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
            town: Yup.object().required(
              intl.formatMessage({
                id: 'town_required',
                defaultMessage: 'ilçe gereklidir',
              }),
            ),
            district: Yup.object().required(
              intl.formatMessage({
                id: 'district_required',
                defaultMessage: 'mahalle gereklidir',
              }),
            ),
            checked: Yup.bool()
              .oneOf([true], IntLabel('accept_text_warning'))
              .required(IntLabel('accept_text_warning')),
          })
        : Yup.object().shape({
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
            phone: Yup.string()
              .required(
                intl.formatMessage({
                  id: 'phone_required',
                  defaultMessage: 'telefon gereklidir',
                }),
              )
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                intl.formatMessage({
                  id: 'invalid_phone',
                  defaultMessage: 'telefon numarası geçerli değil',
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
            companyName: Yup.string().required(
              intl.formatMessage({
                id: 'company_name_required',
                defaultMessage: 'kurum adı gereklidir',
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
            town: Yup.object().required(
              intl.formatMessage({
                id: 'town_required',
                defaultMessage: 'ilçe gereklidir',
              }),
            ),
            district: Yup.object().required(
              intl.formatMessage({
                id: 'district_required',
                defaultMessage: 'mahalle gereklidir',
              }),
            ),
            checked: Yup.bool()
              .oneOf([true], IntLabel('accept_text_warning'))
              .required(IntLabel('accept_text_warning')),
          }),
    onSubmit: (values, {resetForm}) => {
      if (route.params.type == 4) {
        Post(
          '/api/Auth/RegisterCompany',
          {
            companyTypeId: route.params.type,
            name: values.companyName,
            managerName: values.name,
            managerSurname: values.surname,
            email: values.email,
            titleId: values.title?.value,
            branch: values.branch,
            password: values.password,
            phoneNumber: values.phone,
            countryId: values.country.value,
            cityId: values.city.value,
            townId: values.town.value,
            districtId: values.district.value,
          },
          true,
          true,
        ).then(res => {
          if (res.data.code === '100') {
            resetForm();
          }
        });
      } else {
        Post(
          '/api/Auth/RegisterCompany',
          {
            companyTypeId: route.params.type,
            name: values.companyName,
            managerName: values.name,
            managerSurname: values.surname,
            email: values.email,
            titleId: values.title?.value,
            password: values.password,
            phoneNumber: values.phone,
            countryId: values.country.value,
            cityId: values.city.value,
            townId: values.town.value,
            districtId: values.district.value,
          },
          true,
          true,
        ).then(res => {
          if (res.data.code === '100') {
            resetForm();
          }
        });
      }
    },
  });

  useEffect(() => {
    Post('/api/CompanyDoctor/ListTitles', {}).then(res => {
      if (res.data.code === '100') {
        const titles = res.data.object.map((item: any) => ({
          value: item.titleId,
          label: item.titleName,
        }));
        setDoctorTitles(titles);
      }
    });

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
      })
        .then(res => {
          const cities = res.data.map((item: any) => ({
            value: item.cityID,
            label: item.name,
          }));
          setCities(cities);
        })
        .finally(() => {
          getTown();
        });
    };

    const getTown = () => {
      Post('/api/Common/GetTownsAsync', {
        cityID: formik.values.city.value,
      })
        .then(res => {
          const towns = res.data.map((item: any) => ({
            value: item.townID,
            label: item.name,
          }));
          setTowns(towns);
        })
        .finally(() => {
          getDistrict();
        });
    };

    const getDistrict = () => {
      Post('/api/Common/GetDistinctsAsync', {
        townID: formik.values.town.value,
      }).then(res => {
        const districts = res.data.map((item: any) => ({
          value: item.districtID,
          label: item.name,
        }));
        setDistricts(districts);
      });
    };
  }, [formik.values.country, formik.values.city, formik.values.town]);

  return (
    <AuthWrapper
      title={`${IntLabel('new_user')} - ${
        route.params.type == 1
          ? IntLabel('hospital')
          : route.params.type == 2
          ? IntLabel('beauty_center')
          : route.params.type == 3
          ? IntLabel('clinic')
          : route.params.type == 4
          ? IntLabel('doctor')
          : ''
      }`}
      onPress={formik.handleSubmit}>
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

      {route.params.type == 4 ? (
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('title')}
          value={formik.values.title}
          dropdownData={doctorTitles}
          onChange={(e: any) => formik.setFieldValue('title', e)}
          error={formik.errors.title}
        />
      ) : (
        <CustomInputs
          type="text"
          placeholder={IntLabel('company_name')}
          onChangeText={formik.handleChange('companyName')}
          value={formik.values.companyName}
          error={formik.errors.companyName}
          touched={formik.touched.companyName}
          onBlur={formik.handleBlur('companyName')}
        />
      )}

      {route.params.type == 4 && (
        <CustomInputs
          type="text"
          placeholder={IntLabel('doctor_branch')}
          onChangeText={formik.handleChange('branch')}
          value={formik.values.branch}
          error={formik.errors.branch}
          touched={formik.touched.branch}
          onBlur={formik.handleBlur('branch')}
        />
      )}
      <CustomInputs
        type="text"
        placeholder={IntLabel('phone')}
        onChangeText={formik.handleChange('phone')}
        value={formik.values.phone}
        error={formik.errors.phone}
        touched={formik.touched.phone}
        onBlur={formik.handleBlur('phone')}
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
      <View className="flex-row items-center justify-between">
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('town')}
          value={formik.values.town}
          dropdownData={towns}
          isSearchable
          dropdownContainerStyle={{width: '45%'}}
          onChange={(e: any) => formik.setFieldValue('town', e)}
          error={formik.errors.town}
        />
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('district')}
          value={formik.values.district}
          dropdownData={districts}
          isSearchable
          dropdownContainerStyle={{width: '45%'}}
          onChange={(e: any) => formik.setFieldValue('district', e)}
          error={formik.errors.district}
        />
      </View>
      <CustomInputs
        type="text"
        placeholder={IntLabel('email')}
        onChangeText={formik.handleChange('email')}
        value={formik.values.email}
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
        type="companyRegister"
        error={formik.errors.checked}
      />
    </AuthWrapper>
  );
};

export default FirmRegister;
