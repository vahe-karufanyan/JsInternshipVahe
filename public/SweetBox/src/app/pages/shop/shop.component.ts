import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { StoreService } from 'src/app/services/store.service'
import { Item } from '../../interfaces/item'
import { AuthenticationService } from '../../services/authentication.service'
import { ItemRequests } from '../../services/item-requests.service'

@Component({
  selector: 'sb-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public itemsQuantity: number
  public page = 1
  public item: Item[]
  public currentCategory: string
  public categories: string[] = []
  public categoryItems: Item[]
  public clickedOnType = false

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests,
    private router: Router, private _storeService: StoreService ) { }

  public showAllItems(): void {
    this.itemsQuantity = this.item.length
    this.clickedOnType = false
  }

  public ngOnInit(): void {
    this._addAllItems()
  }

  public getByType(category: string): void {
    this.page = 1
    this.categoryItems = []
    this.currentCategory = category
    this.item.forEach((item: Item) => {
      if (item.type === category) {
        this.categoryItems.push(item)
      }
    })
    this.itemsQuantity = this.categoryItems.length
    this.clickedOnType = true
  }

  private _addAllItems(): void {
    this._itemRequest.getAllItems().subscribe(res => {
      const names: string[] = []
      this.item = res
      this.itemsQuantity = this.item.length
      this._noRepeatType()
      this.item.forEach((item: Item) => {
        names.push(item.name)
        this._storeService.storePassingNamesToSearch(names)
      })
    },
    err => {
      console.error(err)
    })
  }

  private _noRepeatType(): void {
    const allTypes: string[] = []
    let type: string
    this.item.forEach((item: Item) => {
      type = item.type.toString()
      allTypes.push(type)
    })
    this.categories = allTypes.filter((item, index) => {
      if (allTypes.indexOf(item) === index) {
        return item
      }
    })
  }

}
