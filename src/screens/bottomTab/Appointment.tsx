import {View, Text} from 'react-native';
import React from 'react';
import UserWrapper from '../user/UserWrapper';
import CustomInputs from '../../components/CustomInputs';
import {SIZES} from '../../constants/constants';
import CustomButtons from '../../components/CustomButtons';

const Appointment = () => {
  return (
    <UserWrapper>
      <View className=" h-full w-full" style={{width: SIZES.width * 0.95}}>
        <Text className="font-poppinsMedium text-customGray text-base  mb-3">
          Randevu Al
        </Text>

        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="Ülke"
          style={{width: '75%', height: 32}}
        />
        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="Şehir"
          style={{width: '75%', height: 32}}
        />
        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="İlçe"
          style={{width: '75%', height: 32}}
        />

        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="Kurum Seç"
          style={{width: '75%', height: 32}}
        />

        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="Operasyon Seç"
          style={{width: '75%', height: 32}}
        />
        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="Alt Operasyon Seç"
          style={{width: '75%', height: 32}}
        />

        <CustomInputs
          type="dropdown"
          dropdownData={[]}
          placeholder="Doktor Seç"
          style={{width: '75%', height: 32}}
        />

        <CustomInputs type="textareasmall" />

        <CustomInputs type="textareabig" title="Randevu Metni" />

        <View className="my-3">
          <Text className="font-poppinsMedium text-customGray text-base  mb-3">
            Uygun Tarih Aralığını Seçin
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <CustomInputs
              type="date"
              placeholder="Başlangıç Tarihi"
              value={new Date()}
              style={{width: '75%'}}
            />
            <CustomInputs
              type="date"
              placeholder="Bitiş Tarihi"
              value={new Date()}
              style={{width: '75%'}}
            />
          </View>
        </View>

        <CustomButtons
          type="iconsolid"
          label="Talep Gönder"
          icon="send"
          theme="big"
          style={{width: 180, alignSelf: 'center'}}
        />
      </View>
    </UserWrapper>
  );
};

export default Appointment;
