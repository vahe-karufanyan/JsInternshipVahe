import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public names: string[] = [];

  name: string;
  toPayAmount: string;

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService, private router: Router) { }

  public search(): void {
    this._storeService.storeSearchData(this.name);
    this.router.navigateByUrl(`/search`, { skipLocationChange: true });
  }

  gettingNamesForAutocomplete() {
    this._storeService.getPassingNamesToSearch().subscribe(names => {
      this.names = names;
    })
  }
  
  private getToPayValue(): void {
    this.toPayAmount = localStorage.getItem('toPay');
  }

  public logOut(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('toPay');
  }

  autocomplete = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.names.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  ngOnInit() {
    this.getToPayValue();
    this.gettingNamesForAutocomplete();
  }
}
