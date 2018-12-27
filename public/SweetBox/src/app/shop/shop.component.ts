import { Component, OnInit } from '@angular/core';
import { ItemRequests } from '../item-requests.service';
import { Item } from '../models/item'
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

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests, private router: Router) {
    this.isLogedIn = this._authenticationService.isLoggedIn()
   }

  addAllItems() {    
    this._itemRequest.getAllItems().subscribe(res => {
      this.item = res;
    },
    err => {
      console.error(err);
    })
  }

  buyIf() {
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

    setTimeout( () => {
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
    }, 100)
  }

  ngOnInit() {
    this.addAllItems();
    
  }
}
