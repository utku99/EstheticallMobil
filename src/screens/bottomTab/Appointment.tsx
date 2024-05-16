import {View, Text, ScrollView} from 'react-native';
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
import IntLabel from '../../components/IntLabel';
import moment from 'moment';
import {FormattedMessage} from 'react-intl';

const interviewData = [
  {
    value: 1,
    label: (
      <FormattedMessage
        id="online_meeting_request"
        defaultMessage={'Online Görüşme Talebi'}
      />
    ),
  },
  {
    value: 2,
    label: (
      <FormattedMessage
        id="live_meeting_request"
        defaultMessage={'Canlı Görüşme Talebi'}
      />
    ),
  },
];

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
      startDate: '',
      endDate: '',
      meeting: '',
    } as any,
    validationSchema: Yup.object().shape({
      // country: Yup.object().required(
      //   IntLabel('validation_message_this_field_is_required'),
      // ),
      // city: Yup.object().required(
      //   IntLabel('validation_message_this_field_is_required'),
      // ),
      // town: Yup.object().required(
      //   IntLabel('validation_message_this_field_is_required'),
      // ),
      institution: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      operation: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      suboperation: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      title: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      content: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      startDate: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      endDate: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      meeting: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
    }),
    onSubmit: values => {
      Post(
        '/api/Appointments/RequestAppointment',
        {
          bankAccountID: 0,
          price: 0,
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
          // if (formik.values.institution) {
          //   navigation.navigate('firmappointmentpayment', {
          //     item: formik.values,
          //   });
          // } else {
          // }
          navigation.goBack();
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

  return (
    <UserWrapper>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className=" h-full w-full"
        style={{width: SIZES.width * 0.95}}>
        <Text className="font-poppinsMedium text-customGray text-base  mb-3">
          {IntLabel('take_appointment')}
        </Text>

        <Text className="font-poppinsRegular text-customGray text-sm  mb-3">
          {IntLabel('appointment_info')}
        </Text>

        {!formik.values.country.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={countries}
            placeholder={IntLabel('country')}
            isSearchable
            value={formik.values.country}
            onChange={(e: any) => formik.setFieldValue('country', e)}
            style={{width: '75%', height: 32}}
            error={formik.errors.country}
          />
        )}

        {formik.values.country.value && !formik.values.city.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={cities}
            placeholder={IntLabel('city')}
            isSearchable
            value={formik.values.city}
            onChange={(e: any) => formik.setFieldValue('city', e)}
            style={{width: '75%', height: 32}}
            error={formik.errors.city}
          />
        )}

        {formik.values.city.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={towns}
            placeholder={IntLabel('town')}
            isSearchable
            value={formik.values.town}
            onChange={(e: any) => formik.setFieldValue('town', e)}
            style={{width: '75%', height: 32}}
            error={formik.errors.town}
          />
        )}

        <CustomInputs
          type="dropdown"
          dropdownData={company}
          placeholder={IntLabel('select_institution')}
          isSearchable
          value={formik.values.institution}
          onChange={(e: any) => formik.setFieldValue('institution', e)}
          style={{width: '75%', height: 32}}
          error={formik.errors.institution}
        />

        {!formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={services}
            placeholder={IntLabel('select_operation')}
            value={formik.values.operation}
            onChange={(e: any) => formik.setFieldValue('operation', e)}
            style={{width: '75%', height: 32}}
            error={formik.errors.operation}
          />
        )}

        {formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={subServices}
            placeholder={IntLabel('select_sub_operation')}
            value={formik.values.suboperation}
            onChange={(e: any) => formik.setFieldValue('suboperation', e)}
            style={{width: '75%', height: 32}}
            error={formik.errors.suboperation}
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
          title={IntLabel('appointment_text')}
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          error={formik.errors.content}
        />

        <View className="my-3">
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            {IntLabel('select_date_range')}
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <CustomInputs
              type="date"
              minimumDate={moment().add(1, 'days').toDate()}
              placeholder={IntLabel('start_date')}
              value={formik.values.startDate}
              error={formik.errors.startDate}
              onChange={(e: any) => {
                formik.setFieldValue('startDate', e);
                formik.setFieldValue('endDate', '');
              }}
              style={{width: '75%'}}
            />
            <CustomInputs
              type="date"
              minimumDate={
                formik.values.startDate != '' &&
                moment(formik.values.startDate).add(1, 'days').toDate()
              }
              placeholder={IntLabel('end_date')}
              value={formik.values.endDate}
              error={formik.errors.endDate}
              onChange={(e: any) => formik.setFieldValue('endDate', e)}
              style={{width: '75%'}}
            />
          </View>
        </View>

        <View className=" mb-3">
          <View className="flex-row flex-wrap justify-between">
            {interviewData.map((item: any, i: number) => (
              <CustomInputs
                key={i}
                type="checkbox"
                title={item.label}
                value={
                  formik.values.meeting?.value == item.value ? true : false
                }
                onChange={() => {
                  if (formik.values.meeting == item) {
                    formik.setFieldValue('meeting', '');
                  } else {
                    formik.setFieldValue('meeting', item);
                  }
                }}
              />
            ))}
          </View>
          {formik.errors.meeting && (
            <Text className="text-red-400 text-xs">
              {String(formik.errors.meeting)}
            </Text>
          )}
        </View>

        <View className="flex-1"></View>

        <CustomButtons
          type="iconsolid"
          label={IntLabel('send')}
          icon="send"
          theme="big"
          style={{width: 180, alignSelf: 'center'}}
          onPress={formik.handleSubmit}
        />
      </ScrollView>
    </UserWrapper>
  );
};

export default Appointment;
