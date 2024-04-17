import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import {legalTextType} from '../../../constants/enum';
import {useSelector} from 'react-redux';
import WebClient from '../../../utility/WebClient';
import RenderHTML from 'react-native-render-html';
import {SIZES} from '../../../constants/constants';

const PrivacyPolicy = () => {
  const {Post} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.DISCLOSURETEXTANDCOOKIEPOLICY,
      languageID: language?.type,
    }).then((res: any) => {
      setLegalText(res.data.object);
    });
  }, [language]);

  return (
    <UserWrapper>
      <View className=" w-[90%]">
        <RenderHTML
          contentWidth={SIZES.width}
          source={{html: legalText?.content}}
        />
      </View>
    </UserWrapper>
  );
};

export default PrivacyPolicy;
