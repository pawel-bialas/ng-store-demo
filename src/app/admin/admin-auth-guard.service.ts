import {Injectable} from '@angular/core';
import {AuthService} from '../authentication/auth.service';
import {UserService} from '../user/user.service';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  user$Sub: Subscription;

  constructor(private auth: AuthService, private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$
      .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
      .pipe(map(modelUser => modelUser.isAdmin));
  }
}



