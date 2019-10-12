import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BisseccaoModel, Bisseccoes,  } from 'src/app/models/bisseccao.model';
@Component({
  selector: 'app-bisseccao',
  templateUrl: './bisseccao.component.html',
  styleUrls: ['./bisseccao.component.css']
})
export class BisseccaoComponent implements OnInit {

  entrada = {
    inicio_intervalo : null,
    fim_intervalo : null,
    chute_inicial: null,
    error : 0,
    funcao : null,
    numero_interacoes : 15
  }
  
  cars = [
    { field: 'vin', header: 'Vin' },
    { field: 'year', header: 'Year' },
    { field: 'brand', header: 'Brand' },
    { field: 'color', header: 'Color' },
    { field: 'color', header: 'Color' }
];

  table = [];
  // table = [];
  constructor() { 
  console.log("tab " , this.table)
}
  ngOnInit() {
  }

  submitForm ()  {
    console.log("intervaloA => " , this.entrada);   
    
    


    console.log("f1 => ", this.funcao(this.entrada.inicio_intervalo) + '  ---- f2 ' 
    , this.funcao(this.entrada.fim_intervalo)  )
    
    

    let interacao = 1;
    while ( interacao <= this.entrada.numero_interacoes ) {

      let coluna = {
        interacao : interacao,
        a :  this.entrada.inicio_intervalo,
        b : this.entrada.fim_intervalo,
        novo_ponto_medio : 0,
        f_novo_ponto_medio : 0,
        erro_da_iteracao: null
      };
        
      
      

      const possuiRaiz = this.possuiRaiz(
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo
      );
  
    
      if( !possuiRaiz ) {
        alert("Não possui raiz!!!");
        return 0;
      }
      
      // tem que ser antes de atualiza os intervalos
      coluna.erro_da_iteracao = this.erro_da_iteracao(
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo, interacao
      )


      const novo_ponto_medio = this.novo_ponto_medio( 
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo
      );

      const f_de_c = this.f_novo_ponto_medio( novo_ponto_medio );

        (f_de_c  < 0) ? 
           this.entrada.inicio_intervalo = novo_ponto_medio :
           this.entrada.fim_intervalo = novo_ponto_medio;

          f_de_c < 0 ? console.log("update A") : console.log("update B");
          

          coluna.novo_ponto_medio = novo_ponto_medio;
          coluna.f_novo_ponto_medio = f_de_c
          coluna.interacao = interacao;         



          this.table.push(coluna);
          interacao++;


    }



    console.log(this.table);
    console.table(this.table);
    
  }
  
  possuiRaiz = (inicio_intervalo , fim_intervalo) => 
    this.funcao(inicio_intervalo) *  this.funcao(fim_intervalo) < 0

  novo_ponto_medio = (a,b) => (a+b) / 2;

  f_novo_ponto_medio = ( c ) => this.funcao(c) ;
  
  funcao = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 2;
  
  atualizarErroAbsoluto = ( c_anterior , c , erro_da_iteracao ) => {
          return Math.abs(c_anterior - c) <= ( erro_da_iteracao  )
  }

  erro_da_iteracao = ( inicio_intervalo , fim_intervalo, interacao)  => {
    // console.log("error" , inicio_intervalo , fim_intervalo, (Math.pow(2 , interacao)) )
    return ( (fim_intervalo - inicio_intervalo   ) / (Math.pow(2 , interacao)) )
  }
}
