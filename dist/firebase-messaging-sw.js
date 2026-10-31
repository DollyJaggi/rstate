importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: "AIzaSyClgZMRUtPywHinq9t37Bm8641jEzOox2A",
  authDomain: "realstate-339cf.firebaseapp.com",
  projectId: "realstate-339cf",
  storageBucket: "realstate-339cf.firebasestorage.app",
  messagingSenderId: "432127506832",
  appId: "1:432127506832:web:df10e3227f644c0cf71b15",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/favicon.svg',
  })
})
