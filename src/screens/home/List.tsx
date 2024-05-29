import React, {useEffect, useState} from 'react';
import HomeWrapper from './HomeWrapper';
import CompanyHeaderComp from '../../components/CompanyHeaderComp';
import {FlatList} from 'react-native';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {setListFilters} from '../../redux/slices/filter';
import HandleData from '../../components/HandleData';
import IntLabel from '../../components/IntLabel';
import AdvertisementList from '../../components/AdvertisementList';
import {SIZES} from '../../constants/constants';

const List = () => {
  const {Post, loading} = WebClient();
  const dispatch = useDispatch();
  const {user, language} = useSelector((state: any) => state.user);
  const [clicked, setClicked] = useState(false);

  const {
    country,
    city,
    town,
    institution,
    operation,
    suboperation,
    listFilters,
  } = useSelector((state: any) => state.filter);

  const [doctors, setDoctors] = useState<any>([]);

  useEffect(() => {
    Post('/api/Company/CompanyFilterListAsync', {
      countryId: country?.value ?? 0,
      cityId: city?.value ?? 0,
      townId: town?.value ?? 0,
      companyType: institution?.value ?? 0,
      serviceId: operation?.value ?? 0,
      serviceSubId: suboperation?.value ?? 0,
      languageID: language?.type ?? 1,
      userId: user?.id ?? 0,
    }).then((res: any) => {
      setDoctors(res.data);
    });

    if (listFilters) {
      dispatch(setListFilters(false));
    }

    if (clicked) {
      setClicked(false);
    }
  }, [listFilters, clicked, language]);

  return (
    <HomeWrapper>
      <HandleData
        data={doctors}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          style={{width: SIZES.width * 0.95}}
          data={doctors}
          renderItem={({item, index}) => (
            <CompanyHeaderComp
              key={index}
              item={item}
              setClicked={setClicked}
              style={{
                borderWidth: 1,
                borderColor: '#CECECE',
                padding: 10,
                borderRadius: 12,
              }}
              rating={parseFloat(item?.companyPoint) / 20}
              companyId={item?.companyID}
              officeId={item?.companyOfficeID}
              isFavorite={item?.isFavorite}
              isApproved={item?.isApprovedAccount}
            />
            // <AdvertisementList />
          )}
        />
      </HandleData>
    </HomeWrapper>
  );
};

export default List;
