import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import UserWrapper from '../UserWrapper';
import {isDarkMode} from '../../../constants/constants';

const Help = () => {
  return (
    <UserWrapper style={{backgroundColor: isDarkMode ? '#4D4A48' : 'white'}}>
      <ScrollView>
        <Text>help</Text>
      </ScrollView>
    </UserWrapper>
  );
};

export default Help;
