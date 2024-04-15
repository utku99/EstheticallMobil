import React, {useState} from 'react';
import i18next, {languageResources} from '../locales/i18next';
import {Dropdown} from 'react-native-element-dropdown';
import DropdownSingleDownIcon from '../assets/svg/common/DropdownSingleDownIcon';
import DropdownSingleUpIcon from '../assets/svg/common/DropdownSingleUpIcon';
import languageList from '../locales/languageList.json';
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage} from '../redux/slices/user';

const LangChoiceComp = () => {
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const {language, languages} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  return (
    <Dropdown
      data={languages}
      value={language}
      onChange={e => dispatch(setLanguage(e))}
      mode="default"
      labelField="label"
      valueField="value"
      onFocus={() => setIsFocusDropdown(true)}
      onBlur={() => setIsFocusDropdown(false)}
      renderRightIcon={() =>
        isFocusDropdown ? <DropdownSingleUpIcon /> : <DropdownSingleDownIcon />
      }
      style={{
        width: 55,
        height: 40,
      }}
      selectedTextStyle={{
        fontSize: 20,
        color: '#4D4A48',
        fontFamily: 'Poppins-Medium',
        textTransform: 'uppercase',
      }}
      itemTextStyle={{
        fontSize: 14,
        color: '#4D4A48',
        fontFamily: 'Poppins-Medium',
      }}
    />
  );
};

export default LangChoiceComp;
