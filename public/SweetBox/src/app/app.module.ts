import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { AuthenticationService } from './authentication.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LogInComponent } from './log-in/log-in.component'

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    AdminToolsComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
