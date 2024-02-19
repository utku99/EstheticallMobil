import React, {useEffect, useState} from 'react';
import HomeWrapper from './HomeWrapper';
import SharingComp from '../../components/SharingComp';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {setListFilters} from '../../redux/slices/filter';
import HandleData from '../../components/HandleData';

const Sharings = () => {
  const {Post, loading} = WebClient();
  const dispatch = useDispatch();
  const {user} = useSelector((state: any) => state.user);
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

  const [shareds, SetShareds] = useState<any>([]);

  useEffect(() => {
    Post('/api/Shared/GetSharedLists', {
      countryId: country?.value ?? 0,
      cityId: city?.value ?? 0,
      townId: town?.value ?? 0,
      companyType: institution?.value ?? 0,
      serviceId: operation?.value ?? 0,
      serviceSubId: suboperation?.value ?? 0,
      userId: user?.id ?? 0,
    }).then((res: any) => {
      SetShareds(res.data);
    });

    dispatch(setListFilters(false));
    setClicked(false);
  }, [listFilters, clicked]);

  return (
    <HomeWrapper>
      <HandleData
        data={shareds}
        loading={loading}
        title="Aranan Kategoride Paylaşım Bulunamadı">
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={shareds}
          renderItem={({item}) => (
            <SharingComp
              key={item.sharedID}
              item={item}
              onClickable
              setClicked={setClicked}
            />
          )}
        />
      </HandleData>
    </HomeWrapper>
  );
};

export default Sharings;
