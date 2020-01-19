import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { User, auth } from 'firebase';
import { pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private afAuth: AngularFireAuth) {}

  getUser(): Observable<User> {
    const user = this.afAuth.user;
    return user;
  }

  registerUser(
    email: string,
    password: string
  ): Observable<auth.UserCredential> {
    const user = from(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      tap(data => console.log(data))
      // pluck("user")
    );
    return user;
  }

  loginUser(email: string, password: string): Observable<User> {
    const user = from(
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
    ).pipe(
      tap(data => console.log(data)),
      pluck('user')
    );
    return user;
  }

  logOut(): Observable<void> {
    return from(this.afAuth.auth.signOut());
  }
}
