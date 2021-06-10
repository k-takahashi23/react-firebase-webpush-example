export interface Notification {
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

  public static createNotification = (notification: any): Notification => {
    return {
      title: notification.title,
      options: {
        body: notification.body,
      },
    }
  }
}