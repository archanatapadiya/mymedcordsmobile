import PushNotification, {Importance} from 'react-native-push-notification';

var i = 10;

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

export const createChannel = () => {
  function increment(n) {
    n++;
    return n;
  }

  i = increment(i);

  let channelNo = `channel-id${i}`;
  PushNotification.createChannel(
    {
      channelId: channelNo, // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}' '${channelNo}`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
};

export const LocalNotification = () => {
  PushNotification.localNotification({
    autoCancel: true,
    title: 'Reminder',
    message: 'Reminder message',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
  });
};

export const LocalNotificationSchedule = (
  fireDate: any,
  alarmNotifData: any,
) => {
  PushNotification.localNotificationSchedule({
    channelId: 'channel-id1',
    autoCancel: true,
    title: alarmNotifData.message,
    subtitle: alarmNotifData.data.doctor,
    message: alarmNotifData.title,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    date: fireDate,
    repeatType: 'time',
    repeatTime: 7 * 86400000,
  });
};

// function callback = () => {
//   console.log('notification array received');
// }

// export const getScheduledNotification = () => {

//   PushNotification.getScheduledLocalNotifications(callback);
// };

export const cancelNotification = () => {
  PushNotification.cancelAllLocalNotifications();
  console.log('notification cleared');
};
