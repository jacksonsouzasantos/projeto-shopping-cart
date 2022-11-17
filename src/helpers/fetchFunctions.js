export const fetchProduct = async (productID) => {
  if (productID === undefined) {
    throw new Error('ID não informado');
  }
  const URL = `https://api.mercadolibre.com/items/${productID}`;
  const response = await fetch(URL);
  return response.json();
};

export const fetchProductsList = async (QUERY) => {
  const baseUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
    const responseUrl = await fetch(baseUrl);
    const data = await responseUrl.json();
    return data;
  } catch (error) {
    throw new Error('Termo de busca não informado');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProductsList,
  };
}
