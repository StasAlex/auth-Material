import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'firebase';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {


  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  user$: Observable<User>;

  ngOnInit() {
    this.user$ = this.loginService.getUser();
  }
  logout(): void {
    this.loginService.logOut()
    .subscribe(
      () => {
        this.router.navigate(['/home']);
      }
    );

  }


}
