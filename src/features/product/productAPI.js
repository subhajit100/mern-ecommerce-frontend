// A mock function to mimic making an async request for data
export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch("/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();

    resolve({ data });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(`/products/${update.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    const data = await response.json();

    resolve({ data });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("/brands");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByFilter(filter, sort, pagination, admin) {
  // filter = {"category": ["smartphone", "laptop"]}
  // sort = {_sort: "price", _order: "desc"}
  // pagination = {_page: 2, _limit: 10}

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      queryString += `${key}=${categoryValues}&`;
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  if (admin) {
    queryString += `admin=true&`;
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`/products?${queryString}`);
    const totalItems = await response.headers.get("X-Total-Count");
    const data = await response.json();
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
