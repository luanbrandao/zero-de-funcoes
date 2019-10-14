import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';
@Component({
  selector: 'app-newton',
  templateUrl: './newton.component.html',
  styleUrls: ['./newton.component.css']
})
export class NewtonComponent  {

  selectedCity1;
  data ;
  data2 ;

  funcoes: SelectItem[];

options = {
  title: {
      display: true,
      text: 'Gráfico',
      fontSize: 16
  },
  legend: {
      position: 'bottom'
  }
};

  entrada = {
    inicio_intervalo : null,
    fim_intervalo : null,
    chute_inicial: 0,
    precisao : 0.0001,
    funcao : 1,
    numero_interacoes : 20,
    erro : 0
  }

  pontosMedios = [];
  f_pontosMedios = [];

  entradaSalva = {inicio : 0 , fim : 0 };
  
  
  status_complto = false;
  table = [];

  constructor() {
       this.funcoes = [
         {label:'f(x) = x^3 - 9*x + 3', value:1},            
         {label:'f(x) = x^3 - x - 1', value:2},
         {label:'f(x) = x - cos(x)', value:3},            
            
        ];
  }




  submitForm ()  {
    console.log("intervaloA => " , this.entrada);           
    let interacao = 1;

  

        let coluna = {
            interacao : interacao,                        
            aproximacao: this.entrada.chute_inicial
        };

          
          
      while ( interacao <= this.entrada.numero_interacoes  ) {
           
      
      const c = this.funcao_escolhida(coluna.aproximacao);
      const s = this.derivada_escolhida(coluna.aproximacao);

      console.log('c => ' , c);
      console.log('s => ' , s);

      const aproximacao = coluna.aproximacao - ( c/s )
      console.log("aproximacao => " , aproximacao);
      
      let linha = {
        interacao : interacao,            
        ponto_medio :coluna.aproximacao,            
        aproximacao: aproximacao
      };

      
      console.log("linha => " , linha)

      if( this.parada(linha.ponto_medio , linha.aproximacao) ){
        alert("Conveguiu!!!!")
        interacao = this.entrada.numero_interacoes +1;
        break;
      }
      
      coluna.aproximacao = aproximacao;
    
      console.log("coluna: " , coluna);
      this.table.push(linha);    
      


      interacao++;
      
          
      }
      
        console.table(this.table);
        this.gerar_grafico()      
        this.atualizar_status();
     
        

  }
  
  
  atualizar_status() {
    this.status_complto = !this.status_complto;
  }

  reiniciar(){

    this.entrada = {
      inicio_intervalo : null,
      fim_intervalo : null,
      chute_inicial: 0,
      precisao : 0.0001,
      funcao : 1,
      numero_interacoes :  20,
      erro : 0
    }

    this.table = [];
    this.data = [];
    this.data2 = [];

    this.pontosMedios = [];
    this.f_pontosMedios = [];

    this.entradaSalva = {inicio : 0 , fim : 0 };

    this.atualizar_status();
  }

  possuiRaiz = (inicio_intervalo , fim_intervalo) => 
       (this.funcao_escolhida(inicio_intervalo) *  this.funcao_escolhida(fim_intervalo)) < 0
  

  novo_ponto_medio = (a,b) => (a+b) / 2;

  
  funcao1 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( 9* valorIntervalor ) + 3;
  derivada_f1 = ( valorIntervalor )  => ( 3 * ( Math.pow(valorIntervalor ,2) ) ) - 9;
  

  funcao2 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 1;
  derivada_f2 = ( valorIntervalor )  => (Math.cbrt(valorIntervalor+1))
  
  funcao3 = ( valorIntervalor )  => valorIntervalor - Math.cos(valorIntervalor)
  derivada_f3 = ( valorIntervalor )  => 1 + Math.sin(valorIntervalor)

  funcao_escolhida( x )  {
    
  let select = this.entrada.funcao;
    switch ( select ){
      case 1:
        return this.funcao1(x);
      break;      
      case 2:
        return this.funcao2(x);
      break;
      case 3:
        return this.funcao3(x);
      break;

    }
  }

  derivada_escolhida( x )  {
    
  let select = this.entrada.funcao;
    switch ( select ){
      case 1:
        return this.derivada_f1(x);
      break;
      case 2:
        return this.derivada_f2(x);
      break;
      case 3:
        return this.derivada_f3(x);
      break;
      

    }
  }

  
  

  atualizarIntervalor = ( f_a, f_c) =>  (this.funcao_escolhida(f_a) *  f_c ) > 0;


  parada = (erro , precisao) =>   erro == precisao


  gerar_grafico(){

    this.data = {        
      datasets: [
          {              
              data: [this.entrada.inicio_intervalo, this.entrada.fim_intervalo]
          },
          {              
              data: [
                this.funcao_escolhida( this.entrada.inicio_intervalo ),
                this.funcao_escolhida( this.entrada.fim_intervalo),
              ],
              backgroundColor: [  '#FF6347', '#36A2EB', '#FFCE56' , , '#FF00FF' , '#ADFF2F' , '#FFA500'],
          }
      ]    
  
    } 
  }

  gerar_grafico_pontos_medios(){
    this.data2 = {        
      datasets: [
          {             
            data: this.pontosMedios
          },
          {              
            data: this.f_pontosMedios,
          }
      ]    
    }
  }

}


