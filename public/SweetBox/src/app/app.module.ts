import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AuthenticationService } from './authentication.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component'
import { HomeComponent } from './home/home.component';
import { ItemRequestsComponent } from './item-requests/item-requests.component';
import { ShopComponent } from './shop/shop.component';

import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    SearchComponent,
    SignUpComponent,
    LogInComponent,
    ItemRequestsComponent,
    ShopComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }