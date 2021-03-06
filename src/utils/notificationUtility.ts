export interface NotificationPayload {
  notification: {
    title: string;
    body: string;
  }
}

interface Notification {
  title: string;
  options?: NotificationOptions | undefined;
}

export class NotificationUtility {
  public static requestPermission = (): void => {
    Notification.requestPermission()
    .then((res) => {
      console.log('Permission OK!')
    })
    .catch((err) => {
      console.error('Permission Error! ', err)
    })
  }

  public static createNotification = (payload: NotificationPayload): Notification => {
    return {
      title: payload.notification.title,
      options: {
        body: payload.notification.body,
      },
    }
  }
}