import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // Add this import

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
    provideHttpClient(), // Add this line
    provideFirebaseApp(() => initializeApp({
      "projectId":"cs336-musictranslator",
      "appId":"1:951597434276:web:f76539cb517b372e2f6d31",
      "storageBucket":"cs336-musictranslator.firebasestorage.app",
      "apiKey":"AIzaSyBa-WPASuo6FvzndEbB9uO4qy2Z_KWA_AQ",
      "authDomain":"cs336-musictranslator.firebaseapp.com",
      "messagingSenderId":"951597434276",
      "measurementId":"G-29Z8TKD0ZE"
    })), 
    provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"cs336-musictranslator","appId":"1:951597434276:web:f76539cb517b372e2f6d31","storageBucket":"cs336-musictranslator.firebasestorage.app","apiKey":"AIzaSyBa-WPASuo6FvzndEbB9uO4qy2Z_KWA_AQ","authDomain":"cs336-musictranslator.firebaseapp.com","messagingSenderId":"951597434276","measurementId":"G-29Z8TKD0ZE"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"cs336-musictranslator","appId":"1:951597434276:web:f76539cb517b372e2f6d31","storageBucket":"cs336-musictranslator.firebasestorage.app","apiKey":"AIzaSyBa-WPASuo6FvzndEbB9uO4qy2Z_KWA_AQ","authDomain":"cs336-musictranslator.firebaseapp.com","messagingSenderId":"951597434276","measurementId":"G-29Z8TKD0ZE"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"cs336-final-project-d2f72","appId":"1:7071635215:web:fd36407d34218302a2107a","storageBucket":"cs336-final-project-d2f72.firebasestorage.app","apiKey":"AIzaSyDLVP2VgwSKSccSZ5jlhTwfBQrHdsj6WTo","authDomain":"cs336-final-project-d2f72.firebaseapp.com","messagingSenderId":"7071635215","measurementId":"G-SMPC0NFBH1"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"cs336-musictranslator","appId":"1:951597434276:web:f76539cb517b372e2f6d31","storageBucket":"cs336-musictranslator.firebasestorage.app","apiKey":"AIzaSyBa-WPASuo6FvzndEbB9uO4qy2Z_KWA_AQ","authDomain":"cs336-musictranslator.firebaseapp.com","messagingSenderId":"951597434276","measurementId":"G-29Z8TKD0ZE"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"tunelingual","appId":"1:698985025755:web:df7197e52d07162032fcfe","storageBucket":"tunelingual.firebasestorage.app","apiKey":"AIzaSyDJ_OSh-7wG9y5oBg0VqPbPRbWeoEkhsLU","authDomain":"tunelingual.firebaseapp.com","messagingSenderId":"698985025755","measurementId":"G-QG8ZVC054S"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"tunelingual","appId":"1:698985025755:web:df7197e52d07162032fcfe","storageBucket":"tunelingual.firebasestorage.app","apiKey":"AIzaSyDJ_OSh-7wG9y5oBg0VqPbPRbWeoEkhsLU","authDomain":"tunelingual.firebaseapp.com","messagingSenderId":"698985025755","measurementId":"G-QG8ZVC054S"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"tunelingual","appId":"1:698985025755:web:df7197e52d07162032fcfe","storageBucket":"tunelingual.firebasestorage.app","apiKey":"AIzaSyDJ_OSh-7wG9y5oBg0VqPbPRbWeoEkhsLU","authDomain":"tunelingual.firebaseapp.com","messagingSenderId":"698985025755","measurementId":"G-QG8ZVC054S"})), provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({"projectId":"tunelingual","appId":"1:698985025755:web:df7197e52d07162032fcfe","storageBucket":"tunelingual.firebasestorage.app","apiKey":"AIzaSyDJ_OSh-7wG9y5oBg0VqPbPRbWeoEkhsLU","authDomain":"tunelingual.firebaseapp.com","messagingSenderId":"698985025755","measurementId":"G-QG8ZVC054S"})), provideFirestore(() => getFirestore())
  ]
};