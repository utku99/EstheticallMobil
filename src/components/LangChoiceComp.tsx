import React, {useState} from 'react';
import i18next, {languageResources} from '../locales/i18next';
import {Dropdown} from 'react-native-element-dropdown';
import DropdownSingleDownIcon from '../assets/svg/common/DropdownSingleDownIcon';
import DropdownSingleUpIcon from '../assets/svg/common/DropdownSingleUpIcon';
import languageList from '../locales/languageList.json';

const LangChoiceComp = () => {
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const [languages] = useState(
    Object.keys(languageResources)?.map(item => ({
      label: item,
      value: item == 'tr' ? 1 : 2,
    })),
  );

  console.log(Object.keys(languageResources), '-');
  console.log(i18next.language.toLocaleUpperCase());
  console.log(languageList['tr']?.nativeName);

  return (
    <Dropdown
      data={languages}
      value={{
        label: i18next.language.toLocaleUpperCase(),
        value: i18next.language == 'tr' ? 1 : 2,
      }}
      onChange={e => i18next.changeLanguage(e.label)}
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
