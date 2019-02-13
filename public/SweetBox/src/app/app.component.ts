import { Component } from '@angular/core'

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {}

  public getUrl(): string {
    return "url('../assets/blue-candy-bg.png')"
    // "url('../assets/background-sweets.jpg')"
  }
}
