import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoasVindasComponent } from './boas-vindas/boas-vindas.component';




const routes: Routes = [
  { path: 'boas-vindas' , component : BoasVindasComponent  },

 ];
// n

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
