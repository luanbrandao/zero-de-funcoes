export abstract class Funcoes {

  _funcoes = [
    { label: 'f(x) = e^x - x - 2', value: 1 },
    { label: 'f(x) = x^3 - x - 2', value: 2 },
    { label: 'f(x) = x^3 - 9*x + 3', value: 3 },
    { label: 'f(x) = ???', value: 0 },
  ];

  _entrada;
  _funcaoEscrita = '';



  funcao_escolhida(x) {
    let select = this._entrada;
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
      case 0:
        return this.funcao_escrita(this._funcaoEscrita, x);
        break;
    }
  }


  funcao1 = (valorIntervalor) => (Math.pow(2.71828, valorIntervalor)) - (valorIntervalor) - 2;
  funcao2 = (valorIntervalor) => (Math.pow(valorIntervalor, 3)) - (valorIntervalor) - 2;
  funcao3 = (valorIntervalor) => (Math.pow(valorIntervalor, 3)) - (9 * valorIntervalor) + 3;

  funcao_escrita = (funcao, x) => {
    console.log('escrita aqui');
    const cos = x => Math.cos(x);
    const sen = x => Math.sin(x);
    const e = 2.71828;
    const pow = (x, y) => Math.pow(x, y)
    const abs = (x) => Math.abs(x)
    const sqrt = (x) => Math.sqrt(x)

    funcao = funcao.replace("E", e);
    funcao = funcao.replace("x", x);

    console.log("funcao =>", funcao)
    return eval(funcao);
  }

  setEntrada (nova_entrada,funcao_escritra?) {
    console.log("entrada atualizada!!!");
    console.log("e");
    this._entrada = nova_entrada;
    this._funcaoEscrita = funcao_escritra;
  }

}





