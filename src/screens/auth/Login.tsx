import {useNavigation} from '@react-navigation/native';
import WebClient from '../../utility/WebClient';
import {useDispatch} from 'react-redux';
import {setLoggedIn, setUser} from '../../redux/slices/user';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import AuthWrapper from './AuthWrapper';
import {Pressable, Text, View} from 'react-native';
import CustomInputs from '../../components/CustomInputs';
import IntLabel from '../../components/IntLabel';

const Login = () => {
  const {Post, loading} = WebClient();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email(IntLabel('invalid_email'))
        .required(IntLabel('validation_message_this_field_is_required')),
      password: Yup.string().required(
        IntLabel('validation_message_this_field_is_required'),
      ),
    }),
    onSubmit: values => {
      Post(
        '/api/Auth/Login',
        {
          username: values.email,
          password: values.password,
        },
        true,
        true,
      ).then(res => {
        if (res.data.code === '100' && res.data.object.userRoleId === 3) {
          dispatch(setUser(res.data.object));
          dispatch(setLoggedIn(true));
        }
      });
    },
  });

  return (
    <AuthWrapper title={IntLabel('login')} onPress={formik.handleSubmit}>
      <View className="">
        <CustomInputs
          type="text"
          placeholder={IntLabel('email')}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
          error={formik.errors.email}
          touched={formik.touched.email}
        />

        <CustomInputs
          type="text"
          placeholder={IntLabel('password')}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          error={formik.errors.password}
          touched={formik.touched.password}
          secureTextEntry
        />

        <Pressable onPress={() => navigation.navigate('forgetpass')}>
          <Text className="font-poppinsMedium text-sm  text-customOrange self-end">
            {IntLabel('forget_password')}
          </Text>
        </Pressable>
      </View>
    </AuthWrapper>
  );
};

export default Login;
