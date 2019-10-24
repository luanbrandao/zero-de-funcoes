import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-secante',
  templateUrl: './secante.component.html',
  styleUrls: ['./secante.component.css']
})
export class SecanteComponent {


  selectedCity1;
  data;
  data2;

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
    inicio_intervalo: null,
    fim_intervalo: null,
    chute_inicialA: 0,
    chute_inicialB: 0,
    precisao: 0.0005,
    funcao: 1,
    numero_interacoes: 20,
    erro: 0
  }

  pontosMedios = [];
  f_pontosMedios = [];

  entradaSalva = { inicio: 0, fim: 0 };


  status_complto = false;
  table = [];

  constructor() {
    this.funcoes = [
      { label: 'f(x) = x^3 - 9*x + 2', value: 1 },
      { label: 'f(x) = x^3 - x - 1', value: 2 },
      { label: 'f(x) = x - cos(x)', value: 3 },
      { label: 'f(x) = exp(−x^2) − cos(x);', value: 4 },

    ];
  }

  submitForm() {

    const possuiRaiz = this.possuiRaiz(
      this.entrada.inicio_intervalo , this.entrada.fim_intervalo
    );

    if( !possuiRaiz ) {
      alert("Não possui raiz!!!");
      this.reiniciar();
      return 0;
    }

    console.log("intervaloA => ", this.entrada);
    let interacao = 3;



    let coluna = {
      x_atual: this.entrada.chute_inicialB,
      x_anterior: this.entrada.chute_inicialA,
      f_atual: this.funcao_escolhida(this.entrada.chute_inicialB),
      f_anterior: this.funcao_escolhida(this.entrada.chute_inicialA)
    };

    let linha = {
      interacao: 0,
      x_atual:  this.entrada.chute_inicialA,
      f_atual: this.funcao_escolhida(this.entrada.chute_inicialA),
     }

     this.table.push(linha);

     linha = {
      interacao: 1,
      x_atual:  this.entrada.chute_inicialB,
      f_atual: this.funcao_escolhida(this.entrada.chute_inicialB),
     }

     this.table.push(linha);

    console.log("coluna => ", coluna);

    while (interacao <= this.entrada.numero_interacoes) {


      let calculo = {
        x_atual: coluna.x_atual,
        f_atual: coluna.f_atual,
        x_anterior: coluna.x_anterior,
        f_anterior: coluna.f_anterior,
      };

      console.table(calculo);


       const x_atual = calculo.x_atual -  this.secante(calculo.x_atual, calculo.x_anterior,
        calculo.f_atual, calculo.f_anterior)

        const f_x_atual  =this.funcao_escolhida(x_atual);
        console.log("x_atual => " , x_atual);
        console.log("f_atual => " , f_x_atual);


      linha = {
        interacao: interacao,
        x_atual:  x_atual,
        f_atual: f_x_atual,
       }

       coluna = {
        x_atual: x_atual,
        f_atual: f_x_atual,
        x_anterior: coluna.x_atual,
        f_anterior: calculo.f_atual
      };

       this.table.push(linha);


      if( this.parada_por_precisao(f_x_atual, this.entrada.precisao) ){
        alert("Precisão ok!!!!")
        interacao = this.entrada.numero_interacoes +1;
        break;
      }

      if( this.converguiu(coluna.x_atual, coluna.x_anterior) ){
        alert("Converguiu")
        interacao = this.entrada.numero_interacoes +1;
        break;
      }

      interacao++;
    }

    this.gerar_grafico()
    this.atualizar_status();



  }


  atualizar_status() {
    this.status_complto = !this.status_complto;
  }

  reiniciar() {

    this.entrada = {
      inicio_intervalo: null,
      fim_intervalo: null,
      chute_inicialA: 0,
      chute_inicialB: 0,
      precisao: 0.0005,
      funcao: 1,
      numero_interacoes: 20,
      erro: 0
    }

    this.table = [];
    this.data = [];
    this.data2 = [];

    this.pontosMedios = [];
    this.f_pontosMedios = [];

    this.entradaSalva = { inicio: 0, fim: 0 };

    this.atualizar_status();
  }

  possuiRaiz = (inicio_intervalo , fim_intervalo) =>
  (this.funcao_escolhida(inicio_intervalo) *  this.funcao_escolhida(fim_intervalo)) < 0


  novo_ponto_medio = (a, b) => (a + b) / 2;


  funcao1 = (valorIntervalor) => (Math.pow(valorIntervalor, 3)) - (9 * valorIntervalor) + 2;

  funcao2 = (valorIntervalor) => (Math.pow(valorIntervalor, 3)) - (valorIntervalor) - 1;

  funcao3 = (valorIntervalor) => valorIntervalor - Math.cos(valorIntervalor)

  funcao4 = (valorIntervalor) => ( Math.exp( -(Math.pow(valorIntervalor, 2)) ) ) - Math.cos(valorIntervalor) ;

  secante(x_atual, x_anterior, f_x_atual, f_x_anterior) {
    return (f_x_atual * (x_atual - x_anterior)) / (f_x_atual - f_x_anterior)
  }

  funcao_escolhida(x) {

    let select = this.entrada.funcao;
    console.log("select => ", select);
    switch (select) {
      case 1:
        return this.funcao1(x);
        break;
      case 2:
        return this.funcao2(x);
        break;
      case 3:
        return this.funcao3(x);
        break;
      case 4:
        return this.funcao4(x);
        break;

    }
  }


  converguiu = (x_atual, x_anterior) => x_atual == x_anterior;


  parada_por_precisao = (x, precisao) => Math.abs(x) < precisao


  gerar_grafico() {

    this.data = {
      datasets: [
        {
          data: [this.entrada.inicio_intervalo, this.entrada.fim_intervalo]
        },
        {
          data: [
            this.funcao_escolhida(this.entrada.inicio_intervalo),
            this.funcao_escolhida(this.entrada.fim_intervalo),
          ],
          backgroundColor: ['#FF6347', '#36A2EB', '#FFCE56', , '#FF00FF', '#ADFF2F', '#FFA500'],
        }
      ]

    }
  }

  gerar_grafico_pontos_medios() {
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


