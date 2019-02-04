import { Component, OnInit, Input } from '@angular/core';
import { ItemRequests } from 'src/app/services/item-requests.service';
import { Item } from 'src/app/interfaces/item';
import { StoreService } from 'src/app/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  itemToUpdate: Item;

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests, private router: Router) { }

  updateItem(): void {
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.updateItem(this.itemToUpdate, localStorage.getItem('token')).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('');
        alert('item has been updated');
      },
      err => {
        console.log(err);
        alert(err);
      })
    }
  }

  currentItem(): void {
    this._storeService.getEditData().subscribe(itemToEdit => {
      this.itemToUpdate = itemToEdit;
    });
  }

  ngOnInit() {
    this.currentItem();
  }

}
