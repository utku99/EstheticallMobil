import {
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import LikeUnlikeComp from './LikeUnlikeComp';
import SharingSavedIcon from '../assets/svg/homepages/SharingSavedIcon';
import moment from 'moment';
import IntLabel from './IntLabel';
import Video from 'react-native-video';
import BlueTick from '../assets/svg/common/BlueTick';
import {FormattedMessage, useIntl} from 'react-intl';
import UnMuted from '../assets/svg/homepages/UnMuted';
import Muted from '../assets/svg/homepages/Muted';
import Share from 'react-native-share';
import CompanyHeaderComp from './CompanyHeaderComp';

const CommentComp = ({item}: any) => {
  const {Post, loading} = WebClient();
  const {language} = useSelector((state: any) => state.user);
  const [translatedText, setTranslatedText] = useState(null);

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
        {translatedText ?? item?.comment}
      </Text>

      <View className="flex flex-row items-center justify-between ">
        <Text className="text-xxs text-customGray font-poppinsRegular">
          {item?.createdDate}
        </Text>
        <Text
          onPress={() => {
            if (translatedText) {
              setTranslatedText(null);
            } else {
              Post('/api/Common/TranslateText', {
                text: item?.comment,
                targetLanguage: language?.language_code,
              }).then(res => {
                setTranslatedText(res.data.trans);
              });
            }
          }}
          className="self-end text-xs text-blue-400">
          {translatedText
            ? IntLabel('see_original')
            : loading
            ? IntLabel('loading')
            : IntLabel('see_translate')}
        </Text>
      </View>
    </View>
  );
};

const SharingComp = ({
  item,
  setClicked,
  isFocus,
}: {
  item: any;
  setClicked: any;
  isFocus?: boolean;
}) => {
  const [seeComments, setSeeComments] = useState(false);
  const [sharedDetail, setSharedDetail] = useState<any>(null);
  const [index, setIndex] = useState<any>(0);
  const {Post, loading} = WebClient();
  const {user, isLoggedIn, language} = useSelector((state: any) => state.user);
  const [translatedText, setTranslatedText] = useState(null);
  const isCarousel = useRef<any>(null);
  const navigation = useNavigation();
  const [addComment, setAddComment] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const warning = IntLabel('login_required_warning');

  useEffect(() => {
    Post('/api/Shared/GetSharedDetailAsync', {
      sharedId: item?.sharedID,
      userID: user?.id ?? 0,
    }).then(res => {
      setSharedDetail(res.data);
    });
  }, []);

  return (
    <View
      className={`h-fit border border-customLightGray rounded-xl overflow-hidden bg-white `}
      style={{width: SIZES.width * 0.95}}>
      <CompanyHeaderComp
        item={item?.parentModel ?? item}
        setClicked={setClicked}
        rating={
          parseFloat(item?.companyPoint ?? item?.parentModel?.companyPoint) / 20
        }
        companyId={item?.companyId}
        officeId={item?.companyOfficeId}
        isFavorite={item?.parentModel?.isFavorite ?? item?.isFavorite}
        isApproved={
          item?.isApprovedAccount ?? item?.parentModel?.isApprovedAccount
        }
        style={{padding: 10}}
      />

      {/* carousel */}
      <View className="w-full aspect-[1.3]">
        <Carousel
          ref={isCarousel}
          data={(item?.imagesList ?? item?.files)?.map((img: any) => ({
            imgUrl: img,
            title: '',
          }))}
          renderItem={({item}: any) =>
            item?.imgUrl?.includes('mp4') ? (
              <TouchableHighlight
                className="relative"
                onPress={() => {
                  setIsMuted(!isMuted);
                }}>
                <>
                  <Video
                    source={{uri: item?.imgUrl}}
                    repeat
                    muted={isMuted}
                    paused={!isFocus}
                    resizeMode="cover"
                    className="w-full h-full "
                  />
                  <View className="absolute bottom-2 right-2">
                    {isMuted ? <Muted /> : <UnMuted />}
                  </View>
                </>
              </TouchableHighlight>
            ) : (
              <Image
                source={{uri: item?.imgUrl}}
                className="w-full h-full"
                resizeMode="cover"
              />
            )
          }
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
          {translatedText ?? item?.description}
        </Text>
        <View className="flex flex-row justify-between">
          <Text className="text-customGray text-xxs font-poppinsRegular">
            {moment(item?.date, 'YYYY-MM-DD').format('DD.MM.YYYY')}
          </Text>
          <Text
            onPress={() => {
              if (translatedText) {
                setTranslatedText(null);
              } else {
                Post('/api/Common/TranslateText', {
                  text: item?.description,
                  targetLanguage: language?.language_code,
                }).then(res => {
                  setTranslatedText(res.data.trans);
                });
              }
            }}
            className="self-end text-xs text-blue-400">
            {translatedText
              ? IntLabel('see_original')
              : loading
              ? IntLabel('loading')
              : IntLabel('see_translate')}
          </Text>
        </View>
      </View>

      {/* bottom */}
      <View
        className={`bg-customBrown w-full h-[35px] px-[10px] rounded-b-xl flex-row items-center`}>
        <Text
          onPress={() => {
            Post('/api/Common/InsertView', {
              id: item?.sharedID,
              isActive: true,
              typeID: viewedType.sharing,
              userID: user?.id ?? 0,
            }).then(res => {
              setSeeComments(!seeComments);
            });
          }}
          className="text-white text-xs font-poppinsRegular flex-1">
          {seeComments ? IntLabel('hide_comments') : IntLabel('see_comments')}
        </Text>
        <View className="flex-row space-x-3 ">
          <TouchableOpacity
            onPress={() => {
              Post('/api/Common/InsertView', {
                id: item?.sharedID,
                isActive: true,
                typeID: viewedType.sharing,
                userID: user?.id ?? 0,
              }).then(res => {
                setSeeComments(!seeComments);
              });
            }}>
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

          <TouchableOpacity
            onPress={() => {
              // toast(
              //   intl.formatMessage({
              //     id: 'copied_clipboard',
              //     defaultMessage: 'copied_clipboard',
              //   }),
              // );
              Share.open({
                url: `https://dev.estheticall.com/paylasimlar?id=${item?.sharedID}`,
              });
            }}>
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
            <TouchableOpacity
              onPress={() => {
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
                  toast(warning);
                }
              }}>
              <SharingSendMessageIcon />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default SharingComp;
