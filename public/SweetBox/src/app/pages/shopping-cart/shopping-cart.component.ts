import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Shopping } from 'src/app/interfaces/shopping';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService) { }

  addedItems: Shopping[];
  noItem: boolean = true;
  totalPrice: number = 0;

  getAddedItems(): void {
    this._storeService.getShoppingData().subscribe(addedItems => {
      if (addedItems[0].name !== '') {
        this.noItem = false;
      } 
      console.log (addedItems);
      this.addedItems = addedItems;
      for(let i: number = addedItems.length; i>0; i--) {
        this.totalPrice += addedItems[i-1].price * addedItems[i-1].quality;
      } 
    })
  }

  ngOnInit() {
    this.getAddedItems();
  }

}
