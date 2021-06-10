/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { messaging } from './firebase/client';

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false;
    }

    if (url.pathname.startsWith('/_')) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

messaging.onBackgroundMessage((payload) => {
  console.log('Invoked onBackgroundMessage! ', payload);

  if (!payload || !payload.data || !payload.data.body || !payload.data.title) return;
  
  self.registration.showNotification(
    payload.data.title,
    {
      body: payload.data.body,
    });
});

self.onnotificationclick = (event: NotificationEvent) => {
  console.log('Invoked onnotificationclick! ', event);
  event.notification.close();
};