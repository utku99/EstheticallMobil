import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../user/UserWrapper';
import CustomInputs from '../../components/CustomInputs';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import {useDispatch, useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/core';

const Appointment = () => {
  const dispatch = useDispatch();
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const navigation = useNavigation();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [company, setCompany] = useState<any>(null);
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const formik = useFormik({
    initialValues: {
      country: '',
      city: '',
      town: '',
      institution: '',
      operation: '',
      suboperation: '',
      doctor: '',
      title: '',
      content: '',
      startDate: null,
      endDate: null,
    } as {
      country: any;
      city: any;
      town: any;
      institution: any;
      operation: any;
      suboperation: any;
      doctor: any;
      title: any;
      content: any;
      startDate: any;
      endDate: any;
    },
    validationSchema: Yup.object().shape({
      // country: Yup.object().required("kurum alanı gereklidir"),
      institution: Yup.object().required('kurum alanı gereklidir'),
      operation: Yup.object().required('operasyon alanı gereklidir'),
      suboperation: Yup.object().required('alt operasyon alanı gereklidir'),
      title: Yup.string().required('başlık alanı gereklidir'),
      content: Yup.string().required('randevu metni alanı gereklidir'),
      startDate: Yup.string().required('başlangıç tarihi gereklidir'),
      endDate: Yup.string().required('bitiş tarihi gereklidir'),
    }),
    onSubmit: values => {
      Post(
        '/api/Appointments/RequestAppointment',
        {
          userID: user?.id,
          companyID: values.institution.value,
          companyOfficeID: values.institution.officeID,
          serviceID: values.operation.value,
          serviceSubId: values.suboperation.value ?? 0,
          doctorId: values.doctor.value ?? 0,
          title: values.title,
          content: values.content,
          startDate: values.startDate,
          endDate: values.endDate,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code == '100') {
          if (formik.values.institution) {
            navigation.navigate('firmappointmentpayment', {
              item: formik.values,
            });
          } else {
            navigation.goBack();
          }
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
            Post('/api/Common/GetTownsAsync', {
              cityID: formik.values.city.value,
            }).then(res => {
              console.log(res);

              const towns = res.data.map((item: any) => ({
                value: item.townID,
                label: item.name,
              }));
              setTowns(towns);
            });
          });
      });

    Post('/api/Common/CompaniesFilterAsync', {
      countryID: formik.values.country.value,
      cityID: formik.values.city.value,
      townID: formik.values.town.value,
      distinctID: 0,
    }).then((res: any) => {
      setCompany(res.data);
    });

    Post('/api/Common/CompanyServicesFilters', {
      companyID: formik.values.institution.value,
      companyOfficeID: formik.values.institution.officeID,
    })
      .then((res: any) => {
        setServices(res.data);
      })
      .finally(() => {
        Post('/api/CompanyDoctor/AppointmentDoctorList', {
          serviceId: formik.values.operation.value,
          companyId: formik.values.institution.value,
          companyOfficeId: formik.values.institution.officeID,
        }).then((res: any) => {
          setDoctors(res.data);
        });
        Post('/api/Common/CompanySubServicesFilters', {
          companyID: formik.values.institution.value,
          companyOfficeID: formik.values.institution.officeID,
          serviceID: formik.values.operation.value,
        }).then((res: any) => {
          setSubServices(res.data);
        });
      });
  }, [
    formik.values?.country?.value,
    formik.values?.city?.value,
    formik.values?.town?.value,
    formik.values?.institution?.value,
    formik.values.operation.value,
  ]);

  console.log(formik.values.institution);

  return (
    <UserWrapper>
      <View className=" h-full w-full" style={{width: SIZES.width * 0.95}}>
        <Text className="font-poppinsMedium text-customGray text-base  mb-3">
          Randevu Al
        </Text>

        {!formik.values.country.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={countries}
            placeholder="Ülke"
            isSearchable
            value={formik.values.country}
            onChange={(e: any) => formik.setFieldValue('country', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        {formik.values.country.value && !formik.values.city.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={cities}
            placeholder="Şehir"
            isSearchable
            value={formik.values.city}
            onChange={(e: any) => formik.setFieldValue('city', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        {formik.values.city.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={towns}
            placeholder="İlçe"
            isSearchable
            value={formik.values.town}
            onChange={(e: any) => formik.setFieldValue('town', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        <CustomInputs
          type="dropdown"
          dropdownData={company}
          placeholder="Kurum Seç"
          isSearchable
          value={formik.values.institution}
          onChange={(e: any) => formik.setFieldValue('institution', e)}
          style={{width: '75%', height: 32}}
        />

        {!formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={services}
            placeholder="Operasyon Seç"
            value={formik.values.operation}
            onChange={(e: any) => formik.setFieldValue('operation', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        {formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={subServices}
            placeholder="Alt Operasyon Seç"
            value={formik.values.suboperation}
            onChange={(e: any) => formik.setFieldValue('suboperation', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        {doctors?.length != 0 && (
          <CustomInputs
            type="dropdown"
            dropdownData={doctors}
            placeholder="Doktor Seç"
            value={formik.values.doctor}
            onChange={(e: any) => formik.setFieldValue('doctor', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        <CustomInputs
          type="textareasmall"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          error={formik.errors.title}
        />

        <CustomInputs
          type="textareabig"
          title="Randevu Metni"
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          error={formik.errors.content}
        />

        <View className="my-3">
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            Uygun Tarih Aralığını Seçin
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <CustomInputs
              type="date"
              minimumDate={
                new Date(new Date().setDate(new Date().getDate() + 1))
              }
              placeholder="Başlangıç Tarihi"
              value={formik.values.startDate}
              onChange={(e: any) => formik.setFieldValue('startDate', e)}
              style={{width: '75%'}}
            />
            <CustomInputs
              type="date"
              minimumDate={
                new Date(new Date().setDate(new Date().getDate() + 2))
              }
              placeholder="Bitiş Tarihi"
              value={formik.values.endDate}
              onChange={(e: any) => formik.setFieldValue('endDate', e)}
              style={{width: '75%'}}
            />
          </View>
        </View>

        <CustomButtons
          type="iconsolid"
          label="Talep Gönder"
          icon="send"
          theme="big"
          style={{width: 180, alignSelf: 'center'}}
          onPress={formik.handleSubmit}
        />
      </View>
    </UserWrapper>
  );
};

export default Appointment;
