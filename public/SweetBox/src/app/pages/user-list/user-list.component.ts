import { Component, OnInit } from '@angular/core'
import { UserData } from 'src/app/interfaces/userData'
import { UserRequestsService } from 'src/app/services/user-requests.service'

@Component({
  selector: 'sb-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: UserData[] = []
  public newToPay: number

  constructor(private _userService: UserRequestsService) { }

  public ngOnInit(): void {
    this._addUsers()
  }

  public reset(): void {
    const email: string = localStorage.getItem('email')
    this._userService.reset(email, toPay).subscribe(res => {
      if (res) {
        localStorage.setItem('toPay', res.toString())
      }
    })
    // add to pay new value to modal if there is no value then just reset to 0
  }

  private _addUsers(): void {
    this._userService.getAllUsers().subscribe((res: UserData[]) => {
      this.users = res
      console.log(res)
    })
  }

}
