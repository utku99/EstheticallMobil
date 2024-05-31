import React, {useEffect, useState} from 'react';
import UserWrapper from './UserWrapper';
import DoctorComp from '../../components/CompanyHeaderComp';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import {FlatList} from 'react-native';
import IntLabel from '../../components/IntLabel';
import CompanyHeaderComp from '../../components/CompanyHeaderComp';
import DoctorHeaderComp from '../../components/DoctorHeaderComp';
import {SIZES} from '../../constants/constants';

const UserFavorite = () => {
  const [userFavorites, setUserFavorites] = useState<any>([]);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/User/UserMyFavorites', {
      userID: user?.id,
    }).then(res => {
      setUserFavorites(res.data.object);
    });

    if (clicked) {
      setClicked(false);
    }
  }, [clicked]);

  return (
    <UserWrapper title="Favoriler">
      <HandleData
        data={userFavorites}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          style={{width: SIZES.width * 0.95}}
          data={userFavorites}
          renderItem={({item}) =>
            item.companyDoctorId == 0 ? (
              <CompanyHeaderComp
                item={item}
                style={{
                  borderWidth: 1,
                  borderColor: '#CECECE',
                  padding: 10,
                  borderRadius: 12,
                }}
                rating={parseFloat(item?.point) / 20}
                companyId={item?.companyId}
                officeId={item?.companyOfficeId}
                isFavorite={item?.isFavorite}
                setClicked={setClicked}
                isApproved={item?.isApprovedAccount}
              />
            ) : (
              <DoctorHeaderComp
                item={item}
                style={{
                  borderWidth: 1,
                  borderColor: '#CECECE',
                  padding: 10,
                  borderRadius: 12,
                }}
                rating={parseFloat(item?.point) / 20}
                companyId={item?.companyId}
                officeId={item?.companyOfficeId}
                isFavorite={item?.isFavorite}
                setClicked={setClicked}
                doctorId={item?.companyDoctorId}
                isApproved={item?.isApprovedAccount}
              />
            )
          }
        />
      </HandleData>
    </UserWrapper>
  );
};

export default UserFavorite;
