import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(val => console.log(val));
  }

  async logout() {
    console.log('logout');
    await this.afAuth.signOut();
  }
}
