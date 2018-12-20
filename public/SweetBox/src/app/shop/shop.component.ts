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

  constructor(private _authenticationService: AuthenticationService, private _itemRequest: ItemRequests, private router: Router) { }

  addAllItems() {    
    this._itemRequest.getAllItems().subscribe(res => {
      this.item = res;
    },
    err => {
      console.error(err);
    })
  }

  buyIf() {
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    }
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
    this.noRepeatType();
  }
}
