import React, { useState } from 'react';
import { firebase, messaging } from '../firebase/client';
import { useEffectAsync } from '../hooks/useEffectAsync';
import { FirebaseUtility } from '../utils/firebaseUtility';
import { NotificationPayload, NotificationUtility } from '../utils/notificationUtility';
import { ServiceWorkerUtility } from '../utils/serviceWorkerUtility'

interface Props {}

export const NotificationForm: React.FC<Props> = () => {
  const [token, setToken] = useState<string | undefined>(undefined)
  const [initialized, setInitialized] = useState<boolean>(false)

  useEffectAsync(async () => {
    if (!initialized) {
      await initializeFCM()
    }
  }, [initialized])

  const initializeFCM = async (): Promise<void> => {
    if (!firebase.messaging.isSupported()) return;
    
    try {
      const serviceWorkerRegistration = await ServiceWorkerUtility.getServiceWorker();

      const token = await FirebaseUtility.getMessagingToken(messaging, serviceWorkerRegistration);
      setToken(token)

      NotificationUtility.requestPermission()

      messaging.onMessage(
        (payload: NotificationPayload) => {
          console.log('Invoked onMessage! ', payload)
          const notification = NotificationUtility.createNotification(payload);
      
          serviceWorkerRegistration.showNotification(notification.title, notification.options);
        }
      )

      setInitialized(true)
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>Notification</div>
      <div>FCM Token: {token}</div>
    </>
  )
}