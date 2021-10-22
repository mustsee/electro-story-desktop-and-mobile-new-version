importScripts('/electro-story-desktop-and-mobile-new-version/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/03ea6c0299de41cc4371.js",
    "revision": "6038fe879e360787269c8b9ee33e480b"
  },
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/3e7fed410e0f5992d1b2.js",
    "revision": "965f599df31873783a8c07039a2e4278"
  },
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/5a86bd1cce1cfab62c28.js",
    "revision": "debba790536af411388702dfb9720da0"
  },
  {
    "url": "/electro-story-desktop-and-mobile-new-version/_nuxt/aa8175f7a95cb40371ed.js",
    "revision": "51d15e0a80a3d7d97216a1561944f3af"
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
