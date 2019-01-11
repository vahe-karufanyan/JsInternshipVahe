import { Component, OnInit } from '@angular/core';
import { Item } from '../../interfaces/item'

@Component({
  selector: 'app-item-requests',
  templateUrl: './item-requests.component.html',
  styleUrls: ['./item-requests.component.css']
})
export class ItemRequestsComponent{
  credentials: Item = {
    type: '',
    name: '',
    price: 1,
    barcode: '',
    count: 1
  };
}