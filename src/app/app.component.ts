import {Component} from '@angular/core';
import {AuthService} from './authentication/auth.service';
import {Router} from '@angular/router';
import {UserService} from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-ng-store';

  constructor(private authService: AuthService, private userService: UserService, private router: Router) {
    authService.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        const returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
