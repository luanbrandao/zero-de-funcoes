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
         {label:'f(x) = x - cos(x)', value:3},
         { label: 'f(x) = exp(−x^2) − cos(x);', value: 4 },

        ];
  }




  submitForm ()  {
    console.log("intervaloA => " , this.entrada);
    let interacao = 1;

        let coluna = {
            interacao : interacao,
            x : this.entrada.chute_inicial,
            f_x :  0,
            f_interacao: 0
        };


    const possuiRaiz = this.possuiRaiz(
      this.entrada.inicio_intervalo , this.entrada.fim_intervalo
    );

    // if( !possuiRaiz ) {
    //   alert("Não possui raiz!!!");
    //   this.reiniciar();
    //   return 0;
    // }


      while ( interacao <= this.entrada.numero_interacoes  ) {


      const f_x  = parseFloat(this.funcao_escolhida(coluna.x).toFixed(5));
      const derivada = parseFloat(this.derivada_escolhida(coluna.x).toFixed(5));


      const aproximacao = this.newton( coluna.x , f_x, derivada );

      let linha = {
        interacao : interacao,
        ponto_medio : coluna.x,
        f_x : f_x,
        aproximacao: aproximacao
      };

      console.log("linha")
      coluna.x = parseFloat( aproximacao);


      const result = this.table.find( obj => obj.ponto_medio === linha.ponto_medio )


            if( this.parada( f_x , this.entrada.precisao) ){
              alert("Conveguiu!!!!")
              interacao = this.entrada.numero_interacoes +1;
              break;
            }

      this.table.push(linha);

      if( result ){
        alert("Ja existe na tabela")
        interacao = this.entrada.numero_interacoes +1;
        break;
      }




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

  newton = ( x , f_x, derivada) =>  ( x - ( f_x/derivada) ).toFixed(5)


  possuiRaiz = (inicio_intervalo , fim_intervalo) =>
       (this.funcao_escolhida(inicio_intervalo) *  this.funcao_escolhida(fim_intervalo)) < 0


  novo_ponto_medio = (a,b) => (a+b) / 2;


  funcao1 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( 9 * valorIntervalor ) + 5;
  derivada_f1 = ( valorIntervalor )  => ( 3 * ( Math.pow(valorIntervalor ,2) ) ) - 9;


  funcao2 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - ( valorIntervalor ) - 1;
  derivada_f2 = ( valorIntervalor )  =>  ( 3 * ( Math.pow(valorIntervalor ,2) ) ) - 1;

  funcao3 = ( valorIntervalor )  => valorIntervalor - Math.cos(valorIntervalor)
  derivada_f3 = ( valorIntervalor )  => 1 + Math.sin(valorIntervalor)

  funcao4 = (valorIntervalor) => ( Math.exp( -(Math.pow(valorIntervalor, 2)) ) ) - Math.cos(valorIntervalor) ;
  derivada_f4 = ( valorIntervalor )  => ( Math.pow(valorIntervalor ,3) ) - valorIntervalor - 1

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
      case 4:
        return this.funcao4(x);
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
      case 4:
        return this.derivada_f4(x);
      break;


    }
  }




  atualizarIntervalor = ( f_a, f_c) =>  (this.funcao_escolhida(f_a) *  f_c ) > 0;


  parada = (erro , precisao) =>   Math.abs(erro) < precisao


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


