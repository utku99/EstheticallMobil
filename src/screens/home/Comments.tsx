import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import HomeWrapper from './HomeWrapper';
import CommentToCompanyComp from '../../components/CommentToCompanyComp';
import WebClient from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import HandleData from '../../components/HandleData';
import IntLabel from '../../components/IntLabel';
import {setListFilters} from '../../redux/slices/filter';
import SpinnerComp from '../../components/SpinnerComp';

const Comments = () => {
  const {Post, loading} = WebClient();
  const {user, language} = useSelector((state: any) => state.user);
  const {
    country,
    city,
    town,
    institution,
    operation,
    suboperation,
    listFilters,
  } = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();
  const [comments, setComments] = useState<any>([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    Post('/api/Comment/GetCommentListAsync', {
      countryId: country?.value ?? 0,
      cityId: city?.value ?? 0,
      townId: town?.value ?? 0,
      companyType: institution?.value ?? 0,
      serviceId: operation?.value ?? 0,
      serviceSubId: suboperation?.value ?? 0,
      languageID: language?.type ?? 1,
      userId: user?.id ?? 0,
    }).then((res: any) => {
      setComments(res.data);
      setClicked(false);
    });

    dispatch(setListFilters(false));
  }, [listFilters, clicked]);

  return (
    <>
      <SpinnerComp loading={loading} />

      <HomeWrapper>
        <HandleData
          data={comments}
          title={IntLabel('warning_no_active_record')}>
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              display: 'flex',
              gap: 15,
              paddingBottom: 20,
            }}
            data={comments}
            renderItem={({item}) => (
              <CommentToCompanyComp item={item} setClicked={setClicked} />
            )}
          />
        </HandleData>
      </HomeWrapper>
    </>
  );
};

export default Comments;
