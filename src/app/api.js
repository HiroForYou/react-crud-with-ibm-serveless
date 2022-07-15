const URL = process.env.REACT_APP_ENDPOINT_SERVELESS;

const getProducts = (BEARER) => {
  return fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + BEARER,
    },
  }).then((response) => response.json());
};

const getCreatedProduct = (BEARER, product) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + BEARER,
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

const getUpdatedProduct = (BEARER, product) => {
  const { _id, _rev, fullName, category, brand, price } = product;
  return fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + BEARER,
    },
    body: JSON.stringify({
      doc: {
        _id,
        _rev,
        fullName,
        category,
        brand,
        price,
      },
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Ocurrio un error al actualizar");
    }
  });
};

const getDeletedProduct = (BEARER, _id, _rev) => {
  return fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + BEARER,
    },
    body: JSON.stringify({
      docid: _id,
      docrev: _rev,
    }),
  }).then((response) => response.json());
};

export { getProducts, getCreatedProduct, getUpdatedProduct, getDeletedProduct };
