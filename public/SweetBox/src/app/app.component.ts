import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SweetBox';
  getUrl()
  {
    return "url('../assets/candy-stripes.gif')";
  }
}
