import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZeroDeFuncoesRoutingModule } from './zero-de-funcoes-routing.module';
import { BisseccaoComponent } from './bisseccao/bisseccao.component';


@NgModule({
  declarations: [BisseccaoComponent],
  imports: [
    CommonModule,
    ZeroDeFuncoesRoutingModule
  ],
  exports:[BisseccaoComponent]
})
export class ZeroDeFuncoesModule { }
