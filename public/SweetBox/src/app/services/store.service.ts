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

  Products: Shopping[] = [];

  searchingItem: string = '';

  item: Shopping[] = [{
    id: 0,
    price: 0,
    quality: 0
  }];

  constructor() { }

  public subjectForShopping = new BehaviorSubject<Shopping[]>(this.item);
  public subjectForEdit = new BehaviorSubject<Item>(this.editItem);
  public subjectForSearch = new BehaviorSubject<string>(this.searchingItem);

  storeShoppingData(item: Shopping): void {
    this.Products.push(item);
    this.subjectForShopping.next(this.Products);
  }

  getShoppingData(): BehaviorSubject<Shopping[]> {
    return this.subjectForShopping;
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
