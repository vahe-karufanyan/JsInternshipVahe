import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { SearchService } from './services/search.service';
import { AuthenticationService } from './services/authentication.service';
import { ItemRequests } from './services/item-requests.service';

import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { ItemRequestsComponent } from './pages/item-requests/item-requests.component';
import { ShopComponent } from './pages/shop/shop.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { EditItemComponent } from './pages/edit-item/edit-item.component';

import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { SearchComponent } from './components/search/search.component';


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
    EditItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, ItemRequests, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }