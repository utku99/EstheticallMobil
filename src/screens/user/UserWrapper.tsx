import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import NotificationIcon2 from '../../assets/svg/userMenu/NotificationIcon2';

interface props {
  children?: React.ReactNode;
  title?: string;
  showBellIcon?: boolean;
}

const UserWrapper = ({children, title, showBellIcon = false}: props) => {
  return (
    <ScrollView
      className="bg-[#FAFAFA] "
      contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
      <View className="items-center h-full">
        {title && (
          <>
            <Text className="font-poppinsMedium  text-customGray text-base text-center mb-[20px] ">
              {title}
            </Text>
            {showBellIcon && (
              <View className="absolute right-[90px]">
                <NotificationIcon2 />
              </View>
            )}
          </>
        )}
        {children}
      </View>
    </ScrollView>
  );
};

export default UserWrapper;
