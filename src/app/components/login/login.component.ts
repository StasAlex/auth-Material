import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  // password = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  hide = true;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ]
    });
    // tslint:disable-next-line: deprecation
    this.clearFormFields();
  }

  getErrorMessage() {
    return this.email.hasError('required')
      ? 'You must enter a value'
      : this.email.hasError('email')
      ? 'Not a valid email'
      : '';
  }

  onEmailLogin() {
    this.loginService
      .loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        () => {
          this.router.navigateByUrl('/user');
          console.log(this.loginForm.value.email);
        },
        ({ message }) => {
          alert(message);
        }
      );
  }
  clearFormFields() {
    this.loginForm.reset();
  }
}
