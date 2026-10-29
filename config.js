// ================== НАСТРОЙКИ ПРИЛОЖЕНИЯ ==================
// Это единственный файл, который нужно поменять.
//
// 1) В блок firebase вставь значения из Firebase
//    (Настройки проекта → Your apps → SDK setup and configuration → Config).
//    Пока apiKey пустой, приложение работает в ДЕМО-режиме
//    (данные только на этом устройстве, с примерами).
//
// 2) В блок people впиши почты, под которыми ты и Настя будете входить.
//    Эти же почты должны быть в правилах базы (файл firestore-rules.txt).

window.APP_CONFIG = {
  firebase: {
    apiKey: "AIzaSyBEY15U0c1XhODIO36_lrbSW4Pc-f0AKCU",
    authDomain: "traty-16280.firebaseapp.com",
    projectId: "traty-16280",
    storageBucket: "traty-16280.firebasestorage.app",
    messagingSenderId: "676899172764",
    appId: "1:676899172764:web:453e9ff3d6c7383c99d859"
  },

  people: {
    a: { name: "Артём", email: "roza54468542@gmail.com" },
    n: { name: "Настя", email: "paskonastya05@gmail.com" }
  },

  sharedName: "Общие"
};
