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
    const user = this.afAuth.user;
    return user;
  }

  loginUser(email: string, password: string): Observable<User> {
    const user = from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    ).pipe(
      pluck('user')
    );
    return user;
  }

  logOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }

}
