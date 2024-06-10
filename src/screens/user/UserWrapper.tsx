import {View, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import NotificationIcon2 from '../../assets/svg/userMenu/NotificationIcon2';

interface props {
  children?: React.ReactNode;
  title?: string;
  showBellIcon?: boolean;
  style?: any;
}

const UserWrapper = ({children, title, showBellIcon = false, style}: props) => {
  return (
    <KeyboardAvoidingView className="bg-[#FAFAFA] flex-1" style={style}>
      {title && (
        <>
          <Text className="font-poppinsMedium  text-customGray text-base text-center  ">
            {title}
          </Text>
          {showBellIcon && (
            <View className="absolute right-[90px]">
              <NotificationIcon2 />
            </View>
          )}
        </>
      )}
      <View className="items-center h-full flex-1 py-3">{children}</View>
    </KeyboardAvoidingView>
  );
};

export default UserWrapper;
