import { Component, OnInit } from '@angular/core';
import { ItemRequests } from '../item-requests.service';
import { Item } from '../interfaces/item'
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  item: Item[];
  categories: String[] = [];
  categoryItems: Item[];
  clickedOnType: boolean = false;
  isLogedIn = this._authenticationService.isLoggedIn()

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests, private router: Router) {
   }

  addAllItems() {
    this._itemRequest.getAllItems().subscribe(res => {
      this.item = res;
      this.noRepeatType();
    },
    err => {
      console.error(err);
    })
  }

  buy() {
    if (!this.isLogedIn) {
      this.router.navigateByUrl('/logIn');
    }

    //TODO: add buy functionlity here
  }

  showAllItems() {
    this.clickedOnType = false;
  }

  getByType(category: string) {
    this._itemRequest.getByType(category).subscribe(res => {
      this.categoryItems = res;
      this.clickedOnType = true;
    },
    err => {
      alert(err);
    })
  }

  noRepeatType() {
    let type: string;
    for(let index in this.item) {
      let notMe: number = 0;
      type = this.item[index].type.toString();
      for(let i = 0; i <= parseInt(index); i++) {
        if ( type === this.item[i].type ) {
          notMe++;
        }
      }
      if (notMe === 1) {
        this.categories.push(type);
      }
    }
  }

  ngOnInit() {
    this.addAllItems();
  }
}
