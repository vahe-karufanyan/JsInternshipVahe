import { Component, OnInit } from '@angular/core';
import { UserLogIn } from '../userLogIn'

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent {
  credentials: UserLogIn = {
    email: '',
    password: ''
  };
};