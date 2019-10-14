import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BisseccaoComponent } from './bisseccao/bisseccao.component';
import { PontoFixoComponent } from './ponto-fixo/ponto-fixo.component';


const routes: Routes = [
  { path: 'bisseccao' , component : BisseccaoComponent  },
  { path: 'ponto-fixo' , component : PontoFixoComponent  }
 ];
// n

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZeroDeFuncoesRoutingModule { }
