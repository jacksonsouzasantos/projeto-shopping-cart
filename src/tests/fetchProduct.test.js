import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('testa se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('testa se a execução do fetch é chamado', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });

  it('testa se fetch foi chamado com argumento correto', async () => {
    const expectedEndpoint = 'https://api.mercadolibre.com/items/MLB1405519561';
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith(expectedEndpoint);
  });

  it('testa se retorna o valor esperado', async () => {
    const response = await fetchProduct('MLB1405519561');
    expect(response).toEqual(product);
  });

  it('Chamada sem argumento lança um erro', async () => {
    expect(await fetchProduct).rejects.toThrow(new Error('ID não informado'));
  });
});
