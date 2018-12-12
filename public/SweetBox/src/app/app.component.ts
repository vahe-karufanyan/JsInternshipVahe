import { Component } from '@angular/core';
import { ItemRequests } from './item-requests.service';
import { Router } from '@angular/router';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // name: string;
  // item: Item;
  // master = 'Master';

  // constructor(private _itemRequest: ItemRequests, private router: Router) {}
  
  // search() {
  //   this._itemRequest.getByName(this.name).subscribe(res => {
  //     this.router.navigateByUrl('/search');
  //     this.item = res;
  //   },
  //   err => {
  //     console.error(err);
  //   })
  // }

  getUrl() {
    return "url('../assets/background-blured.jpg')";
  }
}
