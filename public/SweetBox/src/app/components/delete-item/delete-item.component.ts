import { Component, OnInit, Input } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ItemRequests } from 'src/app/services/item-requests.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css']
})
export class DeleteItemComponent implements OnInit {

  @Input() itemId: number;

  constructor(private _itemRequests: ItemRequests) { }

  remove(): void {
    console.log(this.itemId);
    if (localStorage.getItem('role') === 'admin') {
      this._itemRequests.remove(this.itemId, localStorage.getItem('token')).subscribe(res => {
        if (res.error) {
            console.log(res.error);
            alert(res.error);
        } else {
          console.log(res);
          alert('item has been removed' + res);
        }
      })
    }
  }


  ngOnInit() {
  }

}
