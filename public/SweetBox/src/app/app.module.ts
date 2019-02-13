import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatChipsModule } from '@angular/material/chips'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

import { AuthenticationService } from './services/authentication.service'
import { BuyService } from './services/buy.service'
import { ItemRequests } from './services/item-requests.service'
import { SearchService } from './services/search.service'
import { StoreService } from './services/store.service'
import { UserRequestsService } from './services/user-requests.service'

import { AddItemComponent } from './pages/add-item/add-item.component'
import { EditItemComponent } from './pages/edit-item/edit-item.component'
import { LogInComponent } from './pages/log-in/log-in.component'
import { ShopComponent } from './pages/shop/shop.component'
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component'
import { SignUpComponent } from './pages/sign-up/sign-up.component'
import { UserListComponent } from './pages/user-list/user-list.component'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ItemListComponent } from './components/item-list/item-list.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { SearchComponent } from './components/search/search.component'


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
    BrowserAnimationsModule,
    NgbModule.forRoot()
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
