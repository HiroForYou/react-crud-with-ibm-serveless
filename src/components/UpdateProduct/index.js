import React, { useState, useEffect } from "react";

const UpdateProduct = (props) => {
  const [product, setProduct] = useState(props.currentProduct);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  const cancel = (event) => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  useEffect(() => {
    setProduct(props.currentProduct);
  }, [props]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.updateProduct(product);
      }}
    >
      <div className="form-group">
        <label>Nombre del producto</label>
        <input
          type="text"
          name="fullName"
          value={product.fullName}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Categoría</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Marca</label>
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Precio</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>Stock</label>
        <input
          type="number"
          name="stock"
          min="0"
          value={product.stock}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Aceptar</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;
