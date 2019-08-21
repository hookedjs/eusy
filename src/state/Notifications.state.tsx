import React from 'react';
import { autorun, observable } from 'mobx';
import Notifications from './NotificationsDemo.json';

export const NotificationsState = observable({
  notifications: Notifications,
  unreadCount: 0
});

autorun(() => {
  NotificationsState.unreadCount = NotificationsState.notifications.filter(n => n.new).length;
});

export const ToggleNotification = notification => {
  notification.new = !notification.new;
  // This is where you should inform the backend
};

export const ClearNotification = notification => {
  notification.new = false;
  console.log('Notification cleared');
  // This is where you should inform the backend
};

export const ClearNotifications = () => {
  NotificationsState.notifications.filter(n => n.new).forEach(n => ClearNotification(n));
};

/**
 * How the demo data was made:
 */
// let Notifications = [];
// for (let i = 0; i < 70; i += 4) {
//   Notifications.push({
//     id: i,
//     to: '/home',
//     new: true,
//     icon: image.avatar(),
//     text: `**${name.findName()}** commented on **${hacker.phrase().slice(0, -1)}**.`
//   });
//
//   Notifications.push({
//     id: i + 1,
//     to: '/home',
//     new: true,
//     icon: image.avatar(),
//     text: `**${name.findName()}** posted on her wall for the first time in a while.`
//   });
//
//   Notifications.push({
//     id: i + 2,
//     to: '/home',
//     new: true,
//     icon: image.avatar(),
//     text: `**${name.findName()}** added a new event in **${address.city()}: ${hacker.phrase().slice(0, -1)}**.`
//   });
//
//   Notifications.push({
//     id: i + 3,
//     to: '/home',
//     new: true,
//     icon: image.avatar(),
//     text: `**${name.findName()}** invited you to join her group **${hacker.phrase().slice(0, -1)}**.`
//   });
// }
// console.dir(JSON.stringify(Notifications));
