import firebase from 'firebase'

export class FirebaseUtility {
  public static getMessagingToken = async (messaging: firebase.messaging.Messaging, serviceWorkerRegistration: ServiceWorkerRegistration): Promise<any> => {
    const token = await messaging.getToken({ serviceWorkerRegistration });
    if (!token) {
      throw new Error('Cannot get token!');
    }
    return token;
  }
}