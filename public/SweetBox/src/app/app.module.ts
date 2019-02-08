import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

import { AppComponent } from './app.component';

import { SearchService } from './services/search.service';
import { AuthenticationService } from './services/authentication.service';
import { ItemRequests } from './services/item-requests.service';
import { StoreService } from './services/store.service';
import { BuyService } from './services/buy.service';
import { UserRequestsService } from './services/user-requests.service';

import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { ShopComponent } from './pages/shop/shop.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { UserListComponent } from './pages/user-list/user-list.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SearchComponent } from './components/search/search.component';
import { DeleteItemComponent } from './components/delete-item/delete-item.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LogInComponent,
    ShopComponent,
    SearchComponent,
    AddItemComponent,
    NavBarComponent,
    ItemListComponent,
    EditItemComponent,
    DeleteItemComponent,
    ShoppingCartComponent,
    UserListComponent
  ],
  imports: [
    MatChipsModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthenticationService,
    ItemRequests,
    SearchService,
    StoreService,
    BuyService,
    UserRequestsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }