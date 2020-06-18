import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase'
import {Observable} from 'rxjs';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState;
  }

  user$: Observable<firebase.User>;

  async logout() {
    console.log('logout');
    await this.afAuth.signOut();
  }
}
