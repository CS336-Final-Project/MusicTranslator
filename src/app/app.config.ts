import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"cs336-musictranslator","appId":"1:951597434276:web:f76539cb517b372e2f6d31","storageBucket":"cs336-musictranslator.firebasestorage.app","apiKey":"AIzaSyBa-WPASuo6FvzndEbB9uO4qy2Z_KWA_AQ","authDomain":"cs336-musictranslator.firebaseapp.com","messagingSenderId":"951597434276","measurementId":"G-29Z8TKD0ZE"})), provideFirestore(() => getFirestore())]
};
