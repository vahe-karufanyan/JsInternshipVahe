import { Component, OnInit } from '@angular/core';
import { UserSignUp } from '../userSignUp'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent {
  credentials: UserSignUp = {
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  };
};
