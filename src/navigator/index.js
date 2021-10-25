import React, {useState} from 'react';
import {App, Auth} from './app-navigator';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef, isReadyRef} from './NavigationService';
import {getUserId, getUserName} from '../utils/api';

const Navigator = () => {
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const decideAppFlow = async () => {
    const userId = await getUserId();
    const userName = await getUserName();

    if (userId) {
      setLoggedIn(true);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    setLoading(true);
    decideAppFlow();
    return () => console.log('hello');
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}>
      {loggedIn ? <App /> : <Auth />}
    </NavigationContainer>
  );
};

export default Navigator;
