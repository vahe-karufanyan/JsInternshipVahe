import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/interfaces/item'
import { Shopping } from 'src/app/interfaces/shopping'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { BuyService } from 'src/app/services/buy.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public item: Item
  public quantity = 1
  public noItem = true

  constructor(private _storeService: StoreService, public authenticationService: AuthenticationService,
              private router: Router, private _buyService: BuyService) { }

  private _toPay: number

  public buy(): void {
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
  }

  public ngOnInit(): void {
    this._toPay = parseInt(localStorage.getItem('toPay'), 10)
    this._currentItem()
  }

  private _currentItem(): void {
    this._storeService.getItemData().subscribe(item => {
      if (!item.name) {
        this.noItem = false
      }
      this.item = item
    })
  }
}
