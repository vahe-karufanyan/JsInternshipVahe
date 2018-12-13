import { Component, OnInit } from '@angular/core';
import { ItemRequests } from '../item-requests.service';
import { Item } from '../item'

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  item: Item[];

  constructor(private _itemRequest: ItemRequests) { }

  addAllItems() {    
    this._itemRequest.getAllItems().subscribe(res => {
      this.item = res;
    },
    err => {
      console.error(err);
    })
  }

  ngOnInit() {
    this.addAllItems();
  }
  
}
