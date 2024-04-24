import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable, TextInput} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import CalendarIcon from '../assets/svg/common/CalendarIcon';
import DropdownRightDownIcon from '../assets/svg/common/DropdownRightDownIcon';
import DropdownRightUpIcon from '../assets/svg/common/DropdownRightUpIcon';
import EyeOpen from '../assets/svg/auth/EyeOpen';
import {Rating} from 'react-native-ratings';
import Tick from '../assets/svg/common/Tick';
import moment from 'moment';
import IntLabel from './IntLabel';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {FormattedDate} from 'react-intl';
import {useTheme} from '@react-navigation/native';

interface props {
  type:
    | 'text'
    | 'textarea'
    | 'date'
    | 'date2'
    | 'dropdown'
    | 'checkbox'
    | 'rating'
    | 'textareasmall'
    | 'textareabig';
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  onChange?: any;
  onChangeText?: any;
  onBlur?: any;
  secureTextEntry?: boolean;
  dropdownData?: any;
  isSearchable?: boolean;
  disable?: boolean;
  error?: any;
  touched?: any;
  title?: string;
  style?: any;
  dropdownContainerStyle?: any;
  minimumDate?: Date;
  maximumDate?: Date;
  readonly?: boolean;
}

const CustomInputs: React.FC<props> = ({
  type,
  placeholder,
  value,
  defaultValue,
  onChange,
  onChangeText,
  onBlur,
  secureTextEntry = false,
  dropdownData,
  isSearchable,
  error,
  touched,
  disable = false,
  title,
  style,
  dropdownContainerStyle,
  minimumDate,
  maximumDate,
  readonly = true,
}) => {
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showSecure, setShowSecure] = useState(secureTextEntry);
  const {language} = useSelector((state: any) => state.user);
  const colors = useTheme().colors;

  return (
    <>
      {type == 'text' && (
        <View className="w-full mb-3" style={style}>
          <View className="flex-row items-center">
            {title && (
              <Text className="text-sm font-poppinsRegular  text-customGray w-[40%] text-right pr-3">
                {title}
              </Text>
            )}
            <View className="h-[40px] flex-1 bg-white rounded-lg border border-customLightGray px-2 flex-row items-center">
              <TextInput
                value={value}
                defaultValue={defaultValue}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChangeText}
                secureTextEntry={showSecure}
                placeholderTextColor={'background: rgba(77, 74, 72, 0.5)'}
                className="flex-1 text-customGray text-xs p-0 font-poppinsRegular"
              />
              {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowSecure(!showSecure)}>
                  <EyeOpen fill={showSecure ? '#FF8170' : 'gray'} />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {error && touched && (
            <Text className="text-red-400 text-xs "> {error}</Text>
          )}
        </View>
      )}
      {type == 'textareasmall' && (
        <View className="mb-3" style={style}>
          {title && (
            <Text className="font-poppinsMedium text-customGray text-base  mb-3">
              {title}
            </Text>
          )}
          <TextInput
            className={` border border-customLightGray rounded-xl bg-white min-h-[40px] max-h-[80px] px-2 text-customGray text-xs font-poppinsRegular`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            onBlur={onBlur}
            textAlignVertical="top"
            multiline
            placeholder={IntLabel('title_text')}
            placeholderTextColor={'rgba(77,74,72,0.5)'}
          />
          {error && <Text className="text-red-400 text-xs "> {error}</Text>}
        </View>
      )}
      {type == 'textareabig' && (
        <View className="mb-3" style={style}>
          {title && (
            <Text className="font-poppinsMedium text-customGray text-base  mb-3">
              {title}
            </Text>
          )}
          <TextInput
            textAlignVertical="top"
            className={` border border-customLightGray rounded-xl bg-white min-h-[100px] max-h-[400px] px-2 text-customGray text-xs font-poppinsRegular`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            onBlur={onBlur}
            multiline
            placeholder={placeholder}
            placeholderTextColor={'rgba(77,74,72,0.5)'}
          />
          {error && <Text className="text-red-400 text-xs "> {error}</Text>}
        </View>
      )}
      {type == 'date' && (
        <View className=" mb-3 w-full" style={style}>
          <TouchableOpacity
            className="h-[40px] bg-white rounded-lg border border-customLightGray px-2 placeholder:text-customGray/[.5] flex-row items-center"
            onPress={() => setShowDateModal(true)}>
            <Text
              className={`flex-1 text-customGray ${
                value ? 'text-opacity-100' : 'text-opacity-50'
              }  text-xs font-poppinsRegular `}>
              {value ? <FormattedDate value={value} /> : placeholder}
            </Text>
            <CalendarIcon />
          </TouchableOpacity>
          <DatePicker
            modal
            mode="date"
            open={showDateModal}
            date={value}
            locale={language?.flag_code ?? 'tr'}
            onConfirm={date => {
              setShowDateModal(false);
              onChange(date);
            }}
            onCancel={() => {
              setShowDateModal(false);
            }}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
            title={IntLabel('select_date')}
            confirmText={IntLabel('confirm')}
            cancelText={IntLabel('cancel')}
            className="w-10 bg-red-400"
          />
          {error && <Text className="text-red-400 text-xs ">{error}</Text>}
        </View>
      )}
      {type == 'dropdown' && (
        <View className="mb-3" style={dropdownContainerStyle}>
          <View className="flex-row items-center">
            {title && (
              <Text className="text-sm font-poppinsRegular  text-customGray w-[40%] text-right pr-3">
                {title}
              </Text>
            )}
            <Dropdown
              data={dropdownData ?? []}
              search={isSearchable}
              mode="default"
              labelField="label"
              valueField="value"
              searchPlaceholder={IntLabel('search')}
              placeholder={placeholder ?? ''}
              placeholderStyle={{
                color: 'rgba(77, 74, 72, 0.5)',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}
              itemTextStyle={{color: 'rgba(77, 74, 72, 1)', height: 20}}
              onFocus={() => setIsFocusDropdown(true)}
              onBlur={() => setIsFocusDropdown(false)}
              value={value}
              disable={disable}
              onChange={onChange}
              renderRightIcon={() =>
                isFocusDropdown ? (
                  <DropdownRightUpIcon />
                ) : (
                  <DropdownRightDownIcon />
                )
              }
              style={[
                {
                  paddingLeft: 8,
                  height: 40,
                  backgroundColor: 'white',
                  flex: 1,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#CECECE',
                  overflow: 'hidden',
                },
                style,
              ]}
              selectedTextStyle={{fontSize: 14, color: '#4D4A48'}}
            />
          </View>
          {error && <Text className="text-red-400 text-xs ">{error}</Text>}
        </View>
      )}
      {type == 'checkbox' && (
        <View className="flex-row items-center mb-3" style={style}>
          <Pressable
            onPress={onChange}
            className="w-[30px] h-[30px] rounded-lg border border-customLightGray bg-white items-center justify-center">
            {value && <Tick />}
          </Pressable>
          {title && (
            <Text className="font-poppinsRegular text-customGray text-xs  ml-2">
              {title}
            </Text>
          )}
        </View>
      )}
      {type == 'rating' && (
        <Rating
          startingValue={value}
          onFinishRating={onChange}
          ratingCount={5}
          imageSize={14}
          type="custom"
          ratingColor="#FF8170"
          readonly={readonly}
        />
      )}
    </>
  );
};

export default CustomInputs;
