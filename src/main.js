import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsList = document.querySelector('.products');

const displayMessageElement = (className, message) => {
  const productsParentSection = document.querySelector('.products');
  const loadingSpan = document.createElement('span');
  loadingSpan.className = className;
  loadingSpan.textContent = message;
  productsParentSection.appendChild(loadingSpan);
};

const removeLoadingMessage = () => {
  const loadingSpan = document.querySelector('.loading');
  loadingSpan.remove();
};

const createMessageLogin = async () => {
  try {
    displayMessageElement('loading', 'carregando...');
    const computerProducts = await fetchProductsList('computador');
    removeLoadingMessage();
    createProductsFromArray(computerProducts);
  } catch {
    displayMessageElement(
      'error',
      'Algum erro ocorreu, recarregue a página e tente novamente',
    );
  }
};

const startLogin = (elemento) => {
  const runLogin = document.createElement('div');
  elemento.appendChild(runLogin);
};

const injectProducts = async (elemento) => {
  try {
    const data = await fetchProductsList('computador');
    data.forEach((product) => {
      const element = createProductElement(product);
      elemento.appendChild(element);
    });
  } catch (error) {
    displayMessageElement(
      'error',
      'Algum erro ocorreu, recarregue a página e tente novamente',
    );
  }
};

window.onload = () => {
  startLogin(productsList);
  injectProducts(productsList);
  createMessageLogin();
};
