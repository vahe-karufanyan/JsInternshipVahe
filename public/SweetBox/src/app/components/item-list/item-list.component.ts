import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { ItemRequests } from 'src/app/services/item-requests.service';
import { BuyService } from 'src/app/services/buy.service';
import { Shopping } from 'src/app/interfaces/shopping';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests, private _authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute,private  _buyService: BuyService) { }

  showModal: boolean = false;
  @Input() item: Item;
  quality: number = 1;
  shoppingData: Shopping;

  buy(): void {
    this.showModal = false;
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    } else {
      this._buyService.buy(localStorage.getItem('token'), localStorage.getItem('email'), this.item.id, this.item.price, this.quality).subscribe(res => {
        if (res.error) {
          console.log(res.error);
          alert(res.error);
      } else {
        localStorage.setItem('toPay', res.toPay.toString());
        console.log(res);
        window.location.reload();
      }
    })
    }
  }
  
  addToCart(): void {
    this.showModal = false;
    console.log(this.item);
    this.shoppingData.id = this.item.id;
    this.shoppingData.price = this.item.price;
    this.shoppingData.quality = this.quality;
    this._storeService.storeShoppingData(this.shoppingData);
  }

  edit(): void {
    this._storeService.storeEditData(this.item);
    this.router.navigateByUrl('/edit');
  }

  remove(): void {
    console.log(this.item);
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.remove(this.item.id, localStorage.getItem('token')).subscribe(res => {
        if (res.error) {
            console.log(res.error);
            alert(res.error);
        } else {
          window.location.reload();
          console.log(res);
          alert('item has been removed');
        }
      })
    }
  }

  ngOnInit() {
  }

}
