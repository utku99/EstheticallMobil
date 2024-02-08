import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Pressable, TextInputProps, TextInput, } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';

import CalendarIcon from '../assets/svg/common/CalendarIcon';
import DropdownRightDownIcon from '../assets/svg/common/DropdownRightDownIcon';
import DropdownRightUpIcon from '../assets/svg/common/DropdownRightUpIcon';
import EyeOpen from '../assets/svg/auth/EyeOpen';
import { Rating } from 'react-native-ratings';
import Tick from '../assets/svg/common/Tick';


interface props {
    type: "text" | "textarea" | "date" | "dropdown" | "checkbox" | "rating" | "textareasmall" | "textareabig",
    value?: any
    defaultValue?: any
    placeholder?: string
    onChange?: any
    onChangeText?: any
    onBlur?: any
    secureTextEntry?: boolean
    dropdownData?: any
    isSearchable?: boolean
    disable?: boolean
    error?: any
    touched?: any
    title?: string
    style?: any
    dropdownContainerStyle?: any
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
            {type == "text" && (
                <View className='w-full mb-3' style={style} >
                    <View className='flex-row items-center'>
                        {title && <Text className='text-sm font-poppins font-normal text-customGray w-[40%] text-right pr-3'>{title}</Text>}
                        <View className='h-[40px] flex-1 bg-white rounded-lg border border-customLightGray px-2 flex-row items-center'>
                            <TextInput
                                value={value}
                                defaultValue={defaultValue}
                                placeholder={placeholder}
                                onBlur={onBlur}
                                onChangeText={onChangeText}
                                secureTextEntry={showSecure}
                                className='placeholder:text-customGray/[.5] flex-1 text-customGray text-sm p-0'
                            />
                            {
                                secureTextEntry &&
                                <TouchableOpacity onPress={() => setShowSecure(!showSecure)}>
                                    <EyeOpen fill={showSecure ? "#FF8170" : "gray"} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    {error && touched && <Text className='text-red-400 text-xs '> {error}</Text>}
                </View>
            )}
            {type == "textareasmall" && (
                <View className='mb-3' style={style}>
                    <Text className='font-medium text-customGray text-base font-poppins mb-3'>Başlık Metni</Text>
                    <TextInput
                        className={` border border-customLightGray rounded-xl bg-white max-h-[80px] px-2`}
                        value={value}
                        defaultValue={defaultValue}
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                        textAlignVertical='top'
                        multiline
                    />
                    {error && <Text className='text-red-400 text-xs '> {error?.message}</Text>}
                </View>
            )}
            {type == "textareabig" && (
                <View className='mb-3' style={style}>
                    <Text className='font-medium text-customGray text-base font-poppins mb-3'>{title}</Text>
                    <TextInput
                        textAlignVertical='top'
                        className={` border border-customLightGray rounded-xl bg-white min-h-[100px] max-h-[400px] px-2`}
                        value={value}
                        defaultValue={defaultValue}
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                        multiline
                    />
                    {error && <Text className='text-red-400 text-xs '> {error?.message}</Text>}
                </View>
            )}
            {type == "date" && (
                <View className=' mb-3 w-full' style={style}>
                    <Pressable
                        onPress={() => setShowDateModal(!showDateModal)}
                        className='h-[40px] bg-white rounded-lg border border-customLightGray px-1 placeholder:text-customGray/[.5] flex-row items-center'
                    >
                        <TextInput
                            value={value}
                            placeholder={placeholder}
                            editable={false}
                            className='flex-1 text-customGray text-sm'
                        />
                        {
                            showDateModal &&
                            <DateTimePicker
                                value={value}
                                onChange={(event: DateTimePickerEvent, date: any) => onChange(date)}
                                dateFormat='day month year'
                            />
                        }
                        <TouchableOpacity onPress={() => setShowDateModal(!showDateModal)}>
                            <CalendarIcon />
                        </TouchableOpacity>
                    </Pressable>
                    {error && <Text className='text-red-400 text-xs '>{error?.message}</Text>}
                </View>
            )}
            {type == "dropdown" && (
                <View className="mb-3" style={dropdownContainerStyle}>
                    <View className='flex-row items-center'>
                        {title && <Text className='text-sm font-poppins font-normal text-customGray w-[40%] text-right pr-3'>{title}</Text>}
                        <Dropdown
                            data={dropdownData ?? []}
                            search={isSearchable}
                            mode='default'
                            labelField="label"
                            valueField="value"
                            searchPlaceholder={"Ara"}
                            placeholder={placeholder ?? ""}
                            placeholderStyle={{ color: "rgba(77, 74, 72, 0.5)", fontSize: 14 }}
                            onFocus={() => setIsFocusDropdown(true)}
                            onBlur={() => setIsFocusDropdown(false)}
                            value={value}
                            disable={disable}
                            onChange={onChange}
                            renderRightIcon={() => isFocusDropdown ? <DropdownRightUpIcon /> : <DropdownRightDownIcon />}
                            style={[{ paddingLeft: 8, height: 40, backgroundColor: "white", flex: 1, borderRadius: 8, borderWidth: 1, borderColor: "#CECECE", overflow: "hidden", }, style]}
                            selectedTextStyle={{ fontSize: 14, color: "#4D4A48", }}
                        />
                    </View>
                    {error && <Text className='text-red-400 text-xs '>{error?.message}</Text>}
                </View>
            )}
            {type == "checkbox" && (
                <View className='flex-row items-center mb-3' style={style}>
                    <Pressable
                        onPress={onChange}
                        className='w-[32px] h-[32px] rounded-lg border border-customLightGray bg-white items-center justify-center'
                    >
                        {value && <Tick />}
                    </Pressable>
                    {title && <Text className='font-normal text-customGray text-sm font-poppins ml-2'>{title}</Text>}
                </View>
            )}
            {type == "rating" && (
                <Rating
                    startingValue={value}
                    onFinishRating={onChange}
                    ratingCount={5}
                    imageSize={14}
                    type='custom'
                    ratingColor='#FF8170'
                />
            )}
        </>
    )
}

export default CustomInputs