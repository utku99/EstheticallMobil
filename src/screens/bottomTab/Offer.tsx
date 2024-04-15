import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../user/UserWrapper';
import {SIZES} from '../../constants/constants';
import CustomInputs from '../../components/CustomInputs';
import AddPhotoComp from '../../components/AddPhotoComp';
import CustomButtons from '../../components/CustomButtons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import WebClient, {toast} from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import IntLabel from '../../components/IntLabel';

const Offer = () => {
  const {Post} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const formik = useFormik({
    initialValues: {
      country: '',
      city: '',
      operation: '',
      suboperation: '',
      title: '',
      content: '',
      transport: false,
      accomodation: false,
      escort: false,
      images: [],
      startDate: null,
      endDate: null,
    } as {
      country: any;
      city: any;
      operation: any;
      suboperation: any;
      title: any;
      content: any;
      images: any;
      startDate: any;
      endDate: any;
      transport: any;
      accomodation: any;
      escort: any;
    },
    // validationSchema: Yup.object().shape({
    //   operation: Yup.object().required('operasyon alanı gereklidir'),
    //   subOperation: Yup.object().required('alt operasyon alanı gereklidir'),
    //   title: Yup.string().required('başlık alanı gereklidir'),
    //   content: Yup.string().required('teklif metni alanı gereklidir'),
    //   startDate: Yup.string().required('başlangıç tarihi gereklidir'),
    //   endDate: Yup.string().required('bitiş tarihi gereklidir'),
    // }),
    onSubmit: values => {
      Post('/api/Offers/RequestOffer', {
        userID: user?.id,
        companyID: 0,
        companyOfficeID: 0,
        countryID: values.country.value,
        cityID: values.city.value,
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
          toast(res.data.message);
        } else {
          toast(res.data.message);
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

    Post('/api/Service/GetAllServices', {})
      .then((res: any) => {
        setServices(res.data);
      })
      .finally(() => {
        Post('/api/Service/GetSubServicesByService', {
          serviceId: formik.values.operation.value,
        }).then((res: any) => {
          setSubServices(res.data);
        });
      });
  }, [formik.values.country.value, formik.values.operation.value]);

  return (
    <UserWrapper>
      <View className=" h-full w-full" style={{width: SIZES.width * 0.95}}>
        <Text className="font-poppinsMedium text-customGray text-base  mb-3">
          {IntLabel('take_offer')}
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
          />
        )}

        {formik.values.country.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={cities}
            placeholder={IntLabel('city')}
            isSearchable
            value={formik.values.city}
            onChange={(e: any) => formik.setFieldValue('city', e)}
            style={{width: '75%', height: 32}}
          />
        )}

        {!formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={services}
            isSearchable
            placeholder={IntLabel('select_operation')}
            value={formik.values.operation}
            onChange={(e: any) => formik.setFieldValue('operation', e)}
            style={{width: '75%', height: 32}}
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
          title={IntLabel('offer_text')}
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
            />
            <CustomInputs
              type="checkbox"
              title={IntLabel('companion')}
              value={formik.values.escort}
              onChange={() =>
                formik.setFieldValue('escort', !formik.values.escort)
              }
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

        <AddPhotoComp
          value={formik.values.images}
          onChange={(e: any) => formik.setFieldValue('images', e)}
        />

        <CustomButtons
          type="iconsolid"
          label={IntLabel('send')}
          icon="send"
          theme="big"
          style={{width: 180, alignSelf: 'center'}}
          onPress={formik.handleSubmit}
        />
      </View>
    </UserWrapper>
  );
};

export default Offer;
