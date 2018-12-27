import { AsyncStorage } from 'react-native';
import { Permissions, Notifications } from 'expo';
const CONSTANT_NOTIFICATION = 'MobileFlashcards:notifications';

// contains text to display on notification
function notificationData(title, body) {
  return {
    title: title ? title : 'Reminder to look at flashcards',
    body: body
      ? body
      : "Don't forget to study today!",
    ios: {
      sound: true,
    },
  };
}

// called when notification is displayed on user's device
export function displayNotification(title, body) {
  Notifications.presentLocalNotificationAsync(notificationData(title, body));
}

export function scheduleNotification(time, repeat) {
  Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync();
      Notifications.scheduleLocalNotificationAsync(notificationData(), {
        time,
        repeat,
      }).then(id => console.log(id));
    }
  });
}

// function to remove notification from screen
export function deleteNotification() {
  return AsyncStorage.removeItem(CONSTANT_NOTIFICATION).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}