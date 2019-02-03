import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { ItemRequestsComponent } from './pages/item-requests/item-requests.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SearchComponent } from './components/search/search.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const appRoutes: Routes =[
  { path: '', component: ShopComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'logIn', component: LogInComponent },
  { path: 'itemRequests', component: ItemRequestsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'addItem', component: AddItemComponent },
  { path: 'edit', component: EditItemComponent },  
  { path: 'cart', component: ShoppingCartComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
