import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sample-ng-store';

  constructor(private authService: AuthService, router: Router)  {
    authService.user$.subscribe(user => {
      if (user) {
        const returnUrl = localStorage.getItem('returnUrl');
        console.log(returnUrl || 'XXX');
        router.navigateByUrl(returnUrl);
      }
    });
  }
}
