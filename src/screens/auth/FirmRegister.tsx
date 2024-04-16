import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthWrapper from './AuthWrapper';
import CustomInputs from '../../components/CustomInputs';
import WebClient from '../../utility/WebClient';
import LegalTextComp from '../../components/LegalTextComp';
import IntLabel from '../../components/IntLabel';

const FirmRegister = ({route}: any) => {
  const {Post} = WebClient();

  const [doctorTitles, setDoctorTitles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [districts, setDistricts] = useState([]);

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
        countryID: 212,
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
        cityID: 1,
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
        townID: 1,
      }).then(res => {
        const districts = res.data.map((item: any) => ({
          value: item.districtID,
          label: item.name,
        }));
        setDistricts(districts);
      });
    };
  }, []);

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
      }`}>
      <CustomInputs type="text" placeholder={IntLabel('name')} />
      <CustomInputs type="text" placeholder={IntLabel('surname')} />

      {route.params.type == 4 ? (
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('title')}
          value={''}
          dropdownData={doctorTitles}
        />
      ) : (
        <CustomInputs type="text" placeholder={IntLabel('company_name')} />
      )}
      <CustomInputs type="text" placeholder={IntLabel('phone')} />
      <View className="flex-row items-center justify-between">
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('country')}
          value={''}
          dropdownData={countries}
          dropdownContainerStyle={{width: '45%'}}
          isSearchable
        />
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('city')}
          value={''}
          dropdownData={cities}
          dropdownContainerStyle={{width: '45%'}}
          isSearchable
        />
      </View>
      <View className="flex-row items-center justify-between">
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('town')}
          value={''}
          dropdownData={towns}
          dropdownContainerStyle={{width: '45%'}}
          isSearchable
        />
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('district')}
          value={''}
          dropdownData={districts}
          dropdownContainerStyle={{width: '45%'}}
          isSearchable
        />
      </View>
      <CustomInputs type="text" placeholder={IntLabel('email')} />
      <CustomInputs
        type="text"
        placeholder={IntLabel('password')}
        secureTextEntry
      />
      <CustomInputs
        type="text"
        placeholder={IntLabel('re_password')}
        secureTextEntry
      />

      <LegalTextComp value={true} onChange={() => ''} type="auth" />
    </AuthWrapper>
  );
};

export default FirmRegister;
