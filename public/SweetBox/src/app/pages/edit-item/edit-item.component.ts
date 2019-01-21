import { Component, OnInit, Input } from '@angular/core';
import { ItemRequests } from 'src/app/services/item-requests.service';
import { Item } from 'src/app/interfaces/item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemToUpdate: Item;

  constructor(private _itemRequests: ItemRequests) { }

  credentials: Item = {
    type: this.itemToUpdate.type,
    name: this.itemToUpdate.name,
    price: this.itemToUpdate.price,
    barcode: this.itemToUpdate.barcode,
    count: this.itemToUpdate.count
  };

  updateItem() {    
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.updateItem(this.credentials, localStorage.getItem('token')).subscribe(res => {
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
