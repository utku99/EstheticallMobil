import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import FirmWrapper from './FirmWrapper';
import HandleData from '../../components/HandleData';
import {FlatList} from 'react-native-gesture-handler';
import WebClient from '../../utility/WebClient';
import Carousel from 'react-native-snap-carousel';
import {SIZES} from '../../constants/constants';
import InstutituonIcon from '../../assets/svg/firm/InstutituonIcon';
import CustomButtons from '../../components/CustomButtons';
import RenderHTML from 'react-native-render-html';
import IntLabel from '../../components/IntLabel';

interface props {
  route?: any;
}

const FirmServices = ({route}: props) => {
  const {Post, loading} = WebClient();
  const [subServiceDetails, setSubServiceDetails] = useState<any>([]);
  const [selectedSub, setSelectedSub] = useState<any>(null);
  const [selectedSubId, setSelectedSubId] = useState(null);

  useEffect(() => {
    Post('/api/CompanyServices/WebListCompanySubServices', {
      companyId: route.params.companyId,
      companyOfficeId: route.params.companyOfficeId,
      serviceId: route.params.serviceId,
    }).then((res: any) => {
      const currentSub = res.data.object.find(
        (item: any) => item.serviceSubId == selectedSubId,
      );
      setSubServiceDetails(res.data.object);
      if (currentSub) {
        setSelectedSub(currentSub);
      } else {
        setSelectedSub(res.data.object[0]);
      }
    });
  }, [route.params.serviceId, selectedSubId]);

  return (
    <FirmWrapper>
      <HandleData
        data={subServiceDetails}
        loading={loading}
        title="Firmanın Hizmeti Bulunamadı">
        <View
          className="border border-customLightGray rounded-lg p-2 mb-3 space-y-3 bg-white"
          style={{width: SIZES.width * 0.95}}>
          <View className="flex-row items-center space-x-3">
            <InstutituonIcon />
            <Text className="font-poppinsMedium text-sm text-customGray">
              {route.params.type == 4
                ? IntLabel('our_esthetic_operations')
                : IntLabel('our_beauty_operations')}
            </Text>
            <View className="border-b h-1 flex-1"></View>
          </View>

          <Text className="text-xs font-poppinsRegular text-customGray">
            {route.params?.serviceName}
          </Text>

          <FlatList
            data={subServiceDetails}
            renderItem={({item}) => (
              <CustomButtons
                type={
                  selectedSub?.serviceSubId == item.serviceSubId
                    ? 'brownsolid'
                    : 'brownoutlined'
                }
                theme="small"
                label={item?.serviceSubName}
                onPress={() => setSelectedSubId(item?.serviceSubId)}
              />
            )}
            horizontal
            contentContainerStyle={{gap: 8}}
          />

          {/* carousel */}
          <View className="h-[130px] ">
            <Carousel
              data={selectedSub?.images?.map((img: any) => ({
                imgUrl: img.image,
                title: '',
              }))}
              renderItem={({item}: any) => (
                <Image
                  source={{uri: item?.imgUrl}}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              )}
              sliderWidth={SIZES.width * 0.9}
              itemWidth={130}
              loop={true}
              autoplay={true}
            />
          </View>

          <RenderHTML
            contentWidth={SIZES.width}
            source={{html: selectedSub?.description}}
          />
        </View>
      </HandleData>
    </FirmWrapper>
  );
};

export default FirmServices;
