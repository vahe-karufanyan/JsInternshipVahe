import { Component, OnInit } from '@angular/core'
import { UserData } from 'src/app/interfaces/userData'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { UserRequestsService } from 'src/app/services/user-requests.service'

@Component({
  selector: 'sb-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: UserData[] = []
  public newDebt: number
  public email: string

  constructor(private _userService: UserRequestsService, private _authenticationService: AuthenticationService) { }

  public ngOnInit(): void {
    this._addUsers()
  }

  public storeEmailToResetDebt(email: string): void {
    this.email = email
  }

  public reset(resetValue?: number): void {
    if (this._authenticationService.isAdmin()) {
      let newDebt: number = this.newDebt
      if (resetValue === 0) {
        newDebt = 0
      }
      this._userService.reset(this.email, newDebt).subscribe(res => {
        this.users.forEach((user: UserData, index: number, array: UserData[]) => {
          if (user.email === this.email) {
            array[index].toPay = newDebt
          }
        })
      },
      err => {
        console.error(err)
      }
      )
    }
  }

  public resetAll(): void {
    if (this._authenticationService.isAdmin()) {
      const emails: string[] = []
      this.users.forEach((user: UserData) => {
        emails.push(user.email)
      })
      this._userService.resetAll(emails).subscribe(res => {
        this.users.forEach((user: UserData, index: number, array: UserData[]) => {
          array[index].toPay = 0
        })
      },
      err => {
        console.error(err)
      })
    }
  }

  private _addUsers(): void {
    this._userService.getAllUsers().subscribe((res: UserData[]) => {
      this.users = res
    })
  }

}
