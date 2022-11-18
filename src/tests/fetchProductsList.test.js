import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    const getUrl = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(getUrl);
  });

  it('função com estrutura de dados igual ao objeto computadorSearch', async () => {
    const fetch = await fetchProductsList('computador');
    expect(fetch).toEqual(computadorSearch);
  });

  it('Ao chamar a função fetchProductsList sem argumento, retorna um erro', async () => {
    const erro = 'Termo de busca não informado';
    await expect(fetchProductsList()).rejects.toThrow(erro);
  });
});
