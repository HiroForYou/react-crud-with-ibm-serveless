const URL = process.env.REACT_APP_ENDPOINT_SERVELESS;

const getProducts = () => {
  return fetch(URL).then((response) => response.json());
};

const getCreatedProduct = (product) => {
  return fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  }).then((response) => response.json());
};

const getUpdatedProduct = (product) => {
  const { _id, _rev, fullName, category, brand, price } = product;
  return fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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

const getDeletedProduct = (_id, _rev) => {
  return fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      docid: _id,
      docrev: _rev,
    }),
  }).then((response) => response.json());
};

export { getProducts, getCreatedProduct, getUpdatedProduct, getDeletedProduct };
