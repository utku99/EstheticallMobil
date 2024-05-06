import {View, Text, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInputs from './CustomInputs';
import ModalWrapper from './ModalWrapper';
import WebClient from '../utility/WebClient';
import {legalTextType} from '../constants/enum';
import RenderHTML from 'react-native-render-html';
import {SIZES} from '../constants/constants';
import IntLabel from './IntLabel';
import {useSelector} from 'react-redux';
import {FormattedMessage} from 'react-intl';

interface props {
  value: boolean;
  onChange: any;
  type: 'auth' | 'question';
  error?: any;
}

const LegalTextComp = ({value, onChange, type, error}: props) => {
  const [visible, setVisible] = useState(false);
  const {Post} = WebClient();
  const [legalText, setLegalText] = useState<any>('');
  const [legalText2, setLegalText2] = useState<any>('');
  const [legalText3, setLegalText3] = useState<any>('');
  const {language} = useSelector((state: any) => state.user);

  useEffect(() => {
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.PRIVACYANDTERMSOFUSE,
      languageID: language?.type,
    }).then((res: any) => {
      setLegalText(res.data.object);
    });
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.IndividualMembershipAgreement,
      languageID: language?.type,
    }).then((res: any) => {
      setLegalText2(res.data.object);
    });
    Post('/api/Common/GetLegalTextWeb', {
      typeID: legalTextType.EXPRESSCONSENTTEXT,
      languageID: language?.type,
    }).then((res: any) => {
      setLegalText3(res.data.object);
    });
  }, [language]);

  return (
    <>
      {type == 'auth' && (
        <View className="mb-3">
          <View className="flex-row space-x-2">
            <CustomInputs type="checkbox" value={value} onChange={onChange} />

            <Text
              onPress={() => setVisible(true)}
              className="text-xs font-poppinsRegular text-black flex-shrink">
              {IntLabel('auth_text_title')}
            </Text>

            <ModalWrapper visible={visible} setVisible={setVisible}>
              <RenderHTML
                contentWidth={SIZES.width}
                source={{html: legalText?.content}}
              />
              <RenderHTML
                contentWidth={SIZES.width}
                source={{html: legalText2?.content}}
              />
            </ModalWrapper>
          </View>
          {error && <Text className="text-red-400 text-xs "> {error}</Text>}
        </View>
      )}

      {type == 'question' && (
        <View className="mb-3">
          <View className="flex-row space-x-2">
            <CustomInputs type="checkbox" value={value} onChange={onChange} />

            <Text className="text-xs font-poppinsRegular text-customGray flex-shrink">
              {/* {IntLabel('question_text_title')} */}
              <FormattedMessage
                id="question_text_title"
                defaultMessage={'question_text_title'}
                values={{
                  express_consent_textTR: (
                    <Text
                      onPress={() => setVisible(true)}
                      className="text-xs font-poppinsRegular text-customOrange flex-shrink">
                      özel nitelikli kişisel veri açık rıza metnini
                    </Text>
                  ),
                  express_consent_textEN: (
                    <Text
                      onPress={() => setVisible(true)}
                      className="text-xs font-poppinsRegular text-customOrange flex-shrink">
                      special personal data can be obtained with explicit
                      consent
                    </Text>
                  ),
                }}
              />
            </Text>

            <ModalWrapper visible={visible} setVisible={setVisible}>
              <RenderHTML
                contentWidth={SIZES.width}
                source={{html: legalText3?.content}}
              />
            </ModalWrapper>
          </View>
          {error && <Text className="text-red-400 text-xs "> {error}</Text>}
        </View>
      )}
    </>
  );
};

export default LegalTextComp;
