const CalculadoraDesconto = require('../calculadora');

describe('CalculadoraDesconto', () => {
  let calculadora;

  beforeEach(() => {
    calculadora = new CalculadoraDesconto();
  });

  describe('calcularDescontoPercentual', () => {
    it('Deve calcular 10% de desconto em R$100', () => {
      const resultado = calculadora.calcularDescontoPercentual(100, 10);
      expect(resultado).toBe(90);
    });

    it('Deve calcular 50% de desconto em R$200', () => {
      const resultado = calculadora.calcularDescontoPercentual(200, 50);
      expect(resultado).toBe(100);
    });

    it('Deve retornar o mesmo valor quando desconto é 0%', () => {
      const resultado = calculadora.calcularDescontoPercentual(100, 0);
      expect(resultado).toBe(100);
    });

    it('Deve retornar 0 quando desconto é 100%', () => {
      const resultado = calculadora.calcularDescontoPercentual(100, 100);
      expect(resultado).toBe(0);
    });
  
    it('Deve lançar erro quando preço é negativo', () => {
      expect(() => {
        calculadora.calcularDescontoPercentual(-100, 10);
      }).toThrow('Preço não pode ser negativo');
    });

    it('Deve lançar erro quando percentual é negativo', () => {
      expect(() => {
        calculadora.calcularDescontoPercentual(100, -10);
      }).toThrow('Percentual deve estar entre 0 e 100');
    });

    it('Deve lançar erro quando percentual é maior que 100', () => {
      expect(() => {
        calculadora.calcularDescontoPercentual(100, 150);
      }).toThrow('Percentual deve estar entre 0 e 100');
    });
  });

  describe('calcularDescontoProgressivo', () => {
    it('Deve retornar valor total sem desconto para quantidade menor que 10', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 5);
      expect(resultado).toBe(50);
    });

    it('Deve retornar valor total sem desconto para quantidade igual a 9', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 9);
      expect(resultado).toBe(90);
    });

    it('Deve aplicar 10% de desconto para quantidade igual a 10', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 10);
      expect(resultado).toBe(90);
    });

    it('Deve aplicar 10% de desconto para quantidade igual a 25', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 25);
      expect(resultado).toBe(225);
    });

    it('Deve aplicar 10% de desconto para quantidade igual a 49', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 49);
      expect(resultado).toBe(441);
    });

    it('Deve aplicar 20% de desconto para quantidade igual a 50', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 50);
      expect(resultado).toBe(400);
    });

    it('Deve aplicar 20% de desconto para quantidade igual a 75', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 75);
      expect(resultado).toBe(600);
    });

    it('Deve aplicar 20% de desconto para quantidade igual a 99', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 99);
      expect(resultado).toBe(792);
    });

    it('Deve aplicar 30% de desconto para quantidade igual a 100', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 100);
      expect(resultado).toBe(700);
    });

    it('Deve aplicar 30% de desconto para quantidade igual a 200', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 200);
      expect(resultado).toBe(1400);
    });

    it('Deve lançar erro quando preço é negativo', () => {
      expect(() => {
        calculadora.calcularDescontoProgressivo(-10, 50);
      }).toThrow('Valores não podem ser negativos');
    });

    it('Deve lançar erro quando quantidade é negativa', () => {
      expect(() => {
        calculadora.calcularDescontoProgressivo(10, -5);
      }).toThrow('Valores não podem ser negativos');
    });

    it('Deve aceitar preço zero', () => {
      const resultado = calculadora.calcularDescontoProgressivo(0, 10);
      expect(resultado).toBe(0);
    });

    it('Deve aceitar quantidade zero', () => {
      const resultado = calculadora.calcularDescontoProgressivo(10, 0);
      expect(resultado).toBe(0);
    });
  });

  describe('aplicarCupom', () => {
    it('Deve aplicar cupom DESCONTO10 e reduzir R$10', () => {
      const resultado = calculadora.aplicarCupom(100, 'DESCONTO10');
      expect(resultado).toBe(90);
    });

    it('Deve aplicar cupom DESCONTO20 e reduzir R$20', () => {
      const resultado = calculadora.aplicarCupom(100, 'DESCONTO20');
      expect(resultado).toBe(80);
    });

    it('Deve aplicar cupom BEMVINDO e reduzir R$15', () => {
      const resultado = calculadora.aplicarCupom(100, 'BEMVINDO');
      expect(resultado).toBe(85);
    });

    it('Deve aplicar cupom BLACKFRIDAY e reduzir R$50', () => {
      const resultado = calculadora.aplicarCupom(100, 'BLACKFRIDAY');
      expect(resultado).toBe(50);
    });

    it('Deve retornar 0 quando desconto é maior que o preço', () => {
      const resultado = calculadora.aplicarCupom(30, 'BLACKFRIDAY');
      expect(resultado).toBe(0);
    });

    it('Deve retornar 0 quando preço é igual ao desconto', () => {
      const resultado = calculadora.aplicarCupom(10, 'DESCONTO10');
      expect(resultado).toBe(0);
    });

    it('Deve lançar erro para cupom inválido', () => {
      expect(() => {
        calculadora.aplicarCupom(100, 'INVALIDO');
      }).toThrow('Cupom inválido');
    });

    it('Deve lançar erro quando preço é negativo', () => {
      expect(() => {
        calculadora.aplicarCupom(-100, 'DESCONTO10');
      }).toThrow('Preço não pode ser negativo');
    });

    it('Deve ser case sensitive para códigos de cupom', () => {
      expect(() => {
        calculadora.aplicarCupom(100, 'desconto10');
      }).toThrow('Cupom inválido');
    });
  });

  describe('verificarElegibilidade', () => {
    it('Deve retornar false para categoria LIVRO', () => {
      const resultado = calculadora.verificarElegibilidade('LIVRO', 100);
      expect(resultado).toBe(false);
    });

    it('Deve retornar false para categoria MEDICAMENTO', () => {
      const resultado = calculadora.verificarElegibilidade('MEDICAMENTO', 100);
      expect(resultado).toBe(false);
    });

    it('Deve retornar false para categoria livro em minúsculo', () => {
      const resultado = calculadora.verificarElegibilidade('livro', 100);
      expect(resultado).toBe(false);
    });

    it('Deve retornar false para categoria LiVrO em mixed case', () => {
      const resultado = calculadora.verificarElegibilidade('LiVrO', 100);
      expect(resultado).toBe(false);
    });

    it('Deve retornar false quando preço é menor que R$50', () => {
      const resultado = calculadora.verificarElegibilidade('ELETRONICO', 40);
      expect(resultado).toBe(false);
    });

    it('Deve retornar false quando preço é igual a R$49.99', () => {
      const resultado = calculadora.verificarElegibilidade('ELETRONICO', 49.99);
      expect(resultado).toBe(false);
    });

    it('Deve retornar true quando preço é igual a R$50', () => {
      const resultado = calculadora.verificarElegibilidade('ELETRONICO', 50);
      expect(resultado).toBe(true);
    });

    it('Deve retornar true para categoria ELETRONICO com preço R$100', () => {
      const resultado = calculadora.verificarElegibilidade('ELETRONICO', 100);
      expect(resultado).toBe(true);
    });

    it('Deve retornar true para categoria ROUPA com preço R$50', () => {
      const resultado = calculadora.verificarElegibilidade('ROUPA', 50);
      expect(resultado).toBe(true);
    });

    it('Deve retornar false para LIVRO mesmo com preço alto', () => {
      const resultado = calculadora.verificarElegibilidade('LIVRO', 500);
      expect(resultado).toBe(false);
    });

    it('Deve retornar false para categoria válida com preço baixo', () => {
      const resultado = calculadora.verificarElegibilidade('ELETRONICO', 30);
      expect(resultado).toBe(false);
    });
  });

  describe('calcularDescontoAcumulativo', () => {
    it('Deve aplicar apenas desconto percentual quando cupom não é fornecido', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(100, 10, null);
      expect(resultado).toBe(90);
    });

    it('Deve aplicar apenas desconto percentual com percentual 0', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(100, 0, null);
      expect(resultado).toBe(100);
    });

    it('Deve aplicar apenas cupom quando percentual é 0', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(100, 0, 'DESCONTO10');
      expect(resultado).toBe(90);
    });

    it('Deve aplicar percentual primeiro e depois cupom', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(100, 10, 'DESCONTO10');
      expect(resultado).toBe(80);
    });

    it('Deve calcular corretamente desconto de 10% + cupom DESCONTO10', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(100, 10, 'DESCONTO10');
      expect(resultado).toBe(80);
    });

    it('Deve calcular corretamente desconto de 20% + cupom BLACKFRIDAY', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(200, 20, 'BLACKFRIDAY');
      expect(resultado).toBe(110);
    });

    it('Deve retornar preço original quando nenhum desconto é aplicado', () => {
      const resultado = calculadora.calcularDescontoAcumulativo(100, 0, null);
      expect(resultado).toBe(100);
    });

    it('Deve lançar erro quando percentual é inválido', () => {
      expect(() => {
        calculadora.calcularDescontoAcumulativo(100, 150, null);
      }).toThrow('Percentual deve estar entre 0 e 100');
    });

    it('Deve lançar erro quando cupom é inválido', () => {
      expect(() => {
        calculadora.calcularDescontoAcumulativo(100, 10, 'INVALIDO');
      }).toThrow('Cupom inválido');
    });

    it('Deve lançar erro quando preço é negativo', () => {
      expect(() => {
        calculadora.calcularDescontoAcumulativo(-100, 10, 'DESCONTO10');
      }).toThrow('Preço não pode ser negativo');
    });
  });
});