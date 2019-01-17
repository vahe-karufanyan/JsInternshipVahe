import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  name: string;

  constructor(private _authenticationService: AuthenticationService, private router: Router) { }

  search(): void {
    this.router.navigateByUrl(`/search/${this.name}`, { skipLocationChange: true });
  }
  
  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  ngOnInit() {
  }

}
