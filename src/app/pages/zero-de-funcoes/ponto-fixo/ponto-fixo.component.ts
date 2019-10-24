import { Component, OnInit } from '@angular/core';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-ponto-fixo',
  templateUrl: './ponto-fixo.component.html',
  styleUrls: ['./ponto-fixo.component.css']
})
export class PontoFixoComponent  {
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
    precisao : 0.0005,
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
            {label:'f(x) = x^3 - 9*x + 2', value:1},
            {label:'f(x) = x^3 - x - 1', value:2},
            { label: 'f(x) = exp(−x^2) − cos(x);', value: 3 },

        ];
  }




  submitForm ()  {
    console.log("intervaloA => " , this.entrada);
    let interacao = 1;



        let coluna = {
            interacao : interacao,
            x : this.entrada.chute_inicial,
            f_x : 0,
        };


        const possuiRaiz = this.possuiRaiz(
          this.entrada.inicio_intervalo , this.entrada.fim_intervalo
        );

        if( !possuiRaiz ) {
          alert("Não possui raiz!!!");
          this.reiniciar();
          return 0;
        }



      while ( interacao <= this.entrada.numero_interacoes  ) {



      const f_x = this.funcao_escolhida(coluna.x)
      console.log("f_x => " , f_x);

      const f_de_interacao =  this.funcao_de_interacao_escolhida(coluna.x);


      let linha = {
        interacao : interacao,
        x :coluna.x,
        f_x: f_x,
        f_de_interacao: f_de_interacao
      };
      coluna.x = f_de_interacao;



            console.log("coluna: " , coluna);
            this.table.push(linha);

      if( this.calcular_precissao(f_x , this.entrada.precisao) ){
        alert("paro no erro")
        interacao = this.entrada.numero_interacoes +1;
      }





      interacao++;


      }

        // this.pontosMedios.push(this.table[0].novo_ponto_medio);
        // this.pontosMedios.push(this.table[this.table.length-1].novo_ponto_medio);
        // this.f_pontosMedios.push(this.table[0].f_novo_ponto_medio);
        // this.f_pontosMedios.push(this.table[this.table.length-1].f_novo_ponto_medio);


        console.table(this.table);
        this.gerar_grafico()
        // this.gerar_grafico_pontos_medios()
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
      precisao : 0.0005,
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


  funcao1 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( 9* valorIntervalor ) + 2;
  funcao_de_interacao1 = ( valorIntervalor )  => ( ( Math.pow(valorIntervalor ,3) ) + 2 ) / 9;



  funcao2 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 1;
  funcao_de_interacao2 = ( valorIntervalor )  => (Math.cbrt(valorIntervalor+1))

  funcao3 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 1;
  funcao_de_interacao3 = ( valorIntervalor )  => (Math.cbrt(valorIntervalor+1))

  funcao4 = (valorIntervalor) => ( Math.exp( -(Math.pow(valorIntervalor, 2)) ) ) - Math.cos(valorIntervalor) ;
  funcao_de_interacao4 = ( valorIntervalor )  => (Math.pow(-valorIntervalor,3)) -  Math.cos(valorIntervalor) ;

  funcao_escolhida( x )  {

  let select = this.entrada.funcao;
    switch ( select ){
      case 1:
        return this.funcao1(x);
      break;
      case 2:
        return this.funcao2(x);
      case 3:
        return this.funcao3(x);
      case 4:
        return this.funcao4(x);
      break;

    }
  }

  funcao_de_interacao_escolhida( x )  {

  let select = this.entrada.funcao;
    switch ( select ){
      case 1:
        return this.funcao_de_interacao1(x);
      break;
      case 2:
        return this.funcao_de_interacao2(x);
      case 3:
        return this.funcao_de_interacao3(x);
      case 4:
        return this.funcao_de_interacao4(x);
      break;


    }
  }




  atualizarIntervalor = ( f_a, f_c) =>  (this.funcao_escolhida(f_a) *  f_c ) > 0;


  calcular_precissao = (erro , precisao) =>   Math.abs(erro) < precisao


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


