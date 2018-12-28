import { Component } from '@angular/core';
import { ItemRequests } from './item-requests.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Item } from './interfaces/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  name: string;
  item: Item[];
  searchResult: boolean;

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests, private router: Router) {}
  
  search() {
    this._itemRequest.getByName(this.name).subscribe(res => {
      this.item = res;
      this.searchResult = true;
    },
    err => {
      alert(err);
      console.error(err);
    })
  }

  buyIf() {
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    }
  }

  authenticationPageBoolian() {
    this.searchResult = false;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.searchResult = false;
  }

  getUrl() {
    return "url('../assets/background-blured.jpg')";
  }
}
