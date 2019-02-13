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

  public item: Item[]
  public currentCategory: string
  public categories: string[] = []
  public categoryItems: Item[]
  public clickedOnType = false

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests,
    private router: Router, private _storeService: StoreService ) { }

  public showAllItems(): void {
    this.clickedOnType = false
  }

  public ngOnInit(): void {
    this.addAllItems()
  }

  public getByType(category: string): void {
    this.currentCategory = category
    this._itemRequest.getByType(category).subscribe(res => {
      this.categoryItems = res
      this.clickedOnType = true
    },
    err => {
      alert(err)
    })
  }

  private addAllItems(): void {
    this._itemRequest.getAllItems().subscribe(res => {
      const names: string[] = []
      this.item = res
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
      console.log(item.type)
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
