import { searchCep } from './helpers/cepFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const listProductSection = document.querySelector('.products');

const showProducts = (products) => {
  products.forEch((product) => {
    const liProduct = createCustomElement(product);
    listProductSection.appendChild(liProduct);
  });
};

window.onload = () => {
  showProducts();
};
