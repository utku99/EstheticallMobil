import {View, Text} from 'react-native';
import React, {useState} from 'react';
import AuthWrapper from './AuthWrapper';
import CustomInputs from '../../components/CustomInputs';
import LegalTextComp from '../../components/LegalTextComp';
import IntLabel from '../../components/IntLabel';

const UserRegister = ({}) => {
  return (
    <AuthWrapper title={IntLabel('new_user')}>
      <CustomInputs type="text" placeholder={IntLabel('name')} />
      <CustomInputs type="text" placeholder={IntLabel('surname')} />
      <CustomInputs type="text" placeholder={IntLabel('nickname')} />
      <CustomInputs
        type="date"
        placeholder={IntLabel('birthday')}
        value={null}
      />
      <CustomInputs
        type="dropdown"
        placeholder={IntLabel('gender')}
        value={''}
        dropdownData={[
          {label: 'erkek', value: 1},
          {label: 'kadın', value: 2},
        ]}
      />
      <View className="flex-row items-center justify-between">
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('country')}
          value={''}
          dropdownData={[
            {label: 'erkek', value: 1},
            {label: 'kadın', value: 2},
          ]}
          dropdownContainerStyle={{width: '45%'}}
        />
        <CustomInputs
          type="dropdown"
          placeholder={IntLabel('city')}
          value={''}
          dropdownData={[
            {label: 'erkek', value: 1},
            {label: 'kadın', value: 2},
          ]}
          dropdownContainerStyle={{width: '45%'}}
        />
      </View>
      <CustomInputs type="text" placeholder={IntLabel('email')} />
      <CustomInputs
        type="text"
        placeholder={IntLabel('password')}
        secureTextEntry
      />
      <CustomInputs
        type="text"
        placeholder={IntLabel('re_password')}
        secureTextEntry
      />

      <LegalTextComp value={true} onChange={() => ''} type="auth" />
    </AuthWrapper>
  );
};

export default UserRegister;
