import {View, Text, Image, Pressable, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import {useSelector} from 'react-redux';
import WebClient, {toast} from '../../utility/WebClient';
import EditIcon from '../../assets/svg/userMenu/EditIcon';
import {openPicker} from 'react-native-image-crop-picker';
import CustomInputs from '../../components/CustomInputs';
import CustomButtons from '../../components/CustomButtons';
import HandleData from '../../components/HandleData';
import {useFormik} from 'formik';
import {genderData} from '../../constants/enum';
import moment from 'moment';
import IntLabel from '../../components/IntLabel';

const UserProfile = () => {
  const {user} = useSelector((state: any) => state.user);
  const {Post, loading} = WebClient();

  const [userInfo, setUserInfo] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const openGalery = () => {
    openPicker({
      cropping: false,
      includeBase64: true,
      multiple: false,
    }).then((image: any) => {
      setSelectedImage(image.data);
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      logo: userInfo?.logo ?? '',
      name: userInfo?.name ?? '',
      surname: userInfo?.surname ?? '',
      email: userInfo?.mail ?? '',
      nickname: userInfo?.userName ?? '',
      date: userInfo?.birthDate,
      gender: genderData.find(item => item.value === userInfo?.gender) ?? 0,
      country:
        countries?.find((item: any) => item.value === userInfo?.countryId) ?? 0,
      city: cities?.find((item: any) => item.value === userInfo?.cityId) ?? 0,
    } as any,
    onSubmit: values => {
      Post('/api/User/WebEditUser', {
        userId: user.id,
        logo: selectedImage,
        name: values.name,
        surname: values.surname,
        userName: values.nickname,
        mail: values.email,
        birthDate: values.date,
        gender: values.gender?.value,
        countryId: values.country?.value,
        cityId: values.city?.value,
      }).then(res => {
        toast(res.data.message);
      });
    },
  });

  useEffect(() => {
    Post('/api/User/WebGetUser', {
      userId: user?.id,
    }).then(res => {
      if (res.data.code === '100') {
        setUserInfo(res.data.object);
      }
    });

    Post('/api/Common/GetCountries', {})
      .then(res => {
        if (res.data.code === '100') {
          const countries = res.data.object.map((item: any) => ({
            value: item.countryID,
            label: item.countryName,
          }));
          setCountries(countries);
        }
      })
      .finally(() => {
        Post('/api/Common/GetCities', {
          countryID: formik.values.country?.value,
        }).then(res => {
          if (res.data.code === '100') {
            const cities = res.data.object.map((item: any) => ({
              value: item.cityID,
              label: item.name,
            }));
            setCities(cities);
          }
        });
      });
  }, [formik.values.country?.value]);

  return (
    <UserWrapper>
      <HandleData loading={loading}>
        <ScrollView
          contentContainerStyle={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
          }}
          className="px-[5%] ">
          {/* image */}
          <View className="flex-row space-x-1 mb-6">
            <View className="w-[80px] h-[80px] overflow-hidden rounded-full border border-opacity-50 border-customGray">
              <Image
                source={{
                  uri: selectedImage
                    ? `data:img/jpeg;base64,` + selectedImage
                    : formik.values.logo,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <Pressable onPress={() => openGalery()} className="self-end">
              <EditIcon />
            </Pressable>
          </View>

          <CustomInputs
            type="text"
            defaultValue={formik.values.name}
            onChangeText={formik.handleChange('name')}
            placeholder={IntLabel('name')}
            onBlur={formik.handleBlur('name')}
            error={formik.errors.name}
            touched={formik.touched.name}
          />

          <CustomInputs
            type="text"
            defaultValue={formik.values.surname}
            onChangeText={formik.handleChange('surname')}
            placeholder={IntLabel('surname')}
            onBlur={formik.handleBlur('surname')}
            error={formik.errors.surname}
            touched={formik.touched.surname}
          />

          <CustomInputs
            type="text"
            defaultValue={formik.values.email}
            onChangeText={formik.handleChange('email')}
            placeholder={IntLabel('email')}
            onBlur={formik.handleBlur('email')}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <CustomInputs
            type="text"
            defaultValue={formik.values.nickname}
            onChangeText={formik.handleChange('nickname')}
            placeholder={IntLabel('nickname')}
            onBlur={formik.handleBlur('nickname')}
            error={formik.errors.nickname}
            touched={formik.touched.nickname}
          />

          <CustomInputs
            type="date"
            placeholder={IntLabel('birthday')}
            value={moment(formik.values.date).toDate()}
            onChange={(e: any) => {
              formik.setFieldValue('date', e);
            }}
          />

          <View className="w-full">
            <CustomInputs
              type="dropdown"
              value={formik.values.gender}
              onChange={(e: any) => formik.setFieldValue('gender', e)}
              dropdownData={genderData}
              placeholder={IntLabel('gender')}
              onBlur={formik.handleBlur('gender')}
              // error={formik.errors.gender}
              // touched={formik.touched.gender}
            />
          </View>

          <View className="flex-row justify-between w-full">
            <View className=" w-[45%]">
              <CustomInputs
                type="dropdown"
                value={formik.values.country}
                onChange={(e: any) => {
                  formik.setValues({
                    ...formik.values,
                    country: e,
                    city: '',
                  });
                }}
                dropdownData={countries}
                placeholder={IntLabel('country')}
                onBlur={formik.handleBlur('country')}
                error={formik.errors.country}
                touched={formik.touched.country}
                isSearchable
              />
            </View>
            <View className=" w-[45%]">
              <CustomInputs
                type="dropdown"
                value={formik.values.city}
                onChange={(e: any) => formik.setFieldValue('city', e)}
                dropdownData={cities}
                placeholder={IntLabel('city')}
                onBlur={formik.handleBlur('city')}
                error={formik.errors.city}
                touched={formik.touched.city}
                isSearchable
              />
            </View>
          </View>
          <View className="flex-1"></View>
          <CustomButtons
            type="solid"
            label={IntLabel('save_changes')}
            theme="big"
            onPress={formik.handleSubmit}
            style={{width: '100%'}}
          />
        </ScrollView>
      </HandleData>
    </UserWrapper>
  );
};

export default UserProfile;
