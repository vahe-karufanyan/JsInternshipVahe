import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Item } from 'src/app/interfaces/item'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { SearchService } from 'src/app/services/search.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public item: Item[]

  constructor(private _storeService: StoreService, private _searchService: SearchService,
     private _authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  private _searchingName: string

  public ngOnInit(): void {
    this._getSearchingName()
  }

  private _getSearchingName(): void {
    this._storeService.getSearchData().subscribe(searchingName => {
      if (!searchingName) {
        alert('asdasdasd')
        this.router.navigateByUrl('')
      } else {
        this._searchingName = searchingName
        this._search()
      }
    })
  }

  private _search(): void {
    this._searchService.getByName(this._searchingName).subscribe(res => {
      this.item = res
    },
    err => {
      alert(err)
      console.error(err)
    })
  }

}
