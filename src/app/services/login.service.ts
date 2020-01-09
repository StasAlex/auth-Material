import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User } from 'firebase';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afAuth: AngularFireAuth
    ) {

    }

  getUser(): Observable<User> {
    return this.afAuth.user;
  }

  loginUser(email, password): Observable<User> {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    ).pipe(pluck('user'));
  }

  logOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

}
