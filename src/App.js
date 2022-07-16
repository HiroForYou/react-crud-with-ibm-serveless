import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getCreatedProduct,
  getUpdatedProduct,
  getDeletedProduct,
} from "./app/api";

// Styles
import "./app.scss";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import DataTable from "./components/DataTable";
import CreateProduct from "./components/CreateProduct";
import UpdateProduct from "./components/UpdateProduct";
import DeleteProduct from "./components/DeleteProduct";
import Modal from "./components/Modal";
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Loader from "./components/Loader";
import MySwal from "./index";

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const userInfo = useSelector((state) => state.userInfo);

  const [loading, setLoading] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({
    _id: null,
    _rev: null,
    avatar: null,
    fullName: "",
    category: "",
    brand: "",
    price: "",
    stock: 0,
  });
  const [activeModal, setActiveModal] = useState({ name: "", active: false });
  const [savedProducts, setSavedProducts] = useState(products);
  const [pageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);

  const productsLastIndex = currentPage * pageSize;
  const productsFirstIndex = productsLastIndex - pageSize;
  const currentProducts = products
    ? products.slice(productsFirstIndex, productsLastIndex)
    : [];

  // Setting up Modal
  const setModal = (modal) => {
    search("");
    setActiveModal({ name: modal, active: true });
  };

  // Pagination
  const paginate = (page) => {
    setCurrentPage(page);
  };

  // Search
  const search = (term) => {
    if (term.length > 2) {
      setCurrentPage(1);

      const results = savedProducts.filter((product) =>
        Object.keys(product).some((key) =>
          product[key]
            .toString()
            .toLowerCase()
            .includes(term.toString().toLowerCase())
        )
      );

      dispatch({ type: "SET_PRODUCTS", data: results });
    } else if (!term.length) {
      dispatch({ type: "SET_PRODUCTS", data: savedProducts });
    }
  };

  // Sorting
  const sorting = (key) => {
    setSorted(!sorted);
    switch (key) {
      case "fullName":
        const nameSort = [...savedProducts].sort((a, b) => {
          return sorted
            ? a.fullName.localeCompare(b.fullName, "tr")
            : b.fullName.localeCompare(a.fullName, "tr");
        });
        dispatch({ type: "SET_PRODUCTS", data: nameSort });
        return;
      case "category":
        const categorySort = [...savedProducts].sort((a, b) => {
          return sorted
            ? a.category.localeCompare(b.category, "tr")
            : b.category.localeCompare(a.category, "tr");
        });
        dispatch({ type: "SET_PRODUCTS", data: categorySort });
        return;
      case "brand":
        const brandSort = [...savedProducts].sort((a, b) => {
          return sorted
            ? a.brand.localeCompare(b.brand, "tr")
            : b.brand.localeCompare(a.brand, "tr");
        });
        dispatch({ type: "SET_PRODUCTS", data: brandSort });
        return;
      case "price":
        const priceSort = [...savedProducts].sort((a, b) => {
          return sorted
            ? a.price.localeCompare(b.price, "tr")
            : b.price.localeCompare(a.price, "tr");
        });
        dispatch({ type: "SET_PRODUCTS", data: priceSort });
        return;
      case "stock":
        const stockSort = [...savedProducts].sort((a, b) => {
          return sorted
            ? a.stock.localeCompare(b.stock, "tr")
            : b.stock.localeCompare(a.stock, "tr");
        });
        dispatch({ type: "SET_PRODUCTS", data: stockSort });
        return;
      default:
        break;
    }
  };

  // Crear producto
  const createProduct = async (product) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getCreatedProduct(userInfo["accessToken"], product).then((res) => {
        const result = { ...product, _id: res.id, _rev: res.rev };
        console.log("Producto creado", res, result);
        MySwal.fire({
          icon: "success",
          title: "Producto creado satisfactoriamente.",
        }).then(() => {
          dispatch({ type: "CREATE_PRODUCT", data: result });
          setSavedProducts([...products, result]);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Error al Crear producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateRow = (product) => {
    setModal("Actualizar producto");

    setCurrentProduct({
      _id: product._id,
      _rev: product._rev,
      fullName: product.fullName,
      category: product.category,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
    });
  };

  const updateProduct = async (updatedProduct) => {
    const { _id } = updatedProduct;

    setActiveModal(false);
    setLoading(true);

    try {
      await getUpdatedProduct(userInfo["accessToken"], updatedProduct).then(
        (res) => {
          let updatedProductCopy = { ...updatedProduct, _rev: res.rev };
          console.log(
            "actualizado satisfactoriamente",
            res,
            updatedProductCopy
          );
          MySwal.fire({
            icon: "success",
            title: "Producto actualizado satisfactoriamente.",
          }).then(() => {
            dispatch({
              type: "SET_PRODUCTS",
              data: products.map((product) =>
                product._id === _id
                  ? Object.assign(product, updatedProductCopy)
                  : product
              ),
            });
          });
        }
      );
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Error al actualizar el producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteRow = (product) => {
    setModal("Eliminar producto");

    setCurrentProduct({
      _id: product._id,
      _rev: product._rev,
      fullName: product.fullName,
      category: product.category,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
    });
  };

  const deleteProduct = async (_id, _rev) => {
    setActiveModal(false);
    setLoading(true);

    try {
      await getDeletedProduct(userInfo["accessToken"], _id, _rev).then(() => {
        MySwal.fire({
          icon: "success",
          title: "Producto eliminado satisfactoriamente.",
        }).then(() => {
          dispatch({
            type: "SET_PRODUCTS",
            data: products.filter((product) => product._id !== _id),
          });
          setSavedProducts(
            savedProducts.filter((product) => product._id !== _id)
          );
          setCurrentPage(1);
        });
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "Error al intentar borrar el producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    setLoading(true);

    try {
      await getProducts(userInfo["accessToken"]).then(({ entries }) => {
        if (entries) {
          setSavedProducts(entries);
          dispatch({ type: "SET_PRODUCTS", data: entries });
        } else {
          throw new Error("No se pudo obtener entries");
        }
      });
    } catch (err) {
      MySwal.fire({
        icon: "error",
        title: "No se pudieron obtener los productos, inicie sesión!",
      });
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    userInfo
      ? fetchProducts()
      : MySwal.fire({
          icon: "error",
          title: "No se pudieron obtener los productos, inicie sesión!",
        });
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <div className="app">
      <Header />
      {userInfo && (
        <>
          <main className="content">
            <div className="container">
              {loading ? (
                <Loader />
              ) : (
                <div className="content-wrapper">
                  <div className="toolbar">
                    <Search search={search} resetSearch={search} />
                    <button
                      className="primary-btn"
                      onClick={() => setModal("Crear producto")}
                    >
                      Crear nuevo producto
                    </button>
                  </div>
                  <DataTable
                    products={currentProducts}
                    updateRow={updateRow}
                    deleteRow={deleteRow}
                    onSortChange={sorting}
                  />
                  <Pagination
                    totalResults={products ? products.length : 0}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    paginate={paginate}
                  />
                </div>
              )}
            </div>
          </main>
          {activeModal.active && (
            <Modal activeModal={activeModal}>
              {activeModal.name === "Crear producto" && (
                <CreateProduct
                  createProduct={createProduct}
                  setActiveModal={setActiveModal}
                />
              )}
              {activeModal.name === "Actualizar producto" && (
                <UpdateProduct
                  currentProduct={currentProduct}
                  updateProduct={updateProduct}
                  setActiveModal={setActiveModal}
                />
              )}
              {activeModal.name === "Eliminar producto" && (
                <DeleteProduct
                  currentProduct={currentProduct}
                  deleteProduct={deleteProduct}
                  setActiveModal={setActiveModal}
                />
              )}
            </Modal>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
