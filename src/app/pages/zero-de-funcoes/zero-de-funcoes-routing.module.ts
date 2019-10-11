import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BisseccaoComponent } from './bisseccao/bisseccao.component';


const routes: Routes = [
  { path: 'bisseccao' , component : BisseccaoComponent  }
 ];
// n

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZeroDeFuncoesRoutingModule { }
