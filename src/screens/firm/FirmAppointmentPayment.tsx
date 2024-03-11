import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInputs from '../../components/CustomInputs';
import LikeIcon from '../../assets/svg/common/LikeIcon';
import CustomButtons from '../../components/CustomButtons';
import WebClient, {toast} from '../../utility/WebClient';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import UnLikeIcon from '../../assets/svg/common/UnLikeIcon';
import moment from 'moment';
import {useNavigation} from '@react-navigation/core';

const FirmAppointmentPayment = ({route}: any) => {
  const {Post} = WebClient();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [banks, setBanks] = useState<any>([]);
  const {user} = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: {
      // fullname: "Ahmet Akdemir",
      // cardnumber: "4282209004348015",
      // year: { value: 26, label: "2026" },
      // month: { value: 12, label: "Aralık" },
      // cvv: "123",
      bank: '',
    } as {
      bank: any;
    },
    validationSchema: Yup.object().shape({
      bank: Yup.object().required('banka hesabı seçmelisiniz'),
    }),
    onSubmit: values => {
      Post('/api/Appointments/AppointmentBankTransfer', {
        appointmentID: paymentInfo?.appointmentID,
        companyID: paymentInfo?.companyID,
        companyOfficeID: paymentInfo?.companyOfficeID,
        userID: user.id,
        price: paymentInfo?.price,
        bankAccountID: values.bank.bankAccoundId,
      }).then(res => {
        if (res.data.code == '100') {
          toast(res.data.message);
          //   navigation.goBack();
        } else {
          toast(res.data.message);
        }
      });
    },
  });

  useEffect(() => {
    Post('/api/Appointments/AppointmentPaymentInfo', {
      userID: user?.id,
      companyID: route.params?.item?.institution?.value,
      companyOfficeID: route.params?.item?.institution?.officeID,
      serviceID: route.params?.item?.operation?.value,
      serviceSubID: route.params?.item?.suboperation?.value ?? 0,
    }).then((res: any) => {
      setPaymentInfo(res.data.object);
    });

    Post('/api/BankAccount/ListBankAccounts', {
      companyId: route.params?.item?.institution?.value,
      companyOfficeId: route.params?.item?.institution?.officeID,
    }).then(res => {
      let temp = res.data.object.map((item: any) => ({
        ...item,
        label: item.accountName,
        value: item.bankAccoundId,
      }));
      setBanks(temp);
    });
  }, []);

  return (
    <View className="flex-1 bg-[#FAFAFA]">
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'column',
          gap: 20,
          paddingVertical: 20,
          paddingHorizontal: '5%',
        }}>
        <Text className="text-base font-poppinsMedium  text-customGray text-center">
          Ödeme Yap
        </Text>

        {/* header */}
        <View className="flex-row justify-between items-center ">
          <View className="w-[55px] h-[55px] overflow-hidden rounded-full border-[0.6px] border-customGray">
            <Image
              source={{
                uri:
                  paymentInfo?.logo ??
                  'https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg',
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <View className="w-[40%]">
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsSemiBold text-xs ">
              {paymentInfo?.companyName}
            </Text>
            <Text
              numberOfLines={1}
              className="text-customGray font-poppinsRegular text-xs ">
              {paymentInfo?.companyLocation}
            </Text>
          </View>
          <View className="items-center">
            <Text className="text-customGray font-poppinsRegular text-xs">
              Yorumlar
            </Text>
            <CustomInputs
              type="rating"
              value={paymentInfo ? Number(paymentInfo?.companyPoint) / 20 : 0}
            />
          </View>
          {paymentInfo?.isFavorite ? <LikeIcon /> : <UnLikeIcon />}
        </View>

        <View className="">
          <Text className="text-customGray font-poppinsMedium text-sm  ">
            Kategori:{' '}
          </Text>
          <Text className="text-customGray font-poppinsRegular text-sm ">
            {paymentInfo?.companyType}
          </Text>
        </View>

        <View>
          <Text className="text-customGray font-poppinsMedium text-sm  ">
            Operasyonlar:{' '}
          </Text>
          <Text className="text-customGray font-poppinsRegular text-sm ">
            {paymentInfo?.serviceName}
          </Text>
        </View>

        <View>
          <Text className="text-customOrange font-poppinsMedium text-sm ">
            Teklif Tarih Aralığı:{' '}
          </Text>
          <Text className="text-customOrange font-poppinsRegular text-sm ">
            {moment(paymentInfo?.startDate, 'DD.MM.YYYY HH:mm:ss').format(
              'DD.MM.YYYY',
            )}
            -{' '}
            {moment(paymentInfo?.endDate, 'DD.MM.YYYY HH:mm:ss').format(
              'DD.MM.YYYY',
            )}
          </Text>
        </View>

        <View>
          <Text className="text-base font-poppinsMedium text-customGray text-center">
            Randevu Talebi
          </Text>
          <Text className="text-base  font-poppinsMedium text-customGray text-center">
            Ödenecek Tutar: {paymentInfo?.price}₺
          </Text>
        </View>

        <CustomInputs
          type="dropdown"
          placeholder="Banka Hesabı Seç"
          dropdownContainerStyle={{width: 200}}
          value={formik.values.bank}
          onChange={(e: any) => formik.setFieldValue('bank', e)}
          dropdownData={banks}
          error={formik.errors.bank}
        />

        <Text className="text-customGray font-poppinsRegular text-sm ">
          Havale/EFT yapılan tutar ve ödeme tutarı aynı olmalıdır. Eksik veya
          yanlış ödemelerde işlem otomatik olarak iptal olacaktır. 48 saat
          içerisinde Havale / EFT işlemi tamamlanmayan satın alımlar otomatik
          olarak iptal edilecektir. Alımlarınızın işleme alınabilmesi için
          Havale / EFT işleminde açıklama kısmına yalnızca 7 haneli ilgili ödeme
          numaranızı yazmanız gerekmektedir. Havale/EFT ödeme işlemlerinde alıcı
          adına Ranna Teknoloji ve Yazılım Hiz. Tic. Ltd. Şti. yazmalısınız.
        </Text>

        <CustomButtons
          type="iconsolid"
          label="Ödeme Yap"
          icon="send"
          theme="big"
          style={{width: 170, alignSelf: 'center'}}
          onPress={formik.handleSubmit}
        />
      </ScrollView>
    </View>
  );
};

export default FirmAppointmentPayment;
