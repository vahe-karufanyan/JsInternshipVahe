import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { IdCount } from 'src/app/interfaces/idCount'
import { Shopping } from 'src/app/interfaces/shopping'
import { AuthenticationService } from 'src/app/services/authentication.service'
import { BuyService } from 'src/app/services/buy.service'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public itemToRemove: Shopping
  public addedItems: Shopping[] = []
  public showModal = false
  public showDeleteModal = false
  public totalPrice = 0
  public noItem = true

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService,
    private  _buyService: BuyService, private router: Router) { }

    private _toPay: number
    private _updatedItemCounts: IdCount[] = []

    public storeItemToRemoveData(item: Shopping): void {
      this.showDeleteModal = true
      this.itemToRemove = item
    }

    public remove(): void {
      this.showDeleteModal = false
      this.totalPrice -= this.itemToRemove.price * this.itemToRemove.quantity
      this._storeService.removeItemFromCart(this.itemToRemove.name)
      this._storeService.storeAddedQuantity(0)
      this.addedItems.forEach((item: Shopping, index: number) => {
        if (item.name === this.itemToRemove.name) {
          this.addedItems.splice(index, 1)
        }
      })
    }

    public buyAll(): void {
      if (this._authenticationService.isLoggedIn()) {
        this.addedItems.forEach((item: Shopping, index: number, array: Shopping[]) => {
          this._toPay += item.quantity * item.price
          array[index].count -= item.quantity
          console.log(array[index])
          this._updatedItemCounts.push({ id: item.id, count: array[index].count })
        })
          this._buyService.buyAll(localStorage.getItem('token'),
          localStorage.getItem('email'), this._updatedItemCounts, this._toPay).subscribe(res => {
          if (res.error) {
            console.log(res.error)
            alert(res.error)
          } else {
          localStorage.setItem('toPay', res.toPay.toString())
          console.log(res)
          this.router.navigateByUrl('')
          window.location.reload()
          }
        })
      }
    }

    public ngOnInit(): void {
      this._getAddedItems()
      this._toPay = parseInt(localStorage.getItem('toPay'), 10)
    }

    private _getAddedItems(): void {
      this._storeService.getShoppingData().subscribe(addedItems => {
        if (addedItems[0].name !== '') {
          this.noItem = false
        const changedItems = addedItems
        addedItems.forEach((item: Shopping, index: number) => {
          let repeat = 0
          const repeatIndex: number[] = []
          addedItems.forEach((checkItem: Shopping, checkIndex: number) => {
            if (item.name === checkItem.name) {
              repeat++
              if (index !== checkIndex && repeat > 1) {
                repeatIndex.push(checkIndex)
              }
            }
          })
          if (repeat > 1) {
            while (repeatIndex.length !== 0) {
              changedItems[index].quantity += changedItems[repeatIndex[repeatIndex.length - 1]].quantity
              changedItems.splice(repeatIndex[repeatIndex.length - 1])
              repeatIndex.pop()
            }
          }
          this.addedItems.push(changedItems[index])
        })
        this.addedItems.forEach((item: Shopping) => {
          this.totalPrice += item.price * item.quantity
        })
        console.log(this.addedItems)
      }
    })
  }

}
