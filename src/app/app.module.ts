import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, basicRoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './application/main/footer/footer.component';
import { HeaderComponent } from './application/main/header/header.component';


@NgModule({
  declarations: [
    AppComponent,

    basicRoutingComponents,

    FooterComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
