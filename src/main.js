import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsList = document.querySelector('.products');

const startLogin = (elemento) => {
  const runLogin = document.createElement('runLogin');
  runLogin.innerHTML = 'carregando...';
  runLogin.className = 'loading';
  elemento.appendChild(runLogin);
};

const endLogin = (elemento) => {
  const erroLogin = document.createElement('erroLogin');
  erroLogin.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  erroLogin.className = 'error';
  elemento.appendChild(erroLogin);
};

const injectProducts = async (elemento) => {
  try {
    const data = await fetchProductsList('computador');
    data.forEach((product) => {
      const element = createProductElement(product);
      elemento.appendChild(element);
      console.log(injectProducts());
    });
  } catch (error) {
    endLogin(elemento);
  }
};

const removeLog = () => {
  const p = document.querySelector('.loading');
  p.remove();
};

window.onload = () => {
  startLogin(productsList);
  injectProducts(productsList);
  removeLog();
};
