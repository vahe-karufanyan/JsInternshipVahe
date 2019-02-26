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
    id: null,
    type: '',
    name: '',
    price: null,
    barcode: '',
    count: null,
    image: null
  }

  constructor(private _itemRequests: ItemRequests) { }

  public imputImage(event: any): void {
    const reader = new FileReader()
    reader.readAsDataURL(event.target.files[0])
    reader.onload = () => {
      this.credentials.image = reader.result
    }
    reader.onerror = (error) => {
      console.log('Error =>', error)
    }
  }

  public addItem(): void {
    if (localStorage.getItem('role') === 'admin') {
      console.log(2)
      this._itemRequests.addItem(this.credentials, localStorage.getItem('token')).subscribe(res => {
        console.log(res)
        alert('item has been added' + res)
      },
      err => {
        console.log(err)
      })
    }
  }

  public ngOnInit(): void {
  }

}
