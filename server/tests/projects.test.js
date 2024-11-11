const { removeDuplicates } = require("../controllers/projectsControl.js");

describe('Testando a função removeDuplicates', () => {
  
  it('Remove objetos duplicados com base no _id', () => {
    const listaComDuplicatas = [
      { _id: 1, nome: 'Projeto A' },
      { _id: 2, nome: 'Projeto B' },
      { _id: 1, nome: 'Projeto A' }, 
      { _id: 3, nome: 'Projeto C' }
    ];

    const listaEsperada = [
      { _id: 1, nome: 'Projeto A' },
      { _id: 2, nome: 'Projeto B' },
      { _id: 3, nome: 'Projeto C' }
    ];

    const resultado = removeDuplicates(listaComDuplicatas);
    expect(resultado).toEqual(listaEsperada);
  });

  it('Retorna uma lista vazia se a entrada for vazia', () => {
    const resultado = removeDuplicates([]);
    expect(resultado).toEqual([]);
  });

  it('Retorna a mesma lista se não houver duplicatas', () => {
    const listaSemDuplicatas = [
      { _id: 1, nome: 'Projeto A' },
      { _id: 2, nome: 'Projeto B' },
      { _id: 3, nome: 'Projeto C' }
    ];

    const resultado = removeDuplicates(listaSemDuplicatas);
    expect(resultado).toEqual(listaSemDuplicatas);
  });
});
