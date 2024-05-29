import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import IntLabel from '../../components/IntLabel';
import FirmDoctorComp from '../../components/FirmDoctorComp';

const FirmDoctorDetail = ({route}: any) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [doctors, setDoctors] = useState<any>([]);

  useEffect(() => {
    Post('/api/CompanyDoctor/WebCompanyDoctorList', {
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
      userId: user?.id,
    }).then(res => {
      let temp = res.data.object.filter(
        (item: any) =>
          item?.headerModel?.companyDoctorId == route.params.doctorId,
      );
      setDoctors(temp);
    });
  }, []);
  return (
    <FirmWrapper>
      <HandleData
        data={doctors}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={doctors}
          renderItem={({item}) => (
            <FirmDoctorComp key={item.sharedID} item={item} />
          )}
        />
      </HandleData>
    </FirmWrapper>
  );
};

export default FirmDoctorDetail;
