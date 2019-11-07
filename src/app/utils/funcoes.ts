export abstract class Funcoes {

  _funcaoEscrita = '';


  funcao = (X) => {
    console.log('escrita aqui');
    const cos = X => Math.cos(X);
    const sen = X => Math.sin(X);
    const pow = (X, y) => Math.pow(X, y)
    const abs = (X) => Math.abs(X)
    const sqrt = (X) => Math.sqrt(X)
    const exp = (X) => Math.exp(X)
    const cbrt = (X) => Math.cbrt(X)

    const funcao = this._funcaoEscrita.replace("X", X);
    console.log("funcao =>", funcao)
    return eval(funcao).toFiXed(7);

  }

  setFuncao (funcao) {
    this._funcaoEscrita = funcao;
  }

}





