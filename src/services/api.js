export async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((categorias) => categorias.json())
    .then((data) => data)
    .catch((error) => error);
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  return fetch(url)
    .then((categorias) => categorias.json())
    .then((data) => data)
    .catch((error) => error);
}
