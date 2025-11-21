class CalculadoraDesconto {
  
  // Calcula desconto simples por porcentagem
  calcularDescontoPercentual(preco, percentualDesconto) {
    if (preco < 0) throw new Error('Preço não pode ser negativo');
    if (percentualDesconto < 0 || percentualDesconto > 100) {
      throw new Error('Percentual deve estar entre 0 e 100');
    }
    
    const desconto = preco * (percentualDesconto / 100);
    return preco - desconto;
  }

  // Calcula desconto progressivo baseado na quantidade
  calcularDescontoProgressivo(preco, quantidade) {
    if (preco < 0 || quantidade < 0) {
      throw new Error('Valores não podem ser negativos');
    }

    let percentualDesconto = 0;
    
    if (quantidade >= 10 && quantidade < 50) {
      percentualDesconto = 10;
    } else if (quantidade >= 50 && quantidade < 100) {
      percentualDesconto = 20;
    } else if (quantidade >= 100) {
      percentualDesconto = 30;
    }

    const total = preco * quantidade;
    const desconto = total * (percentualDesconto / 100);
    return total - desconto;
  }

  // Aplica cupom de desconto fixo
  aplicarCupom(preco, codigoCupom) {
    if (preco < 0) throw new Error('Preço não pode ser negativo');
    
    const cuponsValidos = {
      'DESCONTO10': 10,
      'DESCONTO20': 20,
      'BEMVINDO': 15,
      'BLACKFRIDAY': 50
    };

    if (!cuponsValidos[codigoCupom]) {
      throw new Error('Cupom inválido');
    }

    const desconto = cuponsValidos[codigoCupom];
    const precoFinal = preco - desconto;
    
    return precoFinal < 0 ? 0 : precoFinal;
  }

  // Verifica se produto é elegível para desconto
  verificarElegibilidade(categoria, preco) {
    const categoriasExcluidas = ['LIVRO', 'MEDICAMENTO'];
    
    if (categoriasExcluidas.includes(categoria.toUpperCase())) {
      return false;
    }
    
    if (preco < 50) {
      return false;
    }
    
    return true;
  }

  // Calcula desconto acumulativo (percentual + cupom)
  calcularDescontoAcumulativo(preco, percentual, cupom) {
    if (percentual > 0) {
      preco = this.calcularDescontoPercentual(preco, percentual);
    }
    
    if (cupom) {
      preco = this.aplicarCupom(preco, cupom);
    }
    
    return preco;
  }
}

module.exports = CalculadoraDesconto;