import { Component } from '@angular/core';
import { ItemRequests } from './services/item-requests.service';
import { AuthenticationService } from './services/authentication.service';
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
  
  search(): void {
    this.router.navigateByUrl(`/search/${this.name}`);
  }

  buyIf(): void {
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    }
  }

  authenticationPageBoolian(): void {
    this.searchResult = false;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.searchResult = false;
  }

  getUrl() {
    return "url('../assets/background-blured.jpg')";
  }
}
