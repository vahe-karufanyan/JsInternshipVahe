import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}

  getUrl() {
    return "url('../assets/background-blured.jpg')";
    //"url('../assets/background-sweets.jpg')"
  }
}
