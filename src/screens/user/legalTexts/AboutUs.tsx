import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import {legalTextType} from '../../../constants/enum';
import RenderHTML from 'react-native-render-html';
import {SIZES, isDarkMode} from '../../../constants/constants';

const AboutUs = () => {
  const {Post} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.ABOUT,
      languageID: language?.type ?? 1,
    }).then((res: any) => {
      setLegalText(res.data.object);
    });
  }, [language]);

  return (
    <UserWrapper style={{backgroundColor: isDarkMode ? '#4D4A48' : 'white'}}>
      <ScrollView className=" w-[90%]">
        <RenderHTML
          contentWidth={SIZES.width}
          source={{html: legalText?.content}}
        />
      </ScrollView>
    </UserWrapper>
  );
};

export default AboutUs;
