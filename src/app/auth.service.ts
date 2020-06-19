import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = this.fireAuth.authState;
  }

  user$: Observable<firebase.User>;

  async googleLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    console.log(returnUrl || 'XCX');
    localStorage.setItem('returnUrl', returnUrl);
    await this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  async logout() {
    await this.fireAuth.signOut();
  }

}
