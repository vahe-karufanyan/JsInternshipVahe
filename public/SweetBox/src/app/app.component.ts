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
    return "url('http://www.clker.com/cliparts/0/y/u/W/H/7/colorful-jelly-beans-md.png')";
  }
}
