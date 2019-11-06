import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import { Funcoes } from 'src/app/utils/funcoes';

@Component({
  selector: 'app-bisseccao',
  templateUrl: './bisseccao.component.html',
  styleUrls: ['./bisseccao.component.css']
})
export class BisseccaoComponent extends Funcoes {

  funcoes: SelectItem[];

  entrada = {
    inicio_intervalo : null,
    fim_intervalo : null,
    chute_inicial: null,
    precisao : 0.0005,
    funcao : 1,
    numero_interacoes : 20,
    funcao_escrita : ''
  }

  pontosMedios = [];


  status_complto = false;
  table = [];

  constructor() {
    super();
    this.funcoes = this._funcoes;
  }

  submitForm ()  {

    this.setEntrada(this.entrada.funcao, this.entrada.funcao_escrita)

    console.log("intervaloA => " , this.entrada);

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

      let linha = {
        interacao : interacao,
        a :  this.entrada.inicio_intervalo,
        b : this.entrada.fim_intervalo,
        novo_ponto_medio : 0,
        f_novo_ponto_medio : 0,
        erro_da_iteracao: null
      };

      // tem que ser antes de atualiza os intervalos
      linha.erro_da_iteracao = this.erro_da_iteracao(
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo
      )

      const novo_ponto_medio = this.novo_ponto_medio(
        this.entrada.inicio_intervalo , this.entrada.fim_intervalo
      );

      const f_de_c = this.f_novo_ponto_medio( novo_ponto_medio );

      const atualizarAouB = this.atualizarIntervalor( linha.a , f_de_c);

        ( atualizarAouB ) ?
           this.entrada.inicio_intervalo = novo_ponto_medio :
           this.entrada.fim_intervalo = novo_ponto_medio;

          f_de_c < 0 ? console.log("update A") : console.log("update B");

          linha.novo_ponto_medio = novo_ponto_medio;
          linha.f_novo_ponto_medio = f_de_c
          linha.interacao = interacao;

          this.table.push(linha);


          if( this.calcular_precissao(  linha.erro_da_iteracao , this.entrada.precisao) )
          {
            alert("Parada por precissão!!")
            break;
          }

          interacao++;
        }

        this.pontosMedios.push(this.table[0].novo_ponto_medio);
        this.pontosMedios.push(this.table[this.table.length-1].novo_ponto_medio);

        console.table(this.table);
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
      precisao : 0.0005,
      funcao : 1,
      numero_interacoes :  20,
      funcao_escrita : ''
    }

    this.table = [];

    this.pontosMedios = [];

    this.atualizar_status();
  }

  possuiRaiz = (inicio_intervalo , fim_intervalo) =>
       (this.funcao_escolhida(inicio_intervalo) *  this.funcao_escolhida(fim_intervalo)) < 0


  novo_ponto_medio = (a,b) => (a+b) / 2;

  f_novo_ponto_medio = ( ponto_medio ) => this.funcao_escolhida( ponto_medio ) ;

  atualizarErroAbsoluto = ( c_anterior , c , erro_da_iteracao ) => {
          return Math.abs(c_anterior - c) <= ( erro_da_iteracao  )
  }

  atualizarIntervalor = ( f_a, f_c) =>  (this.funcao_escolhida(f_a) *  f_c ) > 0;

  erro_da_iteracao = ( inicio_intervalo , fim_intervalo)  => {
    return ( (fim_intervalo - inicio_intervalo   ) / 2 )
  }

  calcular_precissao = (erro , precisao) =>   erro < precisao


}

