import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import FirmWrapper from './FirmWrapper';
import HandleData from '../../components/HandleData';
import PackageComp from '../../components/PackageComp';
import WebClient from '../../utility/WebClient';
import { useSelector } from 'react-redux';
import IntLabel from '../../components/IntLabel';

interface props {
  route?: any;
}

const FirmPackages = ({ route }: props) => {
  const { Post, } = WebClient();
  const { user } = useSelector((state: any) => state.user);
  const [packages, setPackages] = useState<any>([]);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Post('/api/Package/GetPackagesWeb', {
      companyID: route.params.companyId,
      companyOfficeID: route.params.companyOfficeId,
      userId: user?.id ?? 0,
    }).then(res => {
      let temp = res.data.object.map((item: any) => ({
        images: item.sliders.unshift(item.footerModel?.displayImage),
        ...item,
      }));

      setPackages(temp);
      setLoading(false)
      setClicked(false);
    });

  }, [clicked]);

  return (
    <FirmWrapper>
      <HandleData
        data={packages}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{ display: 'flex', gap: 15, paddingBottom: 20 }}
          data={packages}
          renderItem={({ item, index }) => (
            <PackageComp key={index} item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
    </FirmWrapper>
  );
};

export default FirmPackages;
