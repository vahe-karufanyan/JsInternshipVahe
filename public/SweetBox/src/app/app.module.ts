import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component'
import { HomeComponent } from './pages/home/home.component';
import { ItemRequestsComponent } from './pages/item-requests/item-requests.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ItemRequests } from './services/item-requests.service';

import { AppRoutingModule } from './app-routing.module';
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    SignUpComponent,
    LogInComponent,
    ItemRequestsComponent,
    ShopComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService, ItemRequests],
  bootstrap: [AppComponent]
})
export class AppModule { }