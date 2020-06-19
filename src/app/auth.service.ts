import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.authState;
  }

  user$: Observable<firebase.User>;

  async googleLogin() {
    await this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  async logout() {
    await this.fireAuth.signOut();
  }

}
