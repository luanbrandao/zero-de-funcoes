import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//NGPRIME COMPONENTS
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import { ZeroDeFuncoesModule } from './pages/zero-de-funcoes/zero-de-funcoes.module';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    AppRoutingModule,
    MenubarModule,
    ZeroDeFuncoesModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
