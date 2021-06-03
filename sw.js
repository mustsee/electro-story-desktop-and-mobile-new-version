importScripts('/electro-story-desktop-and-mobile-new-version/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/48cb4236e116a73b0bd7.js",
    "revision": "55ba30f94fede0696f8426836a9d5380"
  },
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/95bfe3fae4396fd65e35.js",
    "revision": "93e95e725723f0cb551e4dc88ae6e028"
  },
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/a367df0d11fa3d823b29.js",
    "revision": "6038fe879e360787269c8b9ee33e480b"
  },
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/cb8e263756c1f8a41d65.js",
    "revision": "9b5eeaf18f73571a39af4f79bb4545c0"
  }
], {
  "cacheId": "electro-story",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/electro-story-desktop-and-mobile-new-version/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/electro-story-desktop-and-mobile-new-version/.*'), workbox.strategies.networkFirst({}), 'GET')
