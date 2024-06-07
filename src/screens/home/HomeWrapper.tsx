import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import FitlerIcon from '../../assets/svg/homepages/FitlerIcon';
import CustomButtons from '../../components/CustomButtons';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomInputs from '../../components/CustomInputs';
import { Modal } from 'react-native-paper';
import WebClient from '../../utility/WebClient';
import { useDispatch, useSelector } from 'react-redux';
import {
  resetFilters,
  setCity,
  setCountry,
  setDistrict,
  setInstitution,
  setListFilters,
  setOperation,
  setSubOperation,
  setTown,
} from '../../redux/slices/filter';
import { SIZES } from '../../constants/constants';
import IntLabel from '../../components/IntLabel';
import MessageIcon from '../../assets/svg/userMenu/MessageIcon';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AdvertisementList from '../../components/AdvertisementList';
import { companyType } from '../../constants/enum';

interface props {
  children?: React.ReactNode;
}

const HomeWrapper: React.FC<props> = ({ children }) => {
  const navigation = useNavigation<any>();
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const route = useRoute();
  const { Post } = WebClient();
  const { user, isLoggedIn, language } = useSelector((state: any) => state.user);

  const { country, city, town, district, institution, operation, suboperation } =
    useSelector((state: any) => state.filter);

  const dispatch = useDispatch();

  const [countries, setCountries] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [towns, setTowns] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [serviceSubs, setServiceSubs] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);

  const [allCompanies, setAllCompanies] = useState(null);
  const [servicesCompany, setServicesCompany] = useState<any>([]);
  const [subServicesCompany, setSubServicesCompany] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [filterInstitution, setFilterInstitution] = useState<any>([]);

  let institutionData = [
    { value: 1, label: IntLabel('hospital') },
    { value: 2, label: IntLabel('beauty_center') },
    { value: 3, label: IntLabel('clinic') },
    { value: 4, label: IntLabel('doctor') },
  ];

  // filter
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
          countryID: country?.value,
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
              cityID: city?.value,
            })
              .then(res => {
                const towns = res.data.map((item: any) => ({
                  value: item.townID,
                  label: item.name,
                }));
                setTowns(towns);
              })
              .finally(() => {
                Post('/api/Common/GetDistinctsAsync', {
                  townID: town?.value,
                }).then(res => {
                  const districts = res.data.map((item: any) => ({
                    value: item.districtID,
                    label: item.name,
                  }));
                  setDistricts(districts);
                });
              });
          });
      });

    Post('/api/Service/GetAllServices', {})
      .then((res: any) => {
        let temp = res.data;
        temp.unshift({ value: 0, label: 'Tümü' });
        setServices(temp);
      })
      .finally(() => {
        Post('/api/Service/GetSubServicesByService', {
          serviceId: operation?.value,
        }).then(res => {
          let temp = res.data;
          temp.unshift({ value: 0, label: 'Tümü' });
          setServiceSubs(temp);
        });
      });

    Post('/api/Common/ListCompanyTypesByServices', {
      serviceId: operation?.value ?? 0,
    }).then((res: any) => {
      let temp = res.data.map((item: any) => ({
        ...item,
        value: item.companyTypeId,
        label: item.companyTypeName,
      }));

      setFilterInstitution(temp ?? []);
    });
  }, [country, city, town, operation, language]);

  // comment to company
  const formik = useFormik({
    initialValues: {
      institution: '',
      operation: '',
      subOperation: '',
      doctor: '',
      title: '',
      content: '',
      rank: 0,
    } as any,
    validationSchema: Yup.object().shape({
      institution: Yup.object().required(IntLabel('company_required')),
      operation: Yup.object().required(IntLabel('operation_required')),
      subOperation: Yup.object().required(IntLabel('sub_operation_required')),
      title: Yup.string().required(IntLabel('text_required')),
      content: Yup.string().required(IntLabel('text_required')),
    }),
    onSubmit: (values, { resetForm }) => {
      Post(
        '/api/Company/CommentToCompany',
        {
          userID: user?.id,
          companyID: values.institution.value,
          companyOfficeID: values.institution.officeID,
          serviceID: values.operation.value,
          serviceSubID: values.subOperation.value,
          doctorID: values.doctor.value ?? 0,
          subject: values.title,
          content: values.content,
          point: values.rank ?? 0,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100') {
          resetForm();
          setVisible2(false);
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/Common/GetAllCompanies', {}).then((res: any) => {
      setAllCompanies(res.data);
    });

    Post('/api/Common/CompanyServicesFilters', {
      companyID: formik.values.institution.value,
      companyOfficeID: formik.values.institution.officeID,
    })
      .then(res => {
        setServicesCompany(res.data);
      })
      .finally(() => {
        Post('/api/Common/CompanySubServicesFilters', {
          companyID: formik.values.institution.value,
          companyOfficeID: formik.values.institution.officeID,
          serviceID: formik.values.operation.value,
        }).then(res => {
          setSubServicesCompany(res.data);
        });
      });

    Post('/api/CompanyDoctor/CompanyDoctorList', {
      companyId: formik.values.institution.value,
      companyOfficeId: formik.values.institution.officeID,
    }).then(res => {
      let temp = res.data.object.map((item: any) => ({
        value: item.companyDoctorId,
        label: item.doctorName,
      }));
      setDoctors(temp);
    });
  }, [formik.values.institution.value, formik.values.operation.value]);


  return (
    <View className="bg-[#FAFAFA] flex-1">
      {/* tabs */}
      <View className="h-[55px] flex-row items-center">
        <TouchableOpacity
          className="pl-[10px]"
          onPress={() => setVisible(true)}>
          <FitlerIcon />
        </TouchableOpacity>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
          }}>
          <CustomButtons
            type={route.name == 'sharing' ? 'solid' : 'outlined'}
            label={IntLabel('sharings')}
            onPress={() => {
              navigation.navigate('sharing', { tab: 1 });
            }}
          />
          <CustomButtons
            type={route.name == 'comment' ? 'solid' : 'outlined'}
            label={IntLabel('comments')}
            onPress={() => {
              navigation.navigate('comment', { tab: 2 });
            }}
          />
          <CustomButtons
            type={route.name == 'list' ? 'solid' : 'outlined'}
            label={IntLabel('list')}
            onPress={() => {
              navigation.navigate('list', { tab: 3 });
            }}
          />
          <CustomButtons
            type={route.name == 'map' ? 'iconsolid' : 'iconoutlined'}
            icon="location"
            label={IntLabel('map')}
            onPress={() => {
              navigation.navigate('map', { tab: 4 });
            }}
          />
        </ScrollView>
      </View>

      <View className="items-center w-full flex-1">{children}</View>

      {route.name == 'comment' && isLoggedIn && (
        <TouchableOpacity
          onPress={() => setVisible2(true)}
          className="absolute  right-0 top-[10%] bg-white border border-customLightGray rounded-l-lg p-1 items-center justify-center">
          <MessageIcon />
        </TouchableOpacity>
      )}

      {/* filter */}
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ justifyContent: 'flex-start' }}
        contentContainerStyle={{
          padding: 30,
          backgroundColor: 'white',
          width: '70%',
          top: -5,
          borderRadius: 10,
          marginLeft: '3%',
          justifyContent: 'space-evenly',
        }}>
        {!country && (
          <CustomInputs
            type="dropdown"
            value={country}
            dropdownData={countries}
            placeholder={IntLabel('select_country')}
            isSearchable
            onChange={(e: any) => dispatch(setCountry(e))}
          />
        )}
        {country && !city && (
          <CustomInputs
            type="dropdown"
            value={city}
            dropdownData={cities}
            placeholder={IntLabel('select_city')}
            isSearchable
            onChange={(e: any) => dispatch(setCity(e))}
          />
        )}
        {city && !town && (
          <CustomInputs
            type="dropdown"
            value={town}
            dropdownData={towns}
            placeholder={IntLabel('select_town')}
            isSearchable
            onChange={(e: any) => dispatch(setTown(e))}
          />
        )}
        {town && (
          <CustomInputs
            type="dropdown"
            value={district}
            dropdownData={districts}
            placeholder={IntLabel('select_district')}
            isSearchable
            onChange={(e: any) => dispatch(setDistrict(e))}
          />
        )}

        {!operation && (
          <CustomInputs
            type="dropdown"
            value={operation}
            dropdownData={services}
            placeholder={IntLabel('select_operation')}
            isSearchable
            onChange={(e: any) => dispatch(setOperation(e))}
          />
        )}
        {operation && (
          <CustomInputs
            type="dropdown"
            value={suboperation}
            dropdownData={serviceSubs}
            placeholder={IntLabel('select_sub_operation')}
            isSearchable
            onChange={(e: any) => dispatch(setSubOperation(e))}
          />
        )}

        <CustomInputs
          type="dropdown"
          value={institution}
          dropdownData={filterInstitution}
          placeholder={IntLabel('select_institution_type')}
          onChange={(e: any) => dispatch(setInstitution(e))}
        />

        <View className="flex-row  justify-between">
          <CustomButtons
            type="solid"
            label={IntLabel('list_filter')}
            theme="middle"
            style={{ width: 90 }}
            onPress={() => {
              dispatch(setListFilters(true));
              setVisible(false);
            }}
          />
          <CustomButtons
            type="outlined"
            label={IntLabel('reset')}
            theme="middle"
            style={{ width: 90 }}
            onPress={() => {
              dispatch(setListFilters(true));
              dispatch(resetFilters());
            }}
          />
        </View>
      </Modal>

      {/* comment */}
      <Modal
        visible={visible2}
        onDismiss={() => {
          setVisible2(false);
          formik.resetForm();
        }}
        style={{ alignItems: 'center' }}
        contentContainerStyle={{
          padding: 20,
          backgroundColor: 'white',
          width: '90%',
          borderRadius: 10,
        }}>
        <CustomInputs
          type="dropdown"
          value={formik.values.institution}
          error={formik.errors.institution}
          dropdownData={allCompanies}
          placeholder={IntLabel('select_institution')}
          isSearchable
          onChange={(value: any) => {
            formik.setValues({
              ...formik.values,
              institution: value,
              operation: '',
              subOperation: '',
              doctor: '',
            });
          }}
        />
        {!formik.values.operation.value ? (
          <CustomInputs
            type="dropdown"
            value={formik.values.operation}
            error={formik.errors.operation}
            dropdownData={servicesCompany}
            placeholder={IntLabel('select_operation')}
            isSearchable
            onChange={(value: any) => {
              formik.setValues({
                ...formik.values,
                operation: value,
                subOperation: '',
              });
            }}
          />
        ) : (
          <CustomInputs
            type="dropdown"
            value={formik.values.subOperation}
            error={formik.errors.subOperation}
            placeholder={IntLabel('select_sub_operation')}
            dropdownData={subServicesCompany}
            isSearchable
            onChange={(value: any) =>
              formik.setFieldValue('subOperation', value)
            }
          />
        )}

        {formik.values.institution?.companyType != companyType.doctor &&
          formik.values.institution?.value && (
            <CustomInputs
              type="dropdown"
              value={formik.values.doctor}
              error={formik.errors.doctor}
              dropdownData={doctors}
              placeholder={IntLabel('select_doctor')}
              isSearchable
              onChange={(value: any) => formik.setFieldValue('doctor', value)}
            />
          )}

        <CustomInputs
          type="textareasmall"
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          onBlur={formik.handleBlur('title')}
          error={formik.errors.title}
          touched={formik.touched.title}
        />
        <CustomInputs
          type="textareabig"
          value={formik.values.content}
          onChangeText={formik.handleChange('content')}
          error={formik.errors.content}
          placeholder={IntLabel('comment_text')}
        />
        <View className=" items-start">
          <Text className="text-customGray font-poppinsRegular text-sm mb-1">
            {IntLabel('give_point')}
          </Text>
          <CustomInputs
            type="rating"
            value={formik.values.rank / 20}
            onChange={(e: number) => formik.setFieldValue('rank', e * 20)}
            readonly={false}
          />
        </View>

        <CustomButtons
          type="iconsolid"
          icon="send"
          label={IntLabel('make_comment')}
          theme="middle"
          style={{ marginTop: 20, width: '60%', alignSelf: 'center' }}
          onPress={formik.handleSubmit}
        />
      </Modal>
    </View>
  );
};

export default HomeWrapper;
