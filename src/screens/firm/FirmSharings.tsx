import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import FirmWrapper from './FirmWrapper';
import HandleData from '../../components/HandleData';
import WebClient from '../../utility/WebClient';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import SharingComp from '../../components/SharingComp';
import IntLabel from '../../components/IntLabel';
import { useIsFocused } from '@react-navigation/native';

interface props {
  route?: any;
}

const FirmSharings = ({ route }: props) => {
  const { Post, } = WebClient();
  const [sharings, setSharings] = useState<any>([]);
  const { user } = useSelector((state: any) => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Post('/api/Shared/GetCompanySharedDetail', {
      companyID: route.params.companyId,
      companyOfficeID: route.params.companyOfficeId,
      page: 1,
      pageSize: 100,
      userId: user?.id ?? 0,
    }).then(res => {
      setSharings(res.data);
      setLoading(false)
      setClicked(false);
    });


  }, [clicked]);

  const onViewCallBack = React.useCallback((viewableItems: any) => {
    setCurrentIndex(viewableItems?.viewableItems[0]?.index);
  }, []);
  const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 });
  const screenIsFocused = useIsFocused();

  return (
    <FirmWrapper>
      <HandleData
        data={sharings}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{ display: 'flex', gap: 15, paddingBottom: 20 }}
          data={sharings}
          onViewableItemsChanged={onViewCallBack}
          viewabilityConfig={viewConfigRef.current}
          renderItem={({ item, index }) => (
            <SharingComp
              key={item.sharedID}
              item={item}
              isFocus={index === currentIndex && screenIsFocused}
              setClicked={setClicked}
            />
          )}
        />
      </HandleData>
    </FirmWrapper>
  );
};

export default FirmSharings;
