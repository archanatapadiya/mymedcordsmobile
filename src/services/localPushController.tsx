import PushNotification, {Importance} from 'react-native-push-notification';
import moment from 'moment';

var i = 10;

PushNotification.configure({
  // (required) Called when a remote or local notification is opened or received
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },

  popInitialNotification: true,
  requestPermissions: true,
});

function increment(n) {
  n++;
  return n;
}

i = increment(i);

let channelNo = `channel-id${i}`;

export const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: 'channel-id', // (required)
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
  console.log('in local notification schedule, firedate');

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
  var currDate = new Date();

  if (fireDate < currDate) {
    fireDate = new Date(fireDate.setDate(fireDate.getDate() + 8));
  }

  PushNotification.localNotificationSchedule({
    channelId: 'channel-id',
    autoCancel: true,
    title: alarmNotifData.message,
    subtitle: alarmNotifData.data.doctor,
    message: alarmNotifData.title,
    allowWhileIdle: true,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    date: fireDate,
    repeatType: 'time',
    repeatTime: 7 * 86400000,
    // repeatTime: 3000,
  });
};

export const cancelNotification = () => {
  PushNotification.cancelAllLocalNotifications();
  console.log('notification cleared');
};

export const getScheduledNotification = () => {
  PushNotification.getScheduledLocalNotifications(nots => {
    console.log(nots);
  });
};
