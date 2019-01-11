import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { HomeComponent } from './pages/home/home.component';
import { ItemRequestsComponent } from './pages/item-requests/item-requests.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SearchComponent } from './components/search/search.component';


const appRoutes: Routes =[
  { path: '', component: HomeComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'itemRequests', component: ItemRequestsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'search/:name', component: SearchComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
