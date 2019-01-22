import { Component, OnInit, Input } from '@angular/core';
import { ItemRequests } from 'src/app/services/item-requests.service';
import { Item } from 'src/app/interfaces/item';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemToUpdate: Item;

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests) { }

  updateItem():void {
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.updateItem(this.itemToUpdate, localStorage.getItem('token')).subscribe(res => {
        console.log(res);
        alert('item has been updated' + res);
      },
      err => {
        console.log(err);
        alert(err);
      })
    }
  }

  currentItem():void {
    this.itemToUpdate = this._storeService.getData();
  }

  ngOnInit() {
    this.currentItem();
  }

}
