import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZeroDeFuncoesRoutingModule } from './zero-de-funcoes-routing.module';
import { BisseccaoComponent } from './bisseccao/bisseccao.component';
import {PanelModule} from 'primeng/panel';
import {CardModule} from 'primeng/card';
import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
@NgModule({
  declarations: [BisseccaoComponent],
  imports: [
    CommonModule,
    ZeroDeFuncoesRoutingModule,
    CardModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    FormsModule,
    TableModule,
    ChartModule
  ],
  exports:[BisseccaoComponent]
})
export class ZeroDeFuncoesModule { }
