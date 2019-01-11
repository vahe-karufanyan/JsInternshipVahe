import { Component, OnInit } from '@angular/core';
import { ItemRequests } from 'src/app/services/item-requests.service';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  item: Item[];

  constructor(private _itemRequest: ItemRequests, private route: ActivatedRoute) { }

  search(): void {
    console.log(this.route.snapshot.paramMap.get('name'));
    this._itemRequest.getByName(this.route.snapshot.paramMap.get('name')).subscribe(res => {
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
