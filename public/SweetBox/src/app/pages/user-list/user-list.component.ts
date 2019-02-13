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

  constructor(private _userService: UserRequestsService) { }

  public ngOnInit(): void {
    this._addUsers()
  }

  public reset(email: string): void {
    // to Do
  }

  private _addUsers(): void {
    this._userService.getAllUsers().subscribe((res: UserData[]) => {
      this.users = res
      console.log(res)
    })
  }

}
