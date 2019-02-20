import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/interfaces/item'
import { ItemRequests } from 'src/app/services/item-requests.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  public itemToUpdate: Item

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests, private router: Router) { }

  public updateItem(): void {
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.updateItem(this.itemToUpdate, localStorage.getItem('token')).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('')
        alert('item has been updated')
      },
      err => {
        console.log(err)
        alert(err)
      })
    }
  }

  public ngOnInit(): void {
    this._currentItem()
  }

  private _currentItem(): void {
    this._storeService.getItemData().subscribe(itemToEdit => {
      this.itemToUpdate = itemToEdit
    })
  }
}
