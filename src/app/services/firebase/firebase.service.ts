import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, updateDoc, deleteDoc, docData, addDoc, collectionData, query, where, orderBy, Timestamp, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface User {
  id: string;
  name: string;
  primaryLanguage: string;
  learningLanguage: string;
}

interface RecentListen {
  songID: string;
  songName: string;
  artist: string;
  language: string;
  genre: string;
  learned: boolean;
  timestamp: Timestamp;
}

interface LikedSong {
  songID: string;
  songName: string;
  artist: string;
  genre: string;
  language: string;
  album: string;
  releaseYear: number;
  timestamp: Timestamp;
}

interface RecentSearch {
  query: string;
  timestamp: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  //Users
  addUser(user: User): Promise<DocumentReference> {
    const userRef = collection(this.firestore, 'users');
    return addDoc(userRef, user);
  }

  getUsers(): Observable<User[]> {
    const userRef = collection(this.firestore, 'users');
    return collectionData(userRef, { idField: 'id' }) as Observable<User[]>;
  }

  getUserById(userId: string): Observable<User> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return docData(userDoc, { idField: 'id' }) as Observable<User>;
  }

  updateUser(userId: string, data: Partial<User>): Promise<void> {
    const userDoc = doc(this.firestore, `users/${userId}`);
    return updateDoc(userDoc, data);
  }

  // Recent Listen

  addRecentListen(userId: string, recentListen: RecentListen): Promise<DocumentReference> {
    const recentListenRef = collection(this.firestore, `users/${userId}/recentListen`);
    return addDoc(recentListenRef, recentListen);
  }

  getRecentListens(userId: string): Observable<RecentListen[]> {
    const recentListenRef = collection(this.firestore, `users/${userId}/recentListen`);
    return collectionData(recentListenRef, { idField: 'id' }) as Observable<RecentListen[]>;
  }

  //Liked Songs
  addLikedSong(userId: string, likedSong: LikedSong): Promise<DocumentReference> {
    const likedSongsRef = collection(this.firestore, `users/${userId}/likedSongs`);
    return addDoc(likedSongsRef, likedSong);
  }

  getLikedSongs(userId: string): Observable<LikedSong[]> {
    const likedSongsRef = collection(this.firestore, `users/${userId}/likedSongs`);
    return collectionData(likedSongsRef, { idField: 'id' }) as Observable<LikedSong[]>;
  }

  //Recent Searches
  addRecentSearch(userId: string, recentSearch: { query: string; timestamp: Timestamp }): Promise<DocumentReference> {
    const recentSearchRef = collection(this.firestore, `users/${userId}/recentSearches`);
    return addDoc(recentSearchRef, recentSearch);
  }
  

  getRecentSearches(userId: string): Observable<RecentSearch[]> {
    const recentSearchRef = collection(this.firestore, `users/${userId}/recentSearches`);
    return collectionData(recentSearchRef, { idField: 'id' }) as Observable<RecentSearch[]>;
  }
}
