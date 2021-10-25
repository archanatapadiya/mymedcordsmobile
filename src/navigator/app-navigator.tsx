import React, {useEffect, useState} from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../../src/components/features/home'
import Login from '../../src/components/features/login'
import RegisterScreen from '../../src/components/features/register'
import ForgotPassword from '../../src/components/features/forgotPassword'
import ResetPassword from '../../src/components/features/resetPassword'
import Current from '../../src/components/features/current'
import HospitalSelection from '../../src/components/features/hospitalSelection'
import History from '../../src/components/features/history'
import Billing from '../../src/components/features/billing'
import Reports from '../../src/components/features/reports'
import Updates from '../../src/components/features/updates'
import EditProfile from '../../src/components/features/editProfile'
import AccountScreen from '../../src/components/features/account'
import Information from '../../src/components/features/information'
import {ScreenNames} from './constants'
import Home from '../components/home'
import Logout from '../components/logout'
import {getUserName, getUserId} from '../utils/api'


const Stack = createStackNavigator()

export const Auth: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={ScreenNames.HomeScreen}>
      <Stack.Screen name={ScreenNames.LoginScreen} component={Login} />
      <Stack.Screen name={ScreenNames.RegisterScreen} component={RegisterScreen} /> 
      <Stack.Screen name={ScreenNames.ForgotPassword} component={ForgotPassword} /> 
      <Stack.Screen name={ScreenNames.ResetPassword} component={ResetPassword} /> 
    </Stack.Navigator>
  )
}

const HomeStack: React.FC = () => {

  const [logedInUser, setLogedInUser] = useState('');
  
  let displayName = logedInUser.slice(0,1).toUpperCase() + logedInUser.slice(1, logedInUser.length);
  let displayUser = "WELCOME, " + displayName;
  const getUserDetails = async () => {
    const userId = await getUserId();
    const userName = await getUserName();
    setLogedInUser(userName)
       return userName;
  };

  useEffect(() => {
    const userName = getUserDetails();
    return 
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
        name={ScreenNames.ResetPassword}
        component={ResetPassword}
        options={{
          headerShown: false,
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
  )
}

export const App: React.FC = () => {
  return (
  
      <Stack.Navigator initialRouteName={ScreenNames.HomeScreen}>
        <Stack.Screen name={ScreenNames.HomeScreen} component={HomeStack}   options={{
       headerShown: false,
     }}/>
      </Stack.Navigator>
    
  )
}
