import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import {legalTextType} from '../../../constants/enum';
import RenderHTML from 'react-native-render-html';
import {SIZES} from '../../../constants/constants';

const AboutUs = () => {
  const {Post} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.ABOUT,
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

export default AboutUs;
