import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  name: string;
  toPayAmount: string;

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService, private router: Router) { }

  search(): void {
    this._storeService.storeSearchData(this.name);
    this.router.navigateByUrl(`/search`, { skipLocationChange: true });
  }
  
  getToPayValue(): void {
    this.toPayAmount = localStorage.getItem('toPay')
  }

  logOut(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('toPay');
  }

  ngOnInit() {
    this.getToPayValue();
  }
}
