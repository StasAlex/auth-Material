import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  hide = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(30)]
      ]
    });
    this.clearFormFields();
  }

  getErrorMessage() {
    return this.registerForm.get('email').hasError('required')
      ? 'You must enter a value'
      : this.registerForm.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  registerUser() {
    this.loginService
      .registerUser(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .subscribe(
        () => {
          this.router.navigateByUrl('/login');
          // console.log(this.loginForm.value);
        },
        ({ message }) => {
          alert(message);
        }
      );
  }

  clearFormFields() {
    this.registerForm.reset();
  }
}
