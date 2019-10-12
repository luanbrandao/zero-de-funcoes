import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//NGPRIME COMPONENTS
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenubarModule} from 'primeng/menubar';
import { ZeroDeFuncoesModule } from './pages/zero-de-funcoes/zero-de-funcoes.module';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,    
    PanelModule,
    CardModule,
    AppRoutingModule,
    MenubarModule,
    ZeroDeFuncoesModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
