import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import CustomInputs from '../../components/CustomInputs';
import CustomButtons from '../../components/CustomButtons';
import {SIZES} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import WebClient, {toast} from '../../utility/WebClient';
import IntLabel from '../../components/IntLabel';
import * as Yup from 'yup';
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

interface props {
  route?: any;
}

const FirmAppointment = ({route}: props) => {
  const navigation = useNavigation();
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [company, setCompany] = useState<any>(null);
  const [doctors, setDoctors] = useState<any>(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
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
      operation: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      // suboperation: Yup.object().required(
      //   IntLabel('validation_message_this_field_is_required'),
      // ),
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
    onSubmit: (values, {resetForm}) => {
      Post('/api/Appointments/RequestAppointment', {
        userID: user?.id,
        companyID: company?.value,
        companyOfficeID: company?.officeID,
        serviceID: values.operation.value,
        serviceSubId: values.suboperation.value ?? 0,
        doctorId: values.doctor.value ?? 0,
        title: values.title,
        content: values.content,
        startDate: values.startDate,
        endDate: values.endDate,
        appointmentType: values.meeting.value,
      }).then(res => {
        if (res.data.code == '100') {
          resetForm();
          toast(res.data.message);
        } else {
          toast(res.data.message);
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/Common/CompanyServicesFilters', {
      companyID: route.params.companyId,
      companyOfficeID: route.params.companyOfficeId,
    })
      .then(res => {
        setServices(res.data);
      })
      .finally(() => {
        Post('/api/Common/CompanySubServicesFilters', {
          companyID: route.params.companyId,
          companyOfficeID: route.params.companyOfficeId,
          serviceID: formik.values.operation.value,
        }).then(res => {
          setSubServices(res.data);
        });
      });

    Post('/api/Company/GetCompanyAsync', {
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
    }).then((res: any) => {
      setCompany(res.data);
    });

    Post('/api/CompanyDoctor/AppointmentDoctorList', {
      serviceId: formik.values.operation.value,
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
    }).then(res => {
      setDoctors(res.data);
    });
  }, [formik.values.operation.value]);

  return (
    <FirmWrapper>
      <View className=" h-full w-full" style={{width: SIZES.width * 0.95}}>
        <Text className="font-poppinsRegular text-customGray text-sm  mb-3">
          {IntLabel('appointment_info')}
        </Text>

        <CustomInputs
          type="dropdown"
          value={company}
          dropdownData={[company]}
          style={{width: '75%', height: 32}}
          disable
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
            disable={subServices?.length == 0}
          />
        )}

        {doctors?.length != 0 && (
          <CustomInputs
            type="dropdown"
            dropdownData={doctors}
            value={formik.values.doctor}
            onChange={(e: any) => formik.setFieldValue('doctor', e)}
            placeholder={IntLabel('select_doctor')}
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
                readonly={false}
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
          style={{alignSelf: 'center'}}
          onPress={formik.handleSubmit}
        />
      </View>
    </FirmWrapper>
  );
};

export default FirmAppointment;
