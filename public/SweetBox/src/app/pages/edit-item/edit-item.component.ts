import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Ng2ImgMaxService } from 'ng2-img-max'
import { Item } from 'src/app/interfaces/item'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { ItemRequests } from 'src/app/services/item-requests.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  public itemToUpdate: Item
  public file: any

  constructor(private _authenticationService: AuthenticationService , private _storeService: StoreService,
              private _ng2ImageMax: Ng2ImgMaxService, private _itemRequests: ItemRequests, private router: Router) { }

  public updateItem(): void {
    if (this._authenticationService.isAdmin() &&  this.itemToUpdate.count > 0 && this.itemToUpdate.price > 0) {
      this._itemRequests.updateItem(this.itemToUpdate, localStorage.getItem('token')).subscribe(res => {
        console.log(res)
        this.router.navigateByUrl('')
        alert('item has been updated')
      },
      err => {
        console.log(err)
        alert(err)
      })
    } else {
      alert('Invalid price or count')
    }
  }

  public imputImage(event: any): void {
    // this._uploadData.append('image', event.target.files[0])
    this.file = event.target.files[0]
    this._ng2ImageMax.resizeImage(this.file, 400, 400).subscribe(
      result => {
        this._ng2ImageMax.compressImage(result, 0.070).subscribe(
          result1 => {
            const reader = new FileReader()
            reader.readAsDataURL(result1)
            reader.onload = () => {
              this.file = reader.result
              this.itemToUpdate.image = reader.result
            }
            reader.onerror = (err) => {
              console.log('Error => ', err)
            }
          },
          error => {
            console.log('Error =>', error)
          }
        )
      },
      error => {
        console.log('Error => ', error)
      }
    )
  }

  public ngOnInit(): void {
    this._currentItem()
  }

  private _currentItem(): void {
    this._storeService.getItemData().subscribe(itemToEdit => {
      this.itemToUpdate = itemToEdit
      this.file = itemToEdit.image
    })
  }
}
