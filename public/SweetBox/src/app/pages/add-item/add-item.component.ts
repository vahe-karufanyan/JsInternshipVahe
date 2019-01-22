import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item'
import { ItemRequests } from 'src/app/services/item-requests.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  constructor(private _itemRequests: ItemRequests) { }

  credentials: Item = {
    id: 0,
    type: '',
    name: '',
    price: 0,
    barcode: '',
    count: 1
  };

  addItem() {    
    if (localStorage.getItem('role') === 'admin') {
      console.log(2);
      this._itemRequests.addItem(this.credentials, localStorage.getItem('token')).subscribe(res => {
        console.log(res);
        alert('item has been added' + res);
      },
      err => {
        console.log(err);
        alert(err);
      })
    }
  }

  ngOnInit() {
  }

}
