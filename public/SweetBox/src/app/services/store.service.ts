import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { BehaviorSubject } from 'rxjs';

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

  searchingItem: string = '';

  constructor() { }

  public subjectForEdit = new BehaviorSubject<Item>(this.editItem);
  public subjectForSearch = new BehaviorSubject<string>(this.searchingItem);

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
