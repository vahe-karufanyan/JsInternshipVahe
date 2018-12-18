import { Component } from '@angular/core';
import { ItemRequests } from './item-requests.service';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { Item } from './models/item';

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
      console.error(err);
    })
  }

  authenticationPageBoolian() {
    this.searchResult = false;
  }

  getUrl() {
    return "url('../assets/background-blured.jpg')";
  }
}
