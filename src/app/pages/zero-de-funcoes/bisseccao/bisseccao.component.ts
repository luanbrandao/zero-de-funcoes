import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BisseccaoModel, Bisseccoes,  } from 'src/app/models/bisseccao.model';
@Component({
  selector: 'app-bisseccao',
  templateUrl: './bisseccao.component.html',
  styleUrls: ['./bisseccao.component.css']
})
export class BisseccaoComponent implements OnInit {

  data ;
  data2 ;

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

  entrada= {
    inicio_intervalo : null,
    fim_intervalo : null,
    chute_inicial: null,
    precisao : 0.0001,
    funcao : null,
    numero_interacoes : 10
  }

  pontosMedios = [];
  f_pontosMedios = [];

  entradaSalva = {inicio : 0 , fim : 0 };
  
  
    status_complto = false;
 
  table = [];
  // table = [];
  constructor() { 
  console.log("tab " , this.table)
}
  ngOnInit() {
  }

  submitForm ()  {
    console.log("intervaloA => " , this.entrada);   
    this.entradaSalva.inicio = this.entrada.inicio_intervalo;
    this.entradaSalva.fim = this.entrada.fim_intervalo;
    


    console.log("f1 => ", this.funcao(this.entrada.inicio_intervalo) + '  ---- f2 ' 
    , this.funcao(this.entrada.fim_intervalo)  )
    
    

    let interacao = 1;

    const possuiRaiz = this.possuiRaiz(
      this.entrada.inicio_intervalo , this.entrada.fim_intervalo
    );

    if( !possuiRaiz ) {
      alert("Não possui raiz!!!");
      return 0;
    } 



    while ( interacao <= this.entrada.numero_interacoes  ) {

      let coluna = {
        interacao : interacao,
        a :  this.entrada.inicio_intervalo,
        b : this.entrada.fim_intervalo,
        novo_ponto_medio : 0,
        f_novo_ponto_medio : 0,
        erro_da_iteracao: null
      };
        
      
      

      
    
      
      
      // tem que ser antes de atualiza os intervalos
      coluna.erro_da_iteracao = this.erro_da_iteracao(
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo, interacao
      )


      const novo_ponto_medio = this.novo_ponto_medio( 
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo
      );

      const f_de_c = this.f_novo_ponto_medio( novo_ponto_medio );

      const atualizarAouB = this.atualizarIntervalor( coluna.a , f_de_c);
      
      

        ( atualizarAouB ) ? 
           this.entrada.inicio_intervalo = novo_ponto_medio :
           this.entrada.fim_intervalo = novo_ponto_medio;

          f_de_c < 0 ? console.log("update A") : console.log("update B");
          

          coluna.novo_ponto_medio = novo_ponto_medio;
          coluna.f_novo_ponto_medio = f_de_c
          coluna.interacao = interacao;         



          this.table.push(coluna);

          if( this.calcular_precissao(  coluna.erro_da_iteracao , this.entrada.precisao) )
          {
            alert("Parada por precissão!!")          
            break;
          }

          interacao++;
          
        }
      
        this.pontosMedios.push(this.table[0].novo_ponto_medio);
        this.pontosMedios.push(this.table[this.table.length-1].novo_ponto_medio);
        this.f_pontosMedios.push(this.table[0].f_novo_ponto_medio);
        this.f_pontosMedios.push(this.table[this.table.length-1].f_novo_ponto_medio);
        
        
        console.log(this.table);
        console.table(this.table);
        this.gerar_grafico()
        this.atualizar_status();
     
        

  }

  reiniciar(){
    this.entrada = {
      inicio_intervalo : null,
      fim_intervalo : null,
      chute_inicial: null,
      precisao : 0.0001,
      funcao : null,
      numero_interacoes : 10
    }

    this.table = [];
    this.data = [];

    this.atualizar_status();
  }
  
  atualizar_status() {
    this.status_complto = !this.status_complto;
  }
  possuiRaiz = (inicio_intervalo , fim_intervalo) => {
    console.log("raizes => " ,   this.funcao(inicio_intervalo) ,  this.funcao(fim_intervalo))
      return (this.funcao(inicio_intervalo) *  this.funcao(fim_intervalo)) < 0

  }

  novo_ponto_medio = (a,b) => (a+b) / 2;

  f_novo_ponto_medio = ( c ) => this.funcao(c) ;
  
  // funcao = ( valorIntervalor )  => ( Math.pow(2.71828 ,valorIntervalor) ) - ( valorIntervalor ) - 2;
  // funcao = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 2;
  funcao = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( 9* valorIntervalor ) + 3;
  
  atualizarErroAbsoluto = ( c_anterior , c , erro_da_iteracao ) => {
          return Math.abs(c_anterior - c) <= ( erro_da_iteracao  )
  }

  atualizarIntervalor = ( f_a, f_c) =>  (this.funcao(f_a) *  f_c ) > 0;

  erro_da_iteracao = ( inicio_intervalo , fim_intervalo, interacao)  => {
    // return ( (fim_intervalo - inicio_intervalo   ) / (Math.pow(2 , interacao)) )
    return ( (fim_intervalo - inicio_intervalo   ) / 2 )
  }

  calcular_precissao(erro , precisao) {
      return erro < precisao;
  }

  gerar_grafico(){

    

    this.data = {        
      datasets: [
          {              
              data: [this.entradaSalva.inicio, this.entradaSalva.fim]
          },
          {              
              data: [
                this.funcao( this.entradaSalva.inicio ),
                this.funcao( this.entradaSalva.fim ),
              ],
              backgroundColor: [  '#FF6347', '#36A2EB', '#FFCE56' , , '#FF00FF' , '#ADFF2F' , '#FFA500'],
          }
      ]    
  }

  this.gerar_grafico_pontos_medios()
  }

  gerar_grafico_pontos_medios(){

    console.log("pontos m => " , this.pontosMedios);
    console.log("pontos m  f => " , this.f_pontosMedios);
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

