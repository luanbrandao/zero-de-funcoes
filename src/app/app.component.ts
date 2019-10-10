import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ZeroDeFuncoes';
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {
              label: 'Zeros de Funções',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'BISSECÇÃO',},
                  {label: 'PONTO FIXO',},
                  {label: 'NEWTON'},
                  {label: 'Secante'}
              ]
          },
          {
              label: 'Sistemas Lineares',
              icon: 'pi pi-fw pi-pencil',
              items: [
                  {label: 'Delete', icon: 'pi pi-fw pi-trash'},
                  {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
              ]
          }
      ];
  }
  
}
