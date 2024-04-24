import { useEffect, useState } from "react";
import { Dimensions, NativeModules, Platform, StatusBar } from "react-native";
import DeviceInfo from "react-native-device-info";


export const getDeviceInfo = {
    deviceId: DeviceInfo.getUniqueId(),
    brand: DeviceInfo.getBrand(),
    model: DeviceInfo.getModel(),
    osVersion: DeviceInfo.getSystemVersion(),
    type: DeviceInfo.isTablet() ? 'tablet' : 'telefon',
    platform: DeviceInfo.getSystemName(),
    appVersion: DeviceInfo.getVersion(),
    buildNumber: DeviceInfo.getBuildNumber(),
};
export const SIZES = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    isTablet: DeviceInfo.isTablet(),
    isSmall: Dimensions.get('window').width <= 375 ? true : false,
};

export const deviceLanguage =
Platform.OS === 'ios'
  ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
  : NativeModules.I18nManager.localeIdentifier.split("_")[0]
