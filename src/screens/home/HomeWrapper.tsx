import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import FitlerIcon from '../../assets/svg/homepages/FitlerIcon';
import CustomButtons from '../../components/CustomButtons';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomInputs from '../../components/CustomInputs';
import {Modal} from 'react-native-paper';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {
  resetFilters,
  setCity,
  setCountry,
  setInstitution,
  setListFilters,
  setOperation,
  setSubOperation,
  setTown,
} from '../../redux/slices/filter';
import {SIZES} from '../../constants/constants';
import IntLabel from '../../components/IntLabel';

interface props {
  children?: React.ReactNode;
}

const HomeWrapper: React.FC<props> = ({children}) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const route = useRoute();
  const {Post} = WebClient();

  const {country, city, town, institution, operation, suboperation} =
    useSelector((state: any) => state.filter);

  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [towns, setTowns] = useState([]);
  const [services, setServices] = useState<any>([]);
  const [serviceSubs, setServiceSubs] = useState<any>([]);

  const institutionData = [
    {value: 1, label: 'Hastane'},
    {value: 4, label: 'Doktor'},
    {value: 2, label: 'Güzellik Merkezi'},
    {value: 3, label: 'Klinik'},
  ];

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
          getTown();
        });
    };

    const getTown = () => {
      Post('/api/Common/GetTownsAsync', {
        cityID: city?.value,
      }).then(res => {
        const towns = res.data.map((item: any) => ({
          value: item.townID,
          label: item.name,
        }));
        setTowns(towns);
      });
    };

    Post('/api/Service/GetAllServices', {})
      .then((res: any) => {
        let temp = res.data;
        temp.unshift({value: 0, label: 'Tümü'});
        setServices(temp);
      })
      .finally(() => {
        Post('/api/Service/GetSubServicesByService', {
          serviceId: operation?.value,
        }).then(res => {
          let temp = res.data;
          temp.unshift({value: 0, label: 'Tümü'});
          setServiceSubs(temp);
        });
      });
  }, [country, city, operation]);

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
          contentContainerStyle={{
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 10,
          }}>
          <CustomButtons
            type={route.name == 'sharing' ? 'solid' : 'outlined'}
            label={IntLabel('sharings')}
            style={{width: 110}}
            onPress={() => {
              navigation.navigate('sharing', {tab: 1});
            }}
          />
          <CustomButtons
            type={route.name == 'comment' ? 'solid' : 'outlined'}
            label={IntLabel('comments')}
            style={{width: 110}}
            onPress={() => {
              navigation.navigate('comment', {tab: 2});
            }}
          />
          <CustomButtons
            type={route.name == 'list' ? 'solid' : 'outlined'}
            label={IntLabel('list')}
            style={{width: 110}}
            onPress={() => {
              navigation.navigate('list', {tab: 3});
            }}
          />
          <CustomButtons
            type={route.name == 'map' ? 'iconsolid' : 'iconoutlined'}
            icon="location"
            label={IntLabel('map')}
            style={{width: 110}}
            onPress={() => {
              navigation.navigate('map', {tab: 4});
            }}
          />
        </ScrollView>
      </View>

      <View className="items-center w-full flex-1">{children}</View>

      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{justifyContent: 'flex-start'}}
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
        {city && (
          <CustomInputs
            type="dropdown"
            value={town}
            dropdownData={towns}
            placeholder={IntLabel('select_town')}
            isSearchable
            onChange={(e: any) => dispatch(setTown(e))}
          />
        )}

        <CustomInputs
          type="dropdown"
          value={institution}
          dropdownData={institutionData}
          placeholder={IntLabel('select_institution_type')}
          onChange={(e: any) => dispatch(setInstitution(e))}
        />

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

        <View className="flex-row  justify-between">
          <CustomButtons
            type="solid"
            label={IntLabel('list_filter')}
            theme="middle"
            style={{width: 90}}
            onPress={() => {
              dispatch(setListFilters(true));
              setVisible(false);
            }}
          />
          <CustomButtons
            type="outlined"
            label={IntLabel('reset')}
            theme="middle"
            style={{width: 90}}
            onPress={() => {
              dispatch(setListFilters(true));
              dispatch(resetFilters());
              setVisible(false);
            }}
          />
        </View>
      </Modal>
    </View>
  );
};

export default HomeWrapper;
