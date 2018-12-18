import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  @Input() item: Item;

  ngOnInit() {
  }

}
