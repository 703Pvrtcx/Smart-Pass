import { Injectable, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { User } from "./user";
import { now } from '@ionic/core/dist/types/utils/helpers';
import { delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: any;
  user = {} as Account;
  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth,
    public router: Router,  
    public ngZone: NgZone 
  ) {
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }
  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.SetUserData(result.user);
      this.router.navigate(['dashboard']); 
    }).catch((error) => {
      window.alert(error.message);
    })
  }
  // Register user with email/password
  RegisterUser(email, password,user) {
    this.user = user;
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
     this.SetUserData(result.user);
     this.SendVerificationMail();
    }).catch((error) => {
      window.alert(error.message)
    })
  }
  // Email verification when new user register
  async SendVerificationMail() {
    return (await this.ngFireAuth.currentUser)?.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }
  // Recover password
  PasswordRecover(passwordResetEmail) {
    return this.ngFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email has been sent, please check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }
  // Returns true when user is looged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }
  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }
  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }
  // Store user in localStorage
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      
      displayName: user.displayName,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      gender: this.user.gender,
      roleId: this.user.roleId,

      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      created_at: Date.now().toString(),
      verified_at: Date.now().toString(),
    }
    return userRef.set(userData, {
      merge: true
    })
  }
  getUserData(uid){
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${uid}`);
    return userRef;
  }
  // Sign-out 
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

}