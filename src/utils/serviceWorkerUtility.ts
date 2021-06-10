export class ServiceWorkerUtility {
  public static getServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('serviceWorker does not exits in navigator!');
    }

    const serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();

    if (!serviceWorkerRegistration) {
      throw new Error('Cannot get serviceWorkerRegistration!');
    }
    
    return serviceWorkerRegistration;
  }
}