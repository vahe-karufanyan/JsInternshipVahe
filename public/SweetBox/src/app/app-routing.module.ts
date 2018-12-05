import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component'
import { HomeComponent } from './home/home.component';
import { ItemRequestsComponent } from './item-requests/item-requests.component';
import { ShopComponent } from './shop/shop.component';


const appRoutes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'search', component: SearchComponent },
  { path: 'itemRequests', component: ItemRequestsComponent },
  { path: 'shop', component: ShopComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
