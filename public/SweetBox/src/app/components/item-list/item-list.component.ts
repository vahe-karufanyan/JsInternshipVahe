import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/interfaces/item'
import { Shopping } from 'src/app/interfaces/shopping'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { BuyService } from 'src/app/services/buy.service'
import { ItemRequests } from 'src/app/services/item-requests.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Input() public item: Item
  public showModal = false
  public quantity = 1
  public addedQuantity = 0

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests,
              public authenticationService: AuthenticationService, private router: Router,
              private  _buyService: BuyService) { }

  private _toPay: number

  public buyButton(): void {
    if ( this.quantity < 1 || this.quantity > this.item.count ||
         this.quantity > this.item.count - this.addedQuantity ) {
      alert('Invalid quantity.')
    } else {
      this.showModal = true
    }
  }

  public buy(): void {
    this.showModal = false
    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn')
    } else {
      console.log(this.quantity)
      this._toPay += this.quantity * this.item.price
      this._buyService.buy(localStorage.getItem('token'), localStorage.getItem('email'), this.item.id,
      this.quantity, this._toPay).subscribe(res => {
      if (res.error) {
        console.log(res.error)
        alert(res.error)
      } else {
        localStorage.setItem('toPay', res.toPay.toString())
        console.log(res)
        window.location.reload()
      }
    })
    }
  }

  public addToCart(): void {
    this.showModal = false
    console.log(this.item)
    const shoppingData: Shopping = {
      name: '',
      count: 0,
      id: 0,
      price: 0,
      quantity: 0,
    }
    shoppingData.name = this.item.name
    shoppingData.count = this.item.count
    shoppingData.id = this.item.id
    shoppingData.price = this.item.price
    shoppingData.quantity = this.quantity
    console.log(shoppingData.quantity)
    this._storeService.storeShoppingData(shoppingData)
    this._storeService.storeAddedQuantity(this.addedQuantity + this.quantity)
  }

  public edit(): void {
    this._storeItem()
    this.router.navigateByUrl('/edit')
  }

  public itemPage(): void {
    this._storeItem()
    this.router.navigateByUrl(`${this.item.name}`)
  }

  public _storeItem(): void {
    this._storeService.storeItemData(this.item)
  }

  public eventStopPropagation(event: Event): void {
    event.stopPropagation()
  }

  public remove(): void {
    console.log(this.item)
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.remove(this.item.id, localStorage.getItem('token')).subscribe(res => {
        if (res.error) {
            console.log(res.error)
            alert(res.error)
        } else {
          window.location.reload()
          console.log(res)
          alert('item has been removed')
        }
      })
    }
  }

  public ngOnInit(): void {
    // this.rateControl = [Validators.max(100), Validators.min(0)]
    this._toPay = parseInt(localStorage.getItem('toPay'), 10)
    this._storeService.getAddedQuantity().subscribe(TotalAddedQuantity => {
      this.addedQuantity = TotalAddedQuantity
    })
  }

}
