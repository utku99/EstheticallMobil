import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import {legalTextType} from '../../../constants/enum';
import RenderHTML from 'react-native-render-html';
import {SIZES} from '../../../constants/constants';
import SpinnerComp from '../../../components/SpinnerComp';

const TermsOfUse = () => {
  const {Post, loading} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.PRIVACYANDTERMSOFUSE,
      languageID: language?.type ?? 1,
    }).then((res: any) => {
      setLegalText(res.data.object);
    });
  }, [language]);

  return (
    <UserWrapper>
      {loading ? (
        <SpinnerComp />
      ) : (
        <View className=" w-[90%]">
          <RenderHTML
            contentWidth={SIZES.width}
            source={{html: legalText?.content}}
          />
        </View>
      )}
    </UserWrapper>
  );
};

export default TermsOfUse;
