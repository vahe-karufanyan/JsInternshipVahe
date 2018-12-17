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
      console.log(false);
    },
    err => {
      console.error(err);
    })
  }

  noRepeatType() {
    let type;
    let i: number, j: number;
    // alert(this.item.length);
    for( i = 0; i < this.item.length; i++ ) {
      // alert(i);
      // alert(this.item.length);
      let notMe = 0;
      type = this.item[i].type;
      // alert(type);
      for( j = 0; j < this.item.length; j++ ) {
        // alert(i);
        // alert(this.item.length);
        if ( type === this.item[j].type ) {
          notMe = notMe + 1;
          // alert(type);
          // alert(notMe);
          if (notMe !== 1) {
            // alert('false');
            return false;
          }
        }
        // alert('true');
        return true;
      }
    }
  }

  ngOnInit() {
    this.addAllItems();
  }
  
}
