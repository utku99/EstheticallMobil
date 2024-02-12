import { Pressable } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { DrawerActions, NavigationContainer, useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Sharings from './home/Sharings'
import HeaderBackIcon from '../assets/svg/homepages/HeaderBackIcon'
import EstheticLogo from '../assets/svg/common/EstheticLogo'
import HeaderMenuIcon from '../assets/svg/homepages/HeaderMenuIcon'
import Comments from './home/Comments'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'



import BottomTab from '../components/BottomTab'
import List from './home/List'
import Map from './home/Map'
import FirmProfile from './firm/FirmProfile'
import FirmSharings from './firm/FirmSharings'
import FirmComments from './firm/FirmComments'
import FirmServices from './firm/FirmServices'
import FirmDoctors from './firm/FirmDoctors'
import FirmAppointment from './firm/FirmAppointment'
import FirmOffer from './firm/FirmOffer'
import FirmPackages from './firm/FirmPackages'
import Packages from './home/Packages'
import FirmCommunication from './firm/FirmCommunication'
import FirmCommunicationQuestion from './firm/FirmCommunicationQuestion'
import DrawerBar from '../components/DrawerBar'
import UserProfile from './user/UserProfile'
import UserOffer from './user/UserOffer'
import UserAppointment from './user/UserAppointment'
import UserMessage from './user/message/UserMessage'
import UserNotification from './user/UserNotification'
import UserComment from './user/UserComment'
import UserFavorite from './user/UserFavorite'
import UserSaved from './user/UserSaved'
import UserSettings from './user/UserSettings'
import UserLogOut from './user/UserLogOut'
import Login from './auth/Login'
import { useSelector } from 'react-redux'
import UserRegister from './auth/UserRegister'
import FirmRegister from './auth/FirmRegister'
import WelcomePage from './auth/WelcomePage'
import Question from './bottomTab/Question'
import Offer from './bottomTab/Offer'
import Appointment from './bottomTab/Appointment'
import FirmAppointmentPayment from './firm/FirmAppointmentPayment'
import UserIncomingMessage from './user/message/UserIncomingMessage'


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator();


function DrawerMenu() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerBar {...props} />} screenOptions={{ headerShown: false }}>
      <Drawer.Screen name='home' component={BottomTabs} />
    </Drawer.Navigator>
  );
}


function BottomTabs() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomTab {...props} />} screenOptions={{ headerShown: false }}  >
      <Tab.Screen name='home2' component={UserStack} />
    </Tab.Navigator>
  );
}


const UserStack = () => {
  const navigation = useNavigation()

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <HeaderBackIcon />
          </Pressable>
        ),
        headerTitle: () => (
          <Pressable onPress={() => navigation.navigate("sharing")}>
            <EstheticLogo width={133} height={38} />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <HeaderMenuIcon />
          </Pressable>
        ),
        headerLeftContainerStyle: { width: "14%", alignItems: "center" },
        headerTitleContainerStyle: { width: "100%", alignItems: "center" },
        headerRightContainerStyle: { alignItems: "center" },

      }}>


      {/* home */}
      <Stack.Group>
        <Stack.Screen name='sharing' component={Sharings} />
        <Stack.Screen name='comment' component={Comments} />
        <Stack.Screen name='list' component={List} />
        <Stack.Screen name='map' component={Map} />
        <Stack.Screen name='package' component={Packages} />
      </Stack.Group>

      {/* bottom tab */}
      <Stack.Group>
        <Stack.Screen name='question' component={Question} />
        <Stack.Screen name='offer' component={Offer} />
        <Stack.Screen name='appointment' component={Appointment} />
      </Stack.Group>

      {/* firm */}
      <Stack.Group>
        <Stack.Screen name='firmprofile' component={FirmProfile} />
        <Stack.Screen name='firmsharings' component={FirmSharings} />
        <Stack.Screen name='firmcomments' component={FirmComments} />
        <Stack.Screen name='firmservices' component={FirmServices} />
        <Stack.Screen name='firmdoctors' component={FirmDoctors} />
        <Stack.Screen name='firmappointment' component={FirmAppointment} />
        <Stack.Screen name='firmoffer' component={FirmOffer} />
        <Stack.Screen name='firmpackages' component={FirmPackages} />
        <Stack.Screen name='firmcommunication' component={FirmCommunication} />
        <Stack.Screen name='firmcommunicationquestion' component={FirmCommunicationQuestion} />
        <Stack.Screen name='firmappointmentpayment' component={FirmAppointmentPayment} />
      </Stack.Group>

      {/* user */}
      <Stack.Group>
        <Stack.Screen name='userprofile' component={UserProfile} />
        <Stack.Screen name='useroffer' component={UserOffer} />
        <Stack.Screen name='userappointment' component={UserAppointment} />
        <Stack.Screen name='userincomingmessage' component={UserIncomingMessage} />
        <Stack.Screen name='usermessage' component={UserMessage} />
        <Stack.Screen name='usernotification' component={UserNotification} />
        <Stack.Screen name='usercomment' component={UserComment} />
        <Stack.Screen name='userfavorite' component={UserFavorite} />
        <Stack.Screen name='usersaved' component={UserSaved} />
        <Stack.Screen name='usersettings' component={UserSettings} />
        <Stack.Screen name='userlogout' component={UserLogOut} />
      </Stack.Group>


    </Stack.Navigator>
  )
}


const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='welcome' component={WelcomePage} />
      <Stack.Screen name='login' component={Login} />
      <Stack.Screen name='userregister' component={UserRegister} />
      <Stack.Screen name='firmregister' component={FirmRegister} />
    </Stack.Navigator>
  )
}



const Root = () => {
  const { user, isLoggedIn, isGuest } = useSelector((state: any) => state.user)

  const handleAuth = () => {
    if (user && isLoggedIn) {
      return (
        <DrawerMenu />
      )
    } else if (!user && isGuest) {
      return (
        <DrawerMenu />
      )
    } else if (!user && !isGuest) {
      return (
        <AuthStack />
      )
    }
  }

  return (
    <NavigationContainer>
        {handleAuth()}
    </NavigationContainer>
  )
}

export default Root