import { Component, OnInit } from '@angular/core';
import { UserData } from 'src/app/interfaces/userData';
import { UserRequestsService } from 'src/app/services/user-requests.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserData[] = [];

  constructor(private _userService: UserRequestsService) { }

  addUsers(): void {
    this._userService.getAllUsers().subscribe((res: UserData[]) => {
      this.users = res;
      console.log(res);
    })
  }
  
  ngOnInit() {
    this.addUsers();
  }

}
