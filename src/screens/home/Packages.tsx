import { View, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';
import { useSelector } from 'react-redux';
import PackageComp from '../../components/PackageComp';
import { Modal } from 'react-native-paper';
import FitlerIcon from '../../assets/svg/homepages/FitlerIcon';
import CustomInputs from '../../components/CustomInputs';
import CustomButtons from '../../components/CustomButtons';
import IntLabel from '../../components/IntLabel';

const Packages = () => {
  const { Post, } = WebClient();
  const [packages, setPackages] = useState<any>([]);
  const { user, language } = useSelector((state: any) => state.user);

  const [country, setCountry] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [town, setTown] = useState<any>(null);
  const [district, setDistrict] = useState<any>(null);
  const [institution, setInstitution] = useState<any>(null);
  const [operation, setOperation] = useState<any>(null);
  const [suboperation, setSuboperation] = useState<any>(null);

  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [countries, setCountries] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [towns, setTowns] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);

  const institutionData = [
    { value: 1, label: IntLabel('hospital') },
    { value: 4, label: IntLabel('doctor') },
    { value: 2, label: IntLabel('beauty_center') },
    { value: 3, label: IntLabel('clinic') },
  ];
  const [services, setServices] = useState<any>([]);
  const [serviceSubs, setServiceSubs] = useState<any>([]);

  const [filterInstitution, setFilterInstitution] = useState<any>([]);
  const [loading, setLoading] = useState(true);

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

    Post('/api/Package/GetPackagesListAsync', {
      countryId: country?.value ?? 0,
      cityId: city?.value ?? 0,
      townId: town?.value ?? 0,
      companyType: institution?.value ?? 0,
      serviceId: operation?.value ?? 0,
      serviceSubId: suboperation?.value ?? 0,
      languageID: language?.type ?? 1,
      userID: user?.id ?? 0,
    }).then((res: any) => {
      let temp = res.data.map((item: any) => ({
        images: item.images.unshift(item.packageDisplayImage),
        ...item,
      }));
      setPackages(temp);
      setLoading(false)
      setClicked(false);
    });

  }, [clicked, language, country, city, town, operation]);

  return (
    <View className="bg-[#FAFAFA] flex-1 relative">
      <TouchableOpacity
        className="absolute left-2 top-2 z-50"
        onPress={() => setVisible(true)}>
        <FitlerIcon />
      </TouchableOpacity>

      <HandleData
        data={packages}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            display: 'flex',
            gap: 15,
            paddingBottom: 20,
            paddingVertical: 15,
            alignItems: 'center',
          }}
          data={packages}
          renderItem={({ item }) => (
            <PackageComp
              key={item.packageID}
              item={item}
              setClicked={setClicked}
            />
          )}
        />
      </HandleData>

      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ justifyContent: 'flex-start' }}
        contentContainerStyle={{
          padding: 30,
          backgroundColor: 'white',
          width: '70%',
          top: 50,
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
            onChange={(e: any) => setCountry(e)}
          />
        )}
        {country && !city && (
          <CustomInputs
            type="dropdown"
            value={city}
            dropdownData={cities}
            placeholder={IntLabel('select_city')}
            isSearchable
            onChange={(e: any) => setCity(e)}
          />
        )}
        {city && !town && (
          <CustomInputs
            type="dropdown"
            value={town}
            dropdownData={towns}
            placeholder={IntLabel('select_town')}
            isSearchable
            onChange={(e: any) => setTown(e)}
          />
        )}
        {town && (
          <CustomInputs
            type="dropdown"
            value={district}
            dropdownData={districts}
            placeholder={IntLabel('select_district')}
            isSearchable
            onChange={(e: any) => setDistrict(e)}
          />
        )}

        {!operation && (
          <CustomInputs
            type="dropdown"
            value={operation}
            dropdownData={services}
            placeholder={IntLabel('select_operation')}
            isSearchable
            onChange={(e: any) => setOperation(e)}
          />
        )}
        {operation && (
          <CustomInputs
            type="dropdown"
            value={suboperation}
            dropdownData={serviceSubs}
            placeholder={IntLabel('select_sub_operation')}
            isSearchable
            onChange={(e: any) => setSuboperation(e)}
          />
        )}

        <CustomInputs
          type="dropdown"
          value={institution}
          dropdownData={filterInstitution}
          placeholder={IntLabel('select_institution_type')}
          onChange={(e: any) => setInstitution(e)}
        />

        <View className="flex-row  justify-between">
          <CustomButtons
            type="solid"
            label={IntLabel('list_filter')}
            theme="middle"
            style={{ width: 90 }}
            onPress={() => {
              setClicked(true);
              setVisible(false);
            }}
          />
          <CustomButtons
            type="outlined"
            label={IntLabel('reset')}
            theme="middle"
            style={{ width: 90 }}
            onPress={() => {
              setClicked(true);
              setCountry(null);
              setCity(null);
              setTown(null);
              setInstitution(null);
              setOperation(null);
              setSuboperation(null);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Packages;
