import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import WebClient from '../../utility/WebClient';
import {useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import CommentToCompanyComp from '../../components/CommentToCompanyComp';
import IntLabel from '../../components/IntLabel';

interface props {
  route?: any;
}

const FirmComments = ({route}: props) => {
  const {Post, loading} = WebClient();
  const [comments, setComments] = useState<any>([]);
  const {user} = useSelector((state: any) => state.user);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/Company/GetCompanyCommentsWeb', {
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
      companyTypeId: route.params.companyOfficeId == 0 ? 0 : 1,
      userId: user?.id ?? 0,
    }).then(res => {
      setComments(res.data);
    });

    if (clicked) {
      setClicked(false);
    }
  }, [clicked]);

  return (
    <FirmWrapper>
      <HandleData
        data={comments}
        loading={loading}
        title={IntLabel('warning_no_active_record')}>
        <FlatList
          contentContainerStyle={{display: 'flex', gap: 15, paddingBottom: 20}}
          data={comments}
          renderItem={({item}) => (
            <CommentToCompanyComp item={item} setClicked={setClicked} />
          )}
        />
      </HandleData>
    </FirmWrapper>
  );
};

export default FirmComments;
