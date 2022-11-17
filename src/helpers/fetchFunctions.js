export const fetchProduct = async (id) => {
  if (id === undefined) {
    throw new Error('ID não informado');
  }
  try {
    const URL = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(URL);
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchProductsList = async (QUERY) => {
  if (!QUERY) throw new Error('Termo de busca não informado');
  const baseUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error(error.message);
  }
};
