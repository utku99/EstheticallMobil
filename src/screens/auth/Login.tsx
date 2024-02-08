import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import WebClient from '../../utility/WebClient'
import { useDispatch } from 'react-redux'
import { setLoggedIn, setUser } from '../../redux/slices/user'
import { useFormik } from 'formik'
import * as Yup from "yup"
import AuthWrapper from './AuthWrapper'
import { Text, View } from 'react-native'
import CustomInputs from '../../components/CustomInputs'

const Login = () => {
    const { t } = useTranslation()
    const { Post, loading } = WebClient()
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email("geçersiz email").required("email gereklidir"),
            password: Yup.string().required("şifre gereklidir"),
        }),
        onSubmit: (values) => {
            Post("/api/Auth/Login", {
                username: values.email,
                password: values.password,
            }, true, true).then((res) => {
                if (res.data.code === "100" && res.data.object.userRoleId === 3) {
                    dispatch(setUser(res.data.object));
                    dispatch(setLoggedIn(true))
                }
            })
        }
    })


    return (
        <AuthWrapper title="Üye Girişi" onPress={formik.handleSubmit}>

            <View className=''>

                <CustomInputs
                    type='text'
                    placeholder='E-Posta'
                    value={formik.values.email}
                    onBlur={formik.handleBlur("email")}
                    onChangeText={formik.handleChange("email")}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                />

                <CustomInputs
                    type='text'
                    placeholder='Şifre'
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                    onChangeText={formik.handleChange("password")}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                    secureTextEntry
                />


                <Text className='font-medium text-sm font-poppins text-customOrange self-end'>{t("forgot-password")}</Text>
            </View>



        </AuthWrapper>
    )
}

export default Login