import React, { useState } from "react";

const CreateProduct = (props) => {
  const initialData = {
    fullName: "",
    category: "",
    brand: "",
    price: "",
  };
  const [product, setProduct] = useState(initialData);

  const onInputChange = (event) => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  const cancel = (event) => {
    event.preventDefault();
    props.setActiveModal({ active: false });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (
          !product.fullName ||
          !product.category ||
          !product.brand ||
          !product.price
        )
          return;
        props.createProduct(product);
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
      <div className="form-group form-group--actions">
        <button className="primary-btn">Crear</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;
