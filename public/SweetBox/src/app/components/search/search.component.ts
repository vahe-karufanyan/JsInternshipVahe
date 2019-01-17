import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/item';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

 item: Item[];

  constructor(private _searchService: SearchService, private _authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  search(): void {
    this._searchService.getByName(this.route.snapshot.paramMap.get('name')).subscribe(res => {
      this.item = res;
    },
    err => {
      alert(err);
      console.error(err);
    })
  }

  ngOnInit() {
    this.search()
  }

}
