import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import CustomInputs from '../../components/CustomInputs';
import WebClient, {toast} from '../../utility/WebClient';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import AddPhotoComp from '../../components/AddPhotoComp';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';
import IntLabel from '../../components/IntLabel';
import moment from 'moment';

const FirmOffer = ({route}: any) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [company, setCompany] = useState<any>(null);

  const formik = useFormik({
    validateOnChange: false,
    initialValues: {
      operation: '',
      suboperation: '',
      title: '',
      content: '',
      images: [],
      transport: false,
      accomodation: false,
      escort: false,
      startDate: '',
      endDate: '',
    } as any,
    validationSchema: Yup.object().shape({
      operation: Yup.object().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      title: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      content: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      images: Yup.array().min(1, IntLabel('photo_required')),
      startDate: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
      endDate: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
    }),
    onSubmit: (values, {resetForm}) => {
      Post('/api/Offers/RequestOffer', {
        userID: user?.id,
        companyID: route.params.companyId,
        companyOfficeID: route.params.companyOfficeId,
        countryID: 0,
        cityID: 0,
        serviceID: values.operation.value,
        serviceSubID: values.suboperation.value,
        subject: values.title,
        content: values.content,
        extraServices: [
          values.transport ? 1 : '',
          values.accomodation ? 2 : '',
          values.escort ? 3 : '',
        ].filter((item: any) => item !== ''),
        startDate: values.startDate,
        endDate: values.endDate,
        images: values.images,
      }).then(res => {
        if (res.data.code === '100') {
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
  }, []);

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
            isSearchable
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
            isSearchable
            placeholder={IntLabel('select_sub_operation')}
            value={formik.values.suboperation}
            onChange={(e: any) => formik.setFieldValue('suboperation', e)}
            style={{width: '75%', height: 32}}
            disable={subServices?.length == 0}
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
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          title={IntLabel('offer_text')}
          error={formik.errors.content}
        />

        <View className="my-3">
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            {IntLabel('special_services')}
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <CustomInputs
              type="checkbox"
              title={IntLabel('transport')}
              value={formik.values.transport}
              onChange={() =>
                formik.setFieldValue('transport', !formik.values.transport)
              }
              readonly={false}
            />
            <CustomInputs
              type="checkbox"
              title={IntLabel('accomodation')}
              value={formik.values.accomodation}
              onChange={() =>
                formik.setFieldValue(
                  'accomodation',
                  !formik.values.accomodation,
                )
              }
              readonly={false}
            />
            <CustomInputs
              type="checkbox"
              title={IntLabel('companion')}
              value={formik.values.escort}
              onChange={() =>
                formik.setFieldValue('escort', !formik.values.escort)
              }
              readonly={false}
            />
          </View>
        </View>

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

        <AddPhotoComp
          value={formik.values.images}
          onChange={(e: any) => formik.setFieldValue('images', e)}
          error={formik.errors.images}
        />

        <View className="flex-1"></View>

        <CustomButtons
          type="iconsolid"
          label={IntLabel('send')}
          icon="send"
          theme="big"
          style={{width: 180, alignSelf: 'center'}}
          onPress={formik.handleSubmit}
        />
      </View>
    </FirmWrapper>
  );
};

export default FirmOffer;
