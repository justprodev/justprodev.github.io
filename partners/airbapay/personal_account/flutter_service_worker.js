'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "ea1d7f73757bf153b8b9232225ec79d5",
"index.html": "cbe531691e36b234277931fd1e177b6b",
"/": "cbe531691e36b234277931fd1e177b6b",
"main.dart.js": "81d6d15b2c95733e9fa0acf945401c33",
"flutter.js": "eb2682e33f25cd8f1fc59011497c35f8",
"favicon.png": "3b97dc6e34ad7342f9f62143accee513",
"icons/Icon-192.png": "18a69fa304b37b41cf51e641501c95ca",
"icons/Icon-maskable-192.png": "18a69fa304b37b41cf51e641501c95ca",
"icons/Icon-maskable-512.png": "0680334db44e14c6aa91fa7706dbc685",
"icons/Icon-512.png": "0680334db44e14c6aa91fa7706dbc685",
"manifest.json": "6f40054170ed3443f7721bc8314b8482",
"assets/AssetManifest.json": "16702761aa2c0778f3777e76cf7e5c20",
"assets/NOTICES": "31dc6c00e28cad794218438a2f8ff255",
"assets/FontManifest.json": "48143ce3438bbf984acc621c83a2da55",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/widgets/assets/radio_unselected.svg": "ec75437a406a4f154adab12629c61ff8",
"assets/packages/widgets/assets/checkbox_unselected.svg": "3783fb120d2c12988f3ba7e39e094092",
"assets/packages/widgets/assets/checkbox_selected.svg": "9e13eefad105717c7bd952cc9d5fe614",
"assets/packages/widgets/assets/radio_selected.svg": "13310e1ed0dcd3ddf74761e77b6773da",
"assets/packages/wakelock_web/assets/no_sleep.js": "7748a45cd593f33280669b29c2c8919a",
"assets/fonts/semi_bold.ttf": "c641dbee1d75892e4d88bdc31560c91b",
"assets/fonts/MuseoSansCyrl700.ttf": "3ce9250c24b489dd93805f99c0e41ddf",
"assets/fonts/medium.ttf": "c8b6e083af3f94009801989c3739425e",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/fonts/bold.ttf": "ade91f473255991f410f61857696434b",
"assets/fonts/regular.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"assets/assets/payment/success.png": "35e9dd20d7c421962de30f320eac7208",
"assets/assets/payment/failure.png": "33b1242c6a0eaa2611415eda51ff9958",
"assets/assets/logo.png": "5bd5b1054b35108316f7710045479e73",
"assets/assets/icons/check.png": "8aa807a9db615d3db2ff16f1ee33195f",
"assets/assets/icons/plus.png": "ba66c8f55313186fc8bad6b0c2836e0c",
"assets/assets/icons/bell.png": "29bad492a8168e38a12988e98aa3e8ae",
"assets/assets/icons/time.png": "57dc246c75f163bb5be8e05829f4661e",
"assets/assets/icons/instagram.png": "89fd7d1420b706c448704e613433fee2",
"assets/assets/icons/question.png": "d87a499e49dd55043d2bedb7dedae596",
"assets/assets/icons/verified.png": "7c83deef8adf4e0507882ebdf5d34f51",
"assets/assets/icons/visa.png": "b80bd0a1e62a409aa52b9b6bc9f01d73",
"assets/assets/icons/card.svg": "d8cb7acec9332e053e6fd141ee08355a",
"assets/assets/icons/linkedin.png": "0fdc865f458405515bc655d94293f1f0",
"assets/assets/icons/edit.svg": "dcfad73380ba51d7f32b319704c10b99",
"assets/assets/icons/profile.png": "cd876a3912def7e7487e9ea2d54f5ada",
"assets/assets/icons/credits.png": "ced784f81a366026132928b04562cc4d",
"assets/assets/icons/mastercard.png": "a9f17c54e96113870d970684087dab00",
"assets/assets/icons/facebook.png": "9561627a2d25d9212970eae904d65514",
"assets/assets/icons/not_verified.png": "d6d43708d1e0597e4b783f9f060c2b50",
"assets/assets/icons/arrow_down.png": "e3a234c5104caf9f8c18ff5d4b688722",
"assets/assets/lottie/noLoans.json": "34e06313e9f2a48f15cf51313507e988",
"assets/assets/lottie/idBack.json": "6e220ede89df4671a140f126f8254fed",
"assets/assets/qr.png": "07a203b3952463cd22352c27d3ec7a5f",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
