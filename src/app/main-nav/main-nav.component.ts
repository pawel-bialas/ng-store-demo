import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {
  constructor(public auth: AuthService) {
  }

   async logout() {
    await this.auth.logout();
  }
}
