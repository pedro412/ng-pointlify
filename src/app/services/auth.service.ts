import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();

    try {
      const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.router.navigate(['/inventory']);
      return this.updateUserData(credential.user);
    } catch (error) {
      console.log(error);
    }
  }

  async emailAndPasswordSignup(user: any) {
    const { email, password, displayName } = user;

    try {
      const credential = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );

      const userRef: AngularFirestoreDocument<User> = this.afs.doc(
        `users/${credential.user.uid}`
      );

      const data = {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName,
        photoURL: credential.user.photoURL
      };

      this.router.navigate(['/inventory']);
      return userRef.set(data, { merge: true });
    } catch (error) {
      return error;
    }
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/login']);
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }
}
