export abstract class Funcoes {

  _funcaoEscrita = '';


  funcao = (x) => {
    console.log('escrita aqui');
    const cos = x => Math.cos(x);
    const sen = x => Math.sin(x);
    const pow = (x, y) => Math.pow(x, y)
    const abs = (x) => Math.abs(x)
    const sqrt = (x) => Math.sqrt(x)
    const exp = (x) => Math.exp(x)
    const cbrt = (x) => Math.cbrt(x)

    const funcao = this._funcaoEscrita.replace("x", x);
    console.log("funcao =>", funcao)
    return eval(funcao).toFixed(7);

  }

  setFuncao (funcao) {
    this._funcaoEscrita = funcao;
  }

}





