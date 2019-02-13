import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'

import { User } from 'src/app/interfaces/user'
import { UserLogIn } from '../../interfaces/userLogIn'

import { AuthenticationService } from '../../services/authentication.service'

@Component({
  selector: 'sb-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  public credentials: UserLogIn = {
    email: '',
    password: ''
  }

  constructor(private fb: FormBuilder, private _authenticationService: AuthenticationService,
    private router: Router) { }

  private logInForm: FormGroup

  public logIn(): void {
    this._authenticationService.signIn(this.credentials).subscribe((res: User) => {
      localStorage.setItem('toPay', res.toPay.toString())
      localStorage.setItem('email', res.email)
      localStorage.setItem('token', res.token)
      localStorage.setItem('role', res.role)
      this.router.navigateByUrl('')
      console.log(res)
    },
    (err) => {
      alert(err)
    })
  }

  public ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.minLength(6)
      ]]
    })
  }
}
