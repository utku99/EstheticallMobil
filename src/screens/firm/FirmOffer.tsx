import {View, Text, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import CustomInputs from '../../components/CustomInputs';
import WebClient, {toast} from '../../utility/WebClient';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';
import HandleData from '../../components/HandleData';
import AddPhotoComp from '../../components/AddPhotoComp';
import {useFormik} from 'formik';
import {useSelector} from 'react-redux';
import * as Yup from 'yup';

interface props {
  route?: any;
}

const FirmOffer = ({route}: props) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);

  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [company, setCompany] = useState<any>(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      operation: '',
      suboperation: '',
      title: '',
      content: '',
      images: [],
      transport: false,
      accomodation: false,
      escort: false,
      startDate: null,
      endDate: null,
    } as {
      operation: any;
      suboperation: any;
      title: any;
      content: any;
      images: any;
      transport: any;
      accomodation: any;
      escort: any;
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
            placeholder="Operasyon Seç"
            style={{width: '75%', height: 32}}
          />
        )}

        {formik.values.operation.value && (
          <CustomInputs
            type="dropdown"
            dropdownData={subServices}
            value={formik.values.suboperation}
            onChange={(e: any) => formik.setFieldValue('suboperation', e)}
            placeholder="Alt Operasyon Seç"
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
          title="Teklif Metni"
        />

        <View className="my-3">
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            Özel Servisler
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <CustomInputs
              type="checkbox"
              title="Ulaşım"
              value={formik.values.transport}
              onChange={() =>
                formik.setFieldValue('transport', !formik.values.transport)
              }
            />
            <CustomInputs
              type="checkbox"
              title="Konaklama"
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
              title="Refakatçi"
              value={formik.values.escort}
              onChange={() =>
                formik.setFieldValue('escort', !formik.values.escort)
              }
            />
          </View>
        </View>

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

        <AddPhotoComp
          value={formik.values.images}
          onChange={(e: any) => formik.setFieldValue('images', e)}
        />

        <CustomButtons
          type="iconsolid"
          label="Talep Gönder"
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
