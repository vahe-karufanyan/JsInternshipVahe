import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AuthenticationService } from './authentication.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { ItemRequestsComponent } from './item-requests/item-requests.component'

const appRoutes: Routes =[
  {path:'signUp', component:SignUpComponent},
  {path:'logIn', component:LogInComponent},
  {path:'search', component:LogInComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SignUpComponent,
    LogInComponent,
    HomeComponent,
    ItemRequestsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
