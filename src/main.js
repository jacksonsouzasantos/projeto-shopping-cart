import { searchCep } from './helpers/cepFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsList = document.querySelector('.products');
const buttonAddCar = document.querySelector('.products');
const cartList = document.querySelector('.cart__products');

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

const addCart = async (element) => {
  const { target } = element;
  const idProductCart = target.parentElement.firstChild.textContent;
  const product = await fetchProduct(idProductCart);
  cartList.appendChild(createCartProductElement(product));
  saveCartID(idProductCart);
};

buttonAddCar.addEventListener('click', addCart);

function recoverCart() {
  const storage = getSavedCartIDs();
  storage.forEach(async (ids) => {
    const product = await fetchProduct(ids);
    const listCartStorege = createCartProductElement(product);
    cartList.appendChild(listCartStorege);
  });
}
window.onload = () => {
  productList();
  recoverCart();
};
