import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import UserWrapper from '../UserWrapper';
import HandleData from '../../../components/HandleData';
import MessageComp from '../../../components/MessageComp';
import DoctorMessageComp from '../../../components/DoctorMessageComp';
import UserMessageComp from '../../../components/UserMessageComp';
import SharingSendMessageIcon from '../../../assets/svg/homepages/SharingSendMessageIcon';
import AddPhotoIcon from '../../../assets/svg/userMenu/AddPhotoIcon';
import {SIZES} from '../../../constants/constants';
import {openPicker} from 'react-native-image-crop-picker';
import TrashIcon from '../../../assets/svg/firm/TrashIcon';
import WebClient from '../../../utility/WebClient';
import {useSelector} from 'react-redux';
import {useFormik} from 'formik';

const UserMessage = ({route}: {route?: any}) => {
  const [images, setImages] = useState<any>([]);
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const [messages, setMessages] = useState<any>([]);

  const openGalery = () => {
    openPicker({
      cropping: false,
      includeBase64: true,
      multiple: true,
    }).then((image: any) => {
      let temp = image.map((img: any) => img.data);
      setImages(temp);
    });
  };

  const formik = useFormik({
    initialValues: {
      images: [],
      message: '',
    } as {
      images?: any;
      message: string;
    },
    onSubmit: (values, {resetForm, setFieldValue}) => {
      if (values.images.length == 0) {
        Post(
          '/api/Chatting/SendMessage',
          {
            roomID: route.params?.selectedUser?.roomID,
            senderId: user?.id,
            senderType: 1,
            message: values.message,
            messagesType: route.params?.selectedUser?.messagesType,
            receiverId: route.params?.selectedUser?.correspondentID,
            receiverType: route.params?.selectedUser?.correspondentType,
            serviceID: messages[0]?.serviceID,
          },
          false,
          false,
        ).then(res => {
          if (res.data.code == '100') {
            resetForm();
            setFieldValue('images', []);
            let temp = messages;
            temp.push(res.data.object);
            setMessages(temp);
          }
        });
      } else {
        Post(
          '/api/Chatting/SendMessage',
          {
            roomID: route.params?.selectedUser?.roomID,
            senderId: user?.id,
            senderType: 1,
            message: '',
            image: values.images[0].split(',')[1],
            messagesType: route.params?.selectedUser?.messagesType,
            receiverId: route.params?.selectedUser?.correspondentID,
            receiverType: route.params?.selectedUser?.correspondentType,
            serviceID: messages[0]?.serviceID,
          },
          false,
          false,
        ).then(res => {
          if (res.data.code == '100') {
            resetForm();
            setFieldValue('images', []);
            let temp = messages;
            temp.push({
              ...res.data.object,
              imageUrl: res.data.object.message,
              message: '',
            });
            setMessages(temp);
          }
        });
      }
    },
  });

  useEffect(() => {
    Post('/api/Chatting/GetMessages', {
      roomID: route.params?.selectedUser?.roomID,
      companyID: 0,
      companyOfficeID: 0,
      userID: user?.id,
    }).then(res => {
      setMessages(res.data.object);
    });
  }, []);

  return (
    <UserWrapper title="Mesajlar">
      <HandleData
        title={'Mesajınız Bulunmamaktadır'}
        loading={loading}
        data={messages}>
        <View className="flex-1" style={{width: SIZES.width * 0.95}}>
          <FlatList
            className="mb-5 "
            contentContainerStyle={{gap: 15}}
            data={messages}
            renderItem={({item}) => <DoctorMessageComp item={item} />}
          />

          <View className="space-y-1">
            {images?.length !== 0 && (
              <View>
                <FlatList
                  horizontal
                  data={images}
                  contentContainerStyle={{gap: 10}}
                  renderItem={({item, index}) => (
                    <View className="relative">
                      <View className="w-[60px] h-[60px] rounded-lg border border-customLightGray overflow-hidden">
                        <Image
                          source={{uri: `data:image/jpg;base64,` + item}}
                          className="w-full h-full"
                        />
                      </View>
                      <Pressable
                        onPress={() => {
                          const updatedImages = images.filter(
                            (_: any, i: number) => i !== index,
                          );
                          setImages(updatedImages);
                        }}
                        className="absolute bottom-1 right-1 bg-customOrange rounded-md w-[24px] h-[24px] items-center justify-center">
                        <TrashIcon width={14} height={17} />
                      </Pressable>
                    </View>
                  )}
                />
              </View>
            )}

            <View className="flex-row gap-3  relative">
              <TouchableOpacity onPress={() => openGalery()}>
                <AddPhotoIcon />
              </TouchableOpacity>

              <View className="rounded-xl border border-customLightGray bg-white h-[40px] overflow-hidden flex-row items-center flex-1">
                <TextInput
                  className=" flex-1 pl-2 text-sm text-customGray font-poppinsRegular"
                  placeholder="Yorumunuzu Yazın..."
                  placeholderTextColor={'#4D4A48'}
                />
                <TouchableOpacity>
                  <SharingSendMessageIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </HandleData>
    </UserWrapper>
  );
};

export default UserMessage;
