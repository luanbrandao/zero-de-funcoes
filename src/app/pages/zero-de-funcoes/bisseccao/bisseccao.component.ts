import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BisseccaoModel, Bisseccoes,  } from 'src/app/models/bisseccao.model';
import {SelectItem} from 'primeng/api';
import { Funcoes } from 'src/app/utils/funcoes';

@Component({
  selector: 'app-bisseccao',
  templateUrl: './bisseccao.component.html',
  styleUrls: ['./bisseccao.component.css']
})
export class BisseccaoComponent extends Funcoes {
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
    chute_inicial: null,
    precisao : 0.0001,
    funcao : 1,
    numero_interacoes : 20,
    funcao_escrita : ''
  }

  pontosMedios = [];
  f_pontosMedios = [];

  entradaSalva = {inicio : 0 , fim : 0 };


  status_complto = false;
  table = [];

  constructor() {
    super();
    this.funcoes = this._funcoes;
  }




  submitForm ()  {
    this.setEntrada(this.entrada.funcao, this.entrada.funcao_escrita)

    console.log("intervaloA => " , this.entrada);
    this.entradaSalva.inicio = this.entrada.inicio_intervalo;
    this.entradaSalva.fim = this.entrada.fim_intervalo;



    let interacao = 1;

    const possuiRaiz = this.possuiRaiz(
      this.entrada.inicio_intervalo , this.entrada.fim_intervalo
    );

    if( !possuiRaiz ) {
      alert("Não possui raiz!!!");
      this.reiniciar();
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




          if( this.calcular_precissao(  coluna.erro_da_iteracao , this.entrada.precisao) )
          {
            alert("Parada por precissão!!")
            break;
          }

          this.table.push(coluna);
          interacao++;

        }

        this.pontosMedios.push(this.table[0].novo_ponto_medio);
        this.pontosMedios.push(this.table[this.table.length-1].novo_ponto_medio);
        this.f_pontosMedios.push(this.table[0].f_novo_ponto_medio);
        this.f_pontosMedios.push(this.table[this.table.length-1].f_novo_ponto_medio);


        console.table(this.table);
        this.gerar_grafico()
        this.gerar_grafico_pontos_medios()
        this.atualizar_status();



  }


  atualizar_status() {
    this.status_complto = !this.status_complto;
  }

  reiniciar(){

    this.entrada = {
      inicio_intervalo : null,
      fim_intervalo : null,
      chute_inicial: null,
      precisao : 0.0001,
      funcao : 1,
      numero_interacoes :  20,
      funcao_escrita : ''
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


  // funcao1 = ( valorIntervalor )  => ( Math.pow(2.71828 ,valorIntervalor) ) - ( valorIntervalor ) - 2;
  // funcao2 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 2;
  // funcao3 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( 9* valorIntervalor ) + 3;

  // funcao_escrita = ( funcao , x)  => {
  //   console.log('escrita aqui');
  //   const cos = x => Math.cos(x);
  //   const sen = x => Math.sin(x);
  //   const e = 2.71828;
  //   const pow = (x,y) => Math.pow(x,y)
  //   const abs = (x) => Math.abs(x)
  //   const sqrt = (x) => Math.sqrt(x)

  //   funcao = funcao.replace("E",  e);
  //   funcao = funcao.replace("x",  x);

  //   console.log("funcao =>", funcao)
  //   return eval(funcao);
  // }


  // funcao_escolhida( x )  {

  // let select = this.entrada.funcao;
  //   switch ( select ){
  //     case 1:
  //       return this.funcao1(x);
  //     break;
  //     case 2:
  //       return this.funcao2(x);
  //     break;
  //     case 3:
  //       return this.funcao3(x);
  //     break;
  //     case 0:
  //       return this.funcao_escrita(this.entrada.funcao_escrita , x);
  //     break;
  //   }
  // }


  f_novo_ponto_medio = ( ponto_medio ) => this.funcao_escolhida( ponto_medio ) ;

  atualizarErroAbsoluto = ( c_anterior , c , erro_da_iteracao ) => {
          return Math.abs(c_anterior - c) <= ( erro_da_iteracao  )
  }

  atualizarIntervalor = ( f_a, f_c) =>  (this.funcao_escolhida(f_a) *  f_c ) > 0;

  erro_da_iteracao = ( inicio_intervalo , fim_intervalo, interacao)  => {
    // return ( (fim_intervalo - inicio_intervalo   ) / (Math.pow(2 , interacao)) )
    return ( (fim_intervalo - inicio_intervalo   ) / 2 )
  }

  calcular_precissao = (erro , precisao) =>   erro < precisao


  gerar_grafico(){

    this.data = {
      datasets: [
          {
              data: [this.entradaSalva.inicio, this.entradaSalva.fim]
          },
          {
              data: [
                this.funcao_escolhida( this.entradaSalva.inicio ),
                this.funcao_escolhida( this.entradaSalva.fim ),
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

