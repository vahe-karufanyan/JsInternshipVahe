import { Component, OnInit } from '@angular/core'
import { Ng2ImgMaxService } from 'ng2-img-max'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { ItemRequests } from 'src/app/services/item-requests.service'
import { Item } from '../../interfaces/item'

@Component({
  selector: 'sb-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  public file: any
  public credentials: Item = {
    id: null,
    type: '',
    name: '',
    price: null,
    barcode: '',
    count: null,
    image: null,
  }

  constructor(private _itemRequests: ItemRequests, private _ng2ImageMax: Ng2ImgMaxService,
              private _authenticationService: AuthenticationService) { }

  private _imageChunks: string[] = []
  // private _uploadData = new FormData()

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
              this.credentials.image = reader.result
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
    // const reader = new FileReader()
    // reader.readAsDataURL(event.target.files[0])
    // reader.onload = () => {
    //   const image = reader.result
    //   console.log(image.toString().length)
    //   for (let i = 0; i < image.toString().length / 100000; i++) {
    //     this._imageChunks.push(image.toString().slice(i * 100000, (i + 1) * 99999))  // or 90000
    //   }
    //   console.log(this._imageChunks)
    // }
    // reader.onerror = (error) => {
    //   console.log('Error =>', error)
    // }
  }

  public addItem(): void {
    // this._uploadData.append('name', this.credentials.name)
    // this._uploadData.append('type', this.credentials.type)
    // this._uploadData.append('price', this.credentials.price.toString())
    // this._uploadData.append('count', this.credentials.count.toString())
    // this._uploadData.append('barcode', this.credentials.barcode)
    if (this._authenticationService.isAdmin() && this.credentials.price > 0 && this.credentials.count > 0) {
      console.log(2)
      this._itemRequests.addItem(this.credentials, localStorage.getItem('token')).subscribe(res => {
        console.log(res)
        // this._sendImage()
        alert('item has been added' + res)
      },
      err => {
        console.log(err)
      })
    } else {
      alert('Invalid price or count')
    }
  }

  public ngOnInit(): void {
  }

  // private _sendImage(): void {
  //   let final = false
  //   this._imageChunks.forEach((chunk: string, index: number, array: string[]) => {
  //     if (array.length === index + 1) {
  //       final = true
  //     }
  //     // this._itemRequests.sendChunks(chunk, this.credentials.name, localStorage.getItem('token'), final)
  //     // .subscribe(res => {
  //     //   console.log(res)
  //     // },
  //     // error => {
  //     //   console.error(error)
  //     // })
  //   })
  // }

}
