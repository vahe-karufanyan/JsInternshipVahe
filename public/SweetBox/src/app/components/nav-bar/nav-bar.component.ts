import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public names: string[] = []

  public name: string
  public toPayAmount: string

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService,
    private router: Router) { }

  public ngOnInit(): void {
    this._getToPayValue()
    this._gettingNamesForAutocomplete()
  }

  public search(): void {
    this._storeService.storeSearchData(this.name)
    this.router.navigateByUrl(`/search`, { skipLocationChange: true })
  }

  public logOut(): void {
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('toPay')
  }

  public autocomplete = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.names.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  private _gettingNamesForAutocomplete(): void {
    this._storeService.getPassingNamesToSearch().subscribe(names => {
      this.names = names
    })
  }

  private _getToPayValue(): void {
    this.toPayAmount = localStorage.getItem('toPay')
  }

}
