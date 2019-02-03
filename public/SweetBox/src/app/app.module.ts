import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { SearchService } from './services/search.service';
import { AuthenticationService } from './services/authentication.service';
import { ItemRequests } from './services/item-requests.service';
import { StoreService } from './services/store.service';
import { BuyService } from './services/buy.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { ItemRequestsComponent } from './pages/item-requests/item-requests.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SearchComponent } from './components/search/search.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    ItemRequestsComponent,
    ShopComponent,
    SearchComponent,
    AddItemComponent,
    NavBarComponent,
    ItemListComponent,
    EditItemComponent,
    DeleteItemComponent,
    ShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, ItemRequests, SearchService, StoreService, BuyService],
  bootstrap: [AppComponent]
})
export class AppModule { }