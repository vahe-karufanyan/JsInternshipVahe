import { Injectable } from '@angular/core';
import * as Rx from "rxjs";
import { Item } from '../interfaces/item';

@Injectable()
export class StoreService {

  emptyItem: Item = {
    id: 0,
    type: '',
    name: '',
    price: 0,
    barcode: '',
    count: 1
  };

  constructor() { }

  public subject = new Rx.BehaviorSubject<Item>(this.emptyItem);

  storeDara(item: Item): void {
    this.subject.next(item);
  }

  getData(): Item {
    return this.subject.value;
  }
}
