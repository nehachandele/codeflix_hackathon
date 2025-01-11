// src/components/Notifications.js
import React, { useEffect } from 'react';
import { messaging, getToken } from '../firebase';

const Notifications = () => {
  useEffect(() => {
    // Request permission for push notifications
    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          // Get the token after permission is granted
          getToken(messaging, {
            vapidKey: 'YOUR_VAPID_KEY', // Replace with your VAPID key
          })
            .then((token) => {
              if (token) {
                console.log('Push Notification Token:', token);
              }
            })
            .catch((error) => {
              console.error('Error getting token:', error);
            });
        } else {
          console.error('Notification permission denied');
        }
      })
      .catch((error) => {
        console.error('Permission request failed:', error);
      });
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <p>Enable notifications for health reminders like water intake, stretching, etc.</p>
    </div>
  );
};

export default Notifications;
