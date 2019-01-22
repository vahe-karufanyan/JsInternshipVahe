import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private _storeService: StoreService, private _authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  @Input() item: Item;

  buy(): void {
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    }

    //TODO: add buy functionlity here
  }

  edit(): void {
    this._storeService.storeDara(this.item);
    this.router.navigateByUrl('/edit');
  }

  ngOnInit() {
  }

}
