import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
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

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests,
  private _authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute,
  private  _buyService: BuyService) { }

  private _toPay: number
  private _shoppingData: Shopping = {
    name: '',
    count: 0,
    id: 0,
    price: 0,
    quantity: 0,
  }

  public buy(): void {
    this.showModal = false
    if (!this._authenticationService.isLoggedIn()) {
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
    this._shoppingData.name = this.item.name
    this._shoppingData.count = this.item.count
    this._shoppingData.id = this.item.id
    this._shoppingData.price = this.item.price
    this._shoppingData.quantity = this.quantity
    console.log(this._shoppingData.quantity)
    this._storeService.storeShoppingData(this._shoppingData)
  }

  public edit(): void {
    this._storeService.storeEditData(this.item)
    this.router.navigateByUrl('/edit')
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
    this._toPay = parseInt(localStorage.getItem('toPay'), 10)
  }

}
