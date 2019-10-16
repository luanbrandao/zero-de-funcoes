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
import {ListboxModule} from 'primeng/listbox';
import { PontoFixoComponent } from './ponto-fixo/ponto-fixo.component';
import { NewtonComponent } from './newton/newton.component';
import { SecanteComponent } from './secante/secante.component';
@NgModule({
  declarations: [BisseccaoComponent, PontoFixoComponent, NewtonComponent, SecanteComponent],
  imports: [
    CommonModule,
    ZeroDeFuncoesRoutingModule,
    CardModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    FormsModule,
    TableModule,
    ChartModule,
    ListboxModule
  ],
  exports:[BisseccaoComponent,PontoFixoComponent]
})
export class ZeroDeFuncoesModule { }
