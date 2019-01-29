import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { ItemRequests } from 'src/app/services/item-requests.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private _storeService: StoreService, private _itemRequests: ItemRequests, private _authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  showModal: boolean = false;
  @Input() item: Item;

  buy(): void {
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    } else {
      
    }
  }

  edit(): void {
    this._storeService.storeData(this.item);
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
          alert('item has been removed' + res);
        }
      })
    }
  }

  ngOnInit() {
  }

}
