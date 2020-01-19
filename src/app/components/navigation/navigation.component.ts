import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
isLogin$: Observable<boolean>;

  constructor(
    private loginService: LoginService,
    private router: Router

    ) {}

  ngOnInit(): void {
    this.isLogin$ = this.isLogin();
  }

signOut(): void {
  this.loginService.logOut().subscribe(
    () => {
      this.router.navigate(['/home']);
    }
  );
}

  isLogin(): Observable<boolean> {
    return this.loginService.getUser()
    .pipe(
      map((user: User) => !!user)
    );
  }
}
