import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase';
import {Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {UserModel} from '../user/model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private userService: UserService
  ) {
    this.user$ = this.fireAuth.authState;
  }

  user$: Observable<firebase.User>;

  async googleLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    localStorage.setItem('returnUrl', returnUrl);
    await this.fireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  async logout() {
    await this.fireAuth.signOut();
  }

  get userModel$(): Observable<UserModel> {
    return this.user$
      .pipe(switchMap(user => {
          if (user) {
            return this.userService.get(user.uid).valueChanges();
          } else {
            return of(null);
          }
        }
      ));
  }

}
