import {Component} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {UserModel} from '../user/model/user-model';
import {Router} from '@angular/router';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  userModel: UserModel;

  constructor(private auth: AuthService, private router: Router) {
    this.auth.userModel$.subscribe(userModel => this.userModel = userModel);
  }

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/']);
  }
}
