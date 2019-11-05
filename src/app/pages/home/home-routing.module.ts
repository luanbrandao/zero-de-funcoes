import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoasVindasComponent } from './boas-vindas/boas-vindas.component';
import { ExemplosComponent } from './exemplos/exemplos.component';




const routes: Routes = [
  { path: 'boas-vindas' , component : BoasVindasComponent  },
  { path: 'exemplos' , component : ExemplosComponent  },

 ];
// n

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
