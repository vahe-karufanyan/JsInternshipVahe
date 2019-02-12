import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { BehaviorSubject } from 'rxjs';
import { Shopping } from '../interfaces/shopping';

@Injectable()
export class StoreService {

  editItem: Item = {
    id: 0,
    type: '',
    name: '',
    price: 0,
    barcode: '',
    count: 1
  };

  products: Shopping[] = [];

  names: string[] = [];

  searchingItem: string = '';

  item: Shopping[] = [{
    name: '',
    count: 0,
    id: 0,
    price: 0,
    quantity: 0
  }];

  constructor() { }

  public subjectForShopping = new BehaviorSubject<Shopping[]>(this.item);
  public subjectForEdit = new BehaviorSubject<Item>(this.editItem);
  public passingNamesToSearchSubject = new BehaviorSubject<string[]>(this.names);
  public subjectForSearch = new BehaviorSubject<string>(this.searchingItem);

  storePassingNamesToSearch (name: string[]) {
    this.passingNamesToSearchSubject.next(name);
  }

  getPassingNamesToSearch () {
    return this.passingNamesToSearchSubject;
  }

  storeShoppingData(item: Shopping): void {
    this.products.push(item);
    this.subjectForShopping.next(this.products);
  }

  getShoppingData(): BehaviorSubject<Shopping[]> {
    return this.subjectForShopping;
  }

  removeItemFromCart(name: string): void {
    this.products.forEach((item: Shopping, index: number) => {
      if (item.name === name) {
        this.products.splice(index);
      }
    })
  }

  storeSearchData(name: string): void {
    this.subjectForSearch.next(name);
  }

  getSearchData(): BehaviorSubject<string> {
    return this.subjectForSearch;
  }

  storeEditData(item: Item): void {
    this.subjectForEdit.next(item);
  }

  getEditData(): BehaviorSubject<Item> {
    return this.subjectForEdit;
  }
}
