import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'ZeroDeFuncoes';
  items: MenuItem[];

  constructor(private router: Router){

  }

  ngOnInit() {
      this.items = [
          {
              label: 'Home',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'Home',command: () => this.goUrl('/boas-vindas') } ,
                  {label: 'Exemplos',command: () => this.goUrl('/exemplos') } ,

              ],

          },
          {
              label: 'Zeros de Funções',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'BISSECÇÃO',command: () => this.goUrl('/bisseccao') } ,
                  {label: 'PONTO FIXO',command: () => this.goUrl('/ponto-fixo') } ,
                  {label: 'NEWTON',command: () => this.goUrl('/newton') } ,
                  {label: 'SECANTE', command: () => this.goUrl('/secante') }
              ],

          },
          {
              label: 'Sistemas Lineares',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                  {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
              ],

          }
      ];
  }

  goUrl(url){
      console.log('url => ', url);
   this.router.navigate([url]);
  }

  onMenuClick(menu : MenuItem){
      console.log("menu => " , menu);
  }
}
