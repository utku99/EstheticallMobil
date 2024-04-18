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
import {SIZES} from '../constants/constants';
import HandleData from './HandleData';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LikeUnlikeComp from './LikeUnlikeComp';
import SharingSavedIcon from '../assets/svg/homepages/SharingSavedIcon';
import moment from 'moment';
import IntLabel from './IntLabel';
import Clipboard from '@react-native-clipboard/clipboard';

const CommentComp = ({item}: any) => {
  return (
    <View className="space-y-2 mb-2">
      <View className="flex-row items-center space-x-3">
        <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
          <Image
            source={{uri: item?.image}}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View>
          <Text className="text-customGray font-poppinsSemiBold text-xs ">
            {item?.fullName}
          </Text>
          <Text className="text-customGray font-poppinsRegular text-xs">
            {item?.location}
          </Text>
        </View>
      </View>
      <Text className="text-xs text-customGray font-poppinsRegular">
        {item?.comment}
      </Text>
      <Text className="text-xxs text-customGray font-poppinsRegular">
        {item?.createdDate}
      </Text>
    </View>
  );
};

const SharingComp = ({
  item,
  onClickable = false,
  setClicked,
  readOnly,
}: {
  item: any;
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

  const [addComment, setAddComment] = useState(null);

  useEffect(() => {
    Post('/api/Shared/GetSharedDetailAsync', {
      sharedId: item?.sharedID,
      userID: user?.id ?? 0,
    }).then(res => {
      setSharedDetail(res.data);
    });
  }, []);

  const onPress = (item: any) => {
    if (isLoggedIn && addComment) {
      Post('/api/Comment/AddComment', {
        sharedId: item?.sharedID,
        userId: user?.id,
        comment: addComment,
        isActive: true,
        isDeleted: false,
      }).then(res => {
        if (res.data.code === '100') {
          setAddComment(null);
          setClicked(true);
        }
      });
    } else {
      toast(IntLabel('login_required_warning'));
    }
  };

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl bg-white `}
      style={{width: SIZES.width * 0.95}}>
      {/* header */}
      <View className="flex-row justify-between items-center p-[10px]">
        <TouchableOpacity
          onPress={() =>
            onClickable &&
            navigation.navigate('firmprofile', {
              companyId: item?.companyId,
              companyOfficeId: item?.companyOfficeId,
            })
          }
          className="flex-row items-center w-[60%] ">
          <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{uri: item?.logo ?? item?.parentModel?.logo}}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="pl-2 flex-shrink">
            <Text
              numberOfLines={1}
              className="text-customGray  text-xs font-poppinsSemiBold">
              {item?.name ?? item?.parentModel?.name}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray text-xs font-poppinsRegular ">
              {item?.location ?? item?.parentModel?.location}
            </Text>
          </View>
        </TouchableOpacity>
        <View className="items-center">
          <Text className="text-customGray font-poppinsRegular text-xxs">
            {IntLabel('comments')}
          </Text>
          {item?.companyPoint ? (
            <CustomInputs
              type="rating"
              value={Number(item?.companyPoint) / 20}
            />
          ) : (
            <CustomInputs
              type="rating"
              value={
                item?.parentModel?.companyPoint
                  ? item?.parentModel?.companyPoint / 20
                  : 0
              }
            />
          )}
        </View>
        <LikeUnlikeComp
          item={item}
          setClicked={setClicked}
          readOnly={readOnly}
          isFavorite={item?.isFavorite ?? item?.parentModel?.isFavorite}
        />
      </View>

      {/* carousel */}
      <View className="w-full aspect-[1.5]">
        <Carousel
          ref={isCarousel}
          data={(item?.imagesList ?? item?.files)?.map((img: any) => ({
            imgUrl: img,
            title: '',
          }))}
          renderItem={({item}: any) => (
            <Image
              source={{uri: item?.imgUrl}}
              className="w-full h-full"
              resizeMode="cover"
            />
          )}
          sliderWidth={SIZES.width * 0.95}
          itemWidth={SIZES.width * 0.95}
          loop={true}
          enableSnap={true}
          onSnapToItem={i => setIndex(i)}
        />
        <Pagination
          dotsLength={item?.imagesList?.length ?? item?.files?.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'white',
          }}
          tappableDots={true}
          dotColor="#FF8170"
          inactiveDotColor="transparent"
          inactiveDotScale={1}
          containerStyle={{
            position: 'absolute',
            bottom: 0,
            alignSelf: 'center',
          }}
        />
      </View>

      {/* description */}
      <View className="px-[10px] py-3 space-y-1">
        <Text
          numberOfLines={2}
          className="text-customGray text-xs font-poppinsRegular">
          {item?.description}
        </Text>
        <Text className="text-customGray text-xxs font-poppinsRegular">
          {moment(item?.date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
        </Text>
      </View>

      {/* bottom */}
      <View
        className={`bg-customBrown w-full h-[35px] px-[10px] rounded-b-xl flex-row items-center`}>
        <Text
          onPress={() => setSeeComments(!seeComments)}
          className="text-white text-xs font-poppinsRegular flex-1">
          {seeComments ? IntLabel('hide_comments') : IntLabel('see_comments')}
        </Text>
        <View className="flex-row space-x-3 ">
          <TouchableOpacity onPress={() => setSeeComments(!seeComments)}>
            <SharingMessageIcon />
          </TouchableOpacity>

          {isLoggedIn ? (
            <TouchableOpacity
              onPress={() => {
                Post('/api/Common/SaveShared', {
                  userID: user?.id,
                  sharedID: item?.sharedID,
                  isSaved: !item?.isSaved ?? !item?.parentModel?.isSaved,
                }).then(res => {
                  setClicked(true);
                });
              }}>
              {item?.isSaved ?? item?.parentModel?.isSaved ? (
                <SharingSavedIcon />
              ) : (
                <SharingSaveIcon />
              )}
            </TouchableOpacity>
          ) : (
            <SharingSaveIcon />
          )}

          <TouchableOpacity onPress={() => Clipboard.setString(item?.name)}>
            <SharingShareIcon />
          </TouchableOpacity>
        </View>
      </View>

      {seeComments && (
        <View className="px-[10px] py-[16px] space-y-3 ">
          <HandleData
            data={sharedDetail}
            loading={loading}
            title={IntLabel('warning_no_active_record')}>
            <FlatList
              showsVerticalScrollIndicator
              scrollEnabled
              data={sharedDetail}
              renderItem={({item}) => (
                <CommentComp key={item.commentID} item={item} />
              )}
            />
          </HandleData>

          <View className="rounded-xl border border-customLightGray bg-white h-[40px] overflow-hidden flex-row items-center">
            <TextInput
              className="placeholder flex-1 pl-2"
              placeholder={IntLabel('write_comment')}
              placeholderTextColor={'#4D4A48'}
              onChangeText={(e: any) => setAddComment(e)}
            />
            <TouchableOpacity onPress={onPress(item)}>
              <SharingSendMessageIcon />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SharingComp;
