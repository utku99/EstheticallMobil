import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import CustomInputs from '../../components/CustomInputs';
import CustomButtons from '../../components/CustomButtons';
import {SIZES} from '../../constants/constants';
import {useNavigation} from '@react-navigation/native';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import WebClient from '../../utility/WebClient';
import IntLabel from '../../components/IntLabel';

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
    enableReinitialize: true,
    initialValues: {
      institution: company ?? '',
      operation: '',
      suboperation: '',
      doctor: '',
      title: '',
      content: '',
      startDate: null,
      endDate: null,
    } as {
      operation: any;
      suboperation: any;
      title: any;
      content: any;
      doctor: any;
      startDate: any;
      endDate: any;
    },
    // validationSchema: Yup.object().shape({
    //     operation: Yup.object().required("operasyon alanı gereklidir"),
    //     title: Yup.string().required("başlık alanı gereklidir"),
    //     content: Yup.string().required("soru metni alanı gereklidir"),
    //     checked: Yup.boolean().oneOf([true], 'metni onaylamanız gerekmektedir'),
    // }),
    onSubmit: values => {
      Post(
        '/api/Appointments/RequestAppointment',
        {
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
        },
        true,
        true,
      ).then(res => {
        if (res.data.code == '100') {
          if (company?.isAppointmentPaid) {
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
            value={formik.values.operation}
            onChange={(e: any) => formik.setFieldValue('operation', e)}
            placeholder={IntLabel('select_operation')}
            style={{width: '75%', height: 32}}
          />
        )}

        {formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={subServices}
            value={formik.values.suboperation}
            onChange={(e: any) => formik.setFieldValue('suboperation', e)}
            placeholder={IntLabel('select_sub_operation')}
            style={{width: '75%', height: 32}}
          />
        )}

        {doctors?.length != 0 && (
          <CustomInputs
            type="dropdown"
            dropdownData={doctors}
            value={formik.values.doctor}
            onChange={(e: any) => console.log(e)}
            placeholder={IntLabel('select_doctor')}
            style={{width: '75%', height: 32}}
          />
        )}

        <CustomInputs
          type="textareasmall"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
        />

        <CustomInputs
          type="textareabig"
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          title={IntLabel('appointment_text')}
        />

        <View className="my-3">
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            {IntLabel('select_date_range')}
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <CustomInputs
              type="date"
              minimumDate={
                new Date(new Date().setDate(new Date().getDate() + 1))
              }
              placeholder={IntLabel('start_date')}
              value={formik.values.startDate}
              onChange={(e: any) => formik.setFieldValue('startDate', e)}
              style={{width: '75%'}}
            />
            <CustomInputs
              type="date"
              minimumDate={
                new Date(new Date().setDate(new Date().getDate() + 2))
              }
              placeholder={IntLabel('end_date')}
              value={formik.values.endDate}
              onChange={(e: any) => formik.setFieldValue('endDate', e)}
              style={{width: '75%'}}
            />
          </View>
        </View>

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
