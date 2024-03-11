import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInputProps,
  TextInput,
} from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {Dropdown} from 'react-native-element-dropdown';

import CalendarIcon from '../assets/svg/common/CalendarIcon';
import DropdownRightDownIcon from '../assets/svg/common/DropdownRightDownIcon';
import DropdownRightUpIcon from '../assets/svg/common/DropdownRightUpIcon';
import EyeOpen from '../assets/svg/auth/EyeOpen';
import {Rating} from 'react-native-ratings';
import Tick from '../assets/svg/common/Tick';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

interface props {
  type:
    | 'text'
    | 'textarea'
    | 'date'
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
}) => {
  const [isFocusDropdown, setIsFocusDropdown] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  const [showSecure, setShowSecure] = useState(secureTextEntry);

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
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            Başlık Metni
          </Text>
          <TextInput
            className={` border border-customLightGray rounded-xl bg-white min-h-[40px] max-h-[80px] px-2 text-customGray text-xs font-poppinsRegular`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            onBlur={onBlur}
            textAlignVertical="top"
            multiline
          />
          {error && (
            <Text className="text-red-400 text-xs "> {error?.message}</Text>
          )}
        </View>
      )}
      {type == 'textareabig' && (
        <View className="mb-3" style={style}>
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            {title}
          </Text>
          <TextInput
            textAlignVertical="top"
            className={` border border-customLightGray rounded-xl bg-white min-h-[100px] max-h-[400px] px-2 text-customGray text-xs font-poppinsRegular`}
            value={value}
            defaultValue={defaultValue}
            onChangeText={onChangeText}
            onBlur={onBlur}
            multiline
          />
          {error && (
            <Text className="text-red-400 text-xs "> {error?.message}</Text>
          )}
        </View>
      )}
      {type == 'date' && (
        <View className=" mb-3 w-full" style={style}>
          <TouchableOpacity
            className="h-[40px] bg-white rounded-lg border border-customLightGray px-1 placeholder:text-customGray/[.5] flex-row items-center"
            onPress={() => setShowDateModal(true)}>
            <Text className="flex-1  h-full text-customGray text-xs font-poppinsRegular">
              {value
                ? moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY')
                : placeholder}
            </Text>
            <CalendarIcon />
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={showDateModal}
            mode="date"
            date={value ?? new Date()}
            onConfirm={onChange}
            onCancel={() => setShowDateModal(false)}
          />
          {error && (
            <Text className="text-red-400 text-xs ">{error?.message}</Text>
          )}
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
              searchPlaceholder={'Ara'}
              placeholder={placeholder ?? ''}
              placeholderStyle={{
                color: 'rgba(77, 74, 72, 0.5)',
                fontSize: 12,
                fontFamily: 'Poppins-Regular',
              }}
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
            className="w-[32px] h-[32px] rounded-lg border border-customLightGray bg-white items-center justify-center">
            {value && <Tick />}
          </Pressable>
          {title && (
            <Text className="font-poppinsRegular text-customGray text-sm  ml-2">
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
        />
      )}
    </>
  );
};

export default CustomInputs;
