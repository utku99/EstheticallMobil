import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import FirmDoctorComp from '../../components/FirmDoctorComp';
import IntLabel from '../../components/IntLabel';

interface props {
  route?: any;
}

const FirmDoctors = ({route}: props) => {
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [doctors, setDoctors] = useState<any>([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/CompanyDoctor/WebCompanyDoctorList', {
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
      userId: user?.id,
    }).then(res => {
      setDoctors(res.data.object);
    });

    if (clicked) {
      setClicked(false);
    }
  }, [clicked]);

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
            <FirmDoctorComp
              key={item.sharedID}
              item={item}
              setClicked={setClicked}
            />
          )}
        />
      </HandleData>
    </FirmWrapper>
  );
};

export default FirmDoctors;
