import {Component, OnInit} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AuthService)  {

  }
    async googleLogin() {
      await this.auth.googleLogin();
  }
}
