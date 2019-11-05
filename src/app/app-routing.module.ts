import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  {  path: 'bisseccao',
     loadChildren: './pages/home/home-routing.module#HomeRoutingModule'
},
  { path : '' , redirectTo: 'boas-vindas' , pathMatch: 'full'}   ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
