import React, { useState, useEffect } from "react";

const DeleteProduct = (props) => {
  const [product, setProduct] = useState(props.currentProduct);

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
        props.deleteProduct(product._id, product._rev);
      }}
    >
      <div className="form-group">
        Estas seguro que deseas borrar {product.fullName}?
      </div>
      <div className="form-group form-group--actions">
        <button className="primary-btn">Borrar</button>
        <button className="cancel-btn" onClick={cancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default DeleteProduct;
