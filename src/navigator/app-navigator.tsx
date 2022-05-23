import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../../src/components/features/home';
import Login from '../../src/components/features/login';
import Splash from '../../src/components/features/splash';
import RegisterScreen from '../../src/components/features/register';
import ForgotPassword from '../../src/components/features/forgotPassword';
import ForgotPasswordHospital from '../../src/components/features/forgotPasswordHospital';
import ResetPassword from '../../src/components/features/resetPassword';
import Current from '../../src/components/features/current';
import Opd from '../../src/components/features/opd';
import HospitalSelection from '../../src/components/features/hospitalSelection';
import HospitalSelectionOpd from '../../src/components/features/hospitalSelectionOpd';
import History from '../../src/components/features/history';
import Billing from '../../src/components/features/billing';
import Reports from '../../src/components/features/reports';
import Updates from '../../src/components/features/updates';
import EditProfile from '../../src/components/features/editProfile';
import AddNewUser from '../../src/components/features/addNewUser';
import AccountScreen from '../../src/components/features/account';
import MoreScreen from '../../src/components/features/more';
import ReminderScreen from '../../src/components/features/reminder';
import CreateReminderScreen from '../../src/components/features/createReminder';
import BookAppointmentScreen from '../../src/components/features/bookAppointment';
import ListAppointmentScreen from '../../src/components/features/listAppointment';
import MyDocumentViewScreen from '../../src/components/features/myDocumentView';
import MyDocumentAddScreen from '../../src/components/features/myDocumentAdd';
import PatientDetails from '../../src/components/features/patientDetails';
import ReportsView from '../../src/components/features/reportsView';
import HealthDetailsView from '../../src/components/features/healthDetailsView';
import BillingView from '../../src/components/features/billingView';
import ReportsAdd from '../../src/components/features/reportsAdd';
import HealthDetailsAdd from '../../src/components/features/healthDetailsAdd';
import BillingAdd from '../../src/components/features/billsAdd';
import ViewOffers from '../../src/components/features/viewOffers';
import ViewHealthTips from '../../src/components/features/viewHealthTips';
import Information from '../../src/components/features/information';
import {ScreenNames} from './constants';
import Home from '../components/home';
import Logout from '../components/logout';
import {getUserName, getUserId} from '../utils/api';

const Stack = createStackNavigator();

export const Auth: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.HomeScreen}>
      <Stack.Screen
        name={ScreenNames.SplashScreen}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ScreenNames.LoginScreen}
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ScreenNames.RegisterScreen}
        component={RegisterScreen}
      />
      <Stack.Screen
        name={ScreenNames.ForgotPassword}
        component={ForgotPassword}
      />
      <Stack.Screen
        name={ScreenNames.ForgotPasswordHospital}
        component={ForgotPasswordHospital}
      />
      <Stack.Screen
        name={ScreenNames.ResetPassword}
        component={ResetPassword}
      />
    </Stack.Navigator>
  );
};

const HomeStack: React.FC = () => {
  const [logedInUser, setLogedInUser] = useState('');

  let displayName =
    logedInUser.slice(0, 1).toUpperCase() +
    logedInUser.slice(1, logedInUser.length);
  let displayUser = 'WELCOME, ' + displayName;

  const getUserDetails = async () => {
    const userId = await getUserId();
    const userName = await getUserName();
    setLogedInUser(userName);
    return userName;
  };

  useEffect(() => {
    const userName = getUserDetails();
    return;
  }, []);
  return (
    <Stack.Navigator initialRouteName={ScreenNames.HomeScreen}>
      <Stack.Screen
        name={ScreenNames.HomeScreen}
        component={HomeScreen}
        options={{
          // headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
          // headerShown: false,
        }}
      />

      <Stack.Screen
        name={ScreenNames.LoginScreen}
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ScreenNames.SplashScreen}
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ScreenNames.RegisterScreen}
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ForgotPassword}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ScreenNames.ForgotPasswordHospital}
        component={ForgotPasswordHospital}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ResetPassword}
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ScreenNames.PatientDetailsScreen}
        component={PatientDetails}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ViewOffersScreen}
        component={ViewOffers}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ViewHealthTips}
        component={ViewHealthTips}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.AddNewUser}
        component={AddNewUser}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ReportsViewScreen}
        component={ReportsView}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.HealthDetailsViewScreen}
        component={HealthDetailsView}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.BillingViewScreen}
        component={BillingView}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ReportsAddScreen}
        component={ReportsAdd}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.HealthdetailsAddScreen}
        component={HealthDetailsAdd}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.BillingAddScreen}
        component={BillingAdd}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.Current}
        component={Current}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.Opd}
        component={Opd}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.History}
        component={History}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.HospitalSelection}
        component={HospitalSelection}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.HospitalSelectionOpd}
        component={HospitalSelectionOpd}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.AccountScreen}
        component={AccountScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.MoreScreen}
        component={MoreScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ReminderScreen}
        component={ReminderScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
      <Stack.Screen
        name={ScreenNames.CreateReminderScreen}
        component={CreateReminderScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
      <Stack.Screen
        name={ScreenNames.BookAppointmentScreen}
        component={BookAppointmentScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
      <Stack.Screen
        name={ScreenNames.ListAppointmentScreen}
        component={ListAppointmentScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
      <Stack.Screen
        name={ScreenNames.MyDocumentViewScreen}
        component={MyDocumentViewScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
      <Stack.Screen
        name={ScreenNames.MyDocumentAddScreen}
        component={MyDocumentAddScreen}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
      <Stack.Screen
        name={ScreenNames.EditProfile}
        component={EditProfile}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.BillingScreen}
        component={Billing}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.ReportsScreen}
        component={Reports}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.InfoScreen}
        component={Information}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />

      <Stack.Screen
        name={ScreenNames.UpdatesScreen}
        component={Updates}
        options={{
          headerLeft: () => <Home />,
          headerRight: () => <Logout />,
          title: displayUser,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStatusBarHeight: 12,
        }}
      />
    </Stack.Navigator>
  );
};

export const App: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.HomeScreen}>
      <Stack.Screen
        name={ScreenNames.HomeScreen}
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
