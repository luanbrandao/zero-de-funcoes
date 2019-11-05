import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { BoasVindasComponent } from './boas-vindas/boas-vindas.component';

import {PanelModule} from 'primeng/panel';
import { ExemplosComponent } from './exemplos/exemplos.component';
@NgModule({
  declarations: [BoasVindasComponent, ExemplosComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PanelModule
  ],
  exports:[BoasVindasComponent]
})
export class HomeModule { }
