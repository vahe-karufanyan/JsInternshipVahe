import { Component, OnInit } from '@angular/core';
import { ItemRequests } from '../../services/item-requests.service';
import { Item } from '../../interfaces/item'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  item: Item[];
  currentCategory: string;
  categories: string[] = [];
  categoryItems: Item[];
  clickedOnType: boolean = false;

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests, private router: Router, private _storeService: StoreService ) {
   }

  addAllItems(): void {
    this._itemRequest.getAllItems().subscribe(res => {
      const names: string[] = [];
      this.item = res;
      this.noRepeatType();
      this.item.forEach((item: Item) => {
        names.push(item.name);
        this._storeService.storePassingNamesToSearch(names);
      })
    },
    err => {
      console.error(err);
    })
  }

  showAllItems(): void {
    this.clickedOnType = false;
  }

  getByType(category: string): void {
    this.currentCategory = category;
    this._itemRequest.getByType(category).subscribe(res => {
      this.categoryItems = res;
      this.clickedOnType = true;
    },
    err => {
      alert(err);
    })
  }

  noRepeatType(): void {
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
