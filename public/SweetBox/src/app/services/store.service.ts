import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Item } from '../interfaces/item'
import { Shopping } from '../interfaces/shopping'

@Injectable()
export class StoreService {

  public addedQuantity = new BehaviorSubject<number>(0)

  public subjectForShopping = new BehaviorSubject<Shopping[]>(
    [{
      name: '',
      count: 0,
      id: 0,
      price: 0,
      quantity: 0
    }]
  )
  public subjectForItem = new BehaviorSubject<Item>({
      id: null,
      type: '',
      name: '',
      price: null,
      barcode: '',
      count: null,
    }
  )
  public passingNamesToSearchSubject = new BehaviorSubject<string[]>([''])
  public subjectForSearch = new BehaviorSubject<string>('')

  constructor() { }

  private _products: Shopping[] = []

  public storeAddedQuantity (addedQuantity: number): void {
    this.addedQuantity.next(addedQuantity)
  }

  public getAddedQuantity (): BehaviorSubject<number> {
    return this.addedQuantity
  }

  public storePassingNamesToSearch (name: string[]): void {
    this.passingNamesToSearchSubject.next(name)
  }

  public getPassingNamesToSearch (): BehaviorSubject<string[]> {
    return this.passingNamesToSearchSubject
  }

  public storeShoppingData(item: Shopping): void {
    this._products.push(item)
    this.subjectForShopping.next(this._products)
  }

  public getShoppingData(): BehaviorSubject<Shopping[]> {
    return this.subjectForShopping
  }

  public removeItemFromCart(name: string): void {
    this._products.forEach((item: Shopping, index: number) => {
      if (item.name === name) {
        this._products.splice(index)
      }
    })
  }

  public storeSearchData(name: string): void {
    this.subjectForSearch.next(name)
  }

  public getSearchData(): BehaviorSubject<string> {
    return this.subjectForSearch
  }

  public storeItemData(item: Item): void {
    this.subjectForItem.next(item)
  }

  public getItemData(): BehaviorSubject<Item> {
    return this.subjectForItem
  }
}
