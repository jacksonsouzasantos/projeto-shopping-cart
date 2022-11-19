import { searchCep } from './helpers/cepFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsList = document.querySelector('.products');

const messageLogin = () => {
  const espera = document.createElement('div');
  espera.className = 'loading';
  espera.innerHTML = 'carregando...';
  productsList.appendChild(espera);
};

const messageErro = () => {
  const erro = document.createElement('div');
  erro.className = 'error';
  erro.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  productsList.appendChild(erro);
};

const productList = async () => {
  messageLogin();
  try {
    const produtos = await fetchProductsList('computador');
    productsList.innerHTML = '';
    produtos.forEach((produtoSearch) => {
      productsList.appendChild(createProductElement(produtoSearch));
    });
  } catch (error) {
    productsList.innerHTML = '';
    messageErro();
  }
};

const addToCartBtn = document.querySelectorAll('.product__add');
const cartList = document.querySelector('.cart__products');

const addToCart = async (element) => {
  const { target } = element;
  const id = target.parentElement.firstChild.innerHTML;

  saveCartID(id);

  const productData = await fetchProduct(id);
  const cartProduct = createCartProductElement(productData);
  cartList.appendChild(cartProduct);
};

addToCartBtn.forEach((element) => element.addEventListener('click', addToCart));

window.onload = () => {
  productList();
};
