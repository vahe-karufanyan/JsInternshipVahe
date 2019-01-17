import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

 item: Item[];

//  itemProvider(): void {
//   this.item[] = this.route.snapshot.paramMap.get('item');
// }


  buy(): void {
    if (!this._authenticationService.isLoggedIn()) {
      this.router.navigateByUrl('/logIn');
    }

    //TODO: add buy functionlity here
  }

  ngOnInit() {
  }

}
