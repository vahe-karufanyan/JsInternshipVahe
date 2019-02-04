import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { Shopping } from 'src/app/interfaces/shopping';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BuyService } from 'src/app/services/buy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService, private  _buyService: BuyService, private router: Router) { }

  addedItems: Shopping[] = [];
  notReapeatingItms: Shopping[] = [];
  noItem: boolean = true;
  totalPrice: number = 0;
  toPay: number;

  getAddedItems(): void {
    this._storeService.getShoppingData().subscribe(addedItems => {
      addedItems.forEach((item: Shopping, index: number, array: Shopping[]) => {
        let repeat: number;
        addedItems.forEach((checkItem: Shopping, checkIndex: number) => {
          if (item.name = checkItem.name) {
            repeat++;
          }
        })
        if (repeat === 1) {
          this.addedItems.push(item)
        }

        //to do

      })
    })
  }


  // getAddedItems(): void {
  //   this.addedItems = [];
  //   this.notReapeatingItms = [];
  //   this._storeService.getShoppingData().subscribe(addedItems => {
  //     if (addedItems[0].name !== '') {
  //       this.noItem = false;
  //       console.log (addedItems);
  //       let name: string;
  //       for(let index in addedItems) {
  //         let notMe: number = 0;
  //         let repeatIndex: number[] = [];
  //         let firstItem: number;
  //         name = addedItems[index].name.toString();
  //         for(let i = 0; i <= parseInt(index); i++) {
  //           if ( name === addedItems[i].name ) {
  //             notMe++;
  //             if (notMe === 1) {
  //               firstItem = i;
  //             }
  //             if (notMe > 1) {
  //               repeatIndex[notMe-2] = i;
  //             }
  //           }
  //         }
  //         if (notMe === 1) {
  //           this.addedItems.push(addedItems[firstItem]);
  //         } else {
  //           if (repeatIndex.length > 1) {
  //             console.log(repeatIndex);
  //             for(let j: number = repeatIndex.length - 1; j >= 0; j--) {
  //               addedItems[firstItem].quality += addedItems[repeatIndex[j]].quality;
  //             }
  //             this.addedItems.push(addedItems[firstItem]);
  //           } 
  //           if (repeatIndex.length === 1) {
  //             addedItems[firstItem].quality += addedItems[repeatIndex[0]].quality;
  //             this.addedItems.push(addedItems[firstItem]);
  //           }
  //         }
  //       }
  //       // for(let index in this.addedItems) {
  //       //   let notMe: number = 0;
  //       //   name = this.addedItems[index].name.toString();
  //       //   for(let i = 0; i <= parseInt(index); i++) {
  //       //     if ( name === this.addedItems[i].name ) {
  //       //       notMe++;
  //       //     }
  //       //   }
  //       //   if (notMe === 1) {
  //       //     this.notReapeatingItms.push(this.addedItems[index]);
  //       //   }
  //       // }
  //       // for(let i: number = this.notReapeatingItms.length-1; i >= 0; i--) {
  //       //   this.totalPrice += this.notReapeatingItms[i].price * this.notReapeatingItms[i].quality;
  //       // }
  //       for(let i: number = this.addedItems.length-1; i >= 0; i--) {
  //         this.totalPrice += this.addedItems[i].price * this.addedItems[i].quality;
  //       }
  //     } 
  //   })
  // }

  buyAll(): void {
    if (this._authenticationService.isLoggedIn()) {
      for(let i: number = this.addedItems.length - 1; i >= 0; i--) {
        this.toPay += this.addedItems[i].quality * this.addedItems[i].price;
        this._buyService.buy(localStorage.getItem('token'), localStorage.getItem('email'), this.addedItems[i].id, this.addedItems[i].price, this.addedItems[i].quality, this.toPay).subscribe(res => {
          if (res.error) {
            console.log(res.error);
            alert(res.error);
          } else {
            console.log(this.addedItems[i].id, this.addedItems[i].price, this.addedItems[i].quality);
          localStorage.setItem('toPay', res.toPay.toString());
          console.log(res);
          if (i === 0) {
            this.router.navigateByUrl('');
            window.location.reload();
          }
          }
        })
      }
    }
  }

  ngOnInit() {
    this.getAddedItems();
    this.toPay = parseInt(localStorage.getItem('toPay'))
  }

}
