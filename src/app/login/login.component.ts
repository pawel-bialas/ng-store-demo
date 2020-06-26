import {Component} from '@angular/core';
import {AuthService} from '../authentication/auth.service';


@Component({
  selector: 'login',
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
