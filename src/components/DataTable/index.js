import React from "react";

// Styles
import "./style.scss";

// Images
import SortIcon from "../../img/sort-icon.png";

const DataTable = (props) => {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th></th>
            <th
              onClick={() => {
                props.onSortChange("fullName");
              }}
            >
              <span className="column-sort">
                Nombre
                <img src={SortIcon} alt="Product Name" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("category");
              }}
            >
              <span className="column-sort">
                Categoría
                <img src={SortIcon} alt="Category" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("brand");
              }}
            >
              <span className="column-sort">
                Marca
                <img src={SortIcon} alt="Brand" />
              </span>
            </th>
            <th
              onClick={() => {
                props.onSortChange("price");
              }}
            >
              <span className="column-sort">
                Precio
                <img src={SortIcon} alt="Price" />
              </span>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.products.length ? (
            props.products.map((product) => (
              <tr key={product._id}>
                <td className="field-avatar">
                  <img
                    src={
                      product.avatar ?? "https://random.imagecdn.app/150/150"
                    }
                    alt={product.fullName}
                  />
                </td>
                <td>{product.fullName}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td className="field-actions">
                  <button
                    className="primary-btn"
                    onClick={() => {
                      props.updateRow(product);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="field-actions__delete"
                    onClick={() => props.deleteRow(product)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">
                <div className="no-record-message">No hay registros!</div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
