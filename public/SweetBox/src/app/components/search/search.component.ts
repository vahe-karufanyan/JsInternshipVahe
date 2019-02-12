import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  item: Item[];
  searchingName: string;

  constructor(private _storeService: StoreService, private _searchService: SearchService, private _authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router) { }

  getSearchingName(): void {
    this._storeService.getSearchData().subscribe(searchingName => {
      if(!searchingName) {
        alert('asdasdasd');
        this.router.navigateByUrl(`/shop`);
      } else {
        this.searchingName = searchingName;
        this.search();
      }
    })
  }

  search(): void {
    this._searchService.getByName(this.searchingName).subscribe(res => {
      this.item = res;
    },
    err => {
      alert(err);
      console.error(err);
    })
  }

  ngOnInit() {
    this.getSearchingName();
  }

}
