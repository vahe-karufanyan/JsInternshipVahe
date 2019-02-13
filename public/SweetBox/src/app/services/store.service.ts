import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Item } from '../interfaces/item'
import { Shopping } from '../interfaces/shopping'

@Injectable()
export class StoreService {

  public subjectForShopping = new BehaviorSubject<Shopping[]>(
    [{
      name: '',
      count: 0,
      id: 0,
      price: 0,
      quantity: 0
    }]
  )
  public subjectForEdit = new BehaviorSubject<Item>({
      id: 0,
      type: '',
      name: '',
      price: 0,
      barcode: '',
      count: 1
    }
  )
  public passingNamesToSearchSubject = new BehaviorSubject<string[]>([''])
  public subjectForSearch = new BehaviorSubject<string>('')

  constructor() { }

  private _products: Shopping[] = []

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

  public storeEditData(item: Item): void {
    this.subjectForEdit.next(item)
  }

  public getEditData(): BehaviorSubject<Item> {
    return this.subjectForEdit
  }
}
