import { Component, OnInit } from '@angular/core';
import { ItemRequests } from '../../services/item-requests.service';
import { Item } from '../../interfaces/item'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  item: Item[];
  categories: string[] = [];
  categoryItems: Item[];
  clickedOnType: boolean = false;
  isLogedIn = this._authenticationService.isLoggedIn()

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests, private router: Router) {
   }

  addAllItems(): void {
    this._itemRequest.getAllItems().subscribe(res => {
      this.item = res;
      this.noRepeatType();
    },
    err => {
      console.error(err);
    })
  }

  showAllItems(): void {
    this.clickedOnType = false;
  }

  getByType(category: string): void {
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
