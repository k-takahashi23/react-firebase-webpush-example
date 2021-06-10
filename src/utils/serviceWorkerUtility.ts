export class ServiceWorkerUtility {
  public static getServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('serviceWorker does not exits in navigator!');
    }

    const registrations = await navigator.serviceWorker.getRegistrations();
    const serviceWorkerRegistration = registrations[0];

    return serviceWorkerRegistration;
  }
}