import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { ItemRequestsComponent } from './pages/item-requests/item-requests.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SearchComponent } from './components/search/search.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';


const appRoutes: Routes =[
  { path: '', component: ShopComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'itemRequests', component: ItemRequestsComponent },
  { path: 'search/:name', component: SearchComponent },
  { path: 'addItem', component: AddItemComponent },
  { path: 'itemList', component: ItemListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
