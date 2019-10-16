import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BisseccaoComponent } from './bisseccao/bisseccao.component';
import { PontoFixoComponent } from './ponto-fixo/ponto-fixo.component';
import { NewtonComponent } from './newton/newton.component';
import { SecanteComponent } from './secante/secante.component';


const routes: Routes = [
  { path: 'bisseccao' , component : BisseccaoComponent  },
  { path: 'ponto-fixo' , component : PontoFixoComponent  },
  { path: 'newton' , component : NewtonComponent  },
  { path: 'secante' , component : SecanteComponent  }
 ];
// n

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZeroDeFuncoesRoutingModule { }
