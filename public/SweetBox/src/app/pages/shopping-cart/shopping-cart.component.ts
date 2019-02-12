import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Shopping } from 'src/app/interfaces/shopping';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BuyService } from 'src/app/services/buy.service';
import { Router } from '@angular/router';
import { idCount } from 'src/app/interfaces/idCount';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService, private  _buyService: BuyService, private router: Router) { }

  addedItems: Shopping[] = [];
  showModal: boolean = false;
  showDeleteModal: boolean = false;
  noItem: boolean = true;
  totalPrice: number = 0;
  toPay: number;
  itemToRemove: Shopping;
  updatedItemCounts: idCount[] = [];

  getAddedItems(): void {
    this._storeService.getShoppingData().subscribe(addedItems => {
      if (addedItems[0].name !== '') {
        this.noItem = false;
        let changedItems = addedItems;
        addedItems.forEach((item: Shopping, index: number) => {
          let repeat: number = 0;
          const repeatIndex: number[] = [];
          addedItems.forEach((checkItem: Shopping, checkIndex: number) => {
            if (item.name === checkItem.name) {
              repeat++;
              if (index !== checkIndex && repeat > 1) {
                repeatIndex.push(checkIndex);
              }
            }
          });
          if (repeat > 1) {
            while (repeatIndex.length !== 0) {
              changedItems[index].quantity += changedItems[repeatIndex[repeatIndex.length - 1]].quantity;
              changedItems.splice(repeatIndex[repeatIndex.length - 1]);
              repeatIndex.pop();
            }
          }
          this.addedItems.push(changedItems[index]);
        });
        this.addedItems.forEach((item: Shopping) => {
          this.totalPrice += item.price * item.quantity;
        });
        console.log(this.addedItems);
      }
    });
  }

  storeItemToRemoveData(item: Shopping): void {
    this.showDeleteModal = true;
    this.itemToRemove = item;
  }

  remove(): void {
    this.showDeleteModal = false;
    this.totalPrice -= this.itemToRemove.price * this.itemToRemove.quantity;
    this._storeService.removeItemFromCart(this.itemToRemove.name)
    this.addedItems.forEach((item: Shopping, index: number) => {
      if (item.name === this.itemToRemove.name) {
        this.addedItems.splice(index, 1);
      }
    });
  }

  buyAll(): void {
    if (this._authenticationService.isLoggedIn()) {
      this.addedItems.forEach((item: Shopping, index: number, array: Shopping[]) => {
        this.toPay += item.quantity * item.price;
        array[index].count -= item.quantity;
        console.log(array[index]);
        this.updatedItemCounts.push({ id: item.id, count: array[index].count });
      })
        this._buyService.buyAll(localStorage.getItem('token'), localStorage.getItem('email'), this.updatedItemCounts, this.toPay).subscribe(res => {
        if (res.error) {
          console.log(res.error);
          alert(res.error);
        } else {
        localStorage.setItem('toPay', res.toPay.toString());
        console.log(res);
        this.router.navigateByUrl('');
        window.location.reload();
        }
      })
    }
  }

  ngOnInit() {
    this.getAddedItems();
    this.toPay = parseInt(localStorage.getItem('toPay'))
  }

}
