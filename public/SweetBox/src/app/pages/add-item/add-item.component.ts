import { Component, OnInit } from '@angular/core'
import { ItemRequests } from 'src/app/services/item-requests.service'
import { Item } from '../../interfaces/item'

@Component({
  selector: 'sb-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public credentials: Item = {
    id: 0,
    type: '',
    name: '',
    price: 0,
    barcode: '',
    count: 1
  }

  constructor(private _itemRequests: ItemRequests) { }

  public addItem(): void {
    if (localStorage.getItem('role') === 'admin') {
      console.log(2)
      this._itemRequests.addItem(this.credentials, localStorage.getItem('token')).subscribe(res => {
        console.log(res)
        alert('item has been added' + res)
      },
      err => {
        console.log(err)
        alert(err)
      })
    }
  }

  public ngOnInit(): void {
  }

}
