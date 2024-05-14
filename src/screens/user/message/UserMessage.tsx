import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import WebClient, {toast} from '../../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import IntLabel from '../../../components/IntLabel';

const UserMessage = ({route}: {route?: any}) => {
  const scrollRef = useRef<any>(null);
  const dispatch = useDispatch();
  const {Post, loading} = WebClient();
  const {user} = useSelector((state: any) => state.user);
  const {connection, message} = useSelector((state: any) => state.hub);
  const [messages, setMessages] = useState<any>([]);

  const openGalery = () => {
    openPicker({
      cropping: false,
      includeBase64: true,
      multiple: true,
    }).then((image: any) => {
      let temp = image.map((img: any) => img.data);
      formik.setFieldValue('images', temp);
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
      Post(
        '/api/Chatting/SendMessage',
        {
          roomID: route.params?.selectedUser?.roomID,
          senderId: user?.id,
          senderType: 1,
          message: values.message,
          images: values.images,
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

          const now = new Date();
          const createdDate = `${now.getHours()}:${
            (now.getMinutes() < 10 ? '0' : '') + now.getMinutes()
          }`;

          let temp = messages;
          temp.push({
            message: res.data.object.message,
            createdDate: createdDate,
            senderId: res.data.object.senderID,
            image0: res.data.object.image,
            image1: res.data.object.image2,
            image2: res.data.object.image3,
            image3: res.data.object.image4,
            image4: res.data.object.image5,
          });
          setMessages(temp);
        }
      });
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

    return () => {
      connection.invoke('LeaveRoom');
    };
  }, []);

  useEffect(() => {
    message && setMessages([...messages, message]);
  }, [message]);

  return (
    <UserWrapper title={IntLabel('messages')}>
      <HandleData
        title={IntLabel('warning_no_active_record')}
        loading={loading}
        data={messages}>
        <View
          className="flex-1"
          style={{width: SIZES.width * 0.95, height: SIZES.height * 0.69}}>
          <FlatList
            ref={scrollRef}
            onContentSizeChange={() =>
              scrollRef.current?.scrollToEnd({animated: false})
            }
            className="mb-5 "
            contentContainerStyle={{gap: 15}}
            data={messages}
            renderItem={({item}) => <DoctorMessageComp item={item} />}
          />

          <View className="space-y-1">
            {formik.values.images?.length !== 0 && (
              <View>
                <FlatList
                  horizontal
                  data={formik.values.images}
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
                          let a = formik.values.images;
                          a.splice(index, 1);
                          formik.setFieldValue('images', a);
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
                  value={formik.values.message}
                  onChangeText={formik.handleChange('message')}
                  className=" flex-1 text-sm text-customGray font-poppinsRegular  p-0 pl-2 h-full"
                  placeholder={IntLabel('write_message')}
                  placeholderTextColor={'#4D4A48'}
                />
                <TouchableOpacity
                  onPress={() => {
                    if (
                      formik.values.images.length == 0 &&
                      formik.values.message == ''
                    ) {
                      toast('lütfen mesaj girin');
                    } else {
                      formik.handleSubmit();
                    }
                  }}>
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
