import { Component, OnInit } from '@angular/core'
import { Item } from 'src/app/interfaces/item'
import { StoreService } from 'src/app/services/store.service'

@Component({
  selector: 'sb-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  public item: Item

  constructor(private _storeService: StoreService) { }

  public ngOnInit(): void {
    this._currentItem()
  }

  private _currentItem(): void {
    this._storeService.getItemData().subscribe(item => {
      this.item = item
    })
  }
}
