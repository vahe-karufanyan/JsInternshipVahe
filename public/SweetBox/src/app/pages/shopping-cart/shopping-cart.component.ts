import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Shopping } from 'src/app/interfaces/shopping';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _storeService: StoreService) { }

  addedItems: Shopping[];

  getAddedItems(): void {
    this._storeService.getShoppingData().subscribe(addedItems => {
      console.log (addedItems);
      this.addedItems = addedItems;
    })
  }

  ngOnInit() {
  }

}
