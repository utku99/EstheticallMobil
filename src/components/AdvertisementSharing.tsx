import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomInputs from './CustomInputs';
import SharingMessageIcon from '../assets/svg/homepages/SharingMessageIcon';
import SharingSaveIcon from '../assets/svg/homepages/SharingSaveIcon';
import SharingShareIcon from '../assets/svg/homepages/SharingShareIcon';
import SharingSendMessageIcon from '../assets/svg/homepages/SharingSendMessageIcon';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import WebClient, {toast} from '../utility/WebClient';
import {SIZES, viewedType} from '../constants/constants';
import HandleData from './HandleData';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LikeUnlikeComp from './LikeUnlikeComp';
import SharingSavedIcon from '../assets/svg/homepages/SharingSavedIcon';
import moment from 'moment';
import IntLabel from './IntLabel';
import Clipboard from '@react-native-clipboard/clipboard';
import Video from 'react-native-video';
import BlueTick from '../assets/svg/common/BlueTick';
import {useIntl} from 'react-intl';

const AdvertisementSharing = ({
  onClickable = false,
  setClicked,
  readOnly,
}: {
  onClickable?: boolean;
  setClicked?: any;
  readOnly?: boolean;
}) => {
  const [seeComments, setSeeComments] = useState(false);
  const [sharedDetail, setSharedDetail] = useState<any>(null);
  const [index, setIndex] = useState<any>(0);
  const {Post, loading} = WebClient();
  const isCarousel = useRef(null);
  const navigation = useNavigation();
  const {user, isLoggedIn} = useSelector((state: any) => state.user);
  const intl = useIntl();

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white overflow-hidden`}
      style={{width: SIZES.width * 0.95}}>
      <View className="w-full aspect-[1.3]">
        <Image
          source={{
            uri: 'https://s3-alpha-sig.figma.com/img/324a/0a2a/cd80b33dd871678d4032384eebae07e8?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RW3iqwI3at~9DCVe-fBNLQvcHv82FEAo44u1bif51-~94p7YcTa2NrtUl6O6MDpA17yR6zbSrPZUBydUpIcdlG8rGZPwPeThSo~4-jCAsFiDQo2uusHFUmr8h-rpyhKta8GceUJLbs-Jp1W0YCFqnOP8fT-nZh8crxfuzOVUdrvOcBFJ7WJs~cR3SbsJEyx6kwWuthchQFLiUT2fwiTuLZogAsPhYfoOXKubxnwDw98Xs8bkxH71FkcUDCrZleq4foFroxTMyTVQ0gMk4DjUhc7Ym2ABb-2eXe2c6P4VLUOZ2oqwC58kpFMWdQVj9D7A3lOyLrpPRVLhHge4KvqbXQ__',
          }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* description */}
      <View className="px-[10px] py-3 space-y-1">
        <Text
          numberOfLines={2}
          className="text-customGray text-xs font-poppinsRegular">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique,
          qui ab libero praesentium error nesciunt fuga? Assumenda, officiis eum
          eaque praesentium culpa ducimus nam iusto, illo vel, alias obcaecati
          recusandae.
        </Text>
      </View>

      {/* bottom */}
      <View
        className={`bg-customOrange w-full h-[35px] px-[10px] rounded-b-xl flex-row items-center`}>
        <Text
          onPress={() => {
            Post('/api/Common/InsertView', {
              id: item?.sharedID,
              isActive: true,
              typeID: viewedType.sharing,
              userID: user?.id ?? 0,
            }).then(res => {});
            setSeeComments(!seeComments);
          }}
          className="text-white text-xs font-poppinsRegular flex-1">
          {IntLabel('sponsored_display')}
        </Text>
        <View className="flex-row space-x-3 ">
          {isLoggedIn ? (
            <TouchableOpacity>
              {/* <SharingSavedIcon /> */}
              <SharingSaveIcon />
            </TouchableOpacity>
          ) : (
            <SharingSaveIcon />
          )}

          <TouchableOpacity
            onPress={() => {
              Clipboard.setString('');
              toast(
                intl.formatMessage({
                  id: 'copied_clipboard',
                  defaultMessage: 'copied_clipboard',
                }),
              );
            }}>
            <SharingShareIcon />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AdvertisementSharing;
