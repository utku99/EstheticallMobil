import {View, Text, Image} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const AdvertisementList = () => {
  return (
    <View className=" aspect-[3.9] w-full">
      <FastImage
        source={{
          uri: 'https://s3-alpha-sig.figma.com/img/db86/10d4/1ab616463c921a34c46e317ce4c64a9a?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XPrcBReDHrK7LXWO6RX7Pu~I1iVR5gYZHXr~R1~Pga7Qc6wQLykLlU1B-3jqgMYcEOvaHX9hGrbids-bi0TpAlb0K7cFN9NR4P3pLZ86M34Xucbj1rutPKSykhPvvd2RWsjS1ePwtWKkbk4OasS-r1995iSsIyopisHJ4w6pZhzdcuWUluFzmORvxsty3XiJT1UTnB1DCTcO38EjrMgyTKtLbvA1C0u8yfnnRTXExWD-ERvthVSmdJWhgBI5YKAHaBeixhR3ChUDka9YXF2JZVDxDD-WCEKjgN6mCIpgGn1hxVhgRtjQCXMzyavl7QbAKLaLSRzTqIdWsVxUw9MItw__',
        }}
        className="w-full h-full"
        resizeMode="cover"
      />
    </View>
  );
};

export default AdvertisementList;
